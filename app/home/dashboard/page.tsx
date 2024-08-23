import { myStyles } from "@/app/styles";
import InvitationForm from "@/app/ui/dashboard/InviteForm";

export default function dashPage() {
  return (
    <main className={`${myStyles.main}`}>
      <InvitationForm />
    </main>
  );
}
