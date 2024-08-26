const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray/60 before:to-transparent";
import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../../styles";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import "../css/loadingLogin.css";

export default function LoadingUsers() {
  return (
    <main className="w-[100vw] h-[100vh] bg-slate-950 m-0 py-[30px]">
      <div className="relative bg-sky-200 rounded-md border w-[200px] mx-auto mt-30">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
        <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
          Loading...
        </div>
      </div>
    </main>
  );
}
