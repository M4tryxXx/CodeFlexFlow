import Link from "next/link";
import NavLinks from "@/app/ui/Home/Dashboard/nav-links";
import CodeFlexFlow_Logo from "@/app/ui/Global/CodeFlexFlow-Logo";
import { PowerIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { lusitana } from "@/app/ui/fonts";
import { Tooltip } from "@nextui-org/react";
import ThemeSwitch from "../../ThemeSwitch";
import Notifications from "../Notifications/Notifications";

export default function SideNav({ user }: any) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/home"
        className="mb-2 flex h-20 items-center justify-between grow rounded-md bg-stone-100 dark:bg-emerald-900 p-4"
      >
        <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2">
          <CodeFlexFlow_Logo />
        </div>
      </Link>
      <div className="flex flex-row justify-between">
        <NavLinks />
        <div className="flex flex-row gap-1">
          <ThemeSwitch />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Tooltip
              content="Log Out"
              placement="top"
              className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
            >
              <button className="flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800">
                <PowerIcon className="w-6" />
                <div className={` ${lusitana.className} hidden md:block`}>
                  Sign Out
                </div>
              </button>
            </Tooltip>
          </form>
          <Notifications user_id={user?.id} />
        </div>
      </div>
    </div>
  );
}
