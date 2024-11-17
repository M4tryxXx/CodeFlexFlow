import "react-vertical-timeline-component/style.min.css";

import { userData } from "../../../../lib/actions";
import "react-vertical-timeline-component/style.min.css";
import ExperienceCv from "../../../../ui/Home/Profile/MyCv/ExperienceCv";
import QualificationsCv from "../../../../ui/Home/Profile/MyCv/QualificationsCv";
import Motion from "../../../../ui/Home/Profile/MyCv/Motion";
import Hero from "../../../../ui/Home/Profile/MyCv/CvHero";
import EarthCanvas from "../../../../ui/Home/Profile/MyCv/Earth";
import ContactCard from "../../../../ui/Home/Profile/MyCv/Contact";
import StarsCanvas from "../../../../ui/Home/Profile/MyCv/Stars";

export default async function MyCvPage() {
  const user = await userData();
  let contactVisible = false;

  const toggleContactVisibility = () => {
    contactVisible = !contactVisible;
  };

  //console.log(user);
  return (
    <div className="relative h-full bg-[#050816]">
      <h1>My CV</h1>
      <div className="bg-hero-background bg-cover bg-no-repeat bg-center">
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
      {user.skills.length > 0 ? (
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
          <div className="absolute bottom-20 left-[5px] w-[200px] h-[200px] md:w-[400px] md:h-[400px] md:bottom-5 -z-50">
            <EarthCanvas url="../../../planet/scene.gltf" />
          </div>

          <ContactCard user={user.personal_info} />
        </div>
      </div>
    </div>
  );
}
