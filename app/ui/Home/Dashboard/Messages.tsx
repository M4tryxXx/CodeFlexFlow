"use client";

import React, { useState, useEffect, useRef, use } from "react";
import {
  CurrencyBangladeshiIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/app/lib/utils";
import {
  mark_message_read,
  delete_message_read,
  getMessages,
} from "@/app/lib/actions";
import { sendUserMessage } from "@/app/lib/client-actions";
import toast from "react-hot-toast";
import { getConversation } from "@/app/lib/myDb";
import { getConversations } from "@/app/lib/utils";
import { set } from "zod";

export default function Messages({ messages_data, conversations }: any) {
  const { title, messages, user, mark_message, delete_message } = messages_data;
  const [messagesList, setMessagesList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [messagePosition, setMessagePosition] = useState<any>({
    top: 0,
    left: 0,
  });
  const [status, setStatus] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<any>("");
  const [conversationsState, setConversationsState] = useState(conversations);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      messageRef.current &&
      !messageRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
      setSelectedMessage(null);
      setActiveConversation(null);
    }
  };

  let count = 0;

  useEffect(() => {
    setConversationsState(conversations);
  }, [conversations]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationsState]);

  useEffect(() => {
    const fetchNotifications = async () => {
      console.log("Fetching notifications...");
      if (!activeConversation) {
        return;
      }
      try {
        const data = await getConversation(user.id);
        const updatedConversations = await getConversations(data, user);
        console.log("conversations: ", updatedConversations);
        setConversationsState(updatedConversations);
        setSelectedConversation(
          formatMessages(conversationsState[activeConversation], user.id)
        );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications(); // Fetch notifications immediately when the page loads

    const interval = setInterval(fetchNotifications, 2000); // Fetch notifications every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [user.id, activeConversation]);

  const formatMessages = (messages: any, id: any) => {
    const formattedMessages = messages.map((message: any) => {
      return (
        <div
          className={`flex flex-row p-4 gap-10 ${
            id === message.from_user_id ? "justify-start" : "justify-end"
          }`}
          key={message.id}
        >
          <div
            className={`flex flex-col rounded-3xl p-6 ${
              id !== message.from_user_id
                ? "dark:bg-gray-700  bg-gray-300"
                : "dark:bg-blue-800 bg:rose-300"
            } w-[70%] gap-6 h-auto shadow-md dark:shaddow-yellow-300 shaddow-black`}
          >
            <div className="flex flex-row gap-2 justify-start">
              <p className="text-lg font-bold">{message.message}</p>
            </div>
            <div className="flex flex-row gap-2 justify-end">
              <p className="text-xs dark:text-white font-semibold text-black">
                {formatDate(message.created_at)}
              </p>
            </div>
          </div>
        </div>
      );
    });
    return formattedMessages;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending message...");
    setLoading(true);

    if (conversationsState[activeConversation][0].from_user_id !== user.id) {
      const new_message = {
        subject: "Re: " + conversationsState[activeConversation][0].subject,
        message: message,
        from_user_id: user.id,
        to_user_id: conversationsState[activeConversation][0].from_user_id,
        from: user.username,
        to: conversationsState[activeConversation][0].from,
      };

      const response = await sendUserMessage(new_message);
      if (!response) {
        setLoading(false);
        setStatus("Something went wrong. Please try again.");
        // setTimeout(() => {
        //   setVisible(false);
        // }, 2000);

        return;
      }
      setMessage("");

      let currentConversationWith =
        conversationsState[activeConversation][0].from;
      if (conversationsState[activeConversation][0].from_user_id === user.id) {
        currentConversationWith = conversationsState[activeConversation][0].to;
      } else {
        currentConversationWith =
          conversationsState[activeConversation][0].from;
      }

      const updatedConversations = { ...conversationsState };
      // console.log("updatedConversations: ", updatedConversations);
      updatedConversations[currentConversationWith].push(response);
      setConversationsState(updatedConversations);
      // console.log("updatedConversations 2: ", updatedConversations);

      setSelectedConversation(
        formatMessages(conversationsState[currentConversationWith], user.id)
      );
      setStatus("Message sent!");
      setLoading(false);

      // setTimeout(() => {
      //   setVisible(false);
      // }, 2000);
    } else {
      const new_message = {
        subject: conversationsState[activeConversation][0].subject,
        message: message,
        from_user_id: user.id,
        to_user_id: conversationsState[activeConversation][0].to_user_id,
        from: user.username,
        to: conversationsState[activeConversation][0].to,
      };
      console.log("new_message 2: ", conversationsState[activeConversation]);

      const response = await sendUserMessage(new_message);

      if (!response) {
        setLoading(false);
        setStatus("Something went wrong. Please try again.");
        // setTimeout(() => {
        //   setVisible(false);
        // }, 2000);
        return null;
      }
      setMessage("");
      setLoading(false);
      let currentConversationWith =
        conversationsState[activeConversation][0].from;
      if (conversationsState[activeConversation][0].from_user_id === user.id) {
        currentConversationWith = conversationsState[activeConversation][0].to;
      } else {
        currentConversationWith =
          conversationsState[activeConversation][0].from;
      }
      // setSelectedConversation(
      //   formatMessages(conversations[currentConversationWith], user.id)
      // );

      const updatedConversations = { ...conversationsState };
      // console.log("updatedConversations: ", updatedConversations);
      updatedConversations[currentConversationWith].push(response);
      setConversationsState(updatedConversations);
      // console.log("updatedConversations 2: ", updatedConversations);

      setSelectedConversation(
        formatMessages(conversationsState[currentConversationWith], user.id)
      );

      setStatus("Message sent!");

      // setTimeout(() => {
      //   setVisible(false);
      // }, 2000);
    }
  };

  //   console.log("selectedMessage: ", selectedMessage);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const conversationsArray = Object.keys(conversationsState);

  const conversationsListItems = conversationsArray.map((conversation: any) => {
    return (
      <div
        key={conversation}
        className={`p-2 ${
          // first we check if the last message in the conversation is from the user
          conversationsState[conversation][
            conversationsState[conversation].length - 1
          ].to_user_id === user.id
            ? // if the last message is from the user, we check if it has been read by the other user
              conversationsState[conversation][
                conversationsState[conversation].length - 1
              ].read
              ? // if the last message has been read, we set the background color to gray
                "bg-gray-50 dark:bg-emerald-800 font-light"
              : // if the last message has not been read, we set the background color to rose and the text color to yellow so we know yellow text is message received and unread
                "bg-rose-100 dark:bg-emerald-900 font-bold text-rose-900 dark:text-yellow-300"
            : //
            conversationsState[conversation][
                conversationsState[conversation].length - 1
              ].read
            ? // if the last message is not from the user, we check if it has been read by the user and set the background color to gray if it has been read
              "bg-gray-50 dark:bg-emerald-800 font-light"
            : // if the last message has not been read, we set the background color to rose and the text color to blue so we know blue text is message sent and unread
              "bg-rose-100 dark:bg-emerald-900 font-bold text-blue-900 dark:text-blue-300"
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
              setSelectedConversation(
                formatMessages(conversationsState[conversation], user.id)
              );
              setSelectedMessage(
                formatMessages(conversationsState[conversation], user.id)
              );
              setActiveConversation(conversation);

              const textAreaElement = document.getElementById("message");
              textAreaElement?.focus();

              //

              if (
                !conversationsState[conversation][
                  conversationsState[conversation].length - 1
                ].read &&
                conversationsState[conversation][
                  conversationsState[conversation].length - 1
                ].to_user_id === user.id
              ) {
                await mark_message_read(
                  conversationsState[conversation][
                    conversationsState[conversation].length - 1
                  ].id
                );
                // Update the state to mark the message as read
                const updatedConversations = { ...conversationsState };
                updatedConversations[conversation][
                  updatedConversations[conversation].length - 1
                ].read = true;
                setConversationsState(updatedConversations);
              }

              if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
              }

              setLoading(false);
            }
          }}
        >
          <p className="text-xs md:text-lg">{conversation}</p>
          <p className="text-xs">
            {formatDate(conversations[conversation][0].created_at)}
          </p>

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
                const response = await delete_message_read(
                  conversations[conversation][
                    conversations[conversation].length - 1
                  ].id
                );
                if (response) {
                  const newMessagesList = conversations[conversation].filter(
                    (msg: any) => msg.id !== conversations[conversation][0].id
                  );
                  setConversationsState(newMessagesList);
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

  // const messagesListItems = messagesList.map((message: any) => {
  //   message.title = title;
  //   return (
  //     <div
  //       key={message.id}
  //       className={`p-2 ${
  //         message.read
  //           ? "bg-gray-50 dark:bg-emerald-800 font-light"
  //           : "bg-rose-100 dark:bg-emerald-900 font-bold text-rose-900 dark:text-yellow-300"
  //       } shadow-md rounded-lg border-[0.2mm] ${
  //         loading ? "hover:cursor-wait" : "hover:cursor-pointer"
  //       } hover:bg-rose-100 dark:hover:bg-emerald-900 my-2 hover:text-rose-900 dark:hover:text-yellow-300 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300 `}
  //     >
  //       <div
  //         className="flex justify-between items-center "
  //         onClick={async () => {
  //           if (!loading) {
  //             setStatus("");
  //             setLoading(true);
  //             setVisible(!visible);
  //             setSelectedMessage(message);
  //             //   console.log("selectedMessage: ", selectedMessage);
  //             if (title == "Received Messages") {
  //               await mark_message_read(message.id);
  //             }

  //             setLoading(false);
  //           }
  //         }}
  //       >
  //         <p className="text-xs md:text-lg">{message.subject}</p>
  //         <p className="text-xs md:text-lg">
  //           {title == "Received Messages" ? message.from : message.to}
  //         </p>
  //         <p className="text-xs">{formatDate(message.created_at)}</p>

  //         <div
  //           className={` rounded-md p-[1px] dark:hover:text-rose-600 h-6 w-6 flex justify-center items-center hover:bg-rose-200 dark:hover:bg-slate-800 hover:text-rose-600 transition-transform duration-400 ${
  //             loading
  //               ? "hover:cursor-wait dark:hover:cursor-wait"
  //               : "hover:cursor-pointer dark:hover:cursor-pointer"
  //           }`}
  //           onClick={async (e) => {
  //             e.stopPropagation();
  //             if (!loading) {
  //               setLoading(true);
  //               setVisible(false);
  //               setStatus("");
  //               const response = await delete_message_read(message.id);
  //               if (response) {
  //                 const newMessagesList = messagesList.filter(
  //                   (msg: any) => msg.id !== message.id
  //                 );
  //                 setMessagesList(newMessagesList);
  //                 toast.success("Message deleted!");
  //                 setLoading(false);
  //               } else {
  //                 setLoading(false);
  //                 toast.error("Something went wrong. Please try again.");
  //               }
  //             }
  //           }}
  //         >
  //           <TrashIcon className="w-6" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-10 border-[0.2mm] ">
            <div>
              {activeConversation && (
                <>
                  {formatMessages(
                    conversationsState[activeConversation] || [],
                    user.id
                  )}
                  <form
                    onSubmit={async (e) => {
                      await handleFormSubmit(e);
                    }}
                    className=" m-4"
                  >
                    {/* <div ref={messagesEndRef} className="mt-20" /> */}
                    <div className="flex flex-row gap-2 justify-between">
                      <div className="relative">
                        <textarea
                          placeholder="Type your message here"
                          className="bg-rose-200 dark:bg-emerald-800 dark:text-yellow-300 text-rose-900 rounded-md p-2 focus:outline-[0.2mm] focus:ring-2 focus:ring-rose-500 dark:focus:ring-yellow-300 focus:border-rose-500 dark:focus:border-yellow-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          id="message"
                          rows={1}
                        />
                      </div>
                    </div>
                    {message.length >= 3 ? (
                      <div className="flex flex-row justify-between items-center m-2">
                        <button
                          type="submit"
                          className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300"
                        >
                          Send
                        </button>

                        <button
                          className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300"
                          onClick={() => {
                            setActiveConversation(null);
                          }}
                        >
                          Back
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-between items-center m-2">
                        <button
                          className="bg-gray-200 dark:bg-gray-700 dark:text-gray-500 text-rose-900 rounded-md my-2 px-2 py-1 cursor-not-allowed"
                          disabled
                        >
                          Send
                        </button>
                        <button
                          className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300"
                          onClick={() => {
                            setActiveConversation(null);
                          }}
                        >
                          Back
                        </button>
                      </div>
                    )}
                  </form>
                  <div className="flex flex-row gap-2 justify-end">
                    <p className="text-xs dark:text-white font-semibold text-black mb-4">
                      {status}
                    </p>
                  </div>
                </>
              )}
            </div>
            {conversationsListItems.length > 0 ? (
              <>
                <div className="p-2">
                  <div className="flex justify-between">
                    <p>With</p>
                    <p>
                      {title == "Received Messages" ? "Recieved On" : "Sent On"}
                    </p>
                  </div>
                </div>
                {conversationsListItems}
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-lg">No messages</p>
              </div>
            )}

            {/* {activeConversation && (
              <div
                className={`fixed flex justify-center items-center bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-opacity-20 bg-opacity-60 w-[100vw] h-[100vh] flex-col p-2 rounded-md z-50 transition-all duration-700 ease-in-out -top-100 left-0 ${
                  visible
                    ? " max-h-screen opacity-100 top-0"
                    : "-top-[100px] max-h-0 opacity-0"
                }`}
              >
                <div
                  ref={messageRef}
                  className={` bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800 w-[400px] max-h-[90vh] md:w-[600px] md:max-h-[70vh] overflow-scroll flex-col justify-start p-2 rounded-md z-50 transition-all duration-700 ease-in-out shadow-md border-[.8mm] border-double dark:border-yellow-300 border-rose-600 `}
                  style={{
                    top: 0,
                    left: 0,
                  }}
                >
                  <div className="flex justify-end items-start">
                    <div
                      className="border-2 border-rose-200 dark:border-yellow-300 rounded-md p-[1px] dark:hover:border-rose-600 dark:hover:text-rose-600 dark:hover:cursor-pointer h-6 w-6 flex justify-center items-center hover:bg-rose-200 hover:text-rose-600 hover:cursor-pointer transition-transform duration-400"
                      onClick={() => {
                        setVisible(false);
                        setSelectedMessage(null);
                        setActiveConversation(null);
                      }}
                    >
                      <p className="text-lg">X</p>
                    </div>
                  </div>
                  <p>
                    {title == "Received Messages"
                      ? "From " + selectedMessage.from
                      : "To " + selectedMessage.to}
                    :
                  </p>
                  {selectedConversation}

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
                          id="message"
                          rows={1}
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
                    <p className="text-xs dark:text-white font-semibold text-black mb-4">
                      {status}
                    </p>
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
