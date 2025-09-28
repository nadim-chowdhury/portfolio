"use client";

import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { projects } from "@/utils/demoData";
import Link from "next/link";
import Heading from "./Heading";

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

export default function AdditionalProjects() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="pt-16" ref={ref}>
      <Heading title="Additional Projects" />

      <motion.div
        className="flex flex-wrap justify-center gap-4 lg:gap-6"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {projects.map((project) => (
          <motion.div
            key={project.name}
            className="bg-gradient-to-tr from-white to-cyan-50 px-4 py-2 lg:py-4 rounded-full border flex items-center gap-4 transition-all duration-300 hover:from-cyan-50 hover:to-white hover:shadow"
            variants={itemVariants}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>

            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 font-medium"
            >
              {project.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
