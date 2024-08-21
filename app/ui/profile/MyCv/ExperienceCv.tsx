"use client";

const {
  VerticalTimeline,
  VerticalTimelineElement,
} = require("react-vertical-timeline-component");
const { motion } = require("framer-motion");
import "react-vertical-timeline-component/style.min.css";
import { DocumentIcon } from "@heroicons/react/24/outline";
export default function ExperienceCv({ user }: any) {
  if (user.experience.length > 0) {
    let experienceElements = user.experience.map((exp: any) => {
      const fromFormatted = new Date(exp.from);
      console.log(fromFormatted);
      const toFormatted = new Date(exp.to);
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
      //console.log(exp);
      return (
        <>
          <VerticalTimelineElement
            contentStyle={{
              background: "#1d1836",
              color: "#fff",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            key={exp.id}
            date={`${monthFrom} ${fromYear} - ${monthTo} ${toYear}`}
            iconStyle={{ background: "#000", color: "#fff" }}
            icon={<DocumentIcon />}
            iconClassName={"dark:bg-emerald-950"}
            dateClassName={"mx-5 font-bold text-lg"}
          >
            <h3 className="vertical-timeline-element-title">{exp.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">
              {exp.company}
            </h4>
            <p>{exp.description}</p>
          </VerticalTimelineElement>
        </>
      );
    });

    return <VerticalTimeline>{experienceElements}</VerticalTimeline>;
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
          No Experience added!
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Add Experience!</h4>
        <p>Add Experience!</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
}
