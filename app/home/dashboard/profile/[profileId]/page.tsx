import EditProfileForm from "@/app/ui/profile/MyCv/EditProfileForm";
import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import { selectUserFull } from "@/app/lib/myDb";
import EditUserFormNew from "@/app/ui/admin/new-edit-user-form";

export default async function EditProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = params;

  const user = await selectUserFull(profileId);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/home/dashboard" },
          {
            label: "Profile",
            href: "/home/dashboard/profile",
          },
          {
            label: "Edit Profile",
            href: ``,
            active: true,
          },
        ]}
      />

      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800 my-5">
        <EditProfileForm user={user} />
      </div>
    </main>
  );
}
