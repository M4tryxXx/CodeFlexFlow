"use client";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui/button";
import clsx from "clsx";
import { Spinner } from "@nextui-org/spinner";

import {
  registerFunction,
  checkUsernameLive,
  checkEmailLive,
} from "../lib/client-actions";
import { useState } from "react";
import { set } from "zod";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorClassEmail, setErrorClassEmail] = useState(false);
  const [errorClassUsername, setErrorClassUsername] = useState(false);
  const [errorClassPassword, setErrorClassPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await registerFunction({
        username: username,
        password: password,
        email: email,
        confirmPassword: confirmPassword,
      });
      if (response) {
        if (response === "Password must contain at least 8 characters!") {
          setErrorClassPassword(true);
        }
        if (response === "Passwords do not match!") {
          setErrorClassPassword(true);
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        await handleSubmit(e);
      }}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 dark:bg-gray-800 ">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Inregistrativa aici!.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white",
                  {
                    "peer block w-full rounded-md border py-[9px] pl-10 text-md outline-2 placeholder:text-gray-200 dark:bg-red-300 dark:bg-opacity-40 dark:text-black dark:peer-focus:text-white dark:border-red-700 dark:border-double border-3 dark:placeholder-white":
                      errorClassEmail === true,
                  }
                )}
                id="email"
                type="text"
                name="email"
                onChange={(e) => {
                  const emailElement = document.getElementById("email");
                  setEmail(e.target.value);
                  setErrorClassEmail(false);
                }}
                placeholder="Enter your email address"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white",
                  {
                    "peer block w-full rounded-md border py-[9px] pl-10 text-md outline-2 placeholder:text-gray-200 dark:bg-red-300 dark:bg-opacity-25 dark:text-black dark:peer-focus:text-white dark:border-red-700 dark:border-double border-3 dark:placeholder-white":
                      errorClassUsername === true,
                  }
                )}
                id="username"
                type="text"
                name="username"
                onFocus={async (e) => {
                  const emailElement = document.getElementById(
                    "email"
                  ) as HTMLInputElement;
                  if (emailElement) {
                    const verifyEmail = await checkEmailLive(
                      emailElement.value
                    );
                    if (verifyEmail === true) {
                      setErrorClassEmail(true);
                    } else if (verifyEmail === "not valid entry") {
                      setErrorClassEmail(true);
                    } else {
                      setErrorClassEmail(false);
                    }
                  }
                }}
                onChange={async (e) => {
                  const usernameElement = document.getElementById("username");
                  setUsername(e.target.value);
                }}
                placeholder="Choose a username..."
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
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
                className={clsx(
                  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white",
                  {
                    "peer block w-full rounded-md border py-[9px] pl-10 text-md outline-2 placeholder:text-gray-200 dark:bg-red-300 dark:bg-opacity-25 dark:text-black dark:peer-focus:text-white dark:border-red-700 dark:border-double border-3 dark:placeholder-white":
                      errorClassPassword === true,
                  }
                )}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                onFocus={async (e) => {
                  const usernameElement = document.getElementById(
                    "username"
                  ) as HTMLInputElement;
                  if (usernameElement) {
                    const verifyUsername = await checkUsernameLive(
                      usernameElement.value
                    );
                    if (verifyUsername === true) {
                      setErrorClassUsername(true);
                    } else if (verifyUsername === "not valid entry") {
                      setErrorClassUsername(true);
                    } else {
                      setErrorClassUsername(false);
                    }
                  }
                }}
                onChange={(e) => {
                  const passwordElement = document.getElementById(
                    "password"
                  ) as HTMLInputElement;
                  setPassword(e.target.value);
                  const passwordElement2 = document.getElementById(
                    "password2"
                  ) as HTMLInputElement;
                  if (passwordElement && passwordElement2) {
                    setErrorClassPassword(false);
                    setConfirmPassword("");
                    if (passwordElement.value.length < 8) {
                      passwordElement2.value = "";
                    }
                    passwordElement.style.border = "solid 1px gray";
                    passwordElement2.style.border = "solid 1px gray";
                  }
                }}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="password2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={clsx(
                  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white",
                  {
                    "peer block w-full rounded-md border py-[9px] pl-10 text-md outline-2 placeholder:text-gray-200 dark:bg-red-300 dark:bg-opacity-25 dark:text-black dark:peer-focus:text-white dark:border-red-700 dark:border-double border-3 dark:placeholder-white":
                      errorClassPassword === true,
                  }
                )}
                id="password2"
                type="password"
                name="password2"
                placeholder="Confirm password"
                onChange={(e) => {
                  const passwordElement = document.getElementById("password");
                  const confirmPasswordElement =
                    document.getElementById("password2");
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordElement && passwordElement) {
                    passwordElement.style.border = "solid 1px gray";
                    confirmPasswordElement.style.border = "solid 1px gray";
                  }
                }}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
        </div>
        <Button
          className={clsx("mt-4 w-full ", {
            "mt-4 w-full  cursor-wait loadingLogin disabled aria-disabled":
              isloading === true,
          })}
          disabled={isloading}
        >
          {isloading ? "Loading..." : "Inregistreazate"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
          already have an account?
          <Link
            href="/login"
            className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
