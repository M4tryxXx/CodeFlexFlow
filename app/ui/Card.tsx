"use client";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../lib/utils";

export default function Card({ title, description, delay, index }: any) {


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
        whileInView= "show"
        className="w-full green-pink-gradient p-[2px] rounded-[20px] shadow-card"
      >
        <div className="bg-[#151030] rounded-[20px] py-2 px-3 flex justify-evenly items-center flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <hr className="my-4 border-[.3mm] border-gray-500 w-full" />
          <p className="text-gray-700 dark:text-gray-300 indent-6">
            {description}
          </p>
        </div>
      </motion.div>
    </Tilt>
  );
}
