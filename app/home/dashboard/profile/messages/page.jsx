import React from "react";
import Messages from "../../../../ui/Home/Dashboard/Messages";
import { delete_message, getConversation } from "../../../../lib/myDb";
import { mark_message_read, getMessages } from "../../../../lib/actions";
import { getConversations } from "../../../../lib/utils";
import { UserData } from "../../../../lib/get_user_full";
import { userData } from "../../../../lib/actions";

export default async function MessagesPage() {
  let currentUser = await userData();
  // console.log("currentUser: ", currentUser);
  // console.log("currentUser: ", currentUser);
  const sent_messages = currentUser?.sent_notifications;
  const received_messages = currentUser?.notifications;
  let conversations;
  let allMessages;

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
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  conversations = getConversations(allMessages, currentUser);
  // console.log("conversations: ", conversations);

  return (
    <div className="container mx-auto p-4 h-auto">
      <Messages messages_data={received_data} conversations={conversations} />
    </div>
  );
}
