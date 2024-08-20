import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeSwitch from "./ui/ThemeSwitch";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 ">
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-row gap-4 ">
        <div className="mt-4 flex grow flex-col gap-4 ">
          <Link
            href="/login"
            className="flex w-44 items-center gap-5 self-start justify-between rounded-lg bg-rose-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-400 md:text-base dark:bg-emerald-900 dark:hover:bg-emerald-700"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <ThemeSwitch />
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
      </div>
    </main>
  );
}
