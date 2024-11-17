// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import { Message, UserFullType, ChatDataType } from "../../../lib/types";
// import { formatMessages } from "./chatSocketUtils";
// import { sendMessage, handleUnreadNotificationsList } from "@/app/lib/actions";
// import { getConversation } from "../../../lib/myDb";

// const ChatSocket = ({ data }) => {
//   const {
//     messagesDb,
//     senderId,
//     limiter,
//     user,
//     messagesEndRef,
//     loadMoreMessages,
//     receiverId,
//     sender,
//     receiver,
//     parent_socket,
//   } = data;
//   const [messages, setMessages] = useState(messagesDb);
//   const [input, setInput] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isReceiverOnline, setIsReceiverOnline] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const typingTimeout = useRef(null);
//   const [status, setStatus] = useState("");
//   const [messagesUpdated, setMessagesUpdated] = useState(false);
//   let socket = parent_socket;

//   // if (parent_socket) {
//   //   socket = parent_socket;
//   // } else {
//   //   socket = useRef<SocketIOClient.Socket | null>(null);
//   // }

//   /**
//    *
//    *
//    *
//    * Use Effects Hooks
//    *
//    *
//    *
//    */

//   // useEffect(() => {
//   //   const updateMessages = () => {
//   //     const updatedMessages = messages.map((message) => {
//   //       if (message.to_user_id === receiverId && !message.read) {
//   //         return { ...message, read: true };
//   //       }
//   //       return message;
//   //     });
//   //     setMessages(updatedMessages);
//   //     setMessagesUpdated(true);
//   //   };

//   //   if (isReceiverOnline && !messagesUpdated) {
//   //     updateMessages();
//   //   }

//   //   return () => {
//   //     if (isReceiverOnline && !messagesUpdated) {
//   //       updateMessages();
//   //     }
//   //   };
//   // }, [isReceiverOnline, messages, receiverId, messagesUpdated]);

//   // useEffect(() => {
//   //   const fetchMessages = async () => {
//   //     const refreshedMessages: Message[] = await getConversation(user.id);
//   //     setMessages(refreshedMessages);
//   //   };

//   //   fetchMessages();
//   //   return () => {
//   //     fetchMessages();
//   //   };
//   // }, [user.id]);

//   useEffect(() => {
//     setMessages(messagesDb);
//     const updateMessages = async () => {
//       let refreshedMessages= await getConversation(user.id);
//       let updatedMessages = [];
//       refreshedMessages.forEach((message) => {
//         if (
//           (message.to_user_id === user.id &&
//             message.from_user_id === receiverId) ||
//           (message.to_user_id === receiverId &&
//             message.from_user_id === user.id)
//         ) {
//           updatedMessages.push(message);
//         }
//       });
//       setMessages(updatedMessages);
//     };

//     updateMessages();

//     const markMessagesAsRead = async () => {
//       const unreadMessages = messages.filter(
//         (message) => message.to_user_id === user.id && !message.read
//       );

//       if (unreadMessages.length) {
//         let readMessages = [];
//         const unreadMessagesIds = unreadMessages.map((message) => message.id);
//         messages.forEach((message) => {
//           if (unreadMessagesIds.includes(message.id)) {
//             message.read = true;
//           }
//           readMessages.push(message);
//         });
//         await handleUnreadNotificationsList(unreadMessagesIds, user.id);
//         setMessages(readMessages);
//       }
//     };

//     markMessagesAsRead();

