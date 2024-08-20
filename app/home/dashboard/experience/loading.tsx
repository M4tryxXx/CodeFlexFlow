// Code to display loading experience

export default async function PageLoader() {
  return (
    <>
      <h1 className="text-center text-2xl text-gray-500 dark:text-gray-200 opacity-70">
        Loading Experience . . .
      </h1>
      <div className="flex flex-wrap justify-center dark:bg- p-3 ">
        <div className=" opacity-30 flex-grow overflow-auto h-full w-72 flex-col mx-2 my-2    bg-silver border-2 shadow-lg border-stone-800 dark:shadow-black dark:bg-stone-900 rounded-lg max-w-md">
          <div
            className="flex justify-center items-center font-bold bg-stone-900 
          text-emerald-100 w-full shadow-md rounded-t-md h-10  dark:bg-emerald-950"
          ></div>
          <div className="py-3 px-4 h-28 hover:bg-rose-100 dark:hover:bg-stone-800 shadow-md"></div>
        </div>
        <div className=" opacity-30 flex-grow overflow-auto h-full w-72 flex-col mx-2 my-2    bg-silver border-2 shadow-lg border-stone-800 dark:shadow-black dark:bg-stone-900 rounded-lg max-w-md">
          <div
            className="flex justify-center items-center font-bold bg-stone-900 
          text-emerald-100 w-full shadow-md rounded-t-md h-10  dark:bg-emerald-950"
          ></div>
          <div className="py-3 px-4 h-28 hover:bg-rose-100 dark:hover:bg-stone-800 shadow-md"></div>
        </div>
        <div className=" opacity-30 flex-grow overflow-auto h-full w-72 flex-col mx-2 my-2    bg-silver border-2 shadow-lg border-stone-800 dark:shadow-black dark:bg-stone-900 rounded-lg max-w-md">
          <div
            className="flex justify-center items-center font-bold bg-stone-900 
          text-emerald-100 w-full shadow-md rounded-t-md h-10  dark:bg-emerald-950"
          ></div>
          <div className="py-3 px-4 h-28 hover:bg-rose-100 dark:hover:bg-stone-800 shadow-md"></div>
        </div>
      </div>
    </>
  );
}
