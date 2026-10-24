"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { MangaSpeechBubble } from "./AnimeStickers";
import type { Education } from "@/types/education";

type Props = {
  education: Education[];
};

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

function formatPeriod(
  startDate: string,
  endDate?: string,
  current?: boolean
) {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (current) return `${start} – PRESENT`;
  if (!endDate) return start;

  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${start} – ${end}`;
}

export default function EducationPage({ education }: Props) {
  const sortedEducation = useMemo(
    () =>
      [...education].sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
    [education]
  );

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] pb-28 pt-28 sm:pt-36 px-5 sm:px-8 lg:px-0 overflow-hidden">
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Ambient Blobs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 -left-32 w-[540px] h-[540px] rounded-full bg-orange-500/[0.04] blur-[150px] z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-amber-500/[0.04] blur-[140px] z-0"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* -- Header -------------------------------------------------------- */}
        <section className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
              ACADEMIC TELEMETRY // 「学歴記録」
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-manga tracking-wide leading-none text-stone-900 uppercase">
              MY{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                EDUCATION
              </span>
            </h1>
            <MangaSpeechBubble text="ACADEMIC LORE 🎓" className="hidden sm:inline-block" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed"
          >
            A chronological timeline of academic achievements, coursework, and institutions that formed
            my technical principles and software engineering craft.
          </motion.p>
        </section>

        {/* Katana Energy Line */}
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.3) 30%, rgba(245,158,11,0.3) 70%, transparent)",
          }}
        />

        {/* -- Timeline & Glassmorphic Cards -- */}
        <div className="relative">
          <div
            className="absolute left-[16px] top-4 bottom-4 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(234,88,12,.5), rgba(245,158,11,.3), transparent)",
            }}
          />

          <div className="space-y-10">
            {sortedEducation.map((edu, index) => {
              const current = edu.currentlyStudying;

              return (
                <motion.div
                  key={edu._id}
                  {...revealInView(index * 0.08)}
                  className="relative pl-10 sm:pl-12 group"
                >
                  {/* Glowing Node */}
                  <div className="
                    absolute left-0 top-7
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
                    rounded-[34px] sm:rounded-[38px]
                    p-2.5 sm:p-3.5
                    bg-white/45 backdrop-blur-2xl
                    border border-white/80
                    shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04)]
                    hover:shadow-[0_28px_65px_rgba(234,88,12,0.18)]
                    hover:border-orange-500/40
                    transition-all duration-300
                    flex flex-col gap-2.5 sm:gap-3
                  ">
                    {/* Top Radiant Blade Accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* 1. TOP COMPARTMENT (Academic Lore & Coursework) */}
                    <div className="
                      relative z-10 overflow-hidden
                      rounded-[26px] sm:rounded-[28px]
                      bg-gradient-to-b from-white/75 via-white/60 to-white/70
                      backdrop-blur-xl
                      border border-white/85
                      p-5 sm:p-7
                      shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04)]
                    ">
                      <div className="flex flex-col sm:flex-row items-start gap-5">
                        {/* Institution Logo */}
                        <div className="shrink-0">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-xs">
                            {edu.logo?.url ? (
                              <Image
                                src={edu.logo.url}
                                alt={edu.institution}
                                fill
                                className="object-contain p-2.5"
                                sizes="80px"
                              />
                            ) : (
                              <div className="font-manga text-3xl font-bold text-orange-600">
                                {edu.institution.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title & Lore */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider">
                              // DEGREE_0{index + 1}
                            </span>
                            <span className="text-stone-300 text-xs">|</span>
                            <span className="font-manga text-[11px] text-stone-500 tracking-wider">
                              「学術課程」
                            </span>
                          </div>

                          <h2 className="font-rajdhani text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                            {edu.degree}
                          </h2>

                          {edu.fieldOfStudy && (
                            <p className="font-rajdhani text-lg font-semibold text-orange-600 mt-0.5">
                              {edu.fieldOfStudy}
                            </p>
                          )}

                          <p className="font-rajdhani text-base font-semibold text-stone-700 mt-1 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            {edu.institution}
                            {edu.location && (
                              <span className="text-stone-400 font-mono text-xs">
                                ({edu.location})
                              </span>
                            )}
                          </p>

                          {edu.description && (
                            <p className="mt-3.5 text-sm text-stone-600 leading-relaxed font-normal">
                              {edu.description}
                            </p>
                          )}

                          {/* Coursework Pills */}
                          {edu.coursework?.filter(Boolean).length > 0 && (
                            <div className="mt-5">
                              <span className="font-orbitron text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                                CORE COURSEWORK
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {edu.coursework
                                  .filter((course) => course.trim() !== "")
                                  .map((course) => (
                                    <span
                                      key={course}
                                      className="px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-semibold bg-white/70 backdrop-blur-sm border border-stone-200/80 text-stone-700 shadow-2xs"
                                    >
                                      {course}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Achievements */}
                          {edu.achievements?.filter(Boolean).length > 0 && (
                            <div className="mt-5 space-y-2">
                              <span className="font-orbitron text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                                KEY ACHIEVEMENTS
                              </span>
                              {edu.achievements
                                .filter((item) => item.trim() !== "")
                                .map((item) => (
                                  <div
                                    key={item}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/60 border border-stone-200/60 text-xs sm:text-sm text-stone-800"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 2. BOTTOM COMPARTMENT (Action / Timeline Pill Deck) */}
                    <div className="
                      relative z-10 overflow-hidden
                      rounded-[20px] sm:rounded-[22px]
                      bg-gradient-to-b from-white/80 via-white/70 to-white/75
                      backdrop-blur-xl
                      border border-white/85
                      px-4 sm:px-6 py-3.5
                      shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),0_4px_14px_rgba(0,0,0,0.02)]
                      flex flex-wrap items-center justify-between gap-3
                    ">
                      <div className="flex items-center gap-3">
                        <span className="font-orbitron text-xs font-bold text-orange-600 tracking-wider">
                          {formatPeriod(edu.startDate, edu.endDate, edu.currentlyStudying)}
                        </span>
                        {edu.grade && (
                          <span className="px-2.5 py-1 rounded-full bg-white/90 border border-white/90 text-stone-800 font-orbitron text-[10px] font-bold shadow-xs">
                            {edu.gradeType ? `${edu.gradeType}: ` : ""}{edu.grade}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {current && (
                          <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 font-orbitron text-[9px] font-extrabold tracking-wider uppercase">
                            CURRENT
                          </span>
                        )}
                        {edu.website && (
                          <a
                            href={edu.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-white/90 text-stone-800 hover:text-orange-600 font-orbitron text-[10px] font-bold tracking-wider uppercase shadow-xs transition-colors"
                          >
                            <span>Website</span>
                            <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {sortedEducation.length === 0 && (
            <div className="py-20 px-6 rounded-[34px] border border-white/80 bg-white/60 backdrop-blur-2xl text-center shadow-sm">
              <p className="font-manga text-2xl text-stone-900 uppercase">
                NO EDUCATION RECORDS FOUND // 該当なし
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
