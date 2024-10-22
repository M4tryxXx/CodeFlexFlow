import SideNavAdmin from "@/app/ui/admin/sidenavAdmin";
import { myStyles } from "@/app/styles";
import { getLoggedUser } from "@/app/lib/actions";
import Link from "next/link";
import { redirectUser } from "@/app/lib/actions";
import Footer from "@/app/ui/Footer/Footer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getLoggedUser()) || "";

  const actionUser = async () => {
    if (!user || user.role !== "admin") {
      await redirectUser("/home");
    }
  };

  if (!user || user.role !== "admin") {
    const one = await actionUser();

    return (
      <>
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
        <Footer />
      </>
    );
  }
  return (
    <>
      <main className={`${myStyles.mainLayout}`}>
        <div className="w-full flex-none">
          <SideNavAdmin user={user} />
        </div>
        <div className="flex grow h-full w-[95%] max-w-[1300px] flex-col mx-auto my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
