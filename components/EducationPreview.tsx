"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MangaSpeechBubble } from "./AnimeStickers";
import type { Education } from "@/types/education";

type Props = {
  education: Education[];
};

export default function EducationPreview({ education }: Props) {
  const preview = [...education]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .slice(0, 2);

  return (
    <section className="relative py-12 px-5 sm:px-8 lg:px-0 bg-[#FAF8F5] overflow-hidden">
      {/* Ambient Blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[400px] rounded-full bg-orange-500/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[130px]" />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* -- Header -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                ACADEMIC PATHWAY // 「学歴」
              </span>
              <MangaSpeechBubble text="ACADEMIC LORE 🎓" className="hidden sm:inline-block" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-manga tracking-wide leading-none text-stone-900 uppercase">
              MY{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                EDUCATION
              </span>
            </h2>

            <p className="mt-3.5 font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed max-w-xl">
              Foundational computer science theory, software design principles, and academic achievements
              powering my technical capabilities.
            </p>
          </div>

          <Link
            href="/education"
            className="
              group inline-flex items-center gap-2.5 self-start lg:self-end shrink-0
              px-6 py-3 rounded-full
              bg-white/80 backdrop-blur-xl border border-stone-200/90
              text-stone-800 font-orbitron text-xs font-bold tracking-wider uppercase
              hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40
              hover:shadow-[0_12px_28px_rgba(234,88,12,0.18)]
              shadow-[0_4px_16px_rgba(0,0,0,0.04)]
              transition-all duration-300
            "
          >
            <span>View all education</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* -- Katana Energy Rule -- */}
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.3) 30%, rgba(245,158,11,0.3) 70%, transparent)",
          }}
        />

        {/* -- Timeline & Cards -- */}
        <div className="relative">
          {/* Laser Timeline Conduit */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-orange-500/50 via-amber-500/30 to-transparent" />

          <div className="space-y-8">
            {preview.map((edu, i) => (
              <motion.div
                key={edu._id || i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-10 sm:pl-12 group"
              >
                {/* Timeline Glowing Node */}
                <div className="
                  absolute left-0 top-6
                  w-8 h-8 rounded-full
                  bg-white/90 backdrop-blur-md
                  border-2 border-orange-500/80
                  flex items-center justify-center
                  shadow-[0_0_15px_rgba(234,88,12,0.4)]
                  group-hover:scale-115 transition-transform duration-300
                  z-10
                ">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500" />
                </div>

                {/* Dual-Compartment Frosted Glassmorphism Card */}
                <div className="
                  relative overflow-hidden
                  rounded-[32px] sm:rounded-[36px]
                  p-2.5 sm:p-3
                  bg-white/45 backdrop-blur-2xl
                  border border-white/80
                  shadow-[0_16px_45px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_24px_60px_rgba(234,88,12,0.16)]
                  hover:border-orange-500/40
                  transition-all duration-300
                  flex flex-col gap-2.5
                ">
                  {/* Top Blade Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* 1. TOP COMPARTMENT (Degree & Details) */}
                  <div className="
                    relative z-10 overflow-hidden
                    rounded-[24px] sm:rounded-[26px]
                    bg-gradient-to-b from-white/75 via-white/60 to-white/70
                    backdrop-blur-xl
                    border border-white/85
                    p-5 sm:p-6
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),0_4px_12px_rgba(0,0,0,0.02)]
                  ">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider">
                        // DEGREE_0{i + 1}
                      </span>
                      <span className="text-stone-300 text-xs">|</span>
                      <span className="font-manga text-[11px] text-stone-500 tracking-wider">
                        「学術課程」
                      </span>
                    </div>

                    <h3 className="font-rajdhani text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors duration-200">
                      {edu.degree}
                    </h3>

                    <p className="font-rajdhani text-base font-semibold text-stone-700 mt-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {edu.institution}
                    </p>

                    {edu.description && (
                      <p className="mt-3.5 text-sm text-stone-600 leading-relaxed font-normal">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  {/* 2. BOTTOM COMPARTMENT (Action / Timeline Pill Deck) */}
                  <div className="
                    relative z-10 overflow-hidden
                    rounded-[18px] sm:rounded-[20px]
                    bg-gradient-to-b from-white/80 via-white/70 to-white/75
                    backdrop-blur-xl
                    border border-white/85
                    px-4 sm:px-5 py-3
                    shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),0_4px_12px_rgba(0,0,0,0.02)]
                    flex items-center justify-between
                  ">
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron text-xs font-bold text-orange-600 tracking-wider">
                        {new Date(edu.startDate).getFullYear()} –{" "}
                        {edu.currentlyStudying
                          ? "PRESENT"
                          : edu.endDate
                            ? new Date(edu.endDate).getFullYear()
                            : "CURRENT"}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/90 text-stone-700 font-orbitron text-[9px] font-bold tracking-wider uppercase shadow-xs">
                      {edu.currentlyStudying ? "ACTIVE DEGREE" : "COMPLETED"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
