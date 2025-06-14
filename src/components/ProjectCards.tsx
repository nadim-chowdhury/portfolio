"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0.5, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectCards({ item }: any) {
  return (
    <motion.div
      className="bg-gradient-to-tr from-white to-cyan-50 border rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:from-cyan-50 hover:to-white hover:shadow"
      variants={cardVariants}
    >
      <Image
        src={item.img}
        alt={item.title}
        width={1280}
        height={720}
        className="w-full h-42 object-cover rounded-md"
      />

      <div className="mt-6 flex flex-col justify-between grow">
        <h4 className="w-full text-center text-lg bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text font-bold">
          {item.title}
        </h4>

        <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
          {item.technologyUsed.map((item: any, i: any) => (
            <span
              key={i}
              className="px-3 py-1 text-xs text-white rounded-full bg-gradient-to-tr from-teal-600 to-cyan-600"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between w-full mt-4 px-4 pb-4">
          <Link
            href={item.live.link}
            className="flex items-center gap-2 transition-all duration-300 hover:text-teal-600 hover:bg-teal-50 border rounded-full px-4 py-1"
          >
            <span className="font-bold">Live</span>
            <FaArrowRight className="-rotate-45" />
          </Link>
          <Link
            href={item.github.link}
            className="transition-all duration-300 hover:text-teal-600 hover:bg-teal-50 border p-2 rounded-full"
          >
            <FaGithub className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
