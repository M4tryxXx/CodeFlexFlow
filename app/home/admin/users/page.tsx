import { getUsersData } from "@/app/lib/actions";
import UsersTable from "@/app/ui/admin/UsersTable";
import { Suspense } from "react";
import LoadingUser from "@/app/ui/skeletons";

export default async function Users() {
  const response = await getUsersData();

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