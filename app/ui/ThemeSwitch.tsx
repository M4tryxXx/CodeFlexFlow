// app/components/ThemeSwitch.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import {
  MoonIcon,
  SunIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="flex flex-col md:h-7 h-8 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:cursor-pointer hover:underline hover:underline-offset-[3px]">
        <Image
          src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
          width={20}
          height={20}
          sizes="36x36"
          alt="Loading Light/Dark Toggle"
          priority={false}
          title="Loading Light/Dark Toggle"
        />
      </div>
    );

  if (theme === "dark") {
    return (
      <Tooltip
        content="Set Theme Light Mode"
        placement="top"
        className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
      >
        <div
          onClick={() => setTheme("light")}
          className="flex flex-col md:h-7 h-8 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:cursor-pointer hover:underline hover:underline-offset-[3px]"
        >
          <MoonIcon className="w-6 md:hidden" />
          <p className="hidden md:block">Dark</p>
        </div>
      </Tooltip>
    );
  }

  if (theme === "light") {
    return (
      <Tooltip
        content="Set Theme Auto Mode"
        placement="top"
        className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
      >
        <div
          onClick={() => setTheme("system")}
          className="flex flex-col md:h-7 h-8 items-center justify-center rounded-md bg-gray-10 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:cursor-pointer hover:underline hover:underline-offset-[3px]"
        >
          <SunIcon className="w-6 md:hidden" />
          <p className="hidden md:block">Light</p>
        </div>
      </Tooltip>
    );
  }
  if (theme === "system") {
    return (
      <Tooltip
        content="Set Theme Dark Mode"
        placement="top"
        className="bg-rose-200 rounded-lg px-4 py-2 text-rose-950 dark:text-yellow-300 dark:bg-emerald-800"
      >
        <div
          onClick={() => setTheme("dark")}
          className="flex flex-col md:h-7 h-8 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:cursor-pointer hover:underline hover:underline-offset-[3px]"
        >
          <CommandLineIcon className="w-6 md:hidden" />
          <p className="hidden md:block">Auto</p>
        </div>
      </Tooltip>
    );
  }
}
