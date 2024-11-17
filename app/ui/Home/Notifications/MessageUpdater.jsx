// "use client";
// import React, { useEffect } from "react";

// const MessageUpdater = ({
//   userId,
//   messageIds,
//   messageContent,
//   taskType,
// }: {
//   userId: string;
//   messageIds?: string[];
//   messageContent?: string;
//   taskType: string;
// }) => {
//   useEffect(() => {
//     const worker = new Worker(
//       new URL("../../../../public/workers/worker.ts", import.meta.url)
//     );

//     worker.onmessage = (event) => {
//       const { success, data, error } = event.data;

//       if (success) {
//         console.log("Task completed successfully:", data);
//       } else {
//         console.error("Failed to complete task:", error);
//       }
//     };

//     worker.postMessage({ type: taskType, userId, messageIds, messageContent });

//     return () => {
//       worker.terminate();
//     };
//   }, [userId, messageIds, messageContent, taskType]);

//   return null;
// };

// export default MessageUpdater;
