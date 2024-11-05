"use client";

import { mySkills } from "@/utls/demoData";
import Heading from "./Heading";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="pt-16" ref={ref}>
      <Heading title="My Skills" />

      <motion.div
        className="grid grid-cols-2 md:flex md:items-center md:flex-wrap md:justify-center gap-4 lg:gap-6"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {mySkills?.map((item) => (
          <motion.div
            key={item.id}
            className="py-2 px-4 bg-gradient-to-tr from-white to-cyan-50 border rounded-full flex items-center gap-2 lg:gap-4 transition-all duration-300 hover:from-cyan-50 hover:to-white hover:shadow cursor-pointer"
            variants={itemVariants}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={360}
              height={360}
              className="w-6 h-6 lg:w-8 lg:h-8 object-contain rounded-full shadow p-1"
            />
            <h3 className="text-sm lg:text-base font-medium tracking-wide">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
