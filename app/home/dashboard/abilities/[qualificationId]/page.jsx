import EditQualificationForm from "../../../../ui/Home/Qualification/Edit-qualification-form";

export default async function Editqualification(props) {
  const params = await props.params;
  const { qualificationId } = params;

  return (
    <main>
      <EditQualificationForm id={qualificationId} />
    </main>
  );
}