import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import QualificationForm from "@/app/ui/Home/Qualification/Qualification-form";
import { auth } from "@/auth";

import { getLoggedUser } from "@/app/lib/actions";

export default async function AddQualification() {
  const session = await auth();
  const session_user_id = await getLoggedUser(session?.user?.email);
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
