import React from "react";
import Messages from "@/app/ui/Home/Dashboard/Messages";
import { delete_message, getConversation } from "@/app/lib/myDb";
import { mark_message_read, getMessages } from "@/app/lib/actions";
import { getConversations } from "@/app/lib/utils";
import { UserData } from "@/app/lib/get_user_full";
import { userData } from "@/app/lib/actions";

export default async function MessagesPage() {
  let currentUser = await UserData();
  // console.log("currentUser: ", currentUser);
  // console.log("currentUser: ", currentUser);
  const sent_messages = currentUser?.sent_notifications;
  const received_messages = currentUser?.notifications;
  let conversations: any;
  let allMessages: any;

  // const sent_data = {
  //   title: "Sent Messages",
  //   messages: sent_messages,
  //   user: currentUser,
  // };

  const received_data = {
    title: "Received Messages",
    messages: received_messages,
    user: currentUser,
    mark_message: mark_message_read,
    delete_message: delete_message,
  };
  allMessages = sent_messages.concat(received_messages);
  allMessages = allMessages.sort(
    (a: any, b: any) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  conversations = getConversations(allMessages, currentUser);
  // console.log("conversations: ", conversations);

  return (
    <div className="container mx-auto p-4">
      <Messages messages_data={received_data} conversations={conversations} />
    </div>
  );
}
