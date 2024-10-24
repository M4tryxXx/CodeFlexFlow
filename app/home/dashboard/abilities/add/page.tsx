import Breadcrumbs from "@/app/ui/Experience/breadcrumbs";
import QualificationForm from "@/app/ui/Home/Qualification/Qualification-form";

import { getLoggedUser } from "@/app/lib/actions";

export default async function AddQualification() {
  const session_user_id = await getLoggedUser();
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
      <QualificationForm id={session_user_id?.id || ""} />
    </main>
  );
}
