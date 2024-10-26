import React from "react";
import { getLoggedUserFull } from "@/app/lib/actions";
import Messages from "@/app/ui/Home/Dashboard/Messages";
import { delete_message, getConversation } from "@/app/lib/myDb";
import { mark_message_read } from "@/app/lib/actions";
import { auth } from "@/auth";
import { set } from "zod";

export default async function MessagesPage() {
  const session = await auth();
  const currentUser = await getLoggedUserFull(session?.user?.email);
  const sent_messages = currentUser?.sent_notifications;
  const received_messages = currentUser?.notifications;
  let conversations: any;

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

  const allMessages = await getConversation(currentUser.id);

  const getConversations = async () => {
    let conversations: any = {};
    if (allMessages) {
      allMessages.forEach((message: any) => {
        if (message.from_user_id == currentUser.id) {
          if (conversations[message.to]) {
            conversations[message.to].push(message);
          } else {
            conversations[message.to] = [message];
          }
        } else if (message.to_user_id == currentUser.id) {
          if (conversations[message.from]) {
            conversations[message.from].push(message);
          } else {
            conversations[message.from] = [message];
          }
        }
      });
    }
    return conversations;
  };

  conversations = await getConversations();
  setTimeout(() => {
    conversations = getConversations();
  }, 2500);

  //   console.log("currentUser: ", currentUser);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="flex flex-col my-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 border-[0.2mm] ">
              <Messages
                messages_data={received_data}
                conversations={conversations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
