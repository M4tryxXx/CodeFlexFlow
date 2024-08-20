import SideNav from "@/app/ui/dashboard/sidenav";
import { myStyles } from "@/app/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${myStyles.mainLayout}`}>
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow h-full  flex-col mx-4 my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
        {children}
      </div>
    </main>
  );
}
