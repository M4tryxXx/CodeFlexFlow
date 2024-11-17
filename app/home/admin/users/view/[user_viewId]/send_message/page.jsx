import React from "react";
import MessageForm from "../../../../../../ui/Home/Notifications/MessageForm";
import { getUserFull } from "../../../../../../lib/actions";
import { UserData } from "../../../../../../lib/get_user_full";

const SendMessagePage = async (props) => {
  const params = await props.params;
  const { user_viewId } = params;
  const currentUser = await UserData();
  const destinationUser = await getUserFull(user_viewId, "", "");

  // console.log(destinationUser);
  const dest_user = {
    name: destinationUser?.personal_info?.first_name,
    email: destinationUser?.email,
    id: user_viewId,
    from: currentUser?.username,
    to: destinationUser?.username,
  };

  // console.log("DestUser: ", destinationUser);

  return (
    <div className="container mx-auto p-4">
      <MessageForm from_user={currentUser?.id} to_user={dest_user} />
    </div>
  );
};

export default SendMessagePage;
