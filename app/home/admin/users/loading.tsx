const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray/60 before:to-transparent";

export default function LoadingUsers() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-45">
        Loading Users ...
      </h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div
            className={`${shimmer} relative overflow-hidden rounded-xl opacity-35 p-2 shadow-sm`}
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300 hidden md:block"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase dark:text-neutral-300 hidden md:block"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    colSpan={3}
                    className=" text-center text-xs font-medium text-gray-600 uppercase dark:text-neutral-300"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-3 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>

                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-transparent dark:even:bg-transparent dark:hover:bg-stone-700 dark:hover:bg-opacity-25">
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 hidden md:block"></td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                  <td className="px-2 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200 ">
                    <div className="w-20 h-7 bg-slate-400 opacity-45"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
