"use client";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../lib/utils";

export default function Card({ title, date, description, delay, index }: any) {
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
        variants={fadeIn("up", "spring", delay, 0.75)}
        initial="hidden"
        className="w-full green-pink-gradient p-[2px] rounded-[20px] dark:shadow-card"
        whileInView="show"
      >
        <div className="dark:bg-[#151030] bg-stone-100 rounded-[20px] flex justify-evenly items-center flex-col">
          <div className=" bg-rose-200 w-full b">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <hr className="my-4 border-[.3mm] border-gray-500 w-full" />
          <div className="  w-full ">
            <h1 className="text-2xl font-bold">{date}</h1>
          </div>
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
