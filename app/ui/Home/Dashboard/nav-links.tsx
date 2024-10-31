"use client";
import React, { useState, useEffect, useRef } from "react";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentIcon,
  UserIcon,
  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { lusitana } from "@/app/ui/fonts";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Dashboard", href: "/home/dashboard", icon: ComputerDesktopIcon },
  {
    name: "Qualifications",
    href: "/home/dashboard/qualifications",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Experience",
    href: "/home/dashboard/experiences",
    icon: UserGroupIcon,
  },
  {
    name: "Profile",
    href: "/home/dashboard/profile",
    icon: UserIcon,
  },
  {
    name: "My CV",
    href: "/home/dashboard/profile/my-cv",
    icon: ClipboardDocumentIcon,
  },
  {
    name: "Admin",
    href: "/home/admin",
    icon: WrenchScrewdriverIcon,
  },
];

export default function NavLinks({ role }: any) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("event.target", event.target);
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col lg:w-full">
      <div
        className={`
           items-center justify-center rounded-md bg-gray-100  text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 lg:hidden
          
          ${
            navOpen
              ? "rotate-180 text-rose-700 dark:text-yellow-300"
              : "rotate-0"
          } transition-transform transform w-8 h-8 `}
        onClick={(event) => {
          event.stopPropagation();

          setNavOpen(!navOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <div
        ref={navRef}
        className={`absolute bg-gray-100 dark:bg-emerald-800 w-[200px] h-auto md:w-[300px] md:h-auto flex-col justify-start p-2 rounded-md z-50 transition-all duration-400 ease-in-out left-0 top-10 lg:top-0 lg:left-0 lg:w-[100%] lg:overflow-hidden lg:bg-inherit dark:lg:bg-inherit  overflow-scroll border-[.2mm] border-rose-900 dark:border-yellow-300  shadow-md shadow-black lg:border-none lg:shadow-none ${
          navOpen
            ? "flex flex-col max-h-screen opacity-100"
            : "max-h-0 opacity-0 lg:flex lg:flex-row lg:opacity-100 lg:max-h-[50px]"
        }`}
      >
        <div
          className={`${lusitana.className} flex flex-row h-8 md:h-7 items-center justify-between rounded-md bg-inherit p-4 text-md font-medium 
          dark:bg-emerald-800 m-2 lg:hidden`}
        >
          <p className="text-lg">Menu</p>
          <div
            className="border-2 border-rose-300 dark:border-yellow-300 rounded-md p-[1px] dark:hover:border-rose-600 dark:hover:text-rose-600 dark:hover:cursor-pointer h-6 w-6 flex justify-center items-center hover:bg-rose-200 hover:text-rose-600 hover:cursor-pointer transition-transform duration-400 shadow-sm shadow-black"
            onClick={() => {
              setNavOpen(false);
            }}
          >
            <p className="text-lg">X</p>
          </div>
        </div>
        {links.map((link) => {
          if (!role || (role === "user" && link.name === "Admin")) {
            return null;
          }
          const LinkIcon = link.icon;
          return (
            <Tooltip
              key={link.name}
              content={link.name}
              placement="top-end"
              className="hidden md:block bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-950 border-rose-900 dark:border-yellow-300 border-[.2mm]"
            >
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  `${lusitana.className} flex flex-row h-8 md:h-7 items-center justify-start rounded-md bg-gray-200 p-1 md:p-2 text-md font-medium hover:bg-rose-300 hover:text-rose-900 hover:shadow-md hover:shadow-black dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-900 m-1 lg:m-0 lg:mx-1
                  hover:border-rose-900
                   dark:hover:border-yellow-300 lg:txt-sm `,
                  {
                    "bg-rose-300 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800 underline decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline-offset-4 border-[.2mm] border-rose-900 dark:border-yellow-300 shadow-md shadow-black":
                      pathname === link.href,
                  }
                )}
                onClick={() => {
                  if (navOpen) {
                    setNavOpen(false);
                  }
                }}
              >
                <LinkIcon className="w-6 md:mr-4 mr-2 lg:hidden" />
                <p className="block lg:txt-sm">{link.name}</p>
              </Link>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
