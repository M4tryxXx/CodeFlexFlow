"use client"; // This is a client-side file

import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  DocumentCheckIcon,
  IdentificationIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../Button";
import { useState } from "react";
import { addDataUserSide } from "@/app/lib/client-actions";
import "../css/loadingSpinner.css";

export default function QualificationForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [qualification, setQualification] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDataUserSide({
        name: name,
        city: city,
        qualification: qualification,
        from: from,
        to: to,
        description: description,
        userId: id,
      });
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="relative my-5 bg-sky-100 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 dark:text-sky-300" />
        <div className="rounded-md border border-blue-300 py-2 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
          Introduceti datele cu atentie!
        </div>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele institutiei
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Scoala..."
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Localitatea
            </label>
            <div className="relative">
              <input
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                required
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white "
                placeholder="Localitatea..."
              />
              <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="qualification"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Profilul
            </label>
            <div className="relative">
              <input
                id="qualification"
                onChange={(e) => setQualification(e.target.value)}
                required
                name="qualification"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Specializarea..."
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="from"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              De la
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="from"
                  name="from"
                  onChange={(e) => setFrom(e.target.value)}
                  required
                  type="date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                />
                <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="to"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Pana la
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="to"
                  name="to"
                  onChange={(e) => setTo(e.target.value)}
                  type="date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                />
                <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Detalii
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Descriere activitati si aptitudini..."
              />
              <DocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
        </div>
        <input type="text" name="userId" value={id} readOnly hidden />
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/home/dashboard/qualification"
            className="flex h-9 items-center rounded-lg bg-rose-500 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black"
          >
            Cancel
          </Link>
          <Button type="submit">Salveaza</Button>
        </div>
      </form>
      {isLoading && (
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