//     return () => {
//       updateMessages();
//       markMessagesAsRead();
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket.current) {
//       socket.current = io("http://192.168.0.127:3000", {
//         query: { senderId },
//       });
//     }

//     socket.current.on("connect", () => {
//       // console.log("Connected to WebSocket server");
//       setIsConnected(true);

//       // Check if the receiver is online
//       socket.current?.emit("checkUserStatus", receiverId);
//     });

//     socket.current.on("message", (message) => {
//       // console.log("Received message:", message.content);
//       setMessages((prevMessages) => [...prevMessages, message.content]);
//     });

//     socket.current.on(
//       "userStatus",
//       ({ userId, online }) => {
//         if (userId === receiverId) {
//           setIsReceiverOnline(online);
//         }
//       }
//     );

//     socket.current.on("typing", ({ fromUserId }: { fromUserId: string }) => {
//       if (fromUserId === receiverId) {
//         setIsTyping(true);
//       }
//     });

//     socket.current.on(
//       "stopTyping",
//       ({ fromUserId }: { fromUserId: string }) => {
//         if (fromUserId === receiverId) {
//           setIsTyping(false);
//         }
//       }
//     );

//     socket.current.on("disconnect", () => {
//       console.log("Disconnected from WebSocket server");
//       setIsConnected(false);
//     });

//     return () => {
//       if (socket.current) {
//         socket.current.off("connect");
//         socket.current.off("message");
//         socket.current.off("userStatus");
//         socket.current.off("typing");
//         socket.current.off("stopTyping");
//         if (!parent_socket) {
//           socket.current.off("disconnect");
//           socket.current.disconnect();
//         }
//       }
//     };
//   }, [senderId, receiverId]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(event.target.value);

//     if (socket.current) {
//       socket.current.emit("typing", receiverId);

//       if (typingTimeout.current) {
//         clearTimeout(typingTimeout.current);
//       }

//       typingTimeout.current = setTimeout(() => {
//         socket.current?.emit("stopTyping", receiverId);
//       }, 2000);
//     }
//   };

//   const handleLiveChat = async (e: any) => {
//     e.preventDefault();

//     const createNewMessage = (toUserId: string, to: string | null) => ({
//       subject: "Re: " + messages[0].subject,
//       message: input,
//       from_user_id: user.id,
//       to_user_id: toUserId,
//       from: user.username,
//       to,
//       created_at: new Date(),
//       read: false,
//     });

//     const new_message =
//       messages[0].from_user_id !== user.id
//         ? createNewMessage(messages[0].from_user_id || "", messages[0].from)
//         : createNewMessage(messages[0].to_user_id || "", messages[0].to);

//     setLoading(true);
//     setStatus("Sending message...");
//     if (input && socket.current) {
//       // console.log(`Sending message to ${receiverId}: ${input}`);
//       if (isReceiverOnline) {
//         new_message["read"] = true;
//       }

//       setMessages((prevMessages) => [...prevMessages, new_message]);
//       socket.current.emit("privateMessage", {
//         receiverId,
//         content: new_message,
//       });
//       setInput("");

//       if (isReceiverOnline) {
//         setStatus("Message seen!");
//         setTimeout(() => {
//           setStatus("");
//         }, 3000);
//       } else {
//         setStatus("Message sent!");
//         setTimeout(() => {
//           setStatus("");
//         }, 3000);
//       }
//       setLoading(false);
//       await sendMessage(new_message);
//     }
//   };

//   return (
//     <div>
//       <h1>Live Chat</h1>
//       <div>
//         {formatMessages({
//           messages,
//           id: user.id,
//           limiter,
//           loadMoreMessages,
//           user,
//           messagesEndRef,
//         })}
//       </div>
//       <div>
//         <p>
//           {receiver} is{" "}
//           {isReceiverOnline ? (isTyping ? "Typing" : "Online") : "Offline"}
//         </p>
//         {/* <p>{isTyping ? `${receiver} is typing...` : ""}</p> */}
//       </div>
//       <form
//         onSubmit={async (e) => {
//           await handleLiveChat(e);
//         }}
//         className=" m-4"
//       >
//         <div className="mt-4" />
//         <div className="flex flex-row gap-2 justify-between">
//           <div className="relative w-full">
//             <textarea
//               ref={messagesEndRef}
//               placeholder="Type your message here"
//               className="dark:bg-blue-950 bg-rose-200 shadow-lg shadow-rose-400 dark:shadow-black md:rounded-2xl rounded-lg  p-2 md:p-6  w-[85%] md:w-[50%] gap-6 md:gap-10 h-auto"
//               value={input}
//               onChange={handleInputChange}
//               id="message"
//               rows={1}
//             />
//           </div>
//         </div>
//         {input.length >= 1 ? (
//           <div className="flex flex-row justify-between items-center m-2">
//             <button
//               type="submit"
//               className={`

//                               ${
//                                 loading
//                                   ? "bg-gray-200 dark:bg-gray-700 dark:text-gray-500 text-rose-900 rounded-md my-2 px-2 py-1 cursor-not-allowed"
//                                   : "rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-sm hover:shadow-md shadow-rose-600 dark:shadow-yellow-300 "
//                               }`}
//               disabled={loading}
//             >
//               Send
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-row justify-between items-center m-2">
//             <button
//               className="bg-gray-200 dark:bg-gray-700 dark:text-gray-500 text-rose-900 rounded-md my-2 px-2 py-1 cursor-not-allowed"
//               disabled
//             >
//               Send
//             </button>
//           </div>
//         )}
//       </form>
//       <div>
//         <p>
//           {status ? status : isConnected ? "Connected: Yes" : "Connected: No"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChatSocket;
