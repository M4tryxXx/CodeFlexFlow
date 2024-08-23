"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Button } from "../../ui/Button";
import { lusitana } from "../../ui/fonts";
import {
  AtSymbolIcon,
  InformationCircleIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { verifyEmailSchema } from "../../lib/zod-schemas";
import { sendPasswordChangeLink } from "../../lib/actions";
import { checkUserEmail } from "../../lib/client-actions";
import toast from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import "../../ui/css/loadingLogin.css";

export default function InvitationForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const email = verifyEmailSchema.safeParse({ email: e.target.email.value });
    if (!email.success) {
      let errorMessage = "";
      email.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    const response = await checkUserEmail(email.data.email);

    if (!response) {
      setLoading(false);
      toast.error("User not found!");
      return;
    }

    const responseEmail = await sendPasswordChangeLink(email.data.email);
    if (responseEmail === "Something went wrong") {
      setLoading(false);
      toast.error("Something went wrong!");
      return;
    }
    if (responseEmail === "User not found!") {
      setLoading(false);
      toast.error("User not found!");
      return;
    }

    toast.success(
      "Email sent successfully! Please check your email for the reset link \n The link will expire after 30 minutes \n If you don't receive the email please check your spam folder!",
      { duration: 8000 }
    );
    setLoading(false);
  };
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(e);
      }}
    >
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Send Invitation With Your CV
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                id="email"
                type="text"
                name="email"
                placeholder="Destination email..."
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
        </div>
        <Button
          className={clsx("mt-4 w-full ", {
            "mt-4 w-full  cursor-wait loadingLogin disabled ": loading === true,
          })}
        >
          {loading ? "Loading ..." : "Send reset link"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
        </Button>
        <div className="flex flex-row justify-center items-center">
          <InformationCircleIcon className=" text-lg mr-5 pointer-events-none h-[45px] w-[45px] dark:text-blue-300 dark:peer-focus:text-white text-blue-700" />
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-300">
            Invitation is valid for 7 days!
          </p>
        </div>
      </div>
    </form>
  );
}
