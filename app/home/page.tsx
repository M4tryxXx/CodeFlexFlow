import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../styles";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { userId } from "../lib/actions";
import UserTimezoneClock from "../ui/Language";
export default async function HomePage({ searchParams }: any) {
  console.log(searchParams.language);
  const user = (await userId()) || "";
  let role: any;
  if (user) {
    role = user.role;
  }
  let country: any;

  switch (searchParams.language) {
    case "Bucharest":
      country = "🇷🇴";
      break;
    case "London":
      country = "🇬🇧";
      break;
    default:
      country = "🌍";
      break;
  }

  //const user = await findUserById(userIdd);
  // const userIp = await fetch("https://api.ipify.org?format=json").then((res) =>
  //   res.json()
  // );
  // console.log(userIp);

  const city = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let city2: any;

  console.log(city2);
  ("🇷🇴");

  return (
    <main className={`${myStyles.main}`}>
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow  flex-col md:flex-row gap-4 ">
        <div className="mt-4 justify-around flex flex-row md:flex-col gap-4 w-3/4 h-auto mx-auto md:w-1/5 md:justify-start">
          <Link
            href="/home/dashboard"
            className="flex h-[48px] grow items-center gap-2 rounded-md bg-rose-100 dark:bg-emerald-700 p-3 text-sm font-medium hover:bg-rose-200 hover:text-rose-900 md:flex-none justify-between md:p-2 md:px-3 max-w-40 w-36 dark:text-gray-100 dark:hover:bg-emerald-800"
          >
            <span>Dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>

          {role === "admin" ? (
            <Link
              href="/home/admin"
              className="flex h-[48px] grow items-center gap-2 rounded-md bg-rose-100 dark:bg-emerald-700 p-3 text-sm font-medium hover:bg-rose-200 hover:text-rose-900 md:flex-none justify-between md:p-2 md:px-3 max-w-40 w-36 dark:text-gray-100 dark:hover:bg-emerald-800"
            >
              <span>Admin</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          ) : null}
        </div>
        <div className="flex items-start justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          {" "}
          <UserTimezoneClock />
          {country}
        </div>
      </div>
    </main>
  );
}
