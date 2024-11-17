import CodeFlexFlow_Logo from "../ui/Global/CodeFlexFlow-Logo";
import { myStyles } from "../styles";
import Link from "next/link";
import Footer from "../ui/Global/Footer/Footer";

export default async function TermsRomanianPage() {
  return (
    <>
      <main className={`${myStyles.mainLayout}`}>
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <Link
            href="/terms"
            className="mb-2 flex h-20 items-center justify-between grow rounded-md bg-stone-100 dark:bg-emerald-900 p-4"
          >
            <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2">
              <CodeFlexFlow_Logo />
            </div>
          </Link>
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
              Termeni si Conditii
            </h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
