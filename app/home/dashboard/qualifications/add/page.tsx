import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import QualificationForm from "@/app/ui/qualification/qualification-form";

import { getLoggedUser } from "@/app/lib/actions";

export default async function AddQualification() {
  const session_user_id = await getLoggedUser();
  //(session_user_id);
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
