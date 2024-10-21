"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  BellAlertIcon,
  BellIcon,
  ArrowLeftCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  getInboxNotifications,
  mark_message,
  delete_message,
} from "../../lib/myDb";
import { Tooltip } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function Notifications({ user_id }: any) {
  const [visible, setVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any>([]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getInboxNotifications(user_id);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications(); // Fetch notifications immediately when the page loads

    const interval = setInterval(fetchNotifications, 60000); // Fetch notifications every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [user_id]);

  // console.log("Notifications: ", notifications);
  const handleBellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // setCursorPosition({ x: event.clientX, y: event.clientY });
    setVisible(!visible);
  };

  const handleNotificationClick = async (notification: any) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      await mark_message(notification.id);
      const notificationsUpdate = await getInboxNotifications(user_id);
      setNotifications(notificationsUpdate);
    }
  };

  const handleBackClick = () => {
    setSelectedNotification(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notificationsList = notifications
    ?.map((notification: any) => {
      return (
        <Tooltip
          key={notification.id}
          content="Open"
          placement="bottom-start"
          className="bg-rose-200 px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-900 border-rose-200 dark:border-yellow-300 dark:border-[0.2mm] dark:shadow-md p-2 hover:cursor-pointer hover:bg-rose-100  my-2 rounded-md hover:text-rose-900 dark:hover:text-yellow-300 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
        >
          <div
            className="flex flex-row justify-between items-center border-b-2 border-rose-200 dark:border-yellow-300 p-2 hover:cursor-pointer hover:bg-rose-100 dark:hover:bg-emerald-900 my-2 rounded-md hover:text-rose-900 dark:hover:text-yellow-300 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
            key={notification.id}
            style={{ width: "90%" }}
            onClick={() => handleNotificationClick(notification)}
          >
            <p
              className={`${
                notification.read ? "font-light text-sm" : "font-bold text-lg"
              }`}
            >
              {notification.subject}
            </p>
            <p>{notification.from}</p>
          </div>
        </Tooltip>
      );
    })
    .sort((message: any) => (message.read ? 1 : -1));

  const unreadNotifications = notifications?.filter(
    (notification: any) => notification.read === false
  );

  // console.log("Unread Notifications: ", unreadNotifications);

  return (
    <>
      <div
        className="relative flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 cursor-pointer"
        onClick={handleBellClick}
      >
        {unreadNotifications && unreadNotifications.length > 0 ? (
          <>
            <BellAlertIcon className="w-10 dark:text-yellow-300 text-rose-500" />
            <div className="absolute top-0 right-0 bg-inherit text-rose-900 dark:text-yellow-300 dark:bg-inherit rounded-full p-1 text-xs ">
              {unreadNotifications.length}
            </div>
          </>
        ) : (
          <BellIcon className="w-10" />
        )}
      </div>
      <div
        ref={notificationRef}
        className={`absolute bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800 w-[400px] h-auto md:w-[600px] md:h-auto flex-col justify-start p-2 rounded-md z-50 transition-all duration-300 ease-in-out right-6 top-40 ${
          visible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-row justify-between items-center border-[0.2mm] rounded-md p-[3px] dark:bg-stone-800 bg-gray-100 px-2">
          <p className="text-lg">Notifications</p>
          <div
            className="border-2 border-rose-200 dark:border-yellow-300 rounded-md p-[1px] dark:hover:border-rose-600 dark:hover:text-rose-600 dark:hover:cursor-pointer h-6 w-6 flex justify-center items-center hover:bg-rose-200 hover:text-rose-600 hover:cursor-pointer transition-transform duration-400"
            onClick={() => {
              setVisible(false);
            }}
          >
            <p className="text-lg">X</p>
          </div>
        </div>
        {selectedNotification ? (
          <div
            className={`transition-transform duration-1000 transform flex flex-col justify-start items-start border-[0.2mm] rounded-md p-[3px] dark:bg-stone-800 bg-gray-50 px-2 my-2 ${
              selectedNotification ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex flex-row justify-between items-center w-[100%]">
              <ArrowLeftCircleIcon
                onClick={handleBackClick}
                className="w-6 hover:cursor-pointer dark:text-blue-500 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 hover:transform hover:scale-125 transition-transform duration-400 m-2"
              />
              <TrashIcon
                onClick={async () => {
                  try {
                    await delete_message(selectedNotification.id);
                    setSelectedNotification(null);
                    const notificationsUpdate = await getInboxNotifications(
                      user_id
                    );
                    setNotifications(notificationsUpdate);
                    toast.success("Message deleted successfully");
                  } catch (error) {
                    console.error("Failed to delete message:", error);
                    toast.error("Failed to delete message");
                  }
                }}
                className="w-6 hover:cursor-pointer dark:text-red-500 hover:text-red-700  hover:transform hover:scale-125 transition-transform duration-400 m-2 text-red-500"
              />
            </div>

            <h2 className="text-xl font-bold border-b-[0.2mm] border-rose-200 dark:border-yellow-300 my-2">
              {selectedNotification.subject}
            </h2>
            <p>{selectedNotification.message}</p>
            <div className=" flex flex-row justify-between mt-7 w-[50%]">
              <p className="font-light text-sm">From:&nbsp;</p>
              <p>{selectedNotification.from}</p>
            </div>
          </div>
        ) : (
          <div
            className={`transition-transform duration-1000 transform flex flex-col justify-start items-center border-[0.2mm] rounded-md p-[3px] dark:bg-stone-800 bg-gray-100 px-2 my-2 ${
              selectedNotification ? "translate-y-full" : "translate-y-0"
            }`}
          >
            {notificationsList?.length > 0 ? (
              <>
                <div
                  className="flex flex-row justify-between items-center border-b-[.2mm] border-rose-200 dark:border-yellow-300 p-2 my-2"
                  style={{ width: "90%" }}
                >
                  <p className="font-light text-sm">Subject</p>
                  <p>From</p>
                </div>
                {notificationsList}
                <div className="flex flex-row justify-end items-center p-2 my-2 w-full">
                  <Tooltip
                    content="Delete All Messages"
                    placement="top"
                    className="bg-rose-200 px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-900 border-rose-200 dark:border-yellow-300 dark:border-[0.2mm] dark:shadow-md p-2 hover:cursor-pointer hover:bg-rose-100  my-2 rounded-md hover:text-rose-900 dark:hover:text-yellow-300 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
                  >
                    <TrashIcon
                      onClick={async () => {
                        try {
                          notifications.forEach(async (notification: any) => {
                            await delete_message(notification.id);
                          });
                          setSelectedNotification(null);
                          const notificationsUpdate =
                            await getInboxNotifications(user_id);
                          setNotifications(notificationsUpdate);
                          toast.success("Messages deleted successfully");
                        } catch (error) {
                          console.error("Failed to delete messages:", error);
                          toast.error("Failed to delete messages");
                        }
                      }}
                      className="w-6 hover:cursor-pointer dark:text-red-500 hover:text-red-700  hover:transform hover:scale-125 transition-transform duration-400 m-2 text-red-500"
                    />
                  </Tooltip>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg">
                  You don't have any notifications at the moment!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
