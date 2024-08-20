"use client";

import Link from "next/link";
import { useState } from "react";
import { EditIcon } from "../../ui/admin/table/EditIcon";
import { DeleteIcon } from "../../ui/admin/table/DeleteIcon";
import { EyeIcon } from "../../ui/admin/table/EyeIcon";
import { Tooltip } from "@nextui-org/react";
import { handleDelete } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function UsersTable(usersData: any) {
  const [loading, setLoading] = useState(false);
  let data: any;
  let dataArr: any = [];
  const response = usersData.usersData;

  if (response && response.length > 0 && typeof response !== "string") {
    data = response.map((user: any) => {
      const date = new Date(user.createdAt);
      const formattedDate = date.toLocaleString();

      dataArr.push(
        <tr
          key={user.id}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
            {formattedDate}
          </td>
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
  if (!loading) {
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
                        className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300 hidden md:block"
                      >
                        Created
                      </th>
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
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden"></div>
              <div className="relative my-5 bg-sky-200 rounded-md border">
                <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
                <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
                  Loading...
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
