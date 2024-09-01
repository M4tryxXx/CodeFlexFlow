"use client";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../lib/utils";
import { EditIcon } from "./admin/table/EditIcon";
import Link from "next/link";
import DeleteQualification from "./qualification/DeleteQualification";
import DeleteExperience from "./experience/DeleteExperience";

export default function Card({ data, delay }: any) {
  const { title, description, dates, id, type } = data;
  return (
    <motion.div
      variants={fadeIn("up", "spring", delay, 0.75)}
      initial="hidden"
      className="w-full min-h-[250px] m-6 md:w-[400px] green-pink-gradient p-[2px] rounded-[20px] dark:shadow-card"
      whileInView="show"
    >
      <div className="dark:bg-[#151030] bg-stone-100 rounded-[20px] flex items-center flex-col w-full h-full m-0">
        <div className=" bg-rose-200 dark:bg-emerald-900 w-full rounded-t-[20px] text-center mt-0 py-3">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className=" text-center  w-full mt-2">
          <h1 className="text-lg font-bold">{dates}</h1>
        </div>
        <hr className="mt-2 border-[.3mm] border-gray-500 w-[90%]" />
        <div className=" flex flex-col justify-between py-4 px-6 w-full h-full ">
          <p className="text-gray-700 dark:text-gray-300 indent-6">
            {description}
          </p>
          <div className="flex flex-row justify-end mt-3 w-full px-3 pb-3">
            <Link href={`/home/dashboard/qualification/${id}`}>
              <EditIcon className="w-8 dark:text-yellow-300 mx-1 z-50" />
            </Link>

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
