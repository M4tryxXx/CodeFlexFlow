"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useRouter } from "next/router";
import {
  ArrowDownIcon,
  CurrencyBangladeshiIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "../../../lib/utils";
import {
  mark_message_read,
  notificationEmail,
  delete_message_read,
  getMessages,
  getUserFull,
  handleUnreadNotificationsList,
} from "../../../lib/actions";
import { sendUserMessage } from "../../../lib/client-actions";
import toast from "react-hot-toast";
import { getConversation } from "../../../lib/myDb";
import { getConversations } from "../../../lib/utils";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { createId } from "@paralleldrive/cuid2";

export default function Messages({ messages_data, conversations }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const { title, messages, user, mark_message, delete_message } = messages_data;

  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [connected, setConnected] = useState(false);

  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [conversationsState, setConversationsState] = useState(conversations);
  const [mutableConversations, setMutableConversations] = useState(null);
  const [messagesToShow, setMessagesToShow] = useState(5);
  const [usersCount, setUsersCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userJoinedChat, setUserJoinedChat] = useState(false);
  const [selMessages, setSelMessages] = useState(null);

  // Components references
  const messageRef = useRef(null);
  const lastMessageRef = useRef(null);

  // Declare a reference to the socket
  const socket = useRef(null);
  const socketInitialized = useRef(false);
  let tempActiveConversation = null;

  // Handle the click outside the message box to close the chat container
  // This function checks if a click event occurred outside the message box and closes the chat container if true
  const handleClickOutside = (event) => {
    if (messageRef.current && !messageRef.current.contains(event.target)) {
      setVisible(false);
      setActiveConversation(null);
    }
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selMessages]);

  // Use effect to set the conversations state
  useEffect(() => {
    setMutableConversations(conversations);
  }, [conversations]);

  // Use effect to set conversation if the from parameter is present (redirect fron notification bell)
  useEffect(() => {
    if (from) {
      async function handleConversationAsync() {
        await handleConversationSelection(from);
      }
      handleConversationAsync();
    }
  }, [from]);

  // Use effect to set the selected user
  useEffect(() => {
    // Handle the visibility change of the document and set the active user to null if the document is hidden (user is not active)
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

    // Handle the blur event of the window and set the active user to null if the window is not focused (user is not active)
    const handleBlur = () => {
      setActiveUser(null);
    };

    // Handle the focus event of the window and set the active user to the active conversation if the window is focused (user is active)
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

  // console.log(activeUser);

  // Use effect to set the socket connection and handle the socket events
  const initializeSocketConnection = useCallback(() => {
    if (!socket.current) {
      console.log("Initializing socket connection...");
      socket.current = io("http://192.168.0.194:3000", {
        query: { senderId: user.id, username: user.username },
      });

      socket.current.on("connect", () => {
        console.log("Connected to the server!");
        socket.current.emit("onlineUsers");
        setStatus("connected");
      });
    }
  }, []);

  useEffect(() => {
    if (user && !socketInitialized.current) {
      // console.log("User state is set:", user);
      initializeSocketConnection();
      socketInitialized.current = true;
    } else if (!user) {
      console.log("User state is not set yet.");
    }

    return () => {
      if (socket.current) {
        console.log("Cleaning up socket connection...");
        socket.current.disconnect();
        socket.current = null;
        setStatus("disconnected");
        socketInitialized.current = false;
      }
    };
  }, [initializeSocketConnection]);

  // Use effect to handle the online users event

  useEffect(() => {
    // Handle the online users event and set the online users count
    socket.current.on("onlineUsers", (onlineUsers) => {
      // console.log("Online Users: ", onlineUsers);
      setUsersCount(onlineUsers);
    });

    socket.current.on("message", ({ fromUserId, username, content }) => {
      if (username !== activeConversation) {
        toast.success(`${username}: \n ${content.message}`, {
          duration: 5000,
          icon: "✉️",
          style: {
            borderRadius: "10px",
            background: "rgba(20,40,140,0.8)",
            border: "1px solid blue",
            color: "yellow",
            fontWeight: "bold",
            boxShadow: "0 0 10px #333",
          },
        });
      }

      if (activeConversation === username) {
        setSelMessages((prev) => [...prev, content]);
      } else {
        setConversationsState((prev) => {
          // Create a new state object to avoid mutating the state directly
          const newState = { ...prev };

          // Check if the user already exists in the state
          newState[username] = {
            ...prev[username],

            // If the user exists, update the messages array with the new message
            Messages: [...prev[username].Messages, content],
          };

          // Return the new state object with the updated messages array for the user in the state object array of users and messages objects
          return newState;
        });
      }
    });

    // This event is triggered when a user logs in or out
    socket.current.on("userLogged", ({ userId, user_name, online, inChat }) => {
      toast.success(
        `${online ? "A intrat " + user_name : "A iesit " + user_name}`,
        {
          duration: 4000,
          icon: "👤",
          style: {
            borderRadius: "10px",
            background: "rgba(20,40,100,0.8)",
            border: "1px solid blue",
            color: "yellow",
            fontWeight: "bold",
            boxShadow: "0 0 10px #333",
          },
        }
      );
    });

    // Handle the user status event and set the active user to the user that is online
    socket.current.on(
      "userStatus",
      ({ userId, user_name, online, inChat, chatKey }) => {
        if (inChat && chatKey === "LEFT_CHAT_KEY_" + user.id) {
          toast.success(`${user_name} ${" left the chat!"}`, {
            duration: 4000,
            icon: "💬",
            style: {
              borderRadius: "10px",
              background: "rgba(20,40,100,0.8)",
              border: "1px solid blue",
              color: "yellow",
              fontWeight: "bold",
              boxShadow: "0 2px 10px #000",
            },
          });
          setActiveUser(null);
        } else if (inChat && chatKey === user.id) {
          setActiveUser((prevActiveUser) => {
            return user_name;
          });

          if (user_name === activeConversation) {
            toast.success(`${user_name} joined the chat!`, {
              duration: 4000,
              icon: "💬",
              style: {
                borderRadius: "10px",
                background: "rgba(20,40,100,0.8)",
                border: "1px solid blue",
                color: "yellow",
                fontWeight: "bold",
                boxShadow: "0 2px 10px #000",
              },
            });
          } else if (!activeConversation && chatKey === user.id) {
            toast.success(`${user_name} Waiting for you to join the chat!`, {
              duration: 5000,
              icon: "💬",
              style: {
                borderRadius: "10px",
                background: "rgba(20,40,100,0.8)",
                border: "1px solid blue",
                color: "yellow",
                fontWeight: "bold",
                boxShadow: "0 2px 10px #000",
              },
            });
          }
        }
      }
    );

    // Event
    socket?.current?.on("onlineUsers", (onlineUsers) => {
      // console.log("Online Users: ", onlineUsers);
      setUsersCount(onlineUsers);
    });

    return () => {
      if (socket.current) {
        socket.current.off("onlineUsers");
        socket.current.off("userStatus");
        socket.current.off("message");
        socket.current.off("userLogged");
      }
    };
  }, [
    activeUser,
    activeConversation,
    visible,
    mutableConversations,
    usersCount,
  ]);

  useEffect(() => {
    socket?.current?.emit("onlineUsers");

    return () => {
      if (socket.current) {
        socket.current.off("onlineUsers");
      }
    };
  }, [usersCount]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("typing", ({ fromUserId }) => {
        if (selMessages && selMessages.length > 0) {
          if (
            (fromUserId === selMessages[0].from_user_id) !== user.id
              ? selMessages[0].from_user_id
              : selMessages[0].to_user_id
          ) {
            setIsTyping(true);
          }
        }
      });

      socket.current.on("stopTyping", ({ fromUserId }) => {
        if (selMessages && selMessages.length > 0) {
          if (
            (fromUserId === selMessages[0].from_user_id) !== user.id
              ? selMessages[0].from_user_id
              : selMessages[0].to_user_id
          ) {
            setIsTyping(false);
          }
        }
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("typing");
        socket.current.off("stopTyping");
      }
    };
  }, [activeConversation]);

  useEffect(() => {
    if (activeConversation) {
      socket?.current?.emit(
        "checkUserStatus",
        conversationsState[activeConversation].to_user_id
      );
    }

    return () => {
      if (socket.current) {
        socket.current.off("userStatus");
      }
    };
  }, [activeConversation]);

  // This function formats the messages to be displayed in the chat window and limits the number of messages to be displayed
  // This function formats the messages to be displayed in the chat window and limits the number of messages to be displayed
  const formatMessages = (messages, id, limiter) => {
    let messageToShow = 0;
    let unreadMessagesTemp = [];

    if (messages.length >= limiter) {
      messageToShow = limiter;
    } else {
      messageToShow = messages.length;
    }

    const formattedMessages = messages
      .map((message, index) => {
        if (message.to_user_id === user.id && !message.read) {
          unreadMessagesTemp.push(message);
        }

        if (index === messages.length - 5) {
          return (
            <React.Fragment key={message.id}>
              <div
                className="flex flex-row justify-start items-center sticky bottom-4 m-6"
                key={index + message.created_at}
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
                animate={{ opacity: 1, scale: 0.95 }}
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
            key={message.id}
            layout
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
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
  // This function handles the selection of a conversation, sets the active conversation, joins the chat, and updates the unread notifications list.

  const handleConversationSelection = useCallback(async (conversation, id) => {
    // if (loading) {
    //   return;
    // }

    setStatus("");
    setLoading(true);
    setVisible(!visible);
    // setSelectedConversation(
    //   formatMessages(conversationsState[conversation], user.id)
    // );
    // console.log("id is: ", id);

    setActiveConversation(conversation);
    tempActiveConversation = conversation;

    // console.log("Conversation: ", conversation);
    setSelMessages(conversationsState[conversation].Messages);
    socket?.current?.emit("joinChat", id);
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    const textAreaElement = document.getElementById("message");
    textAreaElement?.focus();

    const unreadNotifications = conversationsState[
      conversation
    ].Messages.filter((msg) => msg.to_user_id === user.id && !msg.read).map(
      (msg) => msg.id
    );
    // console.log(unreadNotifications);
    // setUnreadMessages(unreadNotifications);

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setLoading(false);
    await handleUnreadNotificationsList(unreadNotifications, user.id);
  });

  // This function handles the form submission for sending a message
  // It sends the message to the server and updates the state with the new message

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    // setStatus("Sending message...");
    // setLoading(true);

    const new_message = {
      id: createId(),
      subject:
        "Re: " + conversationsState[activeConversation].Messages[0].subject,
      message: message,
      from_user_id: user.id,
      to_user_id: conversationsState[activeConversation].to_user_id,
      from: user.username,
      to: activeConversation,
      created_at: new Date().toISOString(),
    };
    socket?.current?.emit("privateMessage", {
      receiverId: conversationsState[activeConversation].to_user_id,
      user_name: user.username,
      content: new_message,
    });

    setSelMessages((prev) => [...prev, new_message]);

    setMessage("");

    const response = await sendUserMessage(new_message);

    const mailUser = await getUserFull(
      conversationsState[activeConversation].to_user_id
    );

    // console.log("Mail User: ", mailUser);

    if (mailUser && !activeUser) {
      const mailData = {
        email: mailUser?.email,
        name: mailUser?.username,
        message: `You have a new message from ${user?.username}!`,
        link: `https://codeflexflow.vercel.app/home/dashboard/profile/messages?from=${user?.username}`,
      };

      const mailResponse = await notificationEmail(
        mailData.email,
        mailData.name,
        mailData.message,
        mailData.link
      );

      if (mailResponse) {
        // console.log("Mail sent!");
      } else {
        // console.log("Mail not sent!");
      }
    }

    // setTimeout(() => {
    //   setVisible(false);
    // }, 2000);
  };
  // This function handles the typing event and emits typing and stopTyping events to the server
  const handleTyping = useCallback(() => {
    socket?.current?.emit(
      "typing",
      selMessages[0].from_user_id !== user.id
        ? selMessages[0].from_user_id
        : selMessages[0].to_user_id
    );
    setTimeout(() => {
      socket?.current?.emit(
        "stopTyping",
        selMessages[0].from_user_id !== user.id
          ? selMessages[0].from_user_id
          : selMessages[0].to_user_id
      );
    }, 2500);
  }, [selMessages, user.id]);
  // console.log(conversationsState);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const conversationsArray = Object.keys(conversationsState);

  const conversationsListItems = conversationsArray.map((conversation) => {
    const lastMessageSelector =
      conversationsState[conversation].Messages.length - 1;
    return (
      <div
        key={conversation}
        className={`p-2 ${
          // first we check if the last message in the conversation is from the user
          conversationsState[conversation].Messages[lastMessageSelector]
            .from_user_id === user.id
            ? // if the last message is from the user, we check if it has been read by the other user
              conversationsState[conversation].Messages[lastMessageSelector]
                .read
              ? // if the last message has been read, we set the background color to gray
                "bg-gray-50 dark:bg-emerald-800 font-light text-white"
              : // if the last message has not been read, we set the background color to rose and the text color to yellow so we know yellow text is message received and unread
                "bg-rose-100 dark:bg-emerald-900 font-bold text-rose-900 dark:text-rose-300"
            : //
            conversationsState[conversation].Messages[lastMessageSelector].read
            ? // if the last message is not from the user, we check if it has been read by the user and set the background color to gray if it has been read
              "bg-gray-50 dark:bg-emerald-800 font-light text-white"
            : // if the last message has not been read, we set the background color to rose and the text color to blue so we know blue text is message sent and unread
              "bg-rose-100 dark:bg-emerald-900 font-bold text-blue-900 dark:text-yellow-300"
        } shadow-md rounded-lg border-[0.2mm] ${
          loading ? "hover:cursor-wait" : "hover:cursor-pointer"
        } hover:bg-rose-100 dark:hover:bg-emerald-900 my-2 hover:text-rose-900 dark:hover:text-yellow-300 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300 `}
      >
        <div
          className="flex justify-between items-center w-full"
          onClick={async () => {
            await handleConversationSelection(
              conversation,
              conversationsState[conversation].to_user_id
            );
          }}
        >
          <p className="text-xs md:text-lg">{conversation}</p>
          <p className="text-xs">
            {formatDate(conversations[conversation].Messages[0].created_at)}
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
                  conversations[conversation].Messages[lastMessageSelector].id
                );
                if (response) {
                  const newMessagesList = conversations[
                    conversation
                  ].Messages.filter(
                    (msg) =>
                      msg.id !== conversations[conversation].Messages[0].id
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

  if (!activeConversation) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p>Online Users: {usersCount}</p>{" "}
        <button
          className={`bg-rose-300  dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900  dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-md hover:shadow-lg shadow-rose-400 dark:shadow-black ${
            status === "connected"
              ? " dark:bg-green-700  "
              : " dark:bg-rose-500 "
          }`}
        >
          {status === "connected" ? "Connected" : "Disconnected"}
        </button>
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

      {activeConversation && (
        <p>
          {activeConversation} is{" "}
          {activeUser === activeConversation ? "in chat!" : "online"}
        </p>
      )}
      {userJoinedChat && <p>{activeUser} joined the chat</p>}
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 md:rounded-lg rounded-md shadow-md md:p-10 border-[0.2mm] h-[50vh] overflow-auto">
                  <div>
                    {formatMessages(selMessages || [], user.id, messagesToShow)}
                    <div ref={lastMessageRef} />
                    <p className="text-xs dark:text-white font-semibold text-black m-4">
                      {isTyping && activeUser
                        ? activeUser + " is typing..."
                        : "💬"}
                    </p>
                    <form
                      onSubmit={async (e) => {
                        handleFormSubmit(e);
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
                            onChange={(e) => {
                              setMessage(e.target.value);
                              handleTyping();
                            }}
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
                              tempActiveConversation = null;
                              if (socket.current) {
                                setStatus("connected");
                              }
                              setMessagesToShow(5);
                              socket?.current?.emit(
                                "leaveChat",
                                conversationsState[activeConversation]
                                  .to_user_id
                              );
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
                              tempActiveConversation = null;
                              if (socket.current) {
                                setStatus("connected");
                              }
                              setMessagesToShow(5);
                              socket?.current?.emit(
                                "leaveChat",
                                conversationsState[activeConversation]
                                  .to_user_id
                              );
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
