import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-9 items-center rounded-lg bg-rose-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-black dark:text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black",
        className
      )}
    >
      {children}
    </button>
  );
}
