"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function AcmeLogoDesk() {
  return (
    <div
      className={`${lusitana.className} flex flex-row justify-between items-start leading-none text-white`}
    >
      <HeartIcon className="h-12 w-12 rotate-[25deg] text-rose-500 dark:text-rose-500" />
      <p className="text-[25px] mt-3 text-emerald-950 dark:text-rose-200 rotate-[5deg] ">
        CodeFlexFlow
      </p>
    </div>
  );
}
