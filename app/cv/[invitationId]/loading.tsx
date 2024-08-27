const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray/60 before:to-transparent";
import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../../styles";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import "../../ui/css/loadingSpinner.css";

export default function LoadingUsers() {
  return (
    <main className="w-[100vw] h-[100vh] bg-slate-950 m-0 py-[30px]">
      <div className="fixed left-0 top-0 bg-[#250e0e49] dark:bg-[#06093f77] w-[100vw] h-[100vh] ">
        <div className="fixed left-[25%] top-1/2 w-[50%] flex items-center justify-center">
          <div
            className={`bg-[#b76973ab] dark:bg-[#113a27e3] dark:text-yellow-300 md:text-lg  md:h-16 h-12 w-[200px] md:w-[250px] rounded-lg flex flex-row justify-center items-center `}
          >
            <div className="inline-block md:h-8 md:w-8 h-5 w-5 animate-spin-slow rounded-full mr-4 md:border-4 border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_3s_linear_infinite] dark:text-yellow-300"></div>
            Loading...
          </div>
        </div>
      </div>
    </main>
  );
}
