import SideNav from "@/app/ui/dashboard/sidenav";
import { myStyles } from "../../styles";
import Footer from "@/app/ui/Footer/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className={`${myStyles.mainLayout} scroll-smooth`}>
        <div className="w-full flex-none">
          <SideNav />
        </div>
        <div className="flex grow h-full w-[95%] max-w-[1300px] flex-col mx-auto my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
