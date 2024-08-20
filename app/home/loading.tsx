import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../styles";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default async function HomePageLoader() {
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow items-start flex-col md:flex-row gap-4 justify-between">
        <div className="mt-4 justify-around flex flex-row md:flex-col gap-4 w-3/4 m-auto md:w-1/5 md:justify-start"></div>
        <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          <div className="relative my-5 bg-sky-200 rounded-md border">
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
              Loading...
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
