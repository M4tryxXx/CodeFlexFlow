"use client";

import React, { useState, useEffect, useRef } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/app/lib/utils";
import { mark_message_read, delete_message_read } from "@/app/lib/actions";
import { sendUserMessage } from "@/app/lib/client-actions";
import toast from "react-hot-toast";

export default function Messages({ messages_data }: any) {
  const { title, messages, user, mark_message, delete_message } = messages_data;
  const [messagesList, setMessagesList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [messagePosition, setMessagePosition] = useState<any>({
    top: 0,
    left: 0,
  });
  const [status, setStatus] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<any>("");
  const [hidden, setHidden] = useState(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      messageRef.current &&
      !messageRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending message...");
    setLoading(true);

    if (selectedMessage.title == "Received Messages") {
      const new_message = {
        subject: "Re: " + selectedMessage.subject,
        message: message,
        from_user_id: user.id,
        to_user_id: selectedMessage.from_user_id,
        from: user.username,
        to: selectedMessage.from,
      };

      try {
        await sendUserMessage(new_message);
        setMessage("");
        setLoading(false);
        setStatus("Message sent!");
        setTimeout(() => {
          setVisible(false);
        }, 2000);
      } catch (error) {
        setLoading(false);
        setStatus("Something went wrong. Please try again.");
        setTimeout(() => {
          setVisible(false);
        }, 2000);
        console.error(error);
      }
    } else {
      const new_message = {
        subject: selectedMessage.subject,
        message: message,
        from_user_id: user.id,
        to_user_id: selectedMessage.to_user_id,
        from: user.username,
        to: selectedMessage.to,
      };

      try {
        await sendUserMessage(new_message);
        setMessage("");
        setLoading(false);
        setStatus("Message sent!");
        setTimeout(() => {
          setVisible(false);
        }, 2000);
      } catch (error) {
        setLoading(false);
        setStatus("Something went wrong. Please try again.");
        setTimeout(() => {
          setVisible(false);
        }, 2000);
        console.error(error);
      }
    }
  };

  //   console.log("selectedMessage: ", selectedMessage);

  useEffect(() => {
    setMessagesList(messages);
  }, [messages]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const messagesListItems = messagesList.map((message: any) => {
    message.title = title;
    return (
      <div
        key={message.id}
        className={`p-2 ${
          message.read
            ? "bg-gray-50 dark:bg-emerald-800 font-light"
            : "bg-rose-100 dark:bg-emerald-900 font-bold text-rose-900 dark:text-yellow-300"
        } shadow-md rounded-lg border-[0.2mm] ${
          loading ? "hover:cursor-wait" : "hover:cursor-pointer"
        } hover:bg-rose-100 dark:hover:bg-emerald-900 my-2 hover:text-rose-900 dark:hover:text-yellow-300 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300 `}
      >
        <div
          className="flex justify-between items-center "
          onClick={async () => {
            if (!loading) {
              setStatus("");
              setLoading(true);
              setVisible(!visible);
              setSelectedMessage(message);
              //   console.log("selectedMessage: ", selectedMessage);
              if (title == "Received Messages") {
                await mark_message_read(message.id);
              }

              setLoading(false);
            }
          }}
        >
          <p className="text-xs md:text-lg">{message.subject}</p>
          <p className="text-xs md:text-lg">
            {title == "Received Messages" ? message.from : message.to}
          </p>
          <p className="text-xs">{formatDate(message.created_at)}</p>

          <div
            className={` rounded-md p-[1px] dark:hover:text-rose-600 h-6 w-6 flex justify-center items-center hover:bg-rose-200 dark:hover:bg-slate-800 hover:text-rose-600 transition-transform duration-400 ${
              loading
                ? "hover:cursor-wait dark:hover:cursor-wait"
                : "hover:cursor-pointer dark:hover:cursor-pointer"
            }`}
            onClick={async (e) => {
              e.stopPropagation();
              if (!loading) {
                setLoading(true);
                setVisible(false);
                setStatus("");
                const response = await delete_message_read(message.id);
                if (response) {
                  const newMessagesList = messagesList.filter(
                    (msg: any) => msg.id !== message.id
                  );
                  setMessagesList(newMessagesList);
                  toast.success("Message deleted!");
                  setLoading(false);
                } else {
                  setLoading(false);
                  toast.error("Something went wrong. Please try again.");
                }
              }
            }}
          >
            <TrashIcon className="w-6" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 border-[0.2mm] ">
              {messagesListItems.length > 0 && (
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>Subject</p>
                    <p>{title == "Received Messages" ? "From" : "To"}</p>
                    <p>
                      {title == "Received Messages" ? "Recieved On" : "Sent On"}
                    </p>
                  </div>
                </div>
              )}
              {messagesListItems.length > 0 ? (
                messagesListItems
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-lg">No messages</p>
                </div>
              )}
              {selectedMessage && (
                <div
                  className={`fixed flex justify-center items-center bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-opacity-20 bg-opacity-60 w-[100vw] h-[100vh] flex-col p-2 rounded-md z-50 transition-all duration-700 ease-in-out -top-100 left-0 ${
                    visible
                      ? " max-h-screen opacity-100 top-0"
                      : "-top-[100px] max-h-0 opacity-0"
                  }`}
                >
                  <div
                    ref={messageRef}
                    className={` bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800 w-[400px] h-auto md:w-[600px] md:h-auto flex-col justify-start p-2 rounded-md z-50 transition-all duration-700 ease-in-out shadow-md border-[.8mm] border-double dark:border-yellow-300 border-rose-600 `}
                    style={{
                      top: messagePosition.top,
                      left: messagePosition.left,
                    }}
                  >
                    <div className="flex justify-end items-start">
                      <div
                        className="border-2 border-rose-200 dark:border-yellow-300 rounded-md p-[1px] dark:hover:border-rose-600 dark:hover:text-rose-600 dark:hover:cursor-pointer h-6 w-6 flex justify-center items-center hover:bg-rose-200 hover:text-rose-600 hover:cursor-pointer transition-transform duration-400"
                        onClick={() => {
                          setVisible(false);
                        }}
                      >
                        <p className="text-lg">X</p>
                      </div>
                    </div>

                    <div className="flex flex-row p-4 gap-10">
                      <p>
                        {title == "Received Messages"
                          ? "From " + selectedMessage.from
                          : "To " + selectedMessage.to}
                        :
                      </p>
                      <div className="flex flex-col rounded-3xl dark:bg-gray-700 p-6 bg-rose-300 w-[70%] gap-6 h-auto shadow-md dark:shaddow-yellow-300 shaddow-black">
                        <div className="flex flex-row gap-2 justify-start">
                          <p className="text-lg font-bold">
                            {selectedMessage.message}
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 justify-end">
                          <p className="text-xs dark:text-white font-semibold text-black">
                            {formatDate(selectedMessage.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        await handleFormSubmit(e);
                      }}
                      className=" m-4"
                    >
                      <div className="flex flex-row gap-2 justify-between">
                        <div className="relative">
                          <textarea
                            placeholder="Type your message here"
                            className="bg-rose-200 dark:bg-emerald-800 dark:text-yellow-300 text-rose-900 rounded-md p-2 focus:outline-[0.2mm] focus:ring-2 focus:ring-rose-500 dark:focus:ring-yellow-300 focus:border-rose-500 dark:focus:border-yellow-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </div>
                      {message.length >= 3 ? (
                        <button
                          type="submit"
                          className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300"
                        >
                          Send
                        </button>
                      ) : (
                        <button
                          className="bg-gray-200 dark:bg-gray-700 dark:text-gray-500 text-rose-900 rounded-md my-2 px-2 py-1 cursor-not-allowed"
                          disabled
                        >
                          Send
                        </button>
                      )}
                    </form>
                    <div className="flex flex-row gap-2 justify-end">
                      <p className="text-xs dark:text-white font-semibold text-black">
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
