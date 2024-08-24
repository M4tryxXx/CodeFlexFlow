import { getInvitesById } from "@/app/lib/myDb";
import { userDataById, updateInviteById } from "@/app/lib/actions";
import "react-vertical-timeline-component/style.min.css";

import ExperienceCv from "@/app/ui/profile/MyCv/ExperienceCv";
import QualificationsCv from "@/app/ui/profile/MyCv/QualificationsCv";
import Motion from "@/app/ui/profile/MyCv/Motion";
import Hero from "@/app/ui/profile/MyCv/CvHero";

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
