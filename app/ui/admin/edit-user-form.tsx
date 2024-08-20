"use client";
import Link from "next/link";
import {
  InformationCircleIcon,
  StopCircleIcon,
  UserIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { deleteUserSide, editUserSide } from "@/app/lib/client-actions";
import { useState } from "react";

export default function EditUserForm({ user }: any) {
  const { firstName, lastName, email, role, id, username } = user;

  const [roleState, setRoleState] = useState(role);
  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [emailState, setEmailState] = useState(email);
  const [usernameState, setUsernameState] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editUserSide({
      role: roleState,
      firstName: firstNameState,
      lastName: lastNameState,
      email: emailState,
      username: usernameState,
      id: id,
    });
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    await deleteUserSide(id);
  };
  return (
    <>
      <div className="relative my-5 bg-sky-200 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 dark:text-sky-300" />
        <div className="rounded-md border border-blue-300 py-2 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
          Verificati cu atentie detaliile!
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                id="lastName"
                name="lastName"
                onChange={(e) => setLastNameState(e.target.value)}
                onFocus={(e) => (e.target.value = lastNameState)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder={lastName ? lastName : "Numele..."}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Prenumele
            </label>
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                onChange={(e) => setFirstNameState(e.target.value)}
                onFocus={(e) => (e.target.value = firstNameState)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder={firstName ? firstName : "Prenumele..."}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
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
                onFocus={(e) => (e.target.value = emailState)}
                name="email"
                onChange={(e) => {
                  setEmailState(e.target.value);
                }}
                placeholder={email ? email : "Enter your email address"}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4">
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
                type="text"
                onFocus={(e) => (e.target.value = usernameState)}
                name="username"
                onChange={async (e) => {
                  setUsernameState(e.target.value);
                }}
                placeholder={username ? username : "Choose a username..."}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">Rolul</legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="user"
                    name="role"
                    onChange={(e) => setRoleState(e.target.value)}
                    type="radio"
                    value="user"
                    className="h-4 w-4 cursor-pointer border-emerald-100 dark:bg-gray-800 bg-gray-100 text-gray-600 focus:ring-2"
                  />

                  <label
                    htmlFor="user"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 dark:bg-stone-900 dark:text-white px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    User <StopCircleIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="admin"
                    name="role"
                    onChange={(e) => setRoleState(e.target.value)}
                    type="radio"
                    value="admin"
                    className="h-4 w-4 cursor-pointer border-emerald-100 dark:bg-gray-800 bg-gray-100 text-gray-600 focus:ring-2"
                  />

                  <label
                    htmlFor="admin"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-medium text-white dark:bg-emerald-800"
                  >
                    Admin <StopCircleIcon className="h-4 w-4" />
                  </label>
                </div>
                <input type="text" name="userIdF" value={id} readOnly hidden />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/experience"
            className="flex h-9 items-center rounded-lg bg-rose-500 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black"
          >
            Cancel
          </Link>
          <Button type="submit">Salveaza</Button>
        </div>
      </form>
      <div className="relative my-5 bg-red-300 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 text-black" />
        <div className="rounded-md border border-red-500 py-2 pl-10 text-md  dark:text-black outline-2 font-medium dark:bg-red-300 dark:border-red-400">
          Daca stergeti toate datele se vor sterge inclusiv Experientele si
          Calificarile deja salvate!
        </div>
      </div>
      <form
        onSubmit={(e) => {
          handleDelete(e);
        }}
      >
        <input type="text" name="userId" readOnly hidden value={id} />
        <button
          type="submit"
          className="flex h-9 items-center justify-end rounded-lg bg-rose-100 px-3 text-sm font-medium text-gray-800 transition-colors dark:bg-emerald-300 hover:bg-rose-300 dark:hover:bg-rose-300"
        >
          Sterge User
        </button>
      </form>
    </>
  );
}
