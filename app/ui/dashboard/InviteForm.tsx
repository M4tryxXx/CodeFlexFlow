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
import { sendPasswordChangeLink, sendInvitationLink } from "../../lib/actions";
import { checkUserEmail } from "../../lib/client-actions";
import toast from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import "../../ui/css/loadingLogin.css";

export default function InvitationForm({ user }: any) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const destinationEmail = verifyEmailSchema.safeParse({ email: email });
    if (!destinationEmail.success) {
      let errorMessage = "";
      destinationEmail.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      setLoading(false);
      return;
    }
    const response = await sendInvitationLink(user, email);
    if (response === "Something went wrong") {
      toast.error("Something went wrong");
    }
    toast.success("Invitation successfully sent!");
    setEmail("");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
        </div>
        <Button
          className={clsx("mt-4 w-full ", {
            "mt-4 w-full  cursor-wait loadingLogin disabled ": loading === true,
          })}
          onClick={async (e) => {
            await handleSubmit(e);
          }}
        >
          {loading ? "Loading ..." : "Send reset link"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
        </Button>
        <div className="flex flex-row justify-center items-center mt-5">
          <InformationCircleIcon className=" text-lg mr-5 pointer-events-none h-[25px] w-[25px] dark:text-blue-300 dark:peer-focus:text-white text-blue-700" />
          Invitation is valid for 7 days!
        </div>
      </div>
    </form>
  );
}