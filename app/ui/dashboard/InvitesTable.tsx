"use client";

import { useState } from "react";
import { DeleteIcon } from "../../ui/admin/table/DeleteIcon";
import { EyeIcon } from "../../ui/admin/table/EyeIcon";
import { Tooltip } from "@nextui-org/react";
import { handleDeleteInvite } from "@/app/lib/actions";
import toast from "react-hot-toast";
import {
  InformationCircleIcon,
  CheckBadgeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { formatDateToLocal } from "@/app/lib/utils";

export default function InvitesTable(invitations: any) {
  const invites = invitations.invites;
  const [loading, setLoading] = useState(false);
  let dataArr: any = [];

  if (invites && invites.length > 0) {
    invites.map((invite: any) => {
      const formattedDate = formatDateToLocal(invite.createdAt);

      dataArr.push(
        <tr
          key={invite.id}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {invite.destinationName}
          </td>
          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            <Tooltip
              content={invite.opened ? `Invite Opened` : `Invite Not Opened`}
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              {invite.opened ? (
                <div className=" border border-green-500 rounded-md bg-green-600 h-[16px] w-[16px]"></div>
              ) : (
                <div className=" border border-red-500 rounded-md bg-red-600 h-[16px] w-[16px]"></div>
              )}
            </Tooltip>
          </td>

          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            <Tooltip
              content={`Invite sent to 
                 ${invite.destinationName} \n at ${invite.destinationEmail} \n on ${formattedDate} `}
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <EyeIcon className="m-auto text-green-600" />
            </Tooltip>
          </td>
          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            {/* <form action={handleDelete(user.id)}> */}
            <Tooltip
              content={`Delete ${invite.id}`}
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <DeleteIcon
                className="text-red-600 m-auto cursor-pointer "
                onClick={async () => {
                  setLoading(true);
                  try {
                    await handleDeleteInvite(invite.id);
                  } catch (error) {
                    setLoading(false);
                    toast.error("An error occurred while deleting the Invite");
                  }
                  toast.success("Invite deleted successfully", {
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
        {loading && (
          <div className="relative my-5 bg-sky-200 rounded-md border">
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
              Loading...
            </div>
          </div>
        )}
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300 "
                    >
                      For
                    </th>
                    <th
                      scope="col"
                      colSpan={3}
                      className=" text-center text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                    >
                      Actions
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
