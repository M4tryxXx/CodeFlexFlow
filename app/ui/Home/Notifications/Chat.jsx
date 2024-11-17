import React, { useState, useEffect, useRef } from "react";

const Chat = ({ userId, toUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080?userId=${userId}`);

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        `${message.fromUserId}: ${message.content}`,
      ]);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userId]);

  const sendMessage = () => {
    if (ws.current && input) {
      ws.current.send(JSON.stringify({ toUserId, content: input }));
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
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
