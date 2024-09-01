import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import EditQualificationForm from "@/app/ui/qualification/edit-qualification-form";

export default function Editqualification({
  params,
}: {
  params: { qualificationId: string };
}) {
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
