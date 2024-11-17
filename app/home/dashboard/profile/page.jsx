import ProfileTable from "../../../ui/Home/Profile/MyCv/Profile";
import { UserData } from "../../../lib/get_user_full";
export default async function Profile() {
  const user = await UserData();

  return (
    <div className="p-2">
      <ProfileTable user={user} />
    </div>
  );
}
//
