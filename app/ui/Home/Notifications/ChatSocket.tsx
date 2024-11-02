"use client";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

export default function ChatSocket({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socket = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    socket.current = io("http://localhost:5050", {
      query: { senderId },
    });

    socket.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.current.on("message", (message: any) => {
      console.log(`Received message: `, message);
      setMessages((prevMessages) => [
        ...prevMessages,
        `${message.senderId}: ${message.content}`,
      ]);
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [senderId]);

  const sendMessage = () => {
    if (socket.current && input) {
      socket.current.emit("message", {
        toUserId: receiverId,
        fromUserId: senderId,
        content: input,
      });
      setMessages((prevMessages) => [...prevMessages, `${senderId}: ${input}`]);
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
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
