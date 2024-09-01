"use client";

import React from "react";
import Contact from "../Contact/Contact";

export default function Footer() {
  return (
    <footer className="w-full mt-10  py-2 bg-stone-100 text-black dark:bg-emerald-900 dark:text-white">
      <div className="container mx-auto text-center">
        <div className="flex-row flex items-center justify-center">
          <p>M4tryxXx</p>
        </div>
        <Contact />
        <p>
          Email:{" "}
          <a
            href="mailto:m4tryxxx@gmail.com"
            className="text-blue-400 dark:text-yellow-300 hover:underline underline-offset-4"
          >
            m4tryxxx@gmail.com
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/M4tryxXx"
            className="text-blue-400 dark:text-yellow-300 hover:underline underline-offset-4"
          >
            https://github.com/M4tryxXx
          </a>
        </p>
      </div>

      <div id="bot"></div>
    </footer>
  );
}
