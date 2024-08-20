import { myStyles } from "@/app/styles";

export default function dashPage() {
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex h-20 shrink-0 items-center rounded-lg bg-rose-100 dark:bg-emerald-900 p-4 md:h-36">
        <h1>Dashboard Page</h1>
      </div>
    </main>
  );
}


