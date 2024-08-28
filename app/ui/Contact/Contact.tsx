"use client";

import React, { useState, useEffect } from "react";
import { sendContactEmail } from "@/app/lib/actions";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Contact() {
  const [hidden, setHidden] = useState(true);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const message = formData.get("message");

    if (!name && !message) {
      toast.error("Please fill out name and message fields");
      return;
    }
    if (!name) {
      toast.error("Please fill out name field");
      return;
    }
    if (!message) {
      toast.error("Please fill out message field");
      return;
    }

    try {
      await sendContactEmail(formData);
      form.reset();
      toast.success(
        "Your message has been sent, I will get back to you soon! Thank you"
      );
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  }
  return (
    <>
      <p
        id="contact"
        onClick={() => setHidden(!hidden)}
        className="cursor-pointer font-bold text-blue-500 hover:underline underline-offset-4 dark:text-yellow-300"
      >
        <a href="#bot">Contact me</a>
      </p>
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
        <div>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Contact Me</h1>
            <form
              onSubmit={async (e) => {
                await handleSubmit(e);
              }}
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
                  className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
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
                  className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
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
                  className="mt-1 p-2 w-full border rounded bg-gray-700 text-white"
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
        </div>
      </motion.div>
    </>
  );
}
