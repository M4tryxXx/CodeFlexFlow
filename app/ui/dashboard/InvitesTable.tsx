"use client";

import { useState, useRef, useEffect } from "react";
import { DeleteIcon } from "../../ui/admin/table/DeleteIcon";
import { EyeIcon } from "../../ui/admin/table/EyeIcon";
import { Tooltip } from "@nextui-org/react";
import { handleDeleteInvite } from "@/app/lib/actions";
import toast from "react-hot-toast";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { formatDateToLocal, formatDateMed } from "@/app/lib/utils";
import "../css/loadingSpinner.css";

export default function InvitesTable({ invites, role, location }: any) {
  // Get the invites, role and location from the props

  let dataArr: any = [];
  let infoArr: any = [];
  const ref = useRef<HTMLDivElement>(null);

  // Set the loading state
  const [loading, setLoading] = useState(false);

  // Handle the outside click event to close the invite info div
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

  // Add the event listener to the window to handle the outside click event to close the invite info div
  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  // Check if the invites array is not empty and map through the invites array to create the invite info div and the table row for each invite
  if (invites && invites.length > 0) {
    invites.map((invite: any) => {
      // Format the date
      const formattedDate = formatDateToLocal(invite.created_at, "en-GB");
      const formattedDateOpened = formatDateToLocal(invite.opened_at, "en-GB");
      let expires: any;
      let expiresFormatted = formatDateMed(invite.expires_at);
      let remainingTime = Math.floor(
        (Date.parse(invite.expires_at) - Date.now()) / 1000 / 60 / 60
      );

      // Convert remaining time to days and hours
      const temp = remainingTime / 24;
      const remainingToDays = String(temp.toFixed(2));
      const remainingArr = remainingToDays.split(".");
      const remainingDays = Number(remainingArr[0]);
      const remainingHours = Math.floor((Number(remainingArr[1]) / 100) * 24);

      // Check if the invite has expired
      if (invite) {
        expires = new Date(invite?.expires_at);
      }

      // Create the invite info div and the table row for each invite in the invites array if the invite has expired
      infoArr.push(
        <div
          id={invite.id}
          key={invite.id}
          onClick={(e) => e.stopPropagation()}
          className="border border-solid border-stone-700 p-3 rounded-md absolute  z-50 invite-options bg-white text-black dark:bg-gray-800 dark:text-white hidden drop-shadow-xl"
        >
          {role === "admin" ? <p>CV sent by: {invite.user_userName}</p> : ""}
          <h1 className="text-lg font-semibold">{invite.destination_name}</h1>
          <hr className="w-full border-[.3mm] border-gray-200 dark:border-emerald-800 rounded-md my-1" />
          <p>At: {invite.destination_email}</p>
          <p>Sent: {formattedDate}</p>
          {invite.opened ? (
            <p> Opened: {formattedDateOpened}</p>
          ) : (
            <p>The Cv has not been seen by the recipient</p>
          )}
          <p>Invitation Code: {invite.id}</p>
          {Date.now() > Date.parse(expires) ? (
            <p className="text-md underline underline-offset-[3px] dark:text-orange-400 text-red-600">
              Expired!
            </p>
          ) : (
            <>
              <p className="text-md underline underline-offset-[3px] dark:text-green-400 text-green-600">
                Expires: {expiresFormatted}
              </p>
              <p className="text-md underline underline-offset-[3px] dark:text-green-400 text-green-600">
                {remainingDays > 0 ? `${remainingDays} days and ` : ""}
                {remainingHours} hours left!
              </p>
            </>
          )}
        </div>
      );

      // Create the invite info div and the table row for each invite in the invites array if the invite is valid
      if (Date.now() > Date.parse(expires)) {
        dataArr.push(
          <tr
            key={invite.id + invite.destination_name}
            className=" hover:bg-rose-200 bg-rose-100 dark:bg-rose-700 dark:bg-opacity-35 dark:hover:bg-rose-700 dark:hover:bg-opacity-25"
          >
            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 decoration-slice decoration-black decoration-2">
              <p>
                <span className="line-through">{invite.destination_name}</span>{" "}
                - Expired
              </p>
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
                      toast.error(
                        "An error occurred while deleting the Invite"
                      );
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
      } else {
        dataArr.push(
          <tr
            key={invite.id + invite.destination_name}
            className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
          >
            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
              {invite.at_company_name}
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
                      toast.error(
                        "An error occurred while deleting the Invite"
                      );
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
      }
    });
  }

  // Return the table with the invites
  return (
    <>
      <div className="flex flex-col">
        {loading && (
          <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
            <div className="fixed left-[25%] top-1/2 w-[50%] flex items-center justify-center">
              <div
                className={`bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg  md:h-16 h-12 w-[200px] md:w-[250px] rounded-lg flex flex-row justify-center items-center `}
              >
                <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
                Loading...
              </div>
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
          <div className="fixed left-[25%] top-1/2 w-[50%] flex items-center justify-center">
            <div
              className={`bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg  md:h-16 h-12 w-[200px] md:w-[250px] rounded-lg flex flex-row justify-center items-center `}
            >
              <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
              Loading...
            </div>
          </div>
        </div>
      )}
    </>
  );
}
