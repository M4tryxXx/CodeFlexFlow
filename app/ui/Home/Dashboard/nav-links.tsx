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
  QuestionMarkCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { lusitana } from "@/app/ui/fonts";
import {
  InformationCircleIcon,
  PhoneIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { set } from "zod";

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
    name: "Messages",
    href: "/home/dashboard/profile/messages",
    icon: EnvelopeIcon,
  },
  {
    name: "CV",
    href: "/home/dashboard/profile/my-cv",
    icon: ClipboardDocumentIcon,
  },
];

const adminLinks = [
  {
    name: "Admin",
    href: "/home/admin",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Users",
    href: "/home/admin/users",
    icon: UserGroupIcon,
  },
];

const moreLinks = [
  {
    name: "About us",
    href: "/home/about_us",
    icon: InformationCircleIcon,
  },
  {
    name: "Contact",
    href: "/home/contact",
    icon: PhoneIcon,
  },
];

export default function NavLinks({ user }: any) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const subNavRef = useRef<HTMLDivElement>(null);
  const role = user?.role;

  const handleClickOutside = (event: MouseEvent) => {
    // console.log("event.target", event.target);
    if (
      (navRef.current && !navRef.current.contains(event.target as Node)) ||
      (subNavRef.current && !subNavRef.current.contains(event.target as Node))
    ) {
      setNavOpen(false);
      setSubNavOpen(false);
    }
  };

  const handleResize = () => {
    setNavOpen(false);
    setSubNavOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex flex-col lg:w-full">
      {/** The button that toggle nav menu in mobile view */}
      <div
        className={`
           items-center justify-center bg-gray-100  text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 lg:hidden
          
          ${
            navOpen
              ? "rotate-180 text-rose-700 dark:text-yellow-300 rounded-3xl border-[.2mm] border-rose-900 dark:border-yellow-300 bg-rose-200 dark:bg-emerald-950"
              : "rotate-0 rounded-md border-0 bg-inherit dark:bg-inherit"
          } transition-all duration-1000 ease-in-out w-8 h-8 `}
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

      {/** Drop Down Cotainer in mobile view or nav bar in lg mode */}
      <div
        ref={navRef}
        className={`absolute bg-gray-100 dark:bg-emerald-800 w-[250px]  justify-start items-start  z-50  lg:left-0 lg:w-[100%] lg:overflow-visible lg:bg-inherit dark:lg:bg-inherit  overflow-scroll border-[.2mm] border-rose-900 dark:border-yello text-sm md:text-base w-300  shadow-md shadow-black lg:border-none lg:shadow-none p-2 ${
          navOpen
            ? "flex flex-col h-[600px] opacity-100 left-0 top-10 lg:top-0 "
            : "h-0  lg:flex lg:flex-row lg:opacity-100 lg:max-h-[50px] left-0 -top-28 lg:top-0 opacity-0"
        } transition-all duration-1000 ease-in-out`}
      >
        <div
          className={`${lusitana.className} flex flex-row h-8 md:h-7 items-end justify-start rounded-md bg-inherit p-1 text-md font-medium 
          dark:bg-emerald-800 m-1 lg:hidden transition-all duration-1000 ease-in-out`}
        >
          <div
            className="  p-[1px] dark:hover:border-rose-600 dark:hover:text-rose-600 dark:hover:cursor-pointer h-6 w-6 flex justify-center items-center  hover:text-rose-600 hover:cursor-pointer transition-transform duration-1000 "
            onClick={() => {
              setNavOpen(false);
            }}
          >
            <p className="text-lg">X</p>
          </div>
        </div>
        <div className="flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  hover:text-rose-900 dark:text-yellow-300 hover:decoration-2 dark:hover:decoration-yellow-300 hover:underline hover:underline-offset-4 mb-1 lg:m-0 lg:mx-1 lg:txt-sm decoration-[.4mm] dark:decoration-yellow-300 underline underline-offset-4 ">
          <p className="block lg:hidden lg:txt-sm">Navigation</p>
        </div>

        {/** Main Navigation links */}
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
                  `${
                    lusitana.className
                  } flex flex-row h-8 md:h-7 items-center justify-start  p-2  text-md font-medium  hover:text-rose-900 dark:hover:text-yellow-300 hover:decoration-2 dark:hover:decoration-yellow-300 hover:underline hover:underline-offset-4 ${
                    navOpen ? "m-1 " : "my-2 mx-1"
                  } lg:m-0 lg:mx-1
                  hover:border-rose-900
                   dark:hover:border-yellow-300 lg:txt-sm `,
                  {
                    "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-900  decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ":
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
                <p className="block lg:txt-sm break-keep">{link.name}</p>
              </Link>
            </Tooltip>
          );
        })}

        {/** Admin links */}
        {role === "admin" && (
          <div className="flex flex-col lg:hidden">
            <div
              className={`${
                lusitana.className
              } flex flex-row h-8 md:h-7 items-center justify-start  p-2  text-md font-medium  hover:text-rose-900 dark:text-yellow-300 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ${
                navOpen ? "m-2 mx-1" : "mt-1 mb-2 mx-1"
              } lg:m-0 lg:mx-1
                  hover:border-rose-900
                   dark:hover:border-yellow-300 lg:txt-sm `}
            >
              <p className="block lg:txt-sm">Admin</p>
            </div>
            {adminLinks.map((link) => {
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
                      `${
                        lusitana.className
                      } flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  hover:text-rose-900 dark:hover:text-yellow-300 hover:decoration-2 dark:hover:decoration-yellow-300 hover:underline hover:underline-offset-4 ${
                        navOpen ? "m-1 " : "my-1 mx-1"
                      } lg:m-0 lg:mx-1
                      hover:border-rose-900
                       dark:hover:border-yellow-300 lg:txt-sm `,
                      {
                        "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-900  decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ":
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
        )}
        <div className="flex flex-col lg:hidden">
          <div
            className={`${
              lusitana.className
            } flex flex-row h-8 md:h-7 items-center justify-start  p-2  text-md font-medium  hover:text-rose-900 dark:text-yellow-300 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ${
              navOpen ? "m-2 mx-1" : "mt-1 mb-2 mx-1"
            } lg:m-0 lg:mx-1
                  hover:border-rose-900
                   dark:hover:border-yellow-300 lg:txt-sm `}
          >
            <p className="block lg:txt-sm">More</p>
          </div>

          {/** More Links in drop down menu in mobile view */}
          {moreLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Tooltip
                key={link.name + link.href}
                content={link.name}
                placement="top"
                className="hidden md:block bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-950 border-rose-900 dark:border-yellow-300 border-[.2mm]"
              >
                <Link href={link.href}>
                  <div
                    className={clsx(
                      `${
                        lusitana.className
                      } flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  hover:text-rose-900 dark:hover:text-yellow-300 hover:decoration-2 dark:hover:decoration-yellow-300 hover:underline hover:underline-offset-4 ${
                        navOpen ? "m-1 " : "my-1 mx-1"
                      } lg:m-0 lg:mx-1
                      hover:border-rose-900
                       dark:hover:border-yellow-300 lg:txt-sm `,
                      {
                        "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-900  decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ":
                          pathname === link.href,
                      }
                    )}
                  >
                    <LinkIcon className="w-6 md:mr-4 mr-2 lg:hidden" />
                    <p className="block lg:txt-sm">{link.name}</p>
                  </div>
                </Link>
              </Tooltip>
            );
          })}
        </div>

        {/** Herer I make a container that you can toggle in large screens so we have a nav bar with main links and a button that tobggle a menu with rest of the lins */}
        <div className=" relative hidden lg:flex lg:flex-row w-full items-center mx-2">
          {/** This is the button that toggle the more menu in large screens */}
          <div
            className={`
           lg:items-center lg:justify-center  text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 lg:flex
          
          ${
            subNavOpen
              ? "rounded-3xl rotate-180 text-rose-700 dark:text-yellow-300 border-[.2mm] border-rose-900 dark:border-yellow-300 bg-rose-200 dark:bg-emerald-950"
              : "rotate-0 rounded-md border-0 bg-inherit dark:bg-inherit"
          } transition-all duration-1000 ease-in-out w-7 h-7 `}
            onClick={(event) => {
              event.stopPropagation();

              setSubNavOpen(!subNavOpen);
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

          {/** This is the container with more links in large view screens */}
          <div
            ref={subNavRef}
            className={`absolute bg-gray-100 dark:bg-emerald-800 w-[250px] md:w-[300px] md:h-auto justify-start z-50 transition-all duration-1000 ease-in-out lg:left-0 lg:overflow-scroll lg:bg-gray-100 lg:dark:bg-emerald-800  overflow-scroll border-[.2mm] border-rose-900 dark:border-yello text-sm md:text-base w-300  shadow-md shadow-black lg:z-[100]  ${
              subNavOpen
                ? "flex flex-col h-[400px] lg:h-[400px] opacity-100 left-0 lg:left-0 top-10 lg:top-10 p-2"
                : "h-0 lg:h-0 left-0 lg:left-0 top-10 lg:top-8 opacity-0 p-0"
            }`}
          >
            <div
              className={`${lusitana.className} flex flex-row h-7 items-center justify-end rounded-md bg-inherit p-1 text-md font-medium 
          dark:bg-inherit m-1 transition-all duration-1000 ease-in-out`}
            >
              <div
                className=" p-[1px] dark:hover:border-rose-600 dark:hover:text-rose-600 dark:hover:cursor-pointer h-6 w-6 justify-center items-center  hover:text-rose-600 hover:cursor-pointer transition-transform duration-1000 "
                onClick={() => {
                  setSubNavOpen(false);
                }}
              >
                <p className="text-lg">X</p>
              </div>
            </div>
            <div
              className={`${
                lusitana.className
              }  flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  text-rose-900 dark:text-yellow-300 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ${
                subNavOpen
                  ? "lg:mt-1 lg:mx-1 lg:mb-3"
                  : "lg:mt-2 lg:mb-4 lg:mx-1"
              } 
                      hover:border-rose-900
                       dark:hover:border-yellow-300 lg:txt-sm `}
            >
              <p className="block lg:txt-sm">More</p>
            </div>
            {moreLinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Tooltip
                  key={link.name + link.href}
                  content={link.name}
                  placement="top"
                  className="hidden md:block  rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-950 border-rose-900 dark:border-yellow-300 border-[.2mm]"
                >
                  <Link href={link.href}>
                    <div
                      className={clsx(
                        `${
                          lusitana.className
                        }  flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  hover:text-rose-900 dark:hover:text-yellow-300 hover:decoration-2 dark:hover:decoration-yellow-300 hover:underline hover:underline-offset-4 dark:hover:bg-emerald-900 ${
                          subNavOpen ? "lg:m-1 " : "lg:my-2 lg:mx-1"
                        } 
                      hover:border-rose-900
                       dark:hover:border-yellow-300 lg:txt-sm `,
                        {
                          "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-900  decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ":
                            pathname === link.href,
                        }
                      )}
                    >
                      <LinkIcon className="w-6 md:mr-4 mr-2" />
                      <p className="block lg:txt-sm">{link.name}</p>
                    </div>
                  </Link>
                </Tooltip>
              );
            })}
            {role === "admin" && (
              <>
                <div
                  className={`${
                    lusitana.className
                  }  flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  text-rose-900 dark:text-yellow-300 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ${
                    subNavOpen ? "lg:my-3 lg:mx-1 " : "lg:my-4 lg:mx-1"
                  } 
                      hover:border-rose-900
                       dark:hover:border-yellow-300 lg:txt-sm `}
                >
                  <p className="block lg:txt-sm">Admin</p>
                </div>
                {adminLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Tooltip
                      key={link.name + link.href}
                      content={link.name}
                      placement="top"
                      className="hidden md:block  rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-950 border-rose-900 dark:border-yellow-300 border-[.2mm]"
                    >
                      <Link href={link.href}>
                        <div
                          className={clsx(
                            `${
                              lusitana.className
                            }  flex flex-row h-8 md:h-7 items-center justify-start  p-2 md:p-2 text-md font-medium  hover:text-rose-900 dark:hover:text-yellow-300 hover:decoration-2 dark:hover:decoration-yellow-300 hover:underline hover:underline-offset-4 dark:hover:bg-emerald-900 ${
                              subNavOpen ? "lg:m-1 " : "lg:my-2 lg:mx-1"
                            } 
                      hover:border-rose-900
                       dark:hover:border-yellow-300 lg:txt-sm `,
                            {
                              "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-900  decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline underline-offset-4 ":
                                pathname === link.href,
                            }
                          )}
                        >
                          <WrenchScrewdriverIcon className="w-6 md:mr-4 mr-2" />
                          <p className="block lg:txt-sm">{link.name}</p>
                        </div>
                      </Link>
                    </Tooltip>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
