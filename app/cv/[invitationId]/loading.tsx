const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray/60 before:to-transparent";

export default function LoadingUsers() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div
            className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-600 p-2 shadow-sm`}
          >
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
