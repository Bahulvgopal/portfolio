"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiComputerDesktop,
  HiDevicePhoneMobile,
  HiDeviceTablet,
} from "react-icons/hi2";
import type { Project } from "@/types/project";

interface Props {
  step: Project["walkthrough"][number];
  index: number;
}

const deviceIcons = {
  desktop: <HiComputerDesktop className="h-4 w-4" />,
  tablet: <HiDeviceTablet className="h-4 w-4" />,
  mobile: <HiDevicePhoneMobile className="h-4 w-4" />,
};

export default function WalkthroughItem({
  step,
  index,
}: Props) {
  const reverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`grid items-center gap-14 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-sm font-semibold tracking-[0.3em] text-sky-400">
          STEP {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="mt-4 text-3xl font-bold text-white">
          {step.title}
        </h3>

        {step.description && (
          <p className="mt-5 leading-8 text-neutral-400">
            {step.description}
          </p>
        )}

        {step.device && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300">
            {deviceIcons[step.device as keyof typeof deviceIcons]}
            <span className="capitalize">{step.device}</span>
          </div>
        )}
      </motion.div>

      {/* Image */}
{step.image?.url && (
  <motion.div
    initial={{ opacity: 0, x: reverse ? -40 : 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl"
  >
    <div className="relative overflow-hidden">
      <Image
        src={step.image.url}
        alt={step.title}
        width={1600}
        height={1000}
        className="h-auto w-full object-contain"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  </motion.div>
)}
      
    </motion.div>
  );
}