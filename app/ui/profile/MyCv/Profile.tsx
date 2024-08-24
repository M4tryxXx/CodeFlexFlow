"use client";

import Link from "next/link";
import { useState } from "react";
import { EditIcon } from "../../../ui/admin/table/EditIcon";
import { Tooltip } from "@nextui-org/react";
import { formatDateToLocal } from "@/app/lib/utils";

export default function ProfileTable({ user }: any) {
  let dataArr = [];
  let a = 0;

  if (user) {
    for (let [key, value] of Object.entries(user)) {
      const date = new Date(user.createdAt);
      const formattedDate = date.toLocaleString();
      if (
        key === "password" ||
        key === "id" ||
        key === "resetToken" ||
        key === "verifyToken" ||
        key === "resetTokenExpiry" ||
        key === "verifyTokenExpiry"
      ) {
        continue;
      }
      if (key === "createdAt" || key === "updatedAt" || key === "lastLogin") {
        value = formatDateToLocal(value as string, "en-GB");
      }

      dataArr.push(
        <tr
          key={user.id + a}
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
              <table className=" divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                    >
                      {user.username} <br></br>Profile
                    </th>
                  </tr>
                </thead>
                <tbody>{dataArr ? dataArr : ""}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
