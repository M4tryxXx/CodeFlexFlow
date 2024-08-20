"use client";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui/button";
import clsx from "clsx";
import { Spinner } from "@nextui-org/spinner";
import { updatePassword } from "../lib/client-actions";

import {
  registerFunction,
  checkUsernameLive,
  checkEmailLive,
} from "../lib/client-actions";
import { useState } from "react";
import { set } from "zod";

export default function PasswordResetForm({ userId }: any) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorClassPassword, setErrorClassPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await updatePassword({
      id: userId,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (response) {
      setIsLoading(false);
    }
    setIsLoading(false);
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
          Introduceti noua parola!
        </h1>
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="password"
            >
              New Password
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
                placeholder="Enter new password"
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
          {isloading ? "Loading..." : "Update Password"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
          Remember Password?
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
