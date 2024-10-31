import { getLoggedUserFull } from "@/app/lib/actions";
import { GetUserFull } from "@/app/lib/get_user_full";
import ProfileTable from "@/app/ui/Home/Profile/MyCv/Profile";
import { auth } from "@/auth";
import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
export default async function Profile() {
  const session = await auth();
  const user = await GetUserFull(session?.user?.email ?? undefined);

  return (
    <>
      <div className="flex flex-col justify-start bg-inherit p-2 scroll-smooth">
        <Breadcrumbs />
      </div>
      <div className="p-2">
        <ProfileTable user={user} />
      </div>
    </>
  );
}
//
