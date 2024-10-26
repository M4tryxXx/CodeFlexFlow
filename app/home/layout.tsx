import SideNav from "@/app/ui/Home/Dashboard/sidenav";
import { myStyles } from "../styles";
import Footer from "@/app/ui/Global/Footer/Footer";
import { getLoggedUser } from "@/app/lib/actions";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await getLoggedUser(session?.user?.email);
  let loading = false;

  return (
    <>
      <main className={`${myStyles.mainLayout} scroll-smooth`}>
        <div className="w-full flex-none">
          <SideNav user={user} />
        </div>
        <div className="flex grow h-full w-[95%] max-w-[1300px] flex-col mx-auto my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
          {!loading ? (
            children
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-500"></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
