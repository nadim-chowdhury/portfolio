// import { myProjects } from "@/utls/demoData";
// import Heading from "./Heading";
// import Image from "next/image";
// import Link from "next/link";
// import { FaArrowRight, FaGithub } from "react-icons/fa";
// import ProjectCards from "./ProjectCards";

// export default function Projects() {
//   return (
//     <section className="pt-16">
//       <Heading title="Full Stack Projects" />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {myProjects.map((item) => (
//           <ProjectCards key={item.id} item={item} />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { myProjects } from "@/utls/demoData";
import Heading from "./Heading";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProjectCards from "./ProjectCards";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Projects() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="pt-16" ref={ref}>
      <Heading title="Full Stack Projects" />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {myProjects.map((item) => (
          <ProjectCards key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  );
}
