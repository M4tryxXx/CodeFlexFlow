import { userId } from "@/app/lib/actions";
import ProfileTable from "@/app/ui/profile/MyCv/Profile";
export default async function Profile() {
  const user = await userId();

  return (
    <div className="flex flex-wrap justify-start dark:bg- p-3 scroll-smooth">
      <ProfileTable user={user} />
    </div>
  );
}
//
