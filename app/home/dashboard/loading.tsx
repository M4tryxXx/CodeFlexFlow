import { myStyles } from "@/app/styles";
import "../../ui/css/loadingLogin.css";

export default function DashPageSkeleton() {
  return (
    <main className={`${myStyles.main}`}>
      {/* <div className="fixed left-0 top-0 bg-[#1a60313a] w-[100vw] h-[100vh]">
        <div className="bg-rose-200 h-20 w-[30%] rounded-lg flex flex-row justify-center items-center fixed left-[35%] top-1/2">
          <div className="inline-block h-8 w-8 animate-spin rounded-full mr-4 border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_2s_linear_infinite] dark:text-white"></div>
          Loading...
        </div>
      </div> */}
      <div className="flex flex-col justify-center items-start w-full mb-5">
        <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
        <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
        <div className="w-full">
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
        </div>
      </div>
      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="mb-10">
        <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
        <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </main>
  );
}
