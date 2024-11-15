import { GetUserFull } from "@/app/lib/get_user_full";
import ProfileTable from "@/app/ui/Home/Profile/MyCv/Profile";
import { UserData } from "@/app/lib/get_user_full";
export default async function Profile() {
  const user = await UserData();

  return (
    <div className="p-2">
      <ProfileTable user={user} />
    </div>
  );
}
//
