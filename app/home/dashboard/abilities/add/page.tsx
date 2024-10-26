import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import QualificationForm from "@/app/ui/Home/Qualification/Qualification-form";

import { getLoggedUser } from "@/app/lib/actions";
import { auth } from "@/auth";

export default async function AddQualification() {
  const session = await auth();
  const session_user_id = await getLoggedUser(session?.user?.email);
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
