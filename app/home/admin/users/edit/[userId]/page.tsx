import EditUserForm from "@/app/ui/admin/edit-user-form";
import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import { selectUserFull } from "@/app/lib/myDb";

export default async function EditUserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const user = await selectUserFull(userId);
  //(user);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Admin", href: "/home/admin" },
          {
            label: "Users",
            href: "/home/admin/users",
          },
          {
            label: "Edit User",
            href: ``,
            active: true,
          },
        ]}
      />

      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800 my-5">
        <EditUserForm user={user} />
      </div>
    </main>
  );
}
