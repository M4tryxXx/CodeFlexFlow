"use client";

import {
  UserGroupIcon,
  UsersIcon,
  HomeIcon,
  ComputerDesktopIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Tooltip } from "@nextui-org/react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Users",
    href: "/home/admin/users",
    icon: UsersIcon,
  },
];

export default function NavLinksAdmin() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-1">
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Tooltip
            key={link.name}
            content={link.name}
            placement="top"
            className="md:hidden"
          >
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 `,
                {
                  "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800 underline decoration-rose-900 decoration-2 dark:decoration-yellow-300 underline-offset-4":
                    pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6 md:hidden" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Tooltip>
        );
      })}
    </div>
  );
}
