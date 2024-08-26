"use client";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../lib/utils";
import { useInView } from "react-intersection-observer";

export default function Card({ title, date, description, delay, index }: any) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <Tilt
      options={{
        max: 25,
        scale: 1,
        speed: 650,
      }}
      className="bg-tertiary p-5 rounded-2xl w-[360px] "
    >
      <motion.div
        ref={ref}
        variants={fadeIn("up", "spring", delay, 0.75)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="w-full green-pink-gradient p-[2px] rounded-[20px] dark:shadow-card"
      >
        <div className="dark:bg-[#151030] bg-stone-100 rounded-[20px] py-5 px-12 flex justify-evenly items-center flex-col">
          <div className=" bg-rose">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <hr className="my-4 border-[.3mm] border-gray-500 w-full" />
          <p className="text-gray-700 dark:text-gray-300 indent-6">
            {description}
          </p>
        </div>
      </motion.div>
    </Tilt>
  );
}
