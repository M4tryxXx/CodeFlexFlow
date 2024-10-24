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
  MapIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../Global/Button";
import { editDataUserSide } from "@/app/lib/client-actions";
import { set } from "zod";

export default function EditQualificationForm({ id, data }: any) {
  
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editDataUserSide({
      editQualification: "true",
      degree: degree,
      school: school,
      city: city,
      field: field,
      start_date: new Date(from),
      end_date: new Date(to),
      description: description,
      id: id,
      updated_at: new Date(Date.now()),
    });
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
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
          <div className="mb-4">
            <label
              htmlFor="degree"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Qualification
            </label>
            <div className="relative">
              <input
                id="degree"
                onChange={(e) => setDegree(e.target.value)}
                onFocus={(e) => {
                  if (data){ 
                  e.target.value = data.degree;
                  setDegree(data.degree);
                  }
                }}
                name="degree"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
                placeholder={data ? data.degree : "Qualification..."}
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="from"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Start date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="from"
                  name="from"
                  onChange={(e) => setFrom(e.target.value)}
                  onFocus={(e) => {
                    if (data) {
                      e.target.value = data.start_date;
                      setFrom(data.start_date);
                    }
                  }}
                  type="date"
                  min={new Date("1975-01-01").toISOString().split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
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
              End date
            </label>
            <div className="relative">
              <input
                id="to"
                name="to"
                onChange={(e) => setTo(e.target.value)}
                onFocus={(e) => {
                  if (data) {
                    e.target.value = data.end_date;
                    setTo(data.end_date);
                  }
                }}
                type="date"
                min={new Date("1975-01-01").toISOString().split("T")[0]}
                max={new Date().toISOString().split("T")[0]}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="school"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              School
            </label>
            <div className="relative">
              <input
                id="school"
                name="school"
                onChange={(e) => setSchool(e.target.value)}
                onFocus={(e) => {
                  if (data) {
                    e.target.value = data.school;
                    setSchool(data.school);
                  }
                }}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
                placeholder={data ? data.school : "School..."}
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="field"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Profil
            </label>
            <div className="relative">
              <input
                id="field"
                onChange={(e) => setField(e.target.value)}
                onFocus={(e) => {
                  if (data) {
                    e.target.value = data.field;
                    setField(data.field);
                  }
                }}
                name="field"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
                placeholder={data ? data.field : "Field..."}
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
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
                onFocus={(e) => {
                  if (data) {
                    e.target.value = data.city;
                    setCity(data.city);
                  }
                }}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
                placeholder={data ? data.city : "City..."}
              />
              <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
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
                onFocus={(e) => {
                  if (data) {
                    e.target.value = data.description;
                    setDescription(data.description);
                  }
                }}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-gray"
                placeholder={data ? data.description : "Describe what have you learned..."}
              />
              <DocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            </div>
          </div>
        </div>
        <input type="text" name="user_id" value={id} readOnly hidden />
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
    </>
  );
}
