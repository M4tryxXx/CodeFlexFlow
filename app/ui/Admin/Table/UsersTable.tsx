import { selectUserFull } from "@/app/lib/myDb";
import { formatDateToLocal } from "@/app/lib/utils";

export default async function UsersTableView({ users }: any) {
  let data: any;

  //console.log("User my side:  ", users);
  const trClassNames = [
    "bg-rose-50 hover:bg-rose-100 transition-colors duration-300 dark:bg-emerald-800 dark:textwhite dark:hover:bg-stone-800 ",
    "bg-rose-50 hover:bg-rose-100 transition-colors duration-300 dark:bg-emerald-600 dark:textwhite dark:hover:bg-stone-800",
  ];
  let userDetails: any = [];
  if (users) {
    for (let [key, value] of Object.entries(users)) {
      if (key === "password") {
        continue;
      }
      if (key === "id") {
        continue;
      }
      if (value === null) {
        value = "Not Defined";
      }
      if (
        (key === "created_at" && value !== "Not Defined") ||
        (key === "updated_at" && value !== "Not Defined") ||
        (key === "lastLogin" && value !== "Not Defined") ||
        (key === "reset_tokenExpiry" && value !== "Not Defined") ||
        (key === "verify_token_expiry" && value !== "Not Defined")
      ) {
        value = formatDateToLocal(value as string, "en-GB");
      }
      userDetails.push(
        <tr
          key={value + key}
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
    }

    return (
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
              colSpan={2}
            >
              {users.username}
            </th>
          </tr>
        </thead>
        <tbody>{userDetails ? userDetails : ""}</tbody>
      </table>
    );
  } else {
    return <p>User not found</p>;
  }
}
