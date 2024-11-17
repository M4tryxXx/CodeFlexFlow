"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, textVariant } from "../../lib/utils";
import { EditIcon } from "../Admin/Table/EditIcon";
import Link from "next/link";
import DeleteQualification from "../Home/Qualification/DeleteQualification";
import DeleteExperience from "../Home/Experience/DeleteExperience";

export default function Card({ data, delay }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Adjust the threshold as needed
  }); // Adjust the threshold as needed

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const {
    company_school,
    title_position,
    field,
    city,
    description,
    dates,
    id,
    type,
  } = data;
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: 100 },
        show: { opacity: 1, x: 0, transition: { type: "spring", delay } },
      }}
      initial="hidden"
      animate={controls}
      className="w-full min-h-[250px] m-6 md:w-[400px] green-pink-gradient p-[2px] rounded-[20px] dark:shadow-card"
    >
      <div className="dark:bg-[#151030] bg-stone-100 rounded-[20px] flex items-center flex-col w-full h-full m-0">
        <div className=" bg-rose-200 dark:bg-emerald-900 w-full rounded-t-[20px] text-center mt-0 py-3">
          <h1 className="text-2xl font-bold">{company_school}</h1>
        </div>
        <div className=" text-center  w-full mt-2">
          <h1 className="text-lg font-bold">{dates}</h1>
        </div>
        <hr className="mt-2 border-[.3mm] border-gray-500 w-[90%]" />
        <div className=" flex flex-col justify-between py-4 px-6 w-full h-full ">
          <h1 className="text-lg font-bold">{title_position}</h1>
          <h1 className="text-md font-bold">{field}</h1>

          <hr className="mt-2 border-[.3mm] border-gray-500 w-full " />
          <h4 className="text-base font-bold mt-2">{city}</h4>
          {description ? (
            <>
              <p className="text-gray-700 dark:text-gray-300 indent-6 my-2">
                {description}
              </p>
              <hr className="mt-2 border-[.3mm] border-gray-500 w-full" />{" "}
            </>
          ) : (
            ""
          )}
          <div className="flex flex-row justify-end mt-3 w-full px-3 pb-3">
            {type === "qualifications" ? (
              <Link href={`/home/dashboard/qualifications/${id}`}>
                <EditIcon className="w-8 dark:text-yellow-300 mx-1 z-50" />
              </Link>
            ) : (
              <Link href={`/home/dashboard/experiences/${id}`}>
                <EditIcon className="w-8 dark:text-yellow-300 mx-1 z-50" />
              </Link>
            )}

            {type === "qualifications" ? (
              <DeleteQualification id={id} />
            ) : (
              <DeleteExperience id={id} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
