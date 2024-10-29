import React from "react";
import { getLoggedUserFull } from "@/app/lib/actions";
import { getUserF } from "@/app/lib/get_items";
import { GetUserFull } from "@/app/lib/get_user_full";
import Messages from "@/app/ui/Home/Dashboard/Messages";
import { delete_message, getConversation } from "@/app/lib/myDb";
import { mark_message_read, getMessages } from "@/app/lib/actions";
import { auth } from "@/auth";
import { getConversations } from "@/app/lib/utils";
import { revalidatePath } from "next/cache";

export default async function MessagesPage() {
  // console.log("currentUser: ", currentUser);

  const session = await auth();
  let currentUser = await GetUserFull(session?.user?.email ?? undefined);
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

  allMessages = await getConversation(currentUser?.id ?? "");
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
      <Messages messages_data={received_data} conversations={conversations} />
    </div>
  );
}
