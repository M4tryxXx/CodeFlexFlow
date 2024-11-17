import { selectUserFull } from "../../../../../lib/myDb";
import ProfileTable from "../../../../../ui/Home/Profile/MyCv/Profile";
import Link from "next/link";

export default async function EditUserPage(props) {
  const params = await props.params;
  const { user_viewId } = params;

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
              <Link href={`/home/admin/users/view/${user_viewId}/send_message`}>
                <p className="text-blue-500">Send a Message</p>
              </Link>
              <ProfileTable user={user} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
