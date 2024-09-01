import Link from "next/link";
import clsx from "clsx";
import { selectQualifications } from "@/app/lib/myDb";
import { getLoggedUserFull } from "@/app/lib/actions";
import { formatDateYearMonth } from "@/app/lib/utils";
import Card from "@/app/ui/Card";
import { user } from "@nextui-org/react";

export default async function QualificationPage() {
  const session_user_id = await getLoggedUserFull();
  const qualification = session_user_id?.qualifications;
  let qualificationContainer: any;
  if (qualification) {
    if (qualification.length > 0) {
      qualificationContainer = qualification.map((qualification: any) => {
        const date = formatDateYearMonth(qualification.from, qualification.to);

        const from = `${date.from.month} ${date.from.year}`;
        let to = `${date.to.month} ${date.to.year}`;
        if (to === "January 1970") {
          to = "Prezent";
        }

        const data = {
          type: "qualification",
          title: qualification.name,
          description: qualification.description,
          dates: `${from} - ${to}`,
          id: qualification.id,
        };

        return <Card data={data} delay={0.5} key={qualification.id} />;
      });
    } else {
      qualificationContainer = (
        <div>
          <h3 className="text-center text-2xl text-gray-500 dark:text-gray-200">
            Nu ai nici o Calificare!
          </h3>
        </div>
      );
    }
  }
  return (
    <>
      <div className="flex flex-wrap justify-center dark:bg-transparent p-3">
        {qualificationContainer}
      </div>
      <div className="mt-6 mr-5 flex justify-end gap-4">
        <Link
          className={clsx(
            "flex h-10 items-center rounded-lg bg-rose-500 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-900 active:bg-rose-800 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:shadow-md dark:shadow-black dark:active:bg-emerald-800 "
          )}
          href="/home/dashboard/qualification/add"
        >
          Adauga Calificare
        </Link>
      </div>
    </>
  );
}