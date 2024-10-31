import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import EditQualificationForm from "@/app/ui/Home/Qualification/Edit-qualification-form";

export default async function Editqualification(props: {
  params: Promise<{ qualificationId: string }>;
}) {
  const params = await props.params;
  const { qualificationId } = params;

  return (
    <main>
      <Breadcrumbs />
      <EditQualificationForm id={qualificationId} />
    </main>
  );
}
