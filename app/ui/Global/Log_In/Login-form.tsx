"use client";

import { lusitana } from "@/app/ui/fonts";
import toast from "react-hot-toast";
import clsx from "clsx";
import { KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../Button";
import Link from "next/link";
import { loginUserSide } from "../../../lib/client-actions";
import { useState, useEffect } from "react";
import "../../css/global.css";

export default function LoginForm() {
  const location = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginFrom = location;

  const loginFunction = async (username: string, password: string) => {
    setLoading(true);
    let user: any;
    const passwordElement = document.getElementById("password");
    const usernameElement = document.getElementById("username");
    if (username.length < 1) {
      if (usernameElement) {
        usernameElement.style.border = "solid 2px red";
      }
      toast.error("Username must not be empty!");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      if (passwordElement) {
        passwordElement.style.border = "solid 2px red";
      }
      toast.error("Password must be at least 8 caharacters long!");
      (usernameElement as HTMLInputElement).value = username;
      setLoading(false);
      return;
    }
    try {
      await loginUserSide(username, password, loginFrom);
    } catch (err: any) {
      switch (err) {
        case "Username not found!":
          if (usernameElement) {
            usernameElement.style.border = "solid 2px red";
          }
          toast.error(err);
          setLoading(false);
          break;
        case "Wrong password!":
          if (passwordElement) {
            passwordElement.style.border = "solid 2px red";
            (passwordElement as HTMLInputElement).value = "";
          }
          setLoading(false);
          toast.error(err);
          break;
      }
      return { err };
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await loginFunction(username, password);
  };

  if (location !== "Bucharest") {
    return (
      <>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            await handleSubmit(e);
          }}
        >
          <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Please log in to continue.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                    id="username"
                    onChange={(e) => {
                      setUsername(e.target.value);

                      const usernameElement =
                        document.getElementById("username");

                      if (usernameElement) {
                        usernameElement.style.border = "solid 1px gray";
                      }
                    }}
                    type="text"
                    name="username"
                    placeholder="Enter username"
                  />
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      const passwordElement =
                        document.getElementById("password");
                      setPassword(e.target.value);
                      if (passwordElement) {
                        passwordElement.style.border = "solid 1px gray";
                      }
                    }}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
                </div>
              </div>
            </div>
            <Button
              className={clsx("mt-4 w-full ", {
                "mt-4 w-full  cursor-wait loading_state disabled ":
                  loading === true,
              })}
            >
              {loading ? "Loading..." : "Log in"}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
            </Button>
            <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
              Don't have an account?
              <Link
                href="/register"
                className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
              >
                Sign up
              </Link>
            </p>
            <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
              Forgot password?
              <Link
                href="/reset-password"
                className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
              >
                Click Here!
              </Link>
            </p>
          </div>
        </form>
        {loading && (
          <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
            <div className="fixed left-[25%] top-1/2 w-[50%] flex items-center justify-center">
              <div
                className={`bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg  md:h-16 h-12 w-[200px] md:w-[250px] rounded-lg flex flex-row justify-center items-center `}
              >
                <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
                Loading...
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Autentificativa
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);

                    const usernameElement = document.getElementById("username");

                    if (usernameElement) {
                      usernameElement.style.border = "solid 1px gray";
                    }
                  }}
                  type="text"
                  name="username"
                  placeholder="Introduceti username..."
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                htmlFor="password"
              >
                Parola
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Introduceti Parola..."
                  onChange={(e) => {
                    const passwordElement = document.getElementById("password");
                    setPassword(e.target.value);
                    if (passwordElement) {
                      passwordElement.style.border = "solid 1px gray";
                    }
                  }}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
          </div>
          <Button
            className={clsx("mt-4 w-full ", {
              "mt-4 w-full  cursor-wait loading_state disabled ":
                loading === true,
            })}
          >
            {loading ? "Asteptati..." : "Autentificare"}
            <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
          </Button>
          <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
            Nu aveti cont?
            <Link
              href="/register"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
            >
              Inregistrativa!
            </Link>
          </p>
          <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
            Ati uitat parola sau username-ul?
            <Link
              href="/reset-password"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
            >
              Click aici!
            </Link>
          </p>
        </div>
      </form>
      {loading && (
        <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
          <div className="fixed left-[25%] top-1/2 w-[50%] flex items-center justify-center">
            <div
              className={`bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg  md:h-16 h-12 w-[200px] md:w-[250px] rounded-lg flex flex-row justify-center items-center `}
            >
              <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
              Se încarcă...
            </div>
          </div>
        </div>
      )}
    </>
  );
}
