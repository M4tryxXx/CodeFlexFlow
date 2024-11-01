import EditExperienceForm from "@/app/ui/Home/Experience/Edit-experience-form";

export default async function EditExperiencee(props: {
  params: Promise<{ experienceId: string }>;
}) {
  const params = await props.params;
  const { experienceId } = params;
  return (
    <main>
      <EditExperienceForm id={experienceId} />
    </main>
  );
}
