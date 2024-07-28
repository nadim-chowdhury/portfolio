"use client";

import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/utls/demoData";
import Heading from "./Heading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Experiences() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="pt-16" ref={ref}>
      <Heading title="My Experience" />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white p-6 rounded-md border transition-all duration-300 hover:bg-gradient-to-tr hover:from-cyan-50 hover:to-white"
          >
            <div className="flex items-center gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 !h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold">{experience.title}</h3>
            </div>
            <p className="px-4 py-2 my-2 bg-gradient-to-tr from-white to-cyan-50 text-teal-600 border rounded-full text-sm lg:text-base">
              {experience.date}
            </p>

            <ul className="list-disc list-inside">
              {experience.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>

            {experience.techUsed && (
              <p className="mt-2 pt-2 border-t">
                <span className="font-semibold">Technology Used:</span>{" "}
                {experience.techUsed}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
