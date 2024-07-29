"use client";

import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
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

export default function Education() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="pt-16" ref={ref}>
      <Heading title="My Education" />

      <motion.div
        className="mb-6 text-center space-y-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h3 className="text-center md:text-xl font-semibold">
            BSC (Department of Mathematics) - Habibullah Bahar University
            College
          </h3>
          <p>(2019 - Dropout)</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-center md:text-xl font-semibold">
            HSC (Science Stream) - Kabi Nazrul Govt. College
          </h3>
          <p>(2017 - 2019)</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
