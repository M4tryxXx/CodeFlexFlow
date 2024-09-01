"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Button } from "../../ui/Button";
import { lusitana } from "../../ui/fonts";
import { Input } from "@nextui-org/input";
import {
  AtSymbolIcon,
  InformationCircleIcon,
  GiftIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { verifyEmailSchema } from "../../lib/zod-schemas";
import { sendInvitationLink } from "../../lib/actions";
import toast from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import "../../ui/css/loadingSpinner.css";

const shareData = {
  title: "MDN",
  text: "Learn web development on MDN!",
  url: "https://developer.mozilla.org",
};

export default function InvitationForm({ user }: any) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [invitationInfo, setInvitationInfo] = useState("");

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    const destination_email = verifyEmailSchema.safeParse({ email: email });
    if (!destination_email.success) {
      let errorMessage = "";
      destination_email.error.errors.forEach((issue: any) => {
        errorMessage =
          errorMessage + `The Field '${issue.path[0]}' is ${issue.message}`;
      });
      toast.error(errorMessage);
      setLoading(false);
      return;
    }
    const response = await sendInvitationLink(user, email, name);
    if (response === "Something went wrong") {
      toast.error("Something went wrong");
      setLoading(false);
      return;
    }
    setInvitationInfo(
      "Your CV has been successfully sent, track it from the dashboard"
    );
    toast.success("Invitation successfully sent!");
    setEmail("");
    setName("");
    setLoading(false);
  };
  return (
    <>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(e);
        }}
      >
        <div className="flex-1  px-6 pb-4 pt-8 max-w-[480px]">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
            Send Your CV
          </h3>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Company Email Address
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Destination email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                htmlFor="name"
              >
                Company Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Destination Name..."
                  value={name}
                  min={3}
                  onChange={(e) => setName(e.target.value)}
                />
                <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
          </div>
          <Button
            className={clsx("mt-4 w-full ", {
              "mt-4 w-full  cursor-wait loadingSpinner disabled ":
                loading === true,
            })}
            onClick={async (e) => {
              await handleSubmit(e);
            }}
          >
            {loading ? "Loading ..." : "Send Invitation link"}
            <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
          </Button>
          <div className="flex flex-row justify-center items-center mt-5">
            <InformationCircleIcon className=" text-lg mr-5 pointer-events-none h-[25px] w-[25px] dark:text-blue-300 dark:peer-focus:text-white text-blue-700" />
            Invitation is valid for 7 days!
          </div>
          {invitationInfo && (
            <div className="flex gap-2 flex-row items-center justify-start mt-5 border-solid border-2 rounded-md py-2 px-3 border-green-700 ">
              <CheckCircleIcon className=" mr-2 text-lg pointer-events-none md:h-[35px] md:w-[35px] h-[45px] w-[45px] dark:text-green-500 dark:peer-focus:text-white text-blue-700" />
              <div>{invitationInfo}</div>
              <button
                onClick={() => setInvitationInfo("")}
                className=" p-2 rounded-md bg-rose-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 text-sm font-medium text-black dark:text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </form>

      {loading && (
        <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
          <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-12 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
            <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
          </div>
        </div>
      )}
      <p>
        <button
          onClick={async () => {
            const shareData = {
              title: "MDN",
              text: "Learn web development on MDN!",
              url: "https://developer.mozilla.org",
            };
            const resultPara = document.querySelector(".result");

            try {
              if (!navigator.share) {
                if (resultPara) {
                  resultPara.textContent =
                    "You need to use a browser that supports the Web Share API";
                }
                return;
              }
              await navigator.share(shareData);
              if (resultPara) {
                resultPara.textContent = "MDN shared successfully";
              }
            } catch (err) {
              if (resultPara) {
                resultPara.textContent = `Error: ${err}`;
              }
            }
          }}
        >
          Share MDN!
        </button>
      </p>
      <p className="result"></p>
    </>
  );
}

// Share must be triggered by "user activation"
