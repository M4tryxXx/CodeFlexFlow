import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { lusitana } from "@/app/ui/fonts";
import ThemeSwitch from "../ThemeSwitch";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center md:justify-center rounded-md bg-stone-100 dark:bg-emerald-900 p-4 md:h-40"
        href="/home"
      >
        <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-emerald-950 md:block">
          <ThemeSwitch />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-200 hover:text-rose-800 md:flex-none md:justify-start md:p-2 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800  md:px-3">
            <PowerIcon className="w-6" />
            <div className={` ${lusitana.className} hidden md:block`}>
              Sign Out
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
