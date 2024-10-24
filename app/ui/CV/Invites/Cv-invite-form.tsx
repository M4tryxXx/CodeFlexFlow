"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "../../fonts";
import { InformationCircleIcon, GiftIcon } from "@heroicons/react/24/outline";
import { verifyInvitationSchema } from "../../../lib/zod-schemas";
import toast from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import "../../css/global.css";
import Link from "next/link";

export default function CvInvitationForm() {
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState("CV-");
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const invitation = verifyInvitationSchema.safeParse({
      Invitation: e.target.email.value,
    });
    if (!invitation.success) {
      let errorMessage = "";
      invitation.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      setLoading(false);
      return;
    }
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
          Enter Invitation Code
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="invitation"
            >
              Invitation
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                id="invitation"
                type="text"
                name="invitation"
                placeholder="Invitation Code..."
                onChange={(e) => {
                  setInvitation(e.target.value);
                }}
                onFocus={(e) => {
                  e.target.value = invitation;
                }}
              />
              <GiftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
        </div>
        <Link
          href={`/cv/${invitation}`}
          className={clsx(
            "mt-4 w-full flex h-9 items-center rounded-lg bg-rose-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-black dark:text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black",
            {
              "mt-4 w-full  cursor-wait loading_state disabled ":
                loading === true,
            }
          )}
        >
          {loading ? "Loading ..." : "Go to CV"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
        </Link>
        <div className="flex flex-row justify-center items-center">
          <InformationCircleIcon className=" mr-3 pointer-events-none h-[25px] w-[25px] m-auto dark:peer-focus:text-white dark:text-blue-300 text-blue-700" />
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-300">
            Invitation Code must be 8 characters long starting with"CV-"!
          </p>
        </div>
      </div>
    </form>
  );
}
