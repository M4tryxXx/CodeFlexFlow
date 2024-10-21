"use client";
import React, { useState } from "react";
import { sendUserMessage } from "@/app/lib/client-actions";

const MessageForm = ({ from_user, to_user }: any) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // console.log("From: ", from_user);
  // console.log("To: ", to_user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      subject,
      message,
      from_user_id: from_user,
      to_user_id: to_user.id,
      from: to_user.from,
    };

    try {
      await sendUserMessage(data);
      setStatus("Message sent!");
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
    // Replace this with your actual API endpoint
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Send a Message to: {to_user ? to_user.email : "Something went wrong"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-white"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Send Message
        </button>
        {status && <p className="text-white mt-0.5">{status}</p>}
      </form>
    </div>
  );
};

export default MessageForm;
