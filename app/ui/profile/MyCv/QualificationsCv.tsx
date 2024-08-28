"use client";

const {
  VerticalTimeline,
  VerticalTimelineElement,
} = require("react-vertical-timeline-component");
import "react-vertical-timeline-component/style.min.css";
import { DocumentIcon } from "@heroicons/react/24/outline";

export default function QualificationsCv({ user }: any) {
  //console.log(user);
  if (user.qualifications.length > 0) {
    let qualificationElements = user.qualifications.map((qual: any) => {
      const fromFormatted = new Date(qual.from);
      //console.log(fromFormatted);
      const toFormatted = new Date(qual.to);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const fromYear = fromFormatted.getFullYear();
      const toYear = toFormatted.getFullYear();
      const monthFrom = months[fromFormatted.getMonth()];
      const monthTo = months[toFormatted.getMonth()];
      ////console.log(exp);
      return (
        <>
          <VerticalTimelineElement
            contentStyle={{
              background: "#1d1836",
              color: "#fff",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            key={qual.id + qual.name}
            date={`${monthFrom} ${fromYear} - ${monthTo} ${toYear}`}
            iconStyle={{ background: "#000", color: "#fff" }}
            icon={<DocumentIcon />}
            iconClassName={"dark:bg-emerald-950"}
            dateClassName={"mx-5 font-bold text-lg"}
          >
            <h3 className="vertical-timeline-element-title">
              {qual.qualification}
            </h3>
            <h4 className="vertical-timeline-element-subtitle">{qual.name}</h4>
            <p>{qual.description}</p>
          </VerticalTimelineElement>
        </>
      );
    });

    return <VerticalTimeline>{qualificationElements}</VerticalTimeline>;
  }
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        contentStyle={{
          background: "#1d1836",
          color: "#fff",
        }}
        contentArrowStyle={{ borderRight: "7px solid  #232631" }}
        date={"Today"}
        iconStyle={{ background: "#000", color: "#fff" }}
        icon={<DocumentIcon />}
        iconClassName={"dark:bg-emerald-950"}
        dateClassName={"mx-5 font-bold text-lg"}
      >
        <h3 className="vertical-timeline-element-title">
          No Qualification added!
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          Add Qualifications!
        </h4>
        <p>Add Qualifications!</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
}
