"use client";

import Link from "next/link";
import { useState } from "react";
import { EditIcon } from "../../../Admin/Table/EditIcon";
import { Tooltip } from "@nextui-org/react";
import { formatDateToLocal } from "@/app/lib/utils";

export default function ProfileTable({ user }: any) {
  let accountArr = [];
  let personalInfoArr = [];
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

    for (let [key, value] of Object.entries(user)) {
      const date = new Date(user.created_at);
      const formattedDate = date.toLocaleString();
      if (
        key === "password" ||
        key === "id" ||
        key === "reset_token" ||
        key === "verify_token" ||
        key === "reset_tokenExpiry" ||
        key === "verify_token_expiry" ||
        key === "social_media" ||
        key === "invites" ||
        key === "personal_info" ||
        key === "experiences" ||
        key === "qualifications" ||
        key === "settings" ||
        key === "notifications" ||
        key === "skills" ||
        key === "sent_notifications" || 
        key === "reset_token_expiry" || 
        key === "created_at" || 
        key === "updated_at"
      ) {
        continue;
      }
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      accountArr.push(
        <tr
          key={key + "account"}
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
      a++;
    }

    for (let [key, value] of Object.entries(user.personal_info)) {
      if (key === "created_at" || key === "updated_at" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }
      if (key === "id" || key === "user_id") {
        continue;
      }
      personalInfoArr.push(
        <tr
          key={key + "personal_info"}
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
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden flex flex-col">
              <div className="flex flex-row items-end justify-end h-15 w-[80%] m-auto">
                <Tooltip
                  content={`Edit ${user.username}`}
                  className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
                >
                  <Link href={`/home/dashboard/profile/${user.id}`}>
                    <EditIcon className="m-auto text-stone-800 dark:text-yellow-300" />
                  </Link>
                </Tooltip>
              </div>
              <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
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
              <table className=" divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                    >
                      <span className="text-lg">{user.username}</span> <br />
                      <br />
                      Account Details
                    </th>
                  </tr>
                </thead>
                <tbody>{accountArr ? accountArr : ""}</tbody>
              </table>
              <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
              <table className=" divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                    >
                      <span className="text-lg">{user.username}</span> <br />
                      <br />
                      Personal Details
                    </th>
                  </tr>
                </thead>
                <tbody>{personalInfoArr ? personalInfoArr : ""}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
