"use client";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./Button";
import clsx from "clsx";
import { Spinner } from "@nextui-org/spinner";

import {
  registerFunction,
  checkUsernameLive,
  checkEmailLive,
} from "../lib/client-actions";
import { useState } from "react";
import { getUserLocation } from "../lib/client-actions";
export default function RegisterForm() {
  const location = getUserLocation();

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
      if (!response) {
        setIsLoading(false);
      }
      if (response) {
        if (response === "Password must contain at least 8 characters!") {
          setIsLoading(false);
          setErrorClassPassword(true);
        }
        if (response === "Passwords do not match!") {
          setIsLoading(false);
          setErrorClassPassword(true);
        }
      }
    } catch (err: any) {
      //console.log(err);
    }
  };

  if (location !== "Bucharest") {
    return (
      <>
        <form
          onSubmit={async (e) => {
            await handleSubmit(e);
          }}
          className="space-y-3"
        >
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 dark:bg-gray-800 ">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Sign up here!
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
                      if (emailElement) {
                        emailElement.style.border = "solid 1px gray";
                      }
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
                      const usernameElement =
                        document.getElementById("username");
                      setUsername(e.target.value);
                      if (usernameElement) {
                        setErrorClassUsername(false);
                        usernameElement.style.border = "solid 1px gray";
                      }
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
                          if (usernameElement) {
                            usernameElement.style.border = "solid 2px red";
                          }
                        } else if (verifyUsername === "not valid entry") {
                          setErrorClassUsername(true);
                          if (usernameElement) {
                            usernameElement.style.border = "solid 2px red";
                          }
                        } else {
                          setErrorClassUsername(false);
                          if (usernameElement) {
                            usernameElement.style.border = "solid 1px gray";
                          }
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
                      const passwordElement =
                        document.getElementById("password");
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
              <div className="mt-4 text-center">
                <p>
                  By signing up you agree to our <br />
                  <Link
                    href="/terms"
                    target="_blank"
                    className=" ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-300 hover:text-blue-400"
                  >
                    Terms of Service and Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            <Button
              className={clsx("mt-4 w-full ", {
                "mt-4 w-full  cursor-wait loadingSpinner disabled aria-disabled":
                  isloading === true,
              })}
              disabled={isloading}
            >
              {isloading ? "" : "Sign Up"}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
            </Button>
            <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
              Already have an account?
              <Link
                href="/login"
                className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
        {isloading && (
          <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
            <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-12 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
              <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
              Please wait...
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
        className="space-y-3"
      >
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 dark:bg-gray-800 ">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Inregistrativa aici!
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
                    if (emailElement) {
                      emailElement.style.border = "solid 1px gray";
                    }
                  }}
                  placeholder="Adresa de email..."
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
                    if (usernameElement) {
                      setErrorClassUsername(false);
                      usernameElement.style.border = "solid 1px gray";
                    }
                  }}
                  placeholder="Alegeti un username..."
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
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
                  placeholder="Alegeti o parola..."
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
                        if (usernameElement) {
                          usernameElement.style.border = "solid 2px red";
                        }
                      } else if (verifyUsername === "not valid entry") {
                        setErrorClassUsername(true);
                        if (usernameElement) {
                          usernameElement.style.border = "solid 2px red";
                        }
                      } else {
                        setErrorClassUsername(false);
                        if (usernameElement) {
                          usernameElement.style.border = "solid 1px gray";
                        }
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
                Confirmati Parola
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
                  placeholder="Reintroduceti parola..."
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
            <div className="mt-4 text-center">
              <p>
                Apasand butonul de mai jos declarati ca sunteti de acord cu:{" "}
                <br />
                <Link
                  href="/terms-romanian"
                  target="_blank"
                  className=" ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-300 hover:text-blue-400"
                >
                  Termenii de Servicii si Politica de confidentialitate!
                </Link>
              </p>
            </div>
          </div>
          <Button
            className={clsx("mt-4 w-full ", {
              "mt-4 w-full  cursor-wait loadingSpinner disabled aria-disabled":
                isloading === true,
            })}
            disabled={isloading}
          >
            {isloading ? "Asteptati..." : "Inregistrati-va"}
            <ArrowRightIcon className="ml-auto h-5 w-5 text-black dark:text-white dark:hover:text-rose-500 hover:text-blue-700 hover:h-7 hover:w-7" />
          </Button>
          <p className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
            Aveti deja cont?
            <Link
              href="/login"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
            >
              Autentificativa
            </Link>
          </p>
        </div>
      </form>
      {isloading && (
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
