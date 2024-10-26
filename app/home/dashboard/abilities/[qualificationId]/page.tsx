import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import EditQualificationForm from "@/app/ui/Home/Qualification/Edit-qualification-form";

export default async function Editqualification(
  props: {
    params: Promise<{ qualificationId: string }>;
  }
) {
  const params = await props.params;
  const { qualificationId } = params;

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
      <EditQualificationForm id={qualificationId} />
    </main>
  );
}
