"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../Button";
import { lusitana } from "../../fonts";
import {
  AtSymbolIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { verifyEmailSchema } from "../../../lib/zod-schemas";
import { sendPasswordChangeLink } from "../../../lib/actions";
import { checkUserEmail, getUserLocation } from "../../../lib/client-actions";
import toast from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import "../../css/global.css";

export default function ResetPasswordForm() {
  const userLocation = getUserLocation();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = verifyEmailSchema.safeParse({ email: e.target.email.value });
    if (!email.success) {
      let errorMessage = "";
      email.error.errors.forEach((issue) => {
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
    toast.success(
      "Email sent successfully! Please check your email for the reset link \n The link will expire after 30 minutes \n If you don't receive the email please check your spam folder!",
      { duration: 8000 }
    );

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

    setLoading(false);
  };

  if (userLocation !== "Bucharest") {
    return (
      <>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(e);
          }}
        >
          <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Enter your Email.
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
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Your email..."
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
                </div>
              </div>
            </div>
            <Button
              className={clsx("mt-4 w-full ", {
                "mt-4 w-full  cursor-wait loading_state disabled ":
                  loading === true,
              })}
            >
              {loading ? "Loading ..." : "Send reset link"}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
            </Button>
            <div className="flex flex-row justify-center items-center mt-4">
              <InformationCircleIcon className=" text-lg mr-5 pointer-events-none h-[45px] w-[45px] dark:text-blue-300 dark:peer-focus:text-white text-blue-700" />
              <p className="text-xs text-gray-500 dark:text-gray-300">
                If an account with the email provided exists you will receive an
                email with a link where you can reset your password!
              </p>
            </div>
          </div>
        </form>
        {loading && (
          <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
            <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-12 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
              <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
              Loading...
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
          e.preventDefault();
          await handleSubmit(e);
        }}
      >
        <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-800 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Adresa dvs de email
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
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Adresa de email..."
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
          </div>
          <Button
            className={clsx("mt-4 w-full ", {
              "mt-4 w-full  cursor-wait loading_state disabled ":
                loading === true,
            })}
          >
            {loading ? "Asteptati ..." : "Trimite link-ul de resetare"}
            <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
          </Button>
          <div className="flex flex-row justify-center items-center mt-4">
            <InformationCircleIcon className=" text-lg mr-5 pointer-events-none h-[45px] w-[45px] dark:text-blue-300 dark:peer-focus:text-white text-blue-700" />
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Daca un cont cu adresa de email furnizata exista, veti primi un
              email cu un link unde va puteti reseta parola!
            </p>
          </div>
        </div>
      </form>
      {loading && (
        <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
          <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-14 w-[50%] md:w-[35%] lg:w-[25%] lg:left-[37.5%] rounded-lg flex flex-row justify-center items-center fixed md:left-[35%] left-[25%] top-1/2">
            <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
            Vă rugăm asteptați...
          </div>
        </div>
      )}
    </>
  );
}
