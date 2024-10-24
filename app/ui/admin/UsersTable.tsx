"use client";

import Link from "next/link";
import { useState } from "react";
import { EditIcon } from "./Table/EditIcon";
import { DeleteIcon } from "./Table/DeleteIcon";
import { EyeIcon } from "./Table/EyeIcon";
import { Tooltip } from "@nextui-org/react";
import { handleDelete } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { formatDateToLocal } from "@/app/lib/utils";

export default function UsersTable({ usersData }: any) {
  const [loading, setLoading] = useState(false);
  let data: any;
  let dataArr: any = [];
  const response = usersData;

  if (response && response.length > 0 && typeof response !== "string") {
    data = response.map((user: any) => {
      dataArr.push(
        <tr
          key={user.id}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {user.username}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block">
            {user.email}
          </td>
          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            <Tooltip
              content={`View ${user.username}'s profile`}
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <Link href={`/home/admin/users/view/${user.id}`}>
                <EyeIcon className="m-auto text-green-600" />
              </Link>
            </Tooltip>
          </td>
          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            <Tooltip
              content={`Edit ${user.username}`}
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <Link href={`/home/admin/users/edit/${user.id}`}>
                <EditIcon className="m-auto text-stone-800 dark:text-yellow-300" />
              </Link>
            </Tooltip>
          </td>
          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            {/* <form action={handleDelete(user.id)}> */}
            <Tooltip
              content={`Delete ${user.username}'s account`}
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <DeleteIcon
                className="text-red-600 m-auto cursor-pointer "
                onClick={async () => {
                  setLoading(true);
                  try {
                    await handleDelete(user.id);
                  } catch (error) {
                    setLoading(false);
                    toast.error("An error occurred while deleting the user");
                  }
                  toast.success("User deleted successfully", {
                    duration: 5000,
                    icon: "👋",
                  });
                  setLoading(false);
                }}
              />
            </Tooltip>
            {/* </form> */}
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300 hidden md:block"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      colSpan={3}
                      className=" text-center text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{dataArr ? dataArr : ""}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
          <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-12 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
            <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
          </div>
        </div>
      )}
    </>
  );
}
