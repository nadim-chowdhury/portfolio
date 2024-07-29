"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="pb-6 mt-28 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-white to-teal-50 border rounded-xl py-2 px-4"
      >
        <p className="text-sm lg:text-base text-center">
          &copy;2024 All Rights Reserved By{" "}
          <span className="text-teal-600">Nadim Chowdhury</span>.
        </p>
      </motion.div>
    </footer>
  );
}
