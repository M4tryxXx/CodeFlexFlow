import React from "react";
import { getLoggedUserFull } from "@/app/lib/actions";
import Messages from "@/app/ui/Home/Dashboard/Messages";
import { delete_message, getConversation } from "@/app/lib/myDb";
import { mark_message_read, getMessages } from "@/app/lib/actions";
import { auth } from "@/auth";
import { getConversations } from "@/app/lib/utils";
import { set } from "zod";

export default async function MessagesPage() {
  const session = await auth();
  const currentUser = await getLoggedUserFull(session?.user?.email);
  const sent_messages = currentUser?.sent_notifications;
  const received_messages = currentUser?.notifications;
  let conversations: any;
  let allMessages: any;

  const sent_data = {
    title: "Sent Messages",
    messages: sent_messages,
    user: currentUser,
  };

  const received_data = {
    title: "Received Messages",
    messages: received_messages,
    user: currentUser,
    mark_message: mark_message_read,
    delete_message: delete_message,
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  allMessages = await getConversation(currentUser.id);
  conversations = await getConversations(allMessages, currentUser);

  // const startInterval = async () => {
  //   setInterval(async () => {
  //     console.log("Refreshing messages...");
  //     allMessages = await getConversation(currentUser.id);
  //     conversations = await getConversations(allMessages, currentUser);
  //   }, 10000);
  // };

  // startInterval();

  //   console.log("currentUser: ", currentUser);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <Messages
              messages_data={received_data}
              conversations={conversations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
