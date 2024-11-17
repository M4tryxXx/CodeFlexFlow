import QualificationForm from "../../../../ui/Home/Qualification/Qualification-form";
import { UserData } from "../../../../lib/get_user_full";

export default async function AddQualification() {
  const session_user_id = await UserData();
  //(session_user_id);
  return (
    <main>
      <QualificationForm id={session_user_id?.id || ""} />
    </main>
  );
}
