import "react-vertical-timeline-component/style.min.css";

import ExperienceCv from "@/app/ui/profile/MyCv/ExperienceCv";
import QualificationsCv from "@/app/ui/profile/MyCv/QualificationsCv";
import { userData } from "@/app/lib/actions";
import Motion from "@/app/ui/profile/MyCv/Motion";
import Hero from "@/app/ui/profile/MyCv/CvHero";

export default async function MyCvPage() {
  const user = await userData();
  ////console.log(user);
  return (
    <div>
      <h1>My CV</h1>
      <Hero user={user} />
      <Motion title={"Where I Learned?"} subTitle={"My Learning!"} />
      <div className="m-5"></div>
      <QualificationsCv user={user} />
      <div className="m-5"></div>
      <Motion title={"Where I Worked?"} subTitle={"My Experience!"} />
      <div className="m-5"></div>
      <ExperienceCv user={user} />
    </div>
  );
}
