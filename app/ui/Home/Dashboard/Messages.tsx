"use client";

import React, { useState, useEffect, useRef, use } from "react";
// import { useRouter } from "next/router";
import {
  ArrowDownIcon,
  CurrencyBangladeshiIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/app/lib/utils";
import {
  mark_message_read,
  notificationEmail,
  delete_message_read,
  getMessages,
  getUserFull,
} from "@/app/lib/actions";
import { sendUserMessage } from "@/app/lib/client-actions";
import toast from "react-hot-toast";
import { getConversation } from "@/app/lib/myDb";
import { getConversations } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function Messages({ messages_data, conversations }: any) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const { title, messages, user, mark_message, delete_message } = messages_data;
  const [activeUser, setActiveUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<any>("");
  const [conversationsState, setConversationsState] = useState(conversations);
  const [messagesToShow, setMessagesToShow] = useState(5);
  const [unreadMessages, setUnreadMessages] = useState<any>([]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      messageRef.current &&
      !messageRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
      setActiveConversation(null);
    }
  };

  useEffect(() => {
    setConversationsState(conversations);
  }, [conversations]);

  useEffect(() => {
    if (from) {
      async function handleConversationAsync() {
        await handleConversationSelection(from);
      }
      setActiveConversation(from);
      handleConversationAsync();
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setActiveUser(null);
      } else {
        setActiveUser(activeConversation);
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 1000);
      }
    };

    const handleBlur = () => {
      setActiveUser(null);
    };

    const handleFocus = () => {
      setActiveUser(activeConversation);
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [activeConversation]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!activeConversation || !activeUser) {
        return;
      }
      try {
        const data = await getConversation(user.id);
        const updatedConversations = await getConversations(data, user);
        // console.log("conversations: ", updatedConversations);
        setConversationsState(updatedConversations);
        // console.log("conversationsState: ", conversationsState);
        // setSelectedConversation(
        //   formatMessages(conversationsState[activeConversation], user.id)
        // );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    // console.log(from);
    fetchNotifications(); // Fetch notifications immediately when the page loads

    const interval = setInterval(fetchNotifications, 3000); // Fetch notifications every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [user.id, activeConversation, activeUser]);

  // This function formats the messages to be displayed in the chat window and limits the number of messages to be displayed
  const formatMessages = (messages: any, id: any, limiter: number) => {
    let messageToShow: number = 0;
    let unreadMessagesTemp: any = [];

    if (messages.length >= limiter) {
      messageToShow = limiter;
    } else {
      messageToShow = messages.length;
    }

    const formattedMessages = messages
      .map((message: any, index: number) => {
        if (message.to_user_id === user.id && !message.read) {
          unreadMessagesTemp.push(message);
        }

        if (index === messages.length - 5) {
          return (
            <React.Fragment key={message.id + index}>
              <div
                className="flex flex-row justify-start items-center sticky bottom-4 m-6"
                key={index + message.id}
              >
                <ArrowDownIcon
                  className="w-8 font-bold dark:bg-emerald-800  dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-md hover:shadow-lg shadow-rose-400 dark:shadow-black p-1 "
                  onClick={() => {
                    if (messagesEndRef.current) {
                      messagesEndRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              </div>

              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.1 }}
                whileInView={{ opacity: 1, scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
                viewport={{ once: true }}
                className={`flex flex-row p-2 m-1 ${
                  id === message.from_user_id ? "justify-start" : "justify-end"
                }`}
                key={message.id}
              >
                <div
                  className={`flex flex-col md:rounded-2xl rounded-lg  p-2 md:p-6 ${
                    id !== message.from_user_id
                      ? "dark:bg-gray-700  bg-gray-300 shadow-lg dark:shadow-black shadow-gray-800"
                      : "dark:bg-blue-800 bg-rose-200 shadow-lg shadow-rose-400 dark:shadow-black"
                  } w-[85%] md:w-[50%] gap-6 md:gap-10 h-auto`}
                >
                  <div className="flex flex-row gap-2 justify-start">
                    <p className="text-sm md:text-lg">{message.message}</p>
                  </div>
                  <div className="flex flex-row gap-2 justify-end">
                    <p className="text-xs dark:text-white font-thin text-black">
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        }

        return (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.1 }}
            whileInView={{ opacity: 1, scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
            viewport={{ once: true }}
            className={`flex flex-row p-2 m-1 ${
              id === message.from_user_id ? "justify-start" : "justify-end"
            }`}
            key={message.id}
          >
            <div
              className={`flex flex-col md:rounded-2xl rounded-lg  p-2 md:p-6 ${
                id !== message.from_user_id
                  ? "dark:bg-gray-700  bg-gray-300 shadow-lg dark:shadow-black shadow-gray-800"
                  : "dark:bg-blue-800 bg-rose-200 shadow-lg shadow-rose-400 dark:shadow-black"
              } w-[85%] md:w-[50%] gap-6 md:gap-10 h-auto`}
            >
              <div className="flex flex-row gap-2 justify-start">
                <p className="text-sm md:text-lg">{message.message}</p>
              </div>
              <div className="flex flex-row gap-2 justify-end">
                <p className="text-xs dark:text-white font-thin text-black">
                  {formatDate(message.created_at)}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })
      .reverse()
      .slice(0, messageToShow)
      .reverse();

    if (messageToShow < messages.length) {
      formattedMessages.unshift(
        <div
          className="flex flex-row justify-center items-center"
          key="load-more"
        >
          <button
            className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-md hover:shadow-lg shadow-rose-400 dark:shadow-black"
            onClick={(e) => {
              e.preventDefault();
              loadMoreMessages();
            }}
          >
            Load more
          </button>
        </div>
      );
    }

    return formattedMessages;
  };

  // This function loads more messages when the load more button is clicked
  const loadMoreMessages = () => {
    setMessagesToShow((prev) => prev + 5);
  };

  // This function handles the conversation selection
  const handleConversationSelection = async (conversation: any) => {
    if (loading) {
      return;
    }

    setStatus("");
    setLoading(true);
    setVisible(!visible);
    // setSelectedConversation(
    //   formatMessages(conversationsState[conversation], user.id)
    // );

    setActiveConversation(conversation);
    setActiveUser(conversation);
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

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
  };

  // This function formats the messages to be displayed in the chat window
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
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
      setStatus("Message sent!");
      setLoading(false);

      try {
        const data = await getConversation(user.id);
        const updatedConversations = await getConversations(data, user);
        setConversationsState(updatedConversations);
        // setSelectedConversation(
        //   formatMessages(conversationsState[activeConversation], user.id)
        // );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }

      const mailUser = await getUserFull(
        conversationsState[activeConversation][0].to_user_id
      );

      console.log("Mail User: ", mailUser);

      const mailData = {
        email: mailUser?.email,
        name: mailUser?.username,
        message: `You have a new message from ${user?.username}!`,
        link: `https://codeflexflow.vercel.app/home/dashboard/profile/messages?from=${mailUser?.username}`,
      };

      if (mailUser) {
        const mailData = {
          email: mailUser?.email,
          name: mailUser?.username,
          message: `You have a new message from ${user?.username}!`,
          link: `https://codeflexflow.vercel.app/home/dashboard/profile/messages?from=${mailUser?.username}`,
        };

        const mailResponse = await notificationEmail(
          mailData.email,
          mailData.name,
          mailData.message,
          mailData.link
        );

        if (mailResponse) {
          console.log("Mail sent!");
        } else {
          console.log("Mail not sent!");
        }
      }

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

      // console.log(conversationsState[activeConversation][0]);

      const response = await sendUserMessage(new_message);

      // if (!response) {
      //   setLoading(false);
      //   setStatus("Something went wrong. Please try again.");
      //   // setTimeout(() => {
      //   //   setVisible(false);
      //   // }, 2000);
      //   return null;
      // }
      setMessage("");
      setStatus("Message sent!");
      setLoading(false);
      setTimeout(() => {
        setStatus("");
      }, 3000);

      try {
        const data = await getConversation(user.id);
        const updatedConversations = await getConversations(data, user);
        setConversationsState(updatedConversations);
        // setSelectedConversation(
        //   formatMessages(conversationsState[activeConversation], user.id)
        // );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }

      const mailUser = await getUserFull(
        conversationsState[activeConversation][0].from_user_id
      );

      console.log("Mail User To: ", mailUser);

      if (mailUser) {
        const mailData = {
          email: mailUser?.email,
          name: mailUser?.username,
          message: `You have a new message from ${user?.username}!`,
          link: `https://codeflexflow.vercel.app/home/dashboard/profile/messages?from=${mailUser?.username}`,
        };

        const mailResponse = await notificationEmail(
          mailData.email,
          mailData.name,
          mailData.message,
          mailData.link
        );

        if (mailResponse) {
          console.log("Mail sent!");
        } else {
          console.log("Mail not sent!");
        }
      }
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
          className="flex justify-between items-center w-full"
          onClick={async () => {
            await handleConversationSelection(conversation);
          }}
        >
          <p className="text-xs md:text-lg">{conversation}</p>
          <p className="text-xs">
            {formatDate(
              conversations[conversation][
                conversations[conversation].length - 1
              ].created_at
            )}
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

  if (!activeConversation || !activeUser) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-10 border-[0.2mm] ">
                    {conversationsListItems.length > 0 ? (
                      <>
                        <div className="p-1">
                          <div className="flex justify-between text-xs">
                            <p>With</p>
                            <p>Last Message on</p>
                            <p>Delete</p>
                          </div>
                        </div>
                        {conversationsListItems}
                      </>
                    ) : (
                      <div className="flex justify-center items-center">
                        <p className="text-lg">No messages</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-4">{activeConversation}</h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 md:rounded-lg rounded-md shadow-md md:p-10 border-[0.2mm] h-[50vh] overflow-auto">
                  <div>
                    {formatMessages(
                      conversationsState[activeConversation] || [],
                      user.id,
                      messagesToShow
                    )}
                    <p className="text-xs dark:text-white font-semibold text-black m-4">
                      {status ? status : "💬"}
                    </p>
                    <form
                      onSubmit={async (e) => {
                        await handleFormSubmit(e);
                      }}
                      className=" m-4"
                    >
                      <div ref={messagesEndRef} className="mt-4" />
                      <div className="flex flex-row gap-2 justify-between">
                        <div className="relative w-full">
                          <textarea
                            placeholder="Type your message here"
                            className="dark:bg-blue-950 bg-rose-200 shadow-lg shadow-rose-400 dark:shadow-black md:rounded-2xl rounded-lg  p-2 md:p-6  w-[85%] md:w-[50%] gap-6 md:gap-10 h-auto"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            id="message"
                            rows={1}
                          />
                        </div>
                      </div>
                      {message.length >= 1 ? (
                        <div className="flex flex-row justify-between items-center m-2">
                          <button
                            type="submit"
                            className={` 
                              
                              ${
                                loading
                                  ? "bg-gray-200 dark:bg-gray-700 dark:text-gray-500 text-rose-900 rounded-md my-2 px-2 py-1 cursor-not-allowed"
                                  : "rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300 "
                              }`}
                            disabled={loading}
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
                            className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-md hover:shadow-md shadow-rose-400 dark:shadow-black"
                            onClick={() => {
                              setActiveConversation(null);
                              setMessagesToShow(5);
                            }}
                          >
                            Back
                          </button>
                        </div>
                      )}
                    </form>
                    <div className="flex flex-row gap-2 justify-end"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
