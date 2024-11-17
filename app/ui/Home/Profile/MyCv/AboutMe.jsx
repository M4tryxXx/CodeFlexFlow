"use client";
import React from "react";
import { motion } from "framer-motion";

import { fadeIn, textVariant } from "../../../../lib/utils";

export default function About({ user }) {
  return (
    <>
      <motion.div variants={textVariant(0.5)} className=" mt-6">
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Introduction
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Overview
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 indent-6 text-[17px] max-w-3xl leading-[30px]"
      >
        {user.personal_info.bio || "No information provided"}
      </motion.p>
    </>
  );
}
