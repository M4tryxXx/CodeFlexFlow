"use client";

import Link from "next/link";
import { useState } from "react";
import { EditIcon } from "../../../Admin/Table/EditIcon";
import { avatar, Tooltip } from "@nextui-org/react";
import { formatDateToLocal } from "@/app/lib/utils";
import ProfileAccountTable from "./ProfileAccountTable";
import PersonalInfoTable from "./PersonalInfoTable";

export default function ProfileTable({ user }: any) {
  let experiencesArr = [];
  let qualificationsArr = [];
  let skillsArr = [];
  let settingsArr = [];
  let notificationsArr = [];
  let socialMediaArr = [];
  let invitesArr = [];
  let a = 0;
  let unorderedList: React.ReactNode[] = [];

  if (user) {
    let tempList = [];

    for (let [key, value] of Object.entries(user.experiences)) {
      if (key === "id" || key === "user_id") {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      experiencesArr.push(
        <tr
          key={key + "experiences"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }

    for (let [key, value] of Object.entries(user.qualifications)) {
      if (key === "id" || key === "user_id") {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      qualificationsArr.push(
        <tr
          key={key + "qualifications"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }

    for (let [key, value] of Object.entries(user.skills)) {
      if (key === "id" || key === "user_id") {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      skillsArr.push(
        <tr
          key={key + "skills"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }

    for (let [key, value] of Object.entries(user.settings)) {
      if (key === "id" || key === "user_id") {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      settingsArr.push(
        <tr
          key={key + "settings"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }

    for (let [key, value] of Object.entries(user.notifications)) {
      if (key === "id" || key === "user_id") {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      notificationsArr.push(
        <tr
          key={key + "notifications"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }

    for (let [key, value] of Object.entries(user.social_media)) {
      if (key === "id" || key === "user_id" || value === null) {
        continue;
      }
      if (
        key === "created_at" ||
        key === "updated_at" ||
        (key === "lastLogin" && value !== null)
      ) {
        value = formatDateToLocal(value as string, "en-GB");
      }

      socialMediaArr.push(
        <tr
          key={key + "social_media"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }

    for (let [key, value] of Object.entries(user.invites)) {
      if (key === "id" || key === "user_id") {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      invitesArr.push(
        <tr
          key={key + "invites"}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {`${value}`}
          </td>
        </tr>
      );
    }
  }

  return (
    <>
      <div className="flex flex-col justify-start md:justify-around ">
        <div className="flex flex-col md:flex-row md:w-full gap-2">
          <div className="flex flex-col md:w-full">
            <div className="flex flex-col items-start justify-end  w-full p-2">
              <Tooltip
                content={`Edit ${user.username}`}
                className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
              >
                <Link href={`/home/dashboard/profile/${user.id}`}>
                  <EditIcon className="m-auto text-stone-800 dark:text-yellow-300" />
                </Link>
              </Tooltip>

              <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
            </div>

            <div className="mb-2">
              <span className="text-md font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Experiencess - {user.experiences.length}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-md font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Qualifications - {user.qualifications.length}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-md font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Skills - {skillsArr.length}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-md font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Social Media Links - {socialMediaArr.length - 2}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-md font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Invitations generated - {user.invites.length}
              </span>
            </div>

            <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />

            <div className="flex flex-col md:w-full">
              <ProfileAccountTable user={user} />
              <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
            </div>
          </div>
          <div className="flex flex-col md:w-full">
            <PersonalInfoTable user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
