import { updateInviteById } from "../../lib/actions";
import { revalidatePath } from "next/cache";
import { selectUserCvFull, getInvitesById } from "../../lib/myDb";
import "react-vertical-timeline-component/style.min.css";
import ExperienceCv from "../../ui/Home/Profile/MyCv/ExperienceCv";
import QualificationsCv from "../../ui/Home/Profile/MyCv/QualificationsCv";
import Motion from "../../ui/Home/Profile/MyCv/Motion";
import Hero from "../../ui/Home/Profile/MyCv/CvHero";
import Navbar from "../../ui/Home/Profile/MyCv/Navbar";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import EarthCanvas from "../../ui/Home/Profile/MyCv/Earth";
import ContactCard from "../../ui/Home/Profile/MyCv/Contact";
import StarsCanvas from "../../ui/Home/Profile/MyCv/Stars";
import { set } from "zod";
export default async function CvPage(props) {
  const params = await props.params;
  const { invitationId } = params;
  let contactVisible = false;

  const toggleContactVisibility = () => {
    contactVisible = !contactVisible;
  };

  const invite = await getInvitesById(invitationId);
  let expires;
  if (invite) {
    expires = new Date(invite?.expires_at);
    updateInviteById(invitationId);
  }
  if (Date.now() > Date.parse(expires)) {
    return (
      <main className="flex h-[100vh] flex-col items-center justify-start bg-[#050816]">
        <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          <div className="relative my-5 bg-red-200 rounded-md border">
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[21px] w-[21px] -translate-y-1/2 text-red-500 dark:text-red-500" />
            <div className="rounded-md border border-red-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-red-200 text-black dark:text-black dark:border-red-400">
              The invitation Link is expired!
            </div>
          </div>
        </div>
      </main>
    );
  }
  let user;
  if (invite) {
    user = await selectUserCvFull(invite.user_id);
  }

  if (!invite) {
    return (
      <main className="flex h-[100vh] flex-col items-center justify-start bg-[#050816]">
        <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-12">
          <div className="relative my-5 bg-red-200 rounded-md border">
            <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[21px] w-[21px] -translate-y-1/2 text-red-500 dark:text-red-500" />
            <div className="rounded-md border border-red-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-red-200 text-black dark:text-black dark:border-red-400">
              The invitation Code is invalid or expired!
            </div>
          </div>
        </div>
      </main>
    );
  }
  //console.log("User: ", user);
  return (
    <main className="w-[100vw] h-full bg-[#050816] -z-40 m-0 scroll-smooth">
      <div>
        <div
          className="bg-hero-background bg-cover bg-no-repeat bg-center"
          id="about"
        >
          <Navbar user={user} userAbilities={user.skills} />
          <Hero user={user} />
        </div>
        <div className="m-5"></div>
        <Motion
          title={"Where I Worked?"}
          subTitle={"My Experience!"}
          duration={1}
          delay={0.4}
        />
        <div className="m-5"></div>
        <ExperienceCv user={user} />
        <div className="m-5"></div>
        <Motion
          title={"Where I Learned?"}
          subTitle={"My Learning!"}
          duration={1}
          delay={0.4}
        />
        <div className="m-5"></div>
        <QualificationsCv user={user} />
        <div className="m-5"></div>
        {user.Abilities ? (
          <>
            <div className="m-5"></div>
            <Motion
              title={"Personal Abilities!"}
              subTitle={"Abilities!"}
              duration={1}
              delay={0.4}
            />
            <div className="m-5"></div>{" "}
          </>
        ) : null}
        <div className=" relative h-auto z-30">
          <Motion
            title={"Contact Me"}
            subTitle={"Get in Touch!"}
            duration={1}
            delay={0.3}
          />
          <div>
            <StarsCanvas />
            <div className="absolute bottom-20 left-[5px] w-[200px] h-[200px] md:w-[400px] md:h-[400px] md:bottom-5 ">
              <EarthCanvas url="../../planet/scene.gltf" />
            </div>
            <ContactCard user={user.personal_info} />
          </div>
        </div>
      </div>
    </main>
  );
}
