"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { poppins } from "../../../fonts";

const Navbar = ({ user, userAbilities }: any) => {
  //console.log(user);
  let abilities: any;
  if (userAbilities.length > 0) {
    abilities = { id: "abilities", title: "Abilities" };
  }

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
    abilities ? abilities : { id: null, title: null },
    {
      id: "contactme",
      title: "Contact",
    },
  ];

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  //console.log(user);

  useEffect(() => {
    const scrollFunction = () => {
      let qualificationPos;
      let experiencePos;
      let contactPos;
      switch (user.qualifications.length) {
        case 0:
          qualificationPos = 350 + 205 * 4;
          break;
        case 1:
          qualificationPos = 350 + 205 * 4;
          break;
        case 2:
          qualificationPos = 350 + 205 * 5;
          break;
        case 3:
          qualificationPos = 350 + 205 * 6;
          break;
        case 4:
          qualificationPos = 350 + 205 * 7;
          break;
        case 5:
          qualificationPos = 350 + 205 * 8;
          break;
        case 6:
          qualificationPos = 350 + 205 * 9;
          break;
        case 7:
          qualificationPos = 350 + 205 * 10;
          break;
        case 8:
          qualificationPos = 350 + 205 * 11;
          break;
        case 9:
          qualificationPos = 350 + 205 * 12;
          break;
        default:
          qualificationPos = 350;
          break;
      }

      switch (user.experiences.length) {
        case 0:
          experiencePos = qualificationPos;
          break;
        case 1:
          experiencePos = qualificationPos;
          break;
        case 2:
          experiencePos = qualificationPos + 215;
          break;
        case 3:
          experiencePos = qualificationPos + 2 * 215;
          break;
        case 4:
          experiencePos = qualificationPos + 3 * 215;
          break;
        case 5:
          experiencePos = qualificationPos + 4 * 215;
          break;
        case 6:
          experiencePos = qualificationPos + 5 * 215;
          break;
        case 7:
          experiencePos = qualificationPos + 6 * 215;
          break;
        case 8:
          experiencePos = qualificationPos + 7 * 215;
          break;
        case 9:
          experiencePos = qualificationPos + 8 * 215;
          break;
        default:
          experiencePos = qualificationPos + 9 * 215;
          break;
      }

      if (window.scrollY > 0) {
        setActive("About Me");
      }
      if (window.scrollY >= 350) {
        setActive("Experience");
      }
      if (window.scrollY > qualificationPos) {
        setActive("Qualifications");
      }
      if (abilities && window.scrollY > 1700) {
        setActive("Abilities");
      }
      if (!abilities) {
        if (window.scrollY >= experiencePos) {
          setActive("Contact");
        }
      } else {
        if (window.scrollY > 2300) {
          setActive("Contact");
        }
      }
    };
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [active]);

  return (
    <nav
      className={`sm:px-10 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-gray-950 bg-opacity-90 text-white`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/home"
          className="flex items-center gap-2 "
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={user.avatar}
            alt="logo"
            id="top"
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
        <ul className="list-none hidden sm:flex flex-row gap-6">
          {navLinks.map((link) => {
            if (link.id === null) {
              return <li key={link.id} className=" hidden"></li>;
            } else {
              return (
                <li
                  key={link.id}
                  className={clsx(
                    "font-medium cursor-pointer text-[14px] text-white",
                    {
                      " cursor-pointer text-[14px] text-yellow-400 font-bold uderline underline-yellow-400 unserline-offset-[3px] underline underline-yellow-400 underline-offset-[3px]":
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
            }
          })}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center px-4 text-white">
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
            } border border-solid border-stone-700 bg-gray-950 bg-opacity-75 text-white drop-shadow-xl p-6  absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => {
                if (link.id === null) {
                  return <li key={link.id} className=" hidden"></li>;
                } else {
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
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
