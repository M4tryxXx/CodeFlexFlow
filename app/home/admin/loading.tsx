import { myStyles } from "@/app/styles";

export default function PageSkeleton() {
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex h-20 shrink-0 items-center justify-between rounded-lg md:h[30px]">
        <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
      </div>
      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="flex items-start flex-col">
        <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-4 whitespace-nowrap"></th>
                <th className="px-6 py-4 whitespace-nowrap"></th>
                <th className="px-6 py-4 whitespace-nowrap"></th>
                <th className="px-6 py-4 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }).map((_, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:block">
                    <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
          <div className="mb-10">
            <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
            <div className="w-10 bg-gray-300 dark:bg-gray-700 rounded-md h-7"></div>
          </div>
          <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
          <div className="mb-10">
            <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
            <div className="w-10 bg-gray-300 dark:bg-gray-700 rounded-md h-7"></div>
          </div>
          <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
          <div className="mb-10">
            <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>
            <div className="w-10 bg-gray-300 dark:bg-gray-700 rounded-md h-7"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
