import Link from "next/link";
import clsx from "clsx";
import { getExperienceById } from "@/app/lib/myDb";
import DeleteExperience from "@/app/ui/experience/DeleteExperience";
import { userId } from "@/app/lib/actions";
import { EditIcon } from "../../../ui/admin/table/EditIcon";

export default async function Page() {
  const userActivId = await userId();
  const experience = await getExperienceById(userActivId?.id);

  let experienceContainer: any;
  if (experience && experience.length > 0) {
    experienceContainer = experience.map((experience: any) => {
      const fromFormatted = new Date(experience.from);
      const toFormatted = new Date(experience.to);
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
          key={experience.id}
          className="flex-grow overflow-auto h-full w-72 flex-col mx-2 my-2    bg-silver border-2 shadow-lg border-stone-800 dark:shadow-black dark:bg-stone-900 rounded-lg max-w-md"
        >
          <div
            className="flex justify-center items-center font-bold bg-stone-900 
          text-emerald-100 shadow-md rounded-t-md h-10  dark:bg-emerald-950"
          >
            {experience.company}
          </div>
          <div className="py-3 px-4 hover:bg-rose-100 dark:hover:bg-stone-800 shadow-md">
            <h3>
              <strong>
                {monthFrom} {fromYear} - {monthTo} {toYear}
              </strong>
            </h3>
            <h3>
              <strong>{experience.title}</strong>
            </h3>
            <h3>
              <strong>{experience.description}</strong>
            </h3>
            <div className="flex flex-row justify-end mt-5">
              <Link href={`/home/dashboard/experience/${experience.id}`}>
                <EditIcon className="w-8 dark:text-yellow-300 mx-1 z-50" />
              </Link>

              <DeleteExperience id={experience.id} />
            </div>
          </div>
        </div>
      );
    });
  } else {
    experienceContainer = (
      <div>
        <h3 className="text-center text-2xl text-gray-500 dark:text-gray-200">
          Nu ai nici o Experienta!
        </h3>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-wrap justify-center dark:bg- p-3 ">
        {experienceContainer}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          className={clsx(
            "flex h-10 items-center rounded-lg bg-rose-500 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-900 active:bg-rose-800 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:shadow-md dark:shadow-black dark:active:bg-emerald-800"
          )}
          href="/home/dashboard/experience/add"
        >
          Adauga Experienta
        </Link>
      </div>
    </>
  );
}
