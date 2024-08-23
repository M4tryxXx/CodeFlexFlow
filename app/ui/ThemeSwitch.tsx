// app/components/ThemeSwitch.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { Sunflower } from "next/font/google";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className=" flex h-[35px] w-[35px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium hover:bg-rose-200 hover:text-rose-900   hover:cursor-pointer dark:hover:text-yellow-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 ">
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
      <div
        onClick={() => setTheme("light")}
        className=" flex h-[35px] w-[35px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium hover:bg-rose-200 hover:text-rose-900   hover:cursor-pointer dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-700 "
      >
        <MoonIcon className="w-6" />
      </div>
    );
  }

  if (theme === "light") {
    return (
      <div
        onClick={() => setTheme("system")}
        className=" flex h-[35px] w-[35px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium hover:bg-rose-200 hover:text-rose-900   hover:cursor-pointer dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-700 "
      >
        <SunIcon className="w-6" />
      </div>
    );
  }
  if (theme === "system") {
    return (
      <div
        onClick={() => setTheme("dark")}
        className=" flex h-[35px] w-[35px] items-center justify-center rounded-md bg-gray-50 text-sm font-medium hover:bg-rose-200 hover:text-rose-900   hover:cursor-pointer dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-700 "
      >
        <ComputerDesktopIcon className="w-6" />
      </div>
    );
  }
}
