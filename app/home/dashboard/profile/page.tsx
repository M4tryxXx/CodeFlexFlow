import { GetUserFull } from "@/app/lib/get_user_full";
import ProfileTable from "@/app/ui/Home/Profile/MyCv/Profile";
import { auth } from "@/auth";
export default async function Profile() {
  const session = await auth();
  const user = await GetUserFull(session?.user?.email ?? undefined);

  return (
    <div className="p-2">
      <ProfileTable user={user} />
    </div>
  );
}
//
