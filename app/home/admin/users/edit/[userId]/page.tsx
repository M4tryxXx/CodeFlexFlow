import EditUserForm from "@/app/ui/Admin/Edit-user-form";
import { selectUserFull } from "@/app/lib/myDb";

export default async function EditUserPage(props: {
  params: Promise<{ userId: string }>;
}) {
  const params = await props.params;
  const { userId } = params;
  const user = await selectUserFull(userId);
  //(user);

  return (
    <main>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800 my-5">
        <EditUserForm user={user} />
      </div>
    </main>
  );
}
