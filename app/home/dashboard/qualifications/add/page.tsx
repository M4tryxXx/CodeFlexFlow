import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import QualificationForm from "@/app/ui/Home/Qualification/Qualification-form";
import { auth } from "@/auth";

import { getLoggedUser } from "@/app/lib/actions";
import { getUserF } from "@/app/lib/get_items";

export default async function AddQualification() {
  const session = await auth();
  const session_user_id = await getUserF(session?.user?.email ?? undefined);
  //(session_user_id);
  return (
    <main>
      <Breadcrumbs />
      <QualificationForm id={session_user_id?.id || ""} />
    </main>
  );
}
