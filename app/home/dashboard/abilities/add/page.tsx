import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import QualificationForm from "@/app/ui/Home/Qualification/Qualification-form";

import { getLoggedUser } from "@/app/lib/actions";
import { getUserF } from "@/app/lib/get_items";
import { auth } from "@/auth";

export default async function AddQualification() {
  const session = await auth();
  const session_user_id = await getUserF(session?.user?.email ?? undefined);
  return (
    <main>
      <Breadcrumbs />
      <QualificationForm id={session_user_id?.id || ""} />
    </main>
  );
}
