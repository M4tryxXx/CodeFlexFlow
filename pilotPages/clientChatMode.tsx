"use client";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const ChatSocket = ({
  senderId,
  receiverId,
  chatId,
}: {
  senderId: string;
  receiverId: string;
  chatId: string;
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isReceiverOnline, setIsReceiverOnline] = useState(false);
  const [isReceiverInChat, setIsReceiverInChat] = useState(false);
  const socket = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io("http://localhost:3000", {
      query: { senderId },
    });

    socket.current.on("connect", () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);

      // Check if the receiver is online
      socket.current?.emit("checkUserStatus", receiverId);

      // Join the chat
      socket.current?.emit("joinChat", chatId);
    });

    socket.current.on("message", (message: any) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on(
      "userStatus",
      ({ userId, online }: { userId: string; online: boolean }) => {
        if (userId === receiverId) {
          setIsReceiverOnline(online);
        }
      }
    );

    socket.current.on(
      "chatStatus",
      ({ userId, joined }: { userId: string; joined: boolean }) => {
        if (userId === receiverId) {
          setIsReceiverInChat(joined);
        }
      }
    );

    socket.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    });

    return () => {
      if (socket.current) {
        socket.current.emit("leaveChat", chatId);
        socket.current.off("connect");
        socket.current.off("message");
        socket.current.off("userStatus");
        socket.current.off("chatStatus");
        socket.current.off("disconnect");
        socket.current.disconnect();
      }
    };
  }, [senderId, receiverId, chatId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (input && socket.current) {
      console.log(`Sending message to ${receiverId}: ${input}`);
      socket.current.emit("privateMessage", {
        receiverId,
        content: input,
        chatId,
      });
      setInput("");
    }
  };

  return (
    <div>
      <h1>Live Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={sendMessage}>Send</button>
      <div>
        <p>Connected: {isConnected ? "Yes" : "No"}</p>
        <p>Receiver Online: {isReceiverOnline ? "Yes" : "No"}</p>
        <p>Receiver in Chat: {isReceiverInChat ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default ChatSocket;
