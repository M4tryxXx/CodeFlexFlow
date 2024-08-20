import Link from "next/link";
import clsx from "clsx";
import { getQualificationById } from "@/app/lib/myDb";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DeleteQualification from "@/app/ui/qualification/DeleteQualification";
import { userId } from "@/app/lib/actions";
import { EditIcon } from "../../../ui/admin/table/EditIcon";

export default async function QualificationPage() {
  const userActivId = await userId();
  const qualification = await getQualificationById(userActivId?.id);
  let qualificationContainer: any;
  if (qualification) {
    if (qualification.length > 0) {
      qualificationContainer = qualification.map((qualification: any) => {
        const fromFormatted = new Date(qualification.from);
        const toFormatted = new Date(qualification.to);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const fromYear = fromFormatted.getFullYear();
        const toYear = toFormatted.getFullYear();
        const monthFrom = months[fromFormatted.getMonth()];
        const monthTo = months[toFormatted.getMonth()];
        return (
          <div
            key={qualification.id}
            className="flex-grow overflow-auto h-full w-72 flex-col mx-2 my-2    bg-silver border-2 shadow-lg border-stone-800 rounded-lg dark:shadow-black dark:bg-stone-900 max-w-md"
          >
            <div
              className="flex justify-center items-center font-bold bg-stone-900 
          text-emerald-100 shadow-md rounded-t-sm h-10 dark:bg-emerald-950"
            >
              {qualification.name}
            </div>
            <div className="py-3 px-4 hover:bg-rose-100 dark:hover:bg-stone-800 shadow-md">
              <h3>
                <strong>
                  {fromYear} {monthFrom} - {toYear} {monthTo}
                </strong>
              </h3>
              <hr className=" border-2 my-2 border-stone-600" />
              <p>
                <strong>{qualification.qualificationProfile}</strong>
              </p>
              <h3>{qualification.description}</h3>
              <div className="flex flex-row justify-end mt-5">
                <Link
                  href={`/home/dashboard/qualification/${qualification.id}`}
                >
                  <EditIcon className="w-8 dark:text-yellow-300 mx-1 z-50" />
                </Link>

                <DeleteQualification id={qualification.id} />
              </div>
            </div>
          </div>
        );
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
  } else {
    qualificationContainer = (
      <div>
        <h3 className="text-center text-2xl text-gray-500 dark:text-gray-200">
          Nu ai nici o Calificare!
        </h3>
      </div>
    );
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
