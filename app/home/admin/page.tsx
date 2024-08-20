import { myStyles } from "@/app/styles";

export default async function adminPage() {
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex h-20 shrink-0 items-center rounded-lg bg-rose-200 dark:bg-emerald-900 p-4 md:h-36">
        <h1>Admin Page</h1>
      </div>
    </main>
  );
}
