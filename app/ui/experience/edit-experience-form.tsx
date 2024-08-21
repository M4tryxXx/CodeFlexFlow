"use client";
import Link from "next/link";
import { useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  DocumentCheckIcon,
  IdentificationIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { editDataUserSide } from "@/app/lib/client-actions";
import { editQualification } from "@/app/lib/actions";

export default function EditExperienceForm({ id }: any) {
  const { exprienceId } = id;
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editDataUserSide({
      editExperience: "true",
      title: title,
      company: company,
      from: from,
      to: to,
      description: description,
      stillWorking: status,
      id: id,
    });
  };
  return (
    <>
      <div className="relative my-5 bg-sky-200 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
        <div className="rounded-md border border-blue-400 py-2 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
          Introduceti cat mai multe detalii!
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
          {/* Customer Name */}
          <div className="mb-4">
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele Companiei
            </label>
            <div className="relative">
              <input
                id="company"
                name="company"
                onChange={(e) => setCompany(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Compania..."
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Postul Ocupat
            </label>
            <div className="relative">
              <input
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Postul Ocupat..."
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
            <div className="mb-2 block text-sm font-medium dark:text-white">
              <div className="relative">
                <input
                  id="from"
                  name="from"
                  onChange={(e) => setFrom(e.target.value)}
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
              Descrierea Postului
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

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Inca mai lucrezi aici?
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="pending"
                    name="status"
                    type="radio"
                    onChange={(e) => setStatus(e.target.value)}
                    value="true"
                    className="h-4 w-4 cursor-pointer border-emerald-100 dark:bg-gray-800 bg-gray-100 text-gray-600 focus:ring-2"
                  />

                  <label
                    htmlFor="pending"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 dark:bg-stone-900 dark:text-white px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Inca lucrez <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  value={exprienceId}
                  readOnly
                  hidden
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <div className="flex items-center">
                  <input
                    id="no"
                    name="status"
                    type="radio"
                    onChange={(e) => setStatus(e.target.value)}
                    value="no"
                    className="h-4 w-4 cursor-pointer border-emerald-100 dark:bg-gray-800 bg-gray-100 text-gray-600 focus:ring-2"
                  />

                  <label
                    htmlFor="no"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-medium text-white dark:bg-emerald-800"
                  >
                    Nu mai lucrez <StopCircleIcon className="h-4 w-4" />
                  </label>
                </div>
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
          <Button type="submit">Salveaza Experienta</Button>
        </div>
      </form>
    </>
  );
}
