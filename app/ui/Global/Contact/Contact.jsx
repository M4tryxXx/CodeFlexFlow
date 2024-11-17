"use client";

import React, { useState } from "react";
import { sendContactEmail } from "../../../lib/actions";
import { motion } from "framer-motion";
import {
  UserIcon,
  AtSymbolIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function Contact() {
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const element = document.getElementById("contact");
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const message = formData.get("message");
    let email = formData.get("email");
    if (!email) {
      email = "No email provided";
    }

    if (!name && !message) {
      toast.error("Please fill out name and message fields");
      setLoading(false);
      return;
    }
    if (!name) {
      toast.error("Please fill out name field");
      setLoading(false);
      return;
    }
    if (!message) {
      toast.error("Please fill out message field");
      setLoading(false);
      return;
    }

    try {
      await sendContactEmail(formData);
      form.reset();
      toast.success(
        `Thank you for your message, I'll get back to you as soon as possible! 
        Your Name: ${name} 
        Your Email: ${email}
        Your Message: ${message}`,
        { duration: 6000 }
      );
      setHidden(true);
      setLoading(false);
      if (element) {
        element.style.color = "";
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      setLoading(false);
    }
  }
  return (
    <>
      <p
        id="contact"
        onClick={() => {
          setHidden(!hidden);
          const element = document.getElementById("contact");
          if (element && hidden) {
            element.style.color = "red";
          } else if (element && !hidden) {
            element.style.color = "";
          }
        }}
        className="cursor-pointer font-bold text-blue-500 hover:underline underline-offset-4 dark:text-yellow-300"
      >
        <a href="#bot">{hidden ? "Contact me" : "Close"}</a>
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
          <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold text-center mb-4">Contact Me</h1>
            <div className=" max-w-lg mx-auto text-center green-pink-gradient p-[2px] rounded-[20px] dark:shadow-md">
              <form
                onSubmit={async (e) => {
                  await handleSubmit(e);
                }}
                className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-[20px] "
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                      placeholder="Your Name..."
                    />
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                      placeholder="Your Email..."
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                      placeholder="Your Message..."
                    />
                    <EnvelopeIcon className="pointer-events-none absolute left-3 top-[20px] h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-9 mx-auto items-center rounded-lg bg-rose-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-black dark:text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black 
                  disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
