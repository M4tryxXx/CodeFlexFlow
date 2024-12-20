"use client";
import React from "react";
const {
  VerticalTimeline,
  VerticalTimelineElement,
} = require("react-vertical-timeline-component");
import "react-vertical-timeline-component/style.min.css";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { formatDateYearMonth } from "../../../../lib/utils";

export default function QualificationsCv({ user }) {
  //console.log(user);
  if (user.qualifications.length > 0) {
    let qualificationElements = user.qualifications.map((qual, index) => {
      const experienceDate = formatDateYearMonth(
        qual.start_date,
        qual.end_date
      );
      const { from, to } = experienceDate;

      if (index === user.qualifications.length - 1) {
        return (
          <React.Fragment key={qual.id + "last"}>
            <VerticalTimelineElement
              contentStyle={{
                background: "#1d1836",
                color: "#fff",
                boxShadow: " 0 4px 0 0 #11e5b4",
                border: "2px solid #220c22",
              }}
              contentArrowStyle={{ borderRight: "7px solid  #fff" }}
              key={`${qual.id}${qual.name}`}
              date={`${from.month} ${from.year} - ${to.month} ${to.year}`}
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<DocumentIcon />}
              iconClassName={"dark:bg-emerald-950"}
              dateClassName={"mx-5 font-bold text-lg"}
            >
              <h1 className="text-2xl text-white font-bold">{qual.school}</h1>
              <h3
                id="contactme"
                className="text-xl text-white underline-2 underline underline-offset-4"
              >
                {qual.degree}
              </h3>
              <p className="text-md font-bold">{qual.field}</p>
              {qual.description ? (
                <p className="text-gray-200 dark:text-gray-300 indent-6 my-2">
                  {qual.description}
                </p>
              ) : (
                ""
              )}
            </VerticalTimelineElement>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={qual.id + "notlast"}>
            <VerticalTimelineElement
              contentStyle={{
                background: "#1d1836",
                color: "#fff",
                boxShadow: " 0 4px 0 0 #11e5b4",
                border: "2px solid #220c22",
              }}
              contentArrowStyle={{ borderRight: "7px solid  #fff" }}
              key={qual.id + qual.name}
              date={`${from.month} ${from.year} - ${to.month} ${to.year}`}
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<DocumentIcon />}
              iconClassName={"dark:bg-emerald-950"}
              dateClassName={"mx-5 font-bold text-lg"}
            >
              <h1 className="text-2xl text-white font-bold">{qual.school}</h1>
              <h3 className="text-xl text-white underline-2 underline underline-offset-4">
                {qual.degree}
              </h3>
              <p className="text-md font-bold">{qual.field}</p>
              {qual.description ? (
                <p className="text-gray-200 dark:text-gray-300 indent-6 my-2">
                  {qual.description}
                </p>
              ) : (
                ""
              )}
            </VerticalTimelineElement>
          </React.Fragment>
        );
      }
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
