"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const, // ✅ FIXED
    delay,
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const, // ✅ FIXED
    delay,
  },
});

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden
                        px-4 sm:px-6 lg:px-0">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40
                   w-[500px] h-[500px] rounded-full
                   bg-blue-400/10 dark:bg-blue-500/10 blur-[120px]"
      />

      <div className="relative max-w-6xl mx-auto w-full
                      grid grid-cols-1 lg:grid-cols-2
                      items-center gap-8 lg:gap-0
                      py-16 sm:py-20">

        {/* Mobile Image */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden lg:hidden">
          <Image
            src="/images/bahul.jpeg"
            alt="Bahul"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20
                       bg-gradient-to-t from-white dark:from-gray-950 to-transparent"
          />
        </div>

        {/* Left Content */}
        <div className="lg:pr-12 xl:pr-20">

          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full
                             border border-blue-200 dark:border-blue-800
                             bg-blue-50 dark:bg-blue-950/50
                             text-xs font-bold uppercase tracking-widest
                             text-blue-600 dark:text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              B.Tech CSE · UCE Kariavattom
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter
                       leading-[0.92] mb-5 text-gray-900 dark:text-white"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                             bg-clip-text text-transparent">
              Bahul
            </span>
            <span className="ml-2 inline-block">👋</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="max-w-md text-base sm:text-lg text-gray-500 dark:text-gray-400
                       leading-relaxed mb-9"
          >
            Computer Science student building scalable web applications and
            crafting modern digital experiences — with a focus on performance,
            clarity, and clean code.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2
                         px-6 py-3 rounded-xl text-sm font-semibold
                         bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                         text-white shadow-md shadow-blue-500/25
                         transition-colors duration-150 w-full sm:w-auto"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}
                   viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2
                         px-6 py-3 rounded-xl text-sm font-semibold
                         border border-gray-200 dark:border-gray-700
                         text-gray-700 dark:text-gray-300
                         hover:border-blue-400 dark:hover:border-blue-500
                         hover:text-blue-600 dark:hover:text-blue-400
                         hover:bg-blue-50 dark:hover:bg-blue-950/30
                         transition-colors duration-150 w-full sm:w-auto"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            className="flex flex-wrap gap-6 sm:gap-10 pt-6
                       border-t border-gray-100 dark:border-gray-800"
          >
            {[
              { value: "B.Tech", label: "Computer Science & Engg" },
              { value: "UCE", label: "Kariavattom, Kerala" },
              { value: "Open", label: "to opportunities" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {value}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-600">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Desktop Image */}
        <motion.div
          {...fadeIn(0.12)}
          className="hidden lg:block relative lg:h-[92vh] overflow-hidden"
        >
          <Image
            src="/images/bahul.jpeg"
            alt="Bahul"
            fill
            className="object-cover rounded-[50px] object-center"
            sizes="50vw"
            priority
          />
         
        </motion.div>

      </div>
    </section>
  );
}