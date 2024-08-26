"use client";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../lib/utils";
import { EditIcon } from "./admin/table/EditIcon";
import Link from "next/link";
import DeleteQualification from "./qualification/DeleteQualification";

export default function Card({ data, delay, tools }: any) {
  const { title, description, dates } = data;
  return (
    <Tilt
      options={{
        max: 25,
        scale: 1,
        speed: 650,
      }}
      className="bg-tertiary p-2 rounded-2xl w-[360px] "
    >
      <motion.div
        layout
        variants={fadeIn("up", "spring", delay, 0.75)}
        drag
        dragConstraints={{
          top: -20,
          left: -20,
          right: 20,
          bottom: 20,
        }}
        initial="hidden"
        className="w-full green-pink-gradient p-[2px] rounded-[20px] dark:shadow-card"
        whileInView="show"
      >
        <div className="dark:bg-[#151030] bg-stone-100 rounded-[20px] flex justify-evenly items-center flex-col">
          <div className=" bg-rose-200 dark:bg-emerald-900 w-full rounded-t-[20px] text-center py-3">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className=" text-center  w-full mt-4">
            <h1 className="text-lg font-bold">{dates}</h1>
          </div>
          <hr className="mt-4 border-[.3mm] border-gray-500 w-[90%]" />
          <div className=" py-6 px-4 w-full ">
            <p className="text-gray-700 dark:text-gray-300 indent-6">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}
