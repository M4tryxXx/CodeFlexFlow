import SideNavAdmin from "@/app/ui/admin/sidenavAdmin";
import { myStyles } from "@/app/styles";
import { userId } from "@/app/lib/actions";
import Link from "next/link";
import { redirectUser } from "@/app/lib/actions";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await userId()) || "";

  const actionUser = async () => {
    if (!user || user.role !== "admin") {
      await redirectUser();
    }
  };

  if (!user || user.role !== "admin") {
    const one = await actionUser();

    return (
      <main className={`${myStyles.mainLayout}`}>
        <div className="w-full flex-none md:w-64"></div>

        <div className="flex-grow h-full  flex-col mx-4 my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
          <h1 className="flex justify-center mt-6 font-sans w-full text-sm antialiased font-light leading-normal text-inherit">
            You are not authorized to view this page. Please go
            <Link
              href="/home"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900"
            >
              Home
            </Link>
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main className={`${myStyles.mainLayout}`}>
      <div className="w-full flex-none md:w-64">
        <SideNavAdmin />
      </div>

      <div className="flex-grow h-full  flex-col mx-4 my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
        {children}
      </div>
    </main>
  );
}