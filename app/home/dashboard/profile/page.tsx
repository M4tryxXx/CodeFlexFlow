import { getLoggedUserFull } from "@/app/lib/actions";
import ProfileTable from "@/app/ui/Home/Profile/MyCv/Profile";
import { auth } from "@/auth";
export default async function Profile() {
  const session = await auth();
  const user = await getLoggedUserFull(session?.user?.email);

  return (
    <div className="flex flex-wrap justify-start dark:bg- p-3 scroll-smooth">
      <ProfileTable user={user} />
    </div>
  );
}
//
