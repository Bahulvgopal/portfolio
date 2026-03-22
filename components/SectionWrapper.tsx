"use client";

import { motion } from "framer-motion";

export default function SectionWrapper({ children }: any) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 px-6"
    >
      {children}
    </motion.section>
  );
}