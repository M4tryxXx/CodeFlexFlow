import SideNav from "@/app/ui/dashboard/sidenav";
import { myStyles } from "@/app/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${myStyles.mainLayout}`}>
      <div className="w-full flex-none">
        <SideNav />
      </div>
      <div className="flex grow h-full w-[95%] max-w-[1300px] flex-col mx-auto my-4 px-3 py-4 dark:bg-indigo-950 dark:bg-opacity-50  bg-gray-50  rounded-md">
        {children}
      </div>
    </main>
  );
}
