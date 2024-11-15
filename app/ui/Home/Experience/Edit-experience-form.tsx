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
import { Button } from "../../Global/Button";
import { editDataUserSide } from "@/app/lib/client-actions";

export default function EditExperienceForm({ id }: any) {
  const { exprienceId } = id;
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [position, setPosition] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [description, setDescription] = useState("");
  const [working_now, setWorking_now] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editDataUserSide({
      editExperience: "true",
      position: position,
      company: company,
      city: city,
      start_date: start_date,
      end_date: end_date,
      description: description,
      working_now: working_now,
      updated_at: new Date(Date.now()),
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
              Company
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
              htmlFor="city"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              City
            </label>
            <div className="relative">
              <input
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="City..."
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="position"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Postul Ocupat
            </label>
            <div className="relative">
              <input
                id="position"
                name="position"
                onChange={(e) => setPosition(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Position..."
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="start_date"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Start date
            </label>
            <div className="mb-2 block text-sm font-medium dark:text-white">
              <div className="relative">
                <input
                  id="start_date"
                  name="start_date"
                  onChange={(e) => setStart_date(e.target.value)}
                  type="date"
                  min={new Date("1975-01-01").toISOString().split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                />
                <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="end_date"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              End date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="end_date"
                  name="end_date"
                  onChange={(e) => setEnd_date(e.target.value)}
                  type="date"
                  min={new Date("1975-01-01").toISOString().split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
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
              <DocumentCheckIcon className="pointer-events-none absolute left-3 top-[20px] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Still working here?
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="pending"
                    name="status"
                    type="radio"
                    onChange={(e) => setWorking_now(e.target.value)}
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
                  id="user_id"
                  name="user_id"
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
                    onChange={(e) => setWorking_now(e.target.value)}
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
