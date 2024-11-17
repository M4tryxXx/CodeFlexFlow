// Description: Personal Info Table for Profile Page
import Image from "next/image";

export default function PersonalInfoTable({ user }) {
  let personalInfoArr = [];

  const personalInfoData = {
    first_name: user.personal_info.first_name,
    last_name: user.personal_info.last_name,
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
            Personal Details
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          key="personal-1"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            First Name
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.first_name}
          </td>
        </tr>
        <tr
          key="personal-2"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Last Name
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.last_name}
          </td>
        </tr>
        <tr
          key="personal-3"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Age
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.age}
          </td>
        </tr>
        <tr
          key="personal-4"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            City
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.city}
          </td>
        </tr>
        <tr
          key="personal-5"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Country
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.country}
          </td>
        </tr>
        <tr
          key="personal-6"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Image
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.image ? (
              <Image
                src={personalInfoData.image}
                alt="user image"
                width={50}
                height={50}
              />
            ) : (
              "No Image"
            )}
          </td>
        </tr>
        <tr
          key="personal-7"
          className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
        >
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            Avatar
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
            {personalInfoData.avatar ? (
              <Image
                src={personalInfoData.avatar}
                alt="user avatar"
                width={50}
                height={50}
              />
            ) : (
              "No Avatar"
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
