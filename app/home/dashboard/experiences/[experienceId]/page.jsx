import EditExperienceForm from "../../../../ui/Home/Experience/Edit-experience-form";

export default async function EditExperiencee(props) {
  const params = await props.params;
  const { experienceId } = params;
  return (
    <main>
      <EditExperienceForm id={experienceId} />
    </main>
  );
}
