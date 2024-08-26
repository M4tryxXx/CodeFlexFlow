import { myStyles } from "@/app/styles";

export default function PageSkeleton() {
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex flex-wrap justify-center dark:bg-transparent p-3">
        <div className="w-full max-w-md p-4 bg-gray-300 dark:bg-gray-700 rounded-[20px] mb-4">
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="flex justify-end mt-4">
            <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full mx-1"></div>
            <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full mx-1"></div>
          </div>
        </div>
        <div className="w-full max-w-md p-4 bg-gray-300 dark:bg-gray-700 rounded-[20px] mb-4">
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="flex justify-end mt-4">
            <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full mx-1"></div>
            <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full mx-1"></div>
          </div>
        </div>
      </div>
      <div className="mt-6 mr-5 flex justify-end gap-4">
        <div className="flex h-10 w-32 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
      </div>
    </main>
  );
}
