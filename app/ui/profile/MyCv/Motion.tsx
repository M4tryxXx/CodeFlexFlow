"use client";

const { motion } = require("framer-motion");

export default function Motion({ title, subTitle }: any) {
  //console.log(title);
  const textVariant = () => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.5,
          delay: 0.4,
        },
      },
    };
  };

  return (
    <motion.div
      variants={textVariant()}
      initial="hidden"
      whileInView="show"
      className="text-center"
      style={{ y: -50, opacity: 0 }}
    >
      <p
        className={`sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider text-center`}
      >
        {subTitle}
      </p>
      <h2
        className={`dark:text-white text-black font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center`}
      >
        {title}
      </h2>
    </motion.div>
  );
}
