"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-rose-500 dark:bg-emerald-950 hover:bg-rose-400 dark:hover:bg-emerald-800 dark:hover:shadow-black hover:shadow-black hover:shadow-md dark:hover:shadow-sm px-4 py-2 text-sm text-white transition-color"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
