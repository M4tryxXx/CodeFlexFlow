import QualificationForm from "../../../../ui/Home/Qualification/Qualification-form";

import { getUserF } from "../../../../lib/get_items";
import { auth } from "../../../../../auth";

export default async function AddQualification() {
  const session = await auth();
  const session_user_id = await getUserF(session?.user?.email ?? undefined);
  return (
    <main>
      <QualificationForm id={session_user_id?.id || ""} />
    </main>
  );
}
