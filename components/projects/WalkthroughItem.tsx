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

export default function WalkthroughItem({ step, index }: Props) {
  const reverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`grid items-center gap-10 lg:gap-14 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text Info */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          rounded-[32px] p-6 sm:p-8
          bg-white/70 backdrop-blur-2xl
          border border-white/90
          shadow-[0_14px_35px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.95)]
        "
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-orbitron text-xs font-bold tracking-widest text-orange-600 uppercase">
            // PHASE_{String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-stone-300 text-xs">|</span>
          <span className="font-manga text-[11px] text-stone-500 tracking-wider">
            「工程」
          </span>
        </div>

        <h3 className="font-rajdhani text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
          {step.title}
        </h3>

        {step.description && (
          <p className="mt-3.5 font-rajdhani text-base font-medium leading-relaxed text-stone-600">
            {step.description}
          </p>
        )}

        {step.device && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3.5 py-1.5 font-orbitron text-xs font-bold text-orange-700 uppercase tracking-wider shadow-2xs">
            {deviceIcons[step.device as keyof typeof deviceIcons]}
            <span className="capitalize">{step.device} Viewport</span>
          </div>
        )}
      </motion.div>

      {/* Image Mockup */}
      {step.image?.url && (
        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            group overflow-hidden rounded-[32px]
            p-2 sm:p-3
            bg-white/50 backdrop-blur-2xl
            border border-white/90
            shadow-[0_16px_40px_rgba(234,88,12,0.06),inset_0_2px_4px_rgba(255,255,255,0.95)]
          "
        >
          <div className="relative overflow-hidden rounded-[24px] bg-stone-900 border border-white/80 shadow-inner">
            <Image
              src={step.image.url}
              alt={step.title}
              width={1600}
              height={1000}
              className="h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
