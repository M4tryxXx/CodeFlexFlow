import Link from "next/link";
import clsx from "clsx";
import { getExperienceById } from "@/app/lib/myDb";
import DeleteExperience from "@/app/ui/experience/DeleteExperience";
import { userId } from "@/app/lib/actions";
import { EditIcon } from "../../../ui/admin/table/EditIcon";
import { formatDateYearMonth } from "@/app/lib/utils";
import Card from "@/app/ui/Card";

export default async function Page() {
  const userActivId = await userId();
  const experience = await getExperienceById(userActivId?.id);

  let experienceContainer: any;
  if (experience && experience.length > 0) {
    experienceContainer = experience.map((experience: any) => {
      const date = formatDateYearMonth(experience.from, experience.to);

      const from = `${date.from.month} ${date.from.year}`;
      let to = `${date.to.month} ${date.to.year}`;
      if (to === "January 1970") {
        to = "Prezent";
      }

      const data = {
        title: experience.title,
        description: experience.description,
        dates: `${from} - ${to}`,
        id: experience.id,
      };
      return <Card data={data} delay={0.5} key={experience.id} />;
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
