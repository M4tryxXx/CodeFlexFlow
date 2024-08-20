import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import QualificationForm from "@/app/ui/qualification/qualification-form";

import { userId } from "@/app/lib/actions";

export default async function AddQualification() {
  const userActivId = await userId();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Calificare", href: "/home/dashboard/qualification" },
          {
            label: "Adauga Calificare",
            href: "/home/dashboard/qualification/add",
            active: true,
          },
        ]}
      />
      <QualificationForm id={userActivId?.id || ""} />
    </main>
  );
}
