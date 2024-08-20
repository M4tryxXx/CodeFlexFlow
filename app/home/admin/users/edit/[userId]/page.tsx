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
    "bg-rose-50 hover:bg-rose-100 transition-colors duration-400 dark:bg-emerald-800 dark:textwhite dark:hover:bg-stone-800 ",
    "bg-rose-50 hover:bg-rose-100 transition-colors duration-400 dark:bg-emerald-600 dark:textwhite dark:hover:bg-stone-800",
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
        <tr key={key} className={trClassNames[a]}>
          <td className="py-2 px-2 text-md">{key}</td>
          <td className="py-2 px-2 text-md">{String(value)}</td>
        </tr>
      );
      a++;
      if (a === 2) {
        a = 0;
      }
    }

    data = (
      <table className="w-full dark:bg-emerald-950  bg-white shadow-lg shadow-gray-500 border-stone-500 border-2 rounded[8px] ">
        <thead>
          <tr>
            <th>{user.username}</th>
            <th>{user.email}</th>
          </tr>
        </thead>
        <tbody>{userDetails}</tbody>
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
            label: "Edit User",
            href: ``,
            active: true,
          },
        ]}
      />

      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800 my-5">
        <EditUserForm user={user} />
        <h1 className="my-3 mx-3">{user?.username} Details</h1>
        {data}
      </div>
    </main>
  );
}
