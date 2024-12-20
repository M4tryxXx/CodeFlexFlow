import { selectUsersFull } from "../../../lib/myDb";
import UsersTable from "../../../ui/Admin/UsersTable";
import { Suspense } from "react";
import LoadingUser from "../../../ui/Global/skeletons";

export default async function Users() {
  const response = await selectUsersFull();

  return (
    <>
      <div className="flex items-start flex-col">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Users
        </h1>
      </div>
      <UsersTable usersData={response} />
    </>
  );
}
