// import React from "react";
// import { ArrowDownIcon } from "@heroicons/react/20/solid";
// import { motion } from "framer-motion";
// import { formatDate } from "app/lib/utils";
// import { Message, UserFullType } from "app/lib/types";

// export const formatMessages = (data: {
//   messages: Message[];
//   id: string;
//   limiter: number;
//   user: UserFullType;
//   messagesEndRef: any;
//   loadMoreMessages: any;
// }) => {
//   const { messages, id, limiter, user, messagesEndRef, loadMoreMessages } =
//     data;

//   let messageToShow: number = 0;
//   let unreadMessagesTemp: any = [];

//   if (messages.length >= limiter) {
//     messageToShow = limiter;
//   } else {
//     messageToShow = messages.length;
//   }
//   // console.log(messages);

//   const formattedMessages = messages
//     .map((message: any, index: number) => {
//       if (message.to_user_id === user.id && !message.read) {
//         unreadMessagesTemp.push(message);
//       }

//       if (index === messages.length - 5) {
//         return (
//           <React.Fragment key={message.to_user_id + index}>
//             <div
//               className="flex flex-row justify-start items-center sticky bottom-4 m-6"
//               key={index + message.id}
//             >
//               <ArrowDownIcon
//                 className="w-8 font-bold dark:bg-emerald-800  dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-md hover:shadow-lg shadow-rose-400 dark:shadow-black p-1 "
//                 onClick={() => {
//                   if (messagesEndRef.current) {
//                     messagesEndRef.current.scrollIntoView({
//                       behavior: "smooth",
//                     });
//                   }
//                 }}
//               />
//             </div>

//             <motion.div
//               layout
//               initial={{ opacity: 0, scale: 0.1 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 1 }}
//               transition={{
//                 duration: 0.7,
//                 ease: [0, 0.71, 0.2, 1.01],
//                 scale: {
//                   type: "spring",
//                   damping: 15,
//                   stiffness: 100,
//                   restDelta: 0.001,
//                 },
//               }}
//               className={`flex flex-row p-2 m-1 ${
//                 id === message.from_user_id ? "justify-start" : "justify-end"
//               }`}
//               key={message.id}
//             >
//               <div
//                 className={`flex flex-col md:rounded-2xl rounded-lg  p-2 md:p-6 ${
//                   id !== message.from_user_id
//                     ? "dark:bg-gray-700  bg-gray-300 shadow-lg dark:shadow-black shadow-gray-800"
//                     : "dark:bg-blue-800 bg-rose-200 shadow-lg shadow-rose-400 dark:shadow-black"
//                 } w-[85%] md:w-[50%] gap-6 md:gap-10 h-auto`}
//               >
//                 <div className="flex flex-row gap-2 justify-start">
//                   <p className="text-sm md:text-lg">{message.message}</p>
//                 </div>
//                 <div className="flex flex-row gap-2 justify-between">
//                   {message.from_user_id === user.id ? (
//                     message.read ? (
//                       <div className="bg-green-600 w-2 h-2 rounded-full"></div> // If the message has been read, we display a green dot to indicate that the message has been read
//                     ) : (
//                       <div className="bg-red-600 w-2 h-2 rounded-full"></div>
//                     )
//                   ) : (
//                     <div className="bg-inherit w-2 h-2 rounded-full"></div>
//                   )}
//                   <p className="text-xs dark:text-white font-thin text-black">
//                     {formatDate(message.created_at)}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </React.Fragment>
//         );
//       }

//       return (
//         <motion.div
//           layout
//           initial={{ opacity: 0, scale: 0.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 1 }}
//           transition={{
//             duration: 0.7,
//             ease: [0, 0.71, 0.2, 1.01],
//             scale: {
//               type: "spring",
//               damping: 15,
//               stiffness: 100,
//               restDelta: 0.001,
//             },
//           }}
//           className={`flex flex-row p-2 m-1 ${
//             id === message.from_user_id ? "justify-start" : "justify-end"
//           }`}
//           key={message.to_user_id + index}
//         >
//           <div
//             className={`flex flex-col md:rounded-2xl rounded-lg  p-2 md:p-6 ${
//               id !== message.from_user_id
//                 ? "dark:bg-gray-700  bg-gray-300 shadow-lg dark:shadow-black shadow-gray-800"
//                 : "dark:bg-blue-800 bg-rose-200 shadow-lg shadow-rose-400 dark:shadow-black"
//             } w-[85%] md:w-[50%] gap-6 md:gap-10 h-auto`}
//           >
//             <div className="flex flex-row gap-2 justify-start">
//               <p className="text-sm md:text-lg">{message.message}</p>
//             </div>
//             <div className="flex flex-row gap-2 justify-between">
//               {message.from_user_id === user.id ? (
//                 message.read ? (
//                   <div className="bg-green-600 w-2 h-2 rounded-full"></div> // If the message has been read, we display a green dot to indicate that the message has been read
//                 ) : (
//                   <div className="bg-red-600 w-2 h-2 rounded-full"></div>
//                 )
//               ) : (
//                 <div className="bg-inherit w-2 h-2 rounded-full"></div>
//               )}
//               <p className="text-xs dark:text-white font-thin text-black">
//                 {formatDate(message.created_at)}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       );
//     })
//     .reverse()
//     .slice(0, messageToShow)
//     .reverse();

//   if (messageToShow < messages.length) {
//     formattedMessages.unshift(
//       <div
//         className="flex flex-row justify-center items-center"
//         key="load-more"
//       >
//         <button
//           className="bg-rose-300 dark:bg-emerald-900 dark:text-yellow-300 text-rose-900 rounded-md my-2 px-2 py-1 hover:bg-rose-400 hover:text-rose-900 dark:hover:bg-emerald-950 dark:hover:text-yellow-300 transition-transform duration-300 border-[0.2mm] dark:border-yellow-300 border-rose-300 shadow-md hover:shadow-lg shadow-rose-400 dark:shadow-black"
//           onClick={(e) => {
//             e.preventDefault();
//             loadMoreMessages();
//           }}
//         >
//           Load more
//         </button>
//       </div>
//     );
//   }

//   return formattedMessages;
// };
