import Link from "next/link";
import ThemeSwitch from "../ThemeSwitch";
import CodeFlexFlow_Logo from "@/app/ui/Global/CodeFlexFlow-Logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import NavLinksAdmin from "./Nav-links-admin";
import { lusitana } from "../fonts";
import { Tooltip } from "@nextui-org/react";
import Notifications from "../Home/Notifications/Notifications";

export default function SideNavAdmin({ user }: any) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex flex-row justify-between">
        <NavLinksAdmin />
      </div>
    </div>
  );
}
