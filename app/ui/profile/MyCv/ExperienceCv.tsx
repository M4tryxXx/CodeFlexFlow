"use client";

const {
  VerticalTimeline,
  VerticalTimelineElement,
} = require("react-vertical-timeline-component");
import "react-vertical-timeline-component/style.min.css";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { formatDateYearMonth } from "@/app/lib/utils";

export default function ExperienceCv({ user }: any) {
  if (user.experiences.length > 0) {
    let experienceElements = user.experiences.map((exp: any, index: any) => {
      const experienceDate = formatDateYearMonth(exp.start_date, exp.end_date);
      const { from, to } = experienceDate;

      if (index === user.experiences.length - 1) {
        return (
          <>
            <VerticalTimelineElement
              contentStyle={{
                background: "#1d1836",
                color: "#fff",
                boxShadow: " 0 4px 0 0 #11e5b4",
                border: "2px solid #220c22",
              }}
              key={exp.id}
              contentArrowStyle={{ borderRight: "7px solid  #fff" }}
              date={`${from.month} ${from.year} - ${to.month} ${to.year}`}
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<DocumentIcon />}
              iconClassName={"dark:bg-emerald-950"}
              dateClassName={"mx-5 font-bold text-lg"}
            >
              <h1 className="text-2xl text-white font-bold">{exp.company}</h1>
              <h3
                id="qualification"
                className="text-xl text-white underline-2 underline underline-offset-4"
              >
                {exp.position}
              </h3>
              <p className="text-md font-bold">{exp.field}</p>
              {exp.description ? (
                <>
                  <p className="text-gray-200 dark:text-gray-300 indent-6 my-2">
                    {exp.description}
                  </p>
                </>
              ) : (
                ""
              )}
            </VerticalTimelineElement>
          </>
        );
      } else {
        ////console.log(exp);
        return (
          <>
            <VerticalTimelineElement
              contentStyle={{
                background: "#1d1836",
                color: "#fff",
                boxShadow: " 0 4px 0 0 #11e5b4",
                border: "2px solid #220c22",
              }}
              contentAttribute={{ key: `${exp.key}` }}
              contentArrowStyle={{ borderRight: "7px solid  #fff" }}
              key={exp.id}
              date={`${from.month} ${from.year} - ${to.month} ${to.year}`}
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<DocumentIcon />}
              iconClassName={"dark:bg-emerald-950"}
              dateClassName={"mx-5 font-bold text-2xl"}
            >
              <h1 className="text-2xl text-white font-bold">{exp.company}</h1>
              <h3 className="text-xl text-white underline-2 underline underline-offset-4">
                {exp.position}
              </h3>
              <p className="text-md font-bold">{exp.field}</p>
              {exp.description ? (
                <>
                  <p className="text-gray-200 dark:text-gray-300 indent-6 my-2">
                    {exp.description}
                  </p>
                </>
              ) : (
                ""
              )}
            </VerticalTimelineElement>
          </>
        );
      }
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
