import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../styles";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { userId } from "../lib/actions";
export default async function HomePage() {
  const user = (await userId()) || "";
  let role: any;
  if (user) {
    role = user.role;
  }
  if (user && user.lastLoginFrom) {
    //const user = await findUserById(userIdd);
    // const userIp = await fetch("https://api.ipify.org?format=json").then((res) =>
    //   res.json()
    // );
    // console.log(userIp);

    if (user.lastLoginFrom === "London") {
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
              <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Welcome to CodeFlexFlow!
              </h1>
            </div>
          </div>
        </main>
      );
    }
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
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
              Bine ati venit Pe CodeFlexFlow!
            </h1>
          </div>
        </div>
      </main>
    );
  }
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
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
            Welcome to CodeFlexFlow!
          </h1>
        </div>
      </div>
    </main>
  );
}
