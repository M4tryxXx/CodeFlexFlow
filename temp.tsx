"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sendContactEmail } from "@/app/lib/actions";
import toast from "react-hot-toast";
export default function Contact({ hid }: any) {
  const [hidden, setHidden] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setHidden(hid);
  }, [hid]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await sendContactEmail(email, name, message);

      setHidden(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success(
        "Your message has been sent, I will get back to you soon! Thank you",
        { duration: 5000 }
      );
      console.log(response);
      const element = document.getElementById("contact");
      if (element) {
        element.innerHTML = hidden ? "Close" : "Contact me";
        element.style.color = hidden ? "red" : "";
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later", {
        duration: 5000,
      });
    }
  };
  return (
    <motion.div
      layout
      hidden={hidden}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 2,
          stiffness: 50,
          restDelta: 0.001,
        },
      }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Contact Me</h1>
        <form
          onSubmit={async (e) => await handleSubmit(e)}
          className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
              required
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
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}
