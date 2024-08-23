"use client";

import {
  UserGroupIcon,
  UsersIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Admin", href: "/home/admin", icon: CommandLineIcon },
  {
    name: "Users",
    href: "/home/admin/users",
    icon: UsersIcon,
  },
];

export default function NavLinksAdmin() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (link.name === "admin") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 md:flex-none md:justify-start md:p-2 md:px-3`,
                {
                  "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800":
                    pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 md:flex-none md:justify-start md:p-2 md:px-3`,
              {
                "bg-rose-200 text-rose-900 dark:text-yellow-300 dark:bg-emerald-800":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
