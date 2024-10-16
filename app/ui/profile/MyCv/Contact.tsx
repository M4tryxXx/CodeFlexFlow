"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function ContactCard({ user }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      // whileTap={{
      //   scale: 1.5,
      //   transition: { duration: 0.2 },
      // }}
      transition={{
        duration: 3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 2,
          stiffness: 50,
          restDelta: 0.001,
        },
      }}
      // whileDrag={{ scale: 1.2, transition: { duration: 0.3 } }}
      // drag
      // dragConstraints={{
      //   top: -500,
      //   left: -140,
      //   right: 20,
      //   bottom: 50,
      // }}
      viewport={{ once: true }}
    >
      <div className="flex justify-end  z-70">
        <div className="container md:mr-[10%] mb-8 w-64 md:w-[400px] p-4">
          <div className=" max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {user.first_name} {user.last_name}
            </h2>
          </div>
          <div className=" max-w-lg mx-auto green-pink-gradient p-[2px] rounded-[20px] dark:shadow-md">
            <div className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-800 dark:bg-opacity-90 p-3 md:p-6 rounded-[20px] ">
              <p className="mb-2">
                <strong className="text-sm md:text-lg">Email:</strong>{" "}
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-400 text-sm md:text-lg"
                >
                  &nbsp;{user.email}
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-sm md:text-lg">Phone:</strong>{" "}
                <a
                  href={`tel:${user.phone}`}
                  className="text-blue-400 text-sm md:text-lg"
                >
                  &nbsp;{user.phone}
                </a>
              </p>
              <div className="mb-2 flex fel-row justify-start gap-2">
                <div>
                  <strong className="text-sm md:text-lg">Address: </strong>
                </div>
                <div>
                  <span className="text-sm md:text-lg">
                    {user.city ? ` ${user.city}` : ""}
                    {user.city ? <br /> : ""}
                    {/* {user.address ? ` ${user.address}` : ""}
                    {user.city ? <br /> : ""}
                    {user.street ? ` ${user.user.street}` : ""}{" "}
                    {user.street ? <br /> : ""}
                    {user.house ? ` ${user.house}` : ""}{" "} */}
                    {user.house ? <br /> : ""}
                    {user.state ? ` ${user.state}` : ""}{" "}
                    {user.state ? <br /> : ""}
                    {user.zip ? ` ${user.zip}` : ""}{" "}
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm">Tap and hold for zoom!</p>
              {/* <Button color="danger" variant="bordered">
                Animate
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
