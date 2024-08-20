import EditUserForm from "@/app/ui/admin/edit-user-form";
import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import { findUserById } from "@/app/lib/myDb";

export default async function EditUserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  let data: any;
  const user = await findUserById(userId);
  const trClassNames = [
    "bg-rose-50 hover:bg-rose-100 transition-colors duration-300 dark:bg-emerald-800 dark:textwhite dark:hover:bg-stone-800 ",
    "bg-rose-50 hover:bg-rose-100 transition-colors duration-300 dark:bg-emerald-600 dark:textwhite dark:hover:bg-stone-800",
  ];
  let userDetails: any = [];
  if (user) {
    let a = 0;
    for (let [key, value] of Object.entries(user)) {
      if (key === "password") {
        continue;
      }
      if (key === "id") {
        continue;
      }
      if (value === null) {
        value = "Not Defined";
      }
      userDetails.push(
        <tr
          key={user.id}
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
            {key}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {String(value)}
          </td>
        </tr>
      );
      a++;
      if (a === 2) {
        a = 0;
      }
    }

    data = (
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
              colSpan={2}
            >
              {user?.username}
            </th>
          </tr>
        </thead>
        <tbody>{userDetails ? userDetails : ""}</tbody>
      </table>
    );
  } else {
    data = <p>User not found</p>;
  }
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
            label: "View User Details",
            href: ``,
            active: true,
          },
        ]}
      />

      <div className="rounded-md  p-4 md:p-6 my-5">
        <h1 className="my-3 mx-3">{user?.username} Details</h1>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden"></div>
              {data}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
