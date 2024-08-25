import { myStyles } from "@/app/styles";

export default function PageSkeleton() {
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg p-2 md:h[30px]">
        <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg p-2 md:h[30px]">
        <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      <div className="mt-4 flex grow flex-col md:flex-row gap-4">
        <div className="mt-4 justify-around flex flex-row md:flex-col gap-4 w-3/4 h-auto mx-auto md:w-1/5 md:justify-start">
          <div className="flex h-[48px] grow items-center gap-2 rounded-md bg-gray-300 dark:bg-gray-700 p-3 text-sm font-medium md:flex-none justify-between md:p-2 md:px-3 max-w-40 w-36"></div>
          <div className="flex h-[48px] grow items-center gap-2 rounded-md bg-gray-300 dark:bg-gray-700 p-3 text-sm font-medium md:flex-none justify-between md:p-2 md:px-3 max-w-40 w-36"></div>
        </div>
        <div className="flex items-start justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
        </div>
      </div>

      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />

      <div className="mt-6 mr-5 flex justify-end gap-4">
        <div className="flex h-10 w-32 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
      </div>

      <div className="mt-4 flex grow flex-col md:flex-row gap-4">
        <div className="mt-4 justify-around flex flex-row md:flex-col gap-4 w-3/4 h-auto mx-auto md:w-1/5 md:justify-start">
          <div className="flex h-[48px] grow items-center gap-2 rounded-md bg-gray-300 dark:bg-gray-700 p-3 text-sm font-medium md:flex-none justify-between md:p-2 md:px-3 max-w-40 w-36"></div>
          <div className="flex h-[48px] grow items-center gap-2 rounded-md bg-gray-300 dark:bg-gray-700 p-3 text-sm font-medium md:flex-none justify-between md:p-2 md:px-3 max-w-40 w-36"></div>
        </div>
        <div className="flex items-start justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
        </div>
      </div>

      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />

      <div className="mt-6 mr-5 flex justify-end gap-4">
        <div className="flex h-10 w-32 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
      </div>
    </main>
  );
}
