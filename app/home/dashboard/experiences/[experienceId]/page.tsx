import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import EditExperienceForm from "@/app/ui/Home/Experience/Edit-experience-form";

export default async function EditExperiencee({
  params,
}: {
  params: { experienceId: string };
}) {
  const { experienceId } = params;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Experienta", href: "/home/dashboard/experience" },
          {
            label: "Modifica Experienta",
            href: `/home/dashboard/experience/${experienceId}`,
            active: true,
          },
        ]}
      />
      <EditExperienceForm id={experienceId} />
    </main>
  );
}
