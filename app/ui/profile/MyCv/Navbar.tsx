"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


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
      id: "contact",
      title: "Contact",
    },
  ];

const Navbar = ({user} : any) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);


  return (
    <nav
      className={`sm:px-10 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
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
          <img src={user.avatar} alt="logo" className=" object-contain max-w-[200px] max-h-[95px]" />
          <p className="text-white text-[18px] font-bold cursor-pointer">
          <span className="md:hidden"> {user.firstName}</span>
            <span className="md:block hidden"> {user.firstName} {user.lastName}</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => {
                  setActive(link.title);
                }}
              >
                <Link href={`#${link.id}`} >{link.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center px-4">
          <p
            className="text-4xl cursor-pointer "
            onClick={() => {
              setToggle(!toggle);
            }}
          >{toggle ? "X" : "☰"}
          </p>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? "text-white" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => {
                      setActive(link.title);
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
