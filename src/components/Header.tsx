"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Header() {
  return (
    <motion.header
      className="container mx-auto flex items-center justify-between py-6"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/"
        className="bg-gradient-to-tr from-teal-600 to-cyan-600 p-[6px] px-4 border rounded-full transition-all duration-300 hover:from-cyan-600 hover:to-teal-600"
      >
        <h1 className="font-bold text-xl text-white">NADiM</h1>
      </Link>

      <nav className="hidden lg:flex lg:items-center">
        {["Home", "About", "Projects"].map((item, index) => (
          <Link
            key={index}
            href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
            className={`bg-white p-2 px-4 border transition-all duration-300 hover:bg-teal-50 ${
              index === 0
                ? "border-r-0 rounded-l-full"
                : index === 2
                ? "border-l-0 rounded-r-full"
                : ""
            } hover:underline hover:text-teal-600 transition-all duration-300`}
          >
            <motion.div
              variants={navItemVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item}
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="flex items-center text-teal-600">
        <Link
          href="tel:+8801971258803"
          className="bg-white border border-r-0 p-2 pl-3 rounded-l-full transition-all duration-300 hover:text-teal-600 hover:bg-teal-50 hover:rounded-l-2xl"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </motion.svg>
        </Link>
        <Link
          href="mailto:nadim-chowdhury@outlook.com"
          className="bg-white border p-2 pr-3 rounded-r-full transition-all duration-300 hover:text-teal-600 hover:bg-teal-50 hover:rounded-r-2xl"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </motion.svg>
        </Link>
      </div>
    </motion.header>
  );
}
