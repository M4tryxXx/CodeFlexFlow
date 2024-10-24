"use client";

import React from "react";
import { motion } from "framer-motion";
import About from "./AboutMe";

const Hero = ({ user }: any) => {
  //console.log(user);
  return (
    <section
      className="relative w-full max-h-[800px] min-h-[400px] md:min-h-[700px] mt-1"
      style={{ height: "85vh" }}
    >
      <div
        className={`sm:px-16 px-6 absolute inset-0 top-[140px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center md:mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-96 bg-gradient-to-b from-[#915eff]" />
        </div>

        <div>
          <h1
            className={`font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2`}
          >
            Hi, I'm{" "}
            <span className="text-[#915eff]">
              {user.personal_info.first_name}
            </span>
          </h1>
          <p
            className={`text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100`}
          >
            I am a{" "}
            {user.qualifications[0]?.degree
              ? user.qualifications[0]?.degree
              : "Missing Information"}
          </p>
          <About user={user} />
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#915eff] mb-1"
            />
          </div>
          <div id="experience"></div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
