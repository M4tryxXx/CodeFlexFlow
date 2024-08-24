import Link from "next/link";
import ThemeSwitch from "../ThemeSwitch";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import NavLinksAdmin from "./nav-links-admin";
import { lusitana } from "../fonts";

export default function SideNavAdmin() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/home"
        className="mb-2 flex h-20 items-center justify-between grow rounded-md bg-stone-100 dark:bg-emerald-900 p-4"
      >
        <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex flex-row justify-between">
        <NavLinksAdmin />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800">
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
