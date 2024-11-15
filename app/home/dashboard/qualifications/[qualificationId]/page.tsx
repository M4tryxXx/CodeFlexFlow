import EditQualificationForm from "@/app/ui/Home/Qualification/Edit-qualification-form";
import { getQualificationById } from "@/app/lib/myDb";

export default async function Editqualification(props: {
  params: Promise<{ qualificationId: string }>;
}) {
  const params = await props.params;
  const { qualificationId } = params;
  let qualificationData = null;

  const qualification = await getQualificationById(qualificationId);
  if (qualification) {
    const { school, city, degree, field, start_date, end_date, description } =
      qualification;

    qualificationData = {
      school,
      city,
      degree,
      field,
      from: start_date,
      to: end_date,
      description,
    };
  }

  return (
    <main>
      <EditQualificationForm id={qualificationId} data={qualificationData} />
    </main>
  );
}
