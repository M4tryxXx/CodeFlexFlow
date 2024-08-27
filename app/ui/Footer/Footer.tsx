"use client";

import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import Contact from "../Contact/Contact";

export default function Footer() {
  const [hidden, setHidden] = useState(true);
  return (
    <footer className="w-full mt-10 p-6 bg-stone-100 text-black dark:bg-emerald-900 dark:text-white">
      <div className="container mx-auto text-center">
        <p>M4tryxXx</p>
        <p>
          Email:{" "}
          <Tooltip
            content="Send me an email"
            className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
          >
            <a
              href="mailto:m4tryxxx@gmail.com"
              className="text-blue-400 dark:text-yellow-300 hover:underline underline-offset-4"
            >
              m4tryxxx@gmail.com
            </a>
          </Tooltip>
        </p>
        <p>
          GitHub:{" "}
          <Tooltip
            content="Check My GitHub"
            className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
          >
            <a
              href="https://github.com/M4tryxXx"
              className="text-blue-400 dark:text-yellow-300 hover:underline underline-offset-4"
            >
              https://github.com/M4tryxXx
            </a>
          </Tooltip>
        </p>
        <p
          onClick={() => {
            setHidden(!hidden);
            const element = document.getElementById("contact");
            if (element) {
              element.innerHTML = hidden ? "Close" : "Contact me";
              element.style.color = hidden ? "red" : "";
            }
          }}
          id="contact"
          className="cursor-pointer font-bold text-blue-500 hover:underline underline-offset-4"
        >
          {" "}
          <a href="#bot">Contact me</a>
        </p>
      </div>
      <Contact hid={hidden} />
      <div id="bot"></div>
    </footer>
  );
}
