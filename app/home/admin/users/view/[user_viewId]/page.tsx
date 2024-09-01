import EditUserForm from "@/app/ui/admin/edit-user-form";
import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import { selectUserFull } from "@/app/lib/myDb";
import { formatDateToLocal } from "@/app/lib/utils";
import UsersTable from "@/app/ui/admin/UsersTable";
import UsersTableView from "@/app/ui/admin/UsersTable";
import ProfileTable from "@/app/ui/profile/MyCv/Profile";

export default async function EditUserPage({
  params,
}: {
  params: { user_viewId: string };
}) {
  const { user_viewId } = params;

  let data: any;
  const user = await selectUserFull(user_viewId);
  //console.log(user);
  return (
    <main className="container mx-auto">
      <div className="rounded-md  p-4 md:p-6 my-5">
        <h1 className="my-3 mx-3">{user?.username} Details</h1>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden"></div>
              <ProfileTable user={user} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
