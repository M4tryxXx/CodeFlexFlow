import React from "react";
import MessageForm from "@/app/ui/Notifications/MessageForm";
import { getLoggedUser, getUserFull } from "@/app/lib/actions";

const SendMessagePage = async ({
  params,
}: {
  params: { user_viewId: string };
}) => {
  const { user_viewId } = params;
  const currentUser = await getLoggedUser();
  const destinationUser = await getUserFull(user_viewId, "", "");

  // console.log(destinationUser);
  const dest_user = {
    name: destinationUser?.personal_info?.first_name,
    email: destinationUser?.email,
    id: user_viewId,
    from: currentUser?.username,
  };

  console.log("currentUser: ", currentUser);

  return (
    <div className="container mx-auto p-4">
      <MessageForm from_user={currentUser?.id} to_user={dest_user} />
    </div>
  );
};

export default SendMessagePage;
