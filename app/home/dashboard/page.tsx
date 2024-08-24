import { myStyles } from "@/app/styles";
import InvitationForm from "@/app/ui/dashboard/InviteForm";
import InvitesTable from "@/app/ui/dashboard/InvitesTable";
import { userData } from "@/app/lib/actions";

export default async function dashPage() {
  const user = await userData();
  return (
    <main className={`${myStyles.main}`}>
      <div className="flex flex-col justify-center items-start w-full mb-5">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 opacity-75">
          Your Dashboard
        </h1>
        <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
        <div>
          <InvitationForm user={user.user} />
        </div>
      </div>

      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          {user?.Invites?.length === 1
            ? `You have sent ${user?.Invites?.length} invite`
            : `You have sent ${user?.Invites?.length} invites`}
        </h3>

        <InvitesTable invites={user.Invites} />
      </div>
    </main>
  );
}
