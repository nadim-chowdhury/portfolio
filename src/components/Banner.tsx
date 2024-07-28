// import Link from "next/link";
// import { FaCode, FaDev, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// export default function Banner() {
//   return (
//     <section className="py-20 lg:py-48">
//       <div className="font-bold text-center">
//         <h3 className="text-4xl sm:text-6xl">Hello World!</h3>
//         <h1 className="text-3xl sm:text-7xl my-6 lg:my-10">
//           I&apos;m{" "}
//           <span className="bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
//             Nadim Chowdhury
//           </span>
//         </h1>
//         <h4 className="sm:text-2xl">
//           <span className="bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
//             MERN/FULL
//           </span>{" "}
//           Stack Developer
//         </h4>
//       </div>

//       <p className="text-center mt-10 text-slate-600">
//         As a self learned creative and passionate programmer/developer I like to
//         build and develop software for any platform. Learning, improving skills,
//         solving problems, and adapting to new technologies are my hobbies. I can
//         give my total effort and perform teamwork with responsibility.
//       </p>

//       <div className="flex items-center justify-center gap-4 mt-10">
//         <Link
//           href="https://www.linkedin.com/in/nadim-chowdhury"
//           className="text-slate-600 hover:text-teal-600 transition-all duration-300"
//         >
//           <FaLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />
//         </Link>
//         <Link
//           href="https://github.com/nadim-chowdhury"
//           className="text-slate-600 hover:text-teal-600 transition-all duration-300"
//         >
//           <FaGithub className="w-5 h-5 lg:w-6 lg:h-6" />
//         </Link>
//         <Link
//           href="https://www.twitter.com/nadim_ch0wdhury"
//           className="text-slate-600 hover:text-teal-600 transition-all duration-300"
//         >
//           <FaTwitter className="w-5 h-5 lg:w-6 lg:h-6" />
//         </Link>
//         <Link
//           href="https://leetcode.com/u/nadim-chowdhury"
//           className="text-slate-600 hover:text-teal-600 transition-all duration-300"
//         >
//           <FaCode className="w-5 h-5 lg:w-6 lg:h-6" />
//         </Link>
//         <Link
//           href="https://dev.to/nadim_ch0wdhury"
//           className="text-slate-600 hover:text-teal-600 transition-all duration-300"
//         >
//           <FaDev className="w-5 h-5 lg:w-6 lg:h-6" />
//         </Link>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { FaCode, FaDev, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const bannerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.4 } },
};

const socialMedia = [
  {
    href: "https://www.linkedin.com/in/nadim-chowdhury",
    icon: <FaLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    href: "https://github.com/nadim-chowdhury",
    icon: <FaGithub className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    href: "https://www.twitter.com/nadim_ch0wdhury",
    icon: <FaTwitter className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    href: "https://leetcode.com/u/nadim-chowdhury",
    icon: <FaCode className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
  {
    href: "https://dev.to/nadim_ch0wdhury",
    icon: <FaDev className="w-5 h-5 lg:w-6 lg:h-6" />,
  },
];

export default function Banner() {
  return (
    <motion.section
      className="py-20 lg:py-48"
      initial="hidden"
      animate="visible"
      variants={bannerVariants}
    >
      <div className="font-bold text-center">
        <motion.h3
          className="text-4xl sm:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello World!
        </motion.h3>
        <motion.h1
          className="text-3xl sm:text-7xl my-6 lg:my-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m{" "}
          <span className="bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
            Nadim Chowdhury
          </span>
        </motion.h1>
        <motion.h4
          className="sm:text-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
            MERN/FULL
          </span>{" "}
          Stack Developer
        </motion.h4>
      </div>

      <motion.p
        className="text-center mt-10 text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        As a self learned creative and passionate programmer/developer I like to
        build and develop software for any platform. Learning, improving skills,
        solving problems, and adapting to new technologies are my hobbies. I can
        give my total effort and perform teamwork with responsibility.
      </motion.p>

      <motion.div
        className="flex items-center justify-center gap-4 mt-10"
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
      >
        {socialMedia.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-slate-600 hover:text-teal-600 transition-all duration-300"
          >
            <motion.div variants={iconVariants}>{link.icon}</motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.section>
  );
}
