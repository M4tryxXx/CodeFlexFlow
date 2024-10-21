import SideNav from "@/app/ui/dashboard/sidenav";
import { myStyles } from "../../styles";
import Footer from "@/app/ui/Footer/Footer";
import { getLoggedUser } from "@/app/lib/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const user = await getLoggedUser();

  return (
    <>
      <main className={`${myStyles.mainLayout} scroll-smooth`}>
        <div className="w-full flex-none">
          <SideNav user={user} />
        </div>
        <div className="flex grow h-full w-[95%] max-w-[1300px] flex-col mx-auto my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
