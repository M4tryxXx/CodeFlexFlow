"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentIcon,
  UserIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeSwitch from "../ThemeSwitch";
import { lusitana } from "@/app/ui/fonts";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  {
    name: "Calificari",
    href: "/home/dashboard/qualification",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Experience",
    href: "/home/dashboard/experience",
    icon: UserGroupIcon,
  },
  {
    name: "Profile",
    href: "/home/dashboard/profile",
    icon: UserIcon,
  },
  {
    name: "My CV",
    href: "/home/dashboard/profile/my-cv",
    icon: ClipboardDocumentIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `${lusitana.className} flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 md:flex-none md:justify-start md:p-2 md:px-3`,
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
