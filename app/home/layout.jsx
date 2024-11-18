import SideNav from "../ui/Home/Dashboard/sidenav";
import { myStyles } from "../styles";
import Footer from "../ui/Global/Footer/Footer";
import { UserData } from "../lib/get_user_full";
import { userData } from "../lib/actions";

export default async function DashboardLayout({ children }) {
  const user = await userData();

  let loading = false;

  return (
    <>
      <main className={`${myStyles.mainLayout} scroll-smooth`}>
        <div className="w-full flex-none">
          <SideNav user={user} />
        </div>
        <div className="flex grow h-auto w-[95%] max-w-[1300px] flex-col mx-auto my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
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
