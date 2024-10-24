import React from "react";
import { getLoggedUserFull } from "@/app/lib/actions";
import { formatDate } from "../../../../lib/utils";
import Messages from "@/app/ui/Home/Dashboard/Messages";
import { delete_message } from "@/app/lib/myDb";
import { mark_message_read } from "@/app/lib/actions";

export default async function MessagesPage() {
  const currentUser = await getLoggedUserFull();
  const sent_messages = currentUser?.sent_notifications;
  const received_messages = currentUser?.notifications;

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

  //   console.log("currentUser: ", currentUser);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="flex flex-col my-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 border-[0.2mm] ">
              <Messages messages_data={received_data} />
            </div>
            <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 border-[0.2mm] ">
              <Messages messages_data={sent_data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
