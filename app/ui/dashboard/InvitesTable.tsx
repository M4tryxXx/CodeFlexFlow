"use client";

import { useState, useRef, useEffect } from "react";
import { DeleteIcon } from "../../ui/admin/table/DeleteIcon";
import { EyeIcon } from "../../ui/admin/table/EyeIcon";
import { Tooltip } from "@nextui-org/react";
import { handleDeleteInvite } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { formatDateToLocal } from "@/app/lib/utils";

export default function InvitesTable(invitations: any) {
  const invites = invitations.invites;
  const role = invitations.role;
  const location = invitations.location;
  const [loading, setLoading] = useState(false);
  let dataArr: any = [];
  let infoArr: any = [];
  const ref = useRef<HTMLDivElement>(null);

  const handleOutSideClick = (event: MouseEvent) => {
    let className: any;
    if ((event.target as Element).parentElement?.className) {
      let text = (event.target as Element).parentElement?.className.toString();
      className = text?.split(" ");
    }

    if (!ref.current?.contains(event.target as Node)) {
      const element = document.getElementsByClassName("invite-options");
      if (element && !className?.includes("invite-options")) {
        for (let i = 0; i < element.length; i++) {
          element[i].classList.add("hidden");
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  if (invites && invites.length > 0) {
    invites.map((invite: any) => {
      const formattedDate = formatDateToLocal(invite.createdAt, "en-GB");
      const formattedDateOpened = formatDateToLocal(invite.updatedAt, "en-GB");
      infoArr.push(
        <div
          id={invite.id}
          key={invite.id}
          onClick={(e) => e.stopPropagation()}
          className="border border-solid border-stone-700 p-3 rounded-md absolute  z-50 invite-options bg-white text-black dark:bg-gray-800 dark:text-white hidden drop-shadow-xl"
        >
          {role === "admin" ? <p>Invite sent by: {invite.userUserName}</p> : ""}
          <h1 className="text-lg font-semibold">{invite.destinationName}</h1>
          <hr className="w-full border-[.3mm] border-gray-200 dark:border-emerald-800 rounded-md my-1" />
          <p>At: {invite.destinationEmail}</p>
          <p>Sent: {formattedDate}</p>
          {invite.opened ? (
            <p> Opened: {formattedDateOpened}</p>
          ) : (
            <p>The Cv has not been seen by the recipient</p>
          )}
          <p>Invitation Code: {invite.id}</p>
        </div>
      );

      dataArr.push(
        <tr
          key={invite.id + invite.destinationName}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {invite.destinationName}
          </td>

          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 w-10">
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

          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 w-10">
            <Tooltip
              content={
                <>
                  <p>Sent: {formattedDate}</p>
                  <br />
                  {invite.opened ? (
                    <p>Opened: {formattedDateOpened} </p>
                  ) : (
                    <p>Not Opened yet</p>
                  )}
                </>
              }
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <EyeIcon
                className="m-auto text-green-600 hover:cursor-pointer"
                onClick={(e: any) => {
                  const element = document.getElementById(invite.id);
                  if (element) {
                    element.classList.toggle("hidden");
                    element.style.left = e.pageX - 260 + "px";
                    element.style.top = e.pageY - 240 + "px";
                  }
                }}
              />
            </Tooltip>
          </td>

          <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 w-10">
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
                    await handleDeleteInvite(invite.id, location);
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
              {infoArr ? infoArr : ""}
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
      {loading && (
        <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
          <div className="bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg md:h-16 h-12 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
            <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
            Loading...
          </div>
        </div>
      )}
    </>
  );
}
