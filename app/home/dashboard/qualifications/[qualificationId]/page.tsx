import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import EditQualificationForm from "@/app/ui/Home/Qualification/Edit-qualification-form";
import { getQualificationById } from "@/app/lib/myDb";

export default async function Editqualification(
  props: {
    params: Promise<{ qualificationId: string }>;
  }
) {
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
      <Breadcrumbs
        breadcrumbs={[
          { label: "Qualifications", href: "/home/dashboard/qualification" },
          {
            label: "Modifica Calificare",
            href: `/home/dashboard/qualification/${qualificationId}`,
            active: true,
          },
        ]}
      />
      <EditQualificationForm id={qualificationId} data={qualificationData} />
    </main>
  );
}
