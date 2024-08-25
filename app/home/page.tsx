import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../styles";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { userId } from "../lib/actions";
import ThemeSwitch from "../ui/ThemeSwitch";
import NavLinks from "../ui/dashboard/nav-links";
import HomeSideNav from "../ui/HomeSidenav";
export default async function HomePage() {
  const user = (await userId()) || "";

  if (user && user.lastLoginFrom === "Bucharest") {
    // if user is from Romania

    return (
      <main className={`${myStyles.mainLayout}`}>
        <HomeSideNav user={user} />
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
            Bine ai venit pe CodeFlexFlow!
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main className={`${myStyles.mainLayout}`}>
      <HomeSideNav user={user} />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          Welcome to CodeFlexFlow!
        </h1>
      </div>
    </main>
  );
}
