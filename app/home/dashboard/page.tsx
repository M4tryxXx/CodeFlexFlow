import { myStyles } from "@/app/styles";
import InvitationForm from "@/app/ui/dashboard/InviteForm";
import { userData } from "@/app/lib/actions";

export default async function dashPage() {
  const user = await userData();
  return (
    <main className={`${myStyles.main}`}>
      <InvitationForm user={user.user} />
    </main>
  );
}
