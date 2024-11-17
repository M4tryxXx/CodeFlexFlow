// Description: Profile Account Table for Profile Page
import { formatDateToLocal } from "../../../../lib/utils";

export default function ProfileAccountTable({ user }) {
  let accountArr = [];

  const userData = {
    email: user.email,
    username: user.username,
    role: user.role,
    lastLogin: formatDateToLocal(user.lastLogin, "en-GB"),
    created_at: formatDateToLocal(user.created_at, "en-GB"),
    updated_at: formatDateToLocal(user.updated_at, "en-GB"),
    firstName: user.personal_info.first_name,
    lastName: user.personal_info.last_name,
    age: user.personal_info.age,
    city: user.personal_info.city,
    country: user.personal_info.country,
    image: user.personal_info.image,
    avatar: user.personal_info.avatar,
  };

  return (
    <table className=" divide-y divide-gray-200 dark:divide-neutral-700">
      <thead>
        <tr>
          <th
            scope="col"
            colSpan={2}
            className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
          >
            <span className="text-lg">{user.username}</span> <br />
            <br />
            Account Details
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          key="account-1"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Email
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {userData.email}
          </td>
        </tr>
        <tr
          key="account-2"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Username
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {userData.username}
          </td>
        </tr>
        <tr
          key="account-3"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Role
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {userData.role}
          </td>
        </tr>
        <tr
          key="account-4"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Last Login
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {userData.lastLogin}
          </td>
        </tr>
        <tr
          key="account-5"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Created At
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {userData.created_at}
          </td>
        </tr>
        <tr
          key="account-6"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Updated At
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {userData.updated_at}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
