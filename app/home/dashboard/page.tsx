import { myStyles } from "@/app/styles";
import InvitationForm from "@/app/ui/dashboard/InviteForm";
import InvitesTable from "@/app/ui/dashboard/InvitesTable";
import { userData } from "@/app/lib/actions";

export default async function dashPage() {
  const user = await userData();
  return (
    <main className={`${myStyles.main}`}>
      <div className="mb-10 max-w-[600px]">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          {user?.Invites?.length === 1
            ? `You have sent ${user?.Invites?.length} invite`
            : `You have sent ${user?.Invites?.length} invites`}
        </h3>

        <InvitesTable invites={user.Invites} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <InvitationForm user={user.user} />
        </div>
      </div>
    </main>
  );
}
