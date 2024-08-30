import "react-vertical-timeline-component/style.min.css";

import { userData } from "@/app/lib/actions";
import "react-vertical-timeline-component/style.min.css";
import ExperienceCv from "@/app/ui/profile/MyCv/ExperienceCv";
import QualificationsCv from "@/app/ui/profile/MyCv/QualificationsCv";
import Motion from "@/app/ui/profile/MyCv/Motion";
import Hero from "@/app/ui/profile/MyCv/CvHero";
import Navbar from "@/app/ui/profile/MyCv/Navbar";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ContactMe from "@/app/ui/Contact/ContactMe";
import EarthCanvas from "@/app/ui/profile/MyCv/Earth";
import ContactCard from "@/app/ui/profile/MyCv/Contact";
import StarsCanvas from "@/app/ui/profile/MyCv/Stars";

export default async function MyCvPage() {
  const user = await userData();
  ////console.log(user);
  return (
    <div className="relative h-full bg-[#050816]">
      <h1>My CV</h1>
      <div className="bg-[url('./images/herobg.png')] bg-cover bg-no-repeat bg-center">
        {/* <Navbar user={user.user} userAbilities={true} /> */}
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
            <EarthCanvas url="../../../planet/scene.gltf" />
          </div>
          <ContactCard user={user} />
        </div>
      </div>
    </div>
  );
}
