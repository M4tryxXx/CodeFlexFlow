import { getInvitesById } from "@/app/lib/myDb";
import { userDataById, updateInviteById } from "@/app/lib/actions";
import "react-vertical-timeline-component/style.min.css";
import AcmeLogo from "@/app/ui/acme-logo";
import ExperienceCv from "@/app/ui/profile/MyCv/ExperienceCv";
import QualificationsCv from "@/app/ui/profile/MyCv/QualificationsCv";
import Motion from "@/app/ui/profile/MyCv/Motion";
import Hero from "@/app/ui/profile/MyCv/CvHero";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
export default async function CvPage({
  params,
}: {
  params: { invitationId: string };
}) {
  const { invitationId } = params;
  const invite = await getInvitesById(invitationId);
  let user: any;
  if (invite) {
    user = await userDataById(invite.userId);
    await updateInviteById(invitationId);
  }

  if (!invite) {
    return (
      <main className="flex h-full flex-col items-center justify-center">
        <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
          <AcmeLogo />
        </div>

        <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          <div className="relative my-5 bg-red-200 rounded-md border">
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
            <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
              The invitation Code is invalid or expired!
            </div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="w-[100vw] h-full bg-[#050816] m-0">
      <div>
        <Hero user={user} />
        <Motion title={"Where I Learned?"} subTitle={"My Learning!"} />
        <div className="m-5"></div>
        <QualificationsCv user={user} />
        <div className="m-5"></div>
        <Motion title={"Where I Worked?"} subTitle={"My Experience!"} />
        <div className="m-5"></div>
        <ExperienceCv user={user} />
      </div>
    </main>
  );
}
