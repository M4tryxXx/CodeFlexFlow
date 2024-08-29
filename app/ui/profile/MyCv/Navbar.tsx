"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { poppins } from "../../fonts";

const navLinks = [
  {
    id: "about",
    title: "About Me",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "qualification",
    title: "Qualifications",
  },

  {
    id: "contactme",
    title: "Contact",
  },
];

const Navbar = ({ user }: any) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      if (window.scrollY > 0) {
        setActive("About Me");
      }
      if (window.scrollY > 350) {
        setActive("Experience");
      }
      if (window.scrollY > 1150) {
        setActive("Qualifications");
      }
      if (window.scrollY > 1700) {
        setActive("Contact");
      }
    };
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [active]);

  return (
    <nav
      className={`sm:px-10 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-gray-950 bg-opacity-90`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href={"/"}
          className="flex items-center gap-2 "
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={user.avatar}
            alt="logo"
            className=" object-contain max-w-[200px] max-h-[95px]"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer">
            <span className="md:hidden"> {user.firstName}</span>
            <span className="md:block hidden">
              {" "}
              {user.firstName} {user.lastName}
            </span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={clsx(
                  "font-medium cursor-pointer text-[16px] text-white",
                  {
                    " cursor-pointer text-[16px] text-yellow-400 font-bold uderline underline-yellow-400 unserline-offset-[3px]":
                      active === link.title,
                  }
                )}
                onClick={() => {
                  setActive(link.title);
                }}
              >
                <Link href={`#${link.id}`}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center px-4">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: "100%",
            }}
          >
            <p
              className="text-4xl cursor-pointer "
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              ☰
            </p>
          </motion.div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } border border-solid border-stone-700 bg-white text-black dark:bg-gray-950 dark:bg-opacity-75 dark:text-white drop-shadow-xl p-6  absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.id}
                    className={clsx(
                      " font-medium cursor-pointer text-[16px] text-white",
                      {
                        " cursor-pointer text-[16px] text-yellow-400 font-bold uderline underline-yellow-400 unserline-offset-[3px]":
                          active === link.title,
                      }
                    )}
                    onClick={() => {
                      setActive(`${link.title}`);
                      setToggle(!toggle);
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
