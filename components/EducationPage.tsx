"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Education } from "@/types/education";

/* =========================================================================
ANIMATION HELPERS
========================================================================= */

const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: {
    once: true,
    margin: "-60px",
  },
  transition: {
    duration: 0.75,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* =========================================================================
HELPERS
========================================================================= */

function formatPeriod(
  startDate: string,
  endDate?: string,
  current?: boolean
) {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (current) {
    return `${start} – Present`;
  }

  if (!endDate) return start;

  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${start} – ${end}`;
}

/* =========================================================================
PAGE
========================================================================= */

type Props = {
  education: Education[];
};

export default function EducationPage({
  education,
}: Props) {
  const sortedEducation = [...education].sort(
    (a, b) =>
      new Date(b.startDate).getTime() -
      new Date(a.startDate).getTime()
  );

  return (
    <main className="relative -mt-[5rem] min-h-screen bg-[#0a0a0b] pb-28 pt-28 sm:pt-32 px-5 sm:px-8 lg:px-0 overflow-hidden">

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Background Blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-blue-600/[0.07] blur-[150px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-violet-600/[0.06] blur-[140px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}

        <motion.div
          {...reveal(0.05)}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Background
          </span>

          <h1
            className="text-[clamp(2.4rem,6.5vw,4.2rem)] font-normal tracking-tight leading-[1.05] text-white"
            style={{
              fontFamily:
                "'Georgia','Times New Roman',serif",
            }}
          >
            My{" "}
            <em
              className="italic"
              style={{
                background:
                  "linear-gradient(90deg,#38bdf8,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              education
            </em>{" "}
            journey.
          </h1>

          <p className="mt-5 text-sm sm:text-[15px] text-neutral-500 max-w-lg leading-[1.8]">
            The institutions, coursework, and
            milestones that have shaped my academic
            journey and technical foundation.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative">

          <div
            className="absolute left-[18px] top-3 bottom-3 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(56,189,248,.35), rgba(129,140,248,.15), transparent)",
            }}
          />

          <div className="space-y-10">

            {sortedEducation.map((edu, index) => {

              const current =
                edu.currentlyStudying;

              return (
                <motion.div
                  key={edu._id}
                  {...revealInView(index * 0.08)}
                  className="relative pl-12"
                >
                                      {/* Timeline Dot */}
                  <span
                    className={[
                      "absolute left-0 top-8 w-4 h-4 rounded-full border-2 transition-all duration-300",
                      current
                        ? "border-sky-400 bg-sky-400 shadow-[0_0_0_5px_rgba(56,189,248,.12)]"
                        : "border-white/15 bg-[#0a0a0b]",
                    ].join(" ")}
                  />

                  {/* Card */}
                  <div className="overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl hover:border-sky-500/20 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,.45)]">

                    {/* Accent */}
                    <div className="h-[2px] bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400" />

                    <div className="p-7 sm:p-8">

                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start gap-6">

                        {/* Logo */}

                        <div className="shrink-0">

                          <div className="relative w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">

                            {edu.logo?.url ? (

                              <Image
                                src={edu.logo.url}
                                alt={edu.institution}
                                fill
                                className="object-contain p-3"
                                sizes="80px"
                              />

                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-neutral-500">
                                {edu.institution.charAt(0)}
                              </div>

                            )}

                          </div>

                        </div>

                        {/* Main Info */}

                        <div className="flex-1">

                          <div className="flex flex-wrap items-start justify-between gap-4">

                            <div>

                              <h2
                                className="text-2xl text-white tracking-tight"
                                style={{
                                  fontFamily:
                                    "'Georgia','Times New Roman',serif",
                                }}
                              >
                                {edu.degree}
                              </h2>

                              <p className="mt-1 text-sky-400 font-medium">
                                {edu.fieldOfStudy}
                              </p>

                              <p className="mt-2 text-neutral-400">
                                {edu.institution}
                              </p>

                              {edu.location && (
                                <p className="mt-1 text-sm text-neutral-500">
                                  📍 {edu.location}
                                </p>
                              )}

                            </div>

                            <div className="text-right">

                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-neutral-400 font-mono">
                                {formatPeriod(
                                  edu.startDate,
                                  edu.endDate,
                                  edu.currentlyStudying
                                )}
                              </span>

                              {current && (
                                <div className="mt-3">
                                  <span className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-400 font-mono">
                                    Current
                                  </span>
                                </div>
                              )}

                            </div>

                          </div>

                          {/* Grade */}

                          {edu.grade && (

                            <div className="mt-6 flex items-center gap-3">

                              <span className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-mono">
                                {edu.gradeType}
                              </span>

                              <span className="text-lg font-semibold text-white">
                                {edu.grade}
                              </span>

                            </div>

                          )}

                          {/* Divider */}

                          {(edu.description ||
                            edu.coursework.length > 0 ||
                            edu.achievements.length > 0) && (
                            <div className="my-7 h-px bg-white/[0.06]" />
                          )}

                          {/* Description */}

                          {edu.description && (
                            <p className="text-neutral-400 leading-8">
                              {edu.description}
                            </p>
                          )}

                          {/* Coursework */}

                          {edu.coursework?.filter(Boolean).length > 0 && (

                            <div className="mt-7">

                              <h3 className="text-xs uppercase tracking-[0.18em] text-sky-400 font-mono mb-4">
                                Coursework
                              </h3>

                              <div className="flex flex-wrap gap-2">

                                {edu.coursework
  .filter((course) => course.trim() !== "")
  .map((course) => (

                                  <span
                                    key={course}
                                    className="rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 text-sm text-sky-300"
                                  >
                                    {course}
                                  </span>

                                ))}

                              </div>

                            </div>

                          )}

                          {/* Achievements */}

                          {edu.achievements?.filter(Boolean).length > 0 && (

                            <div className="mt-8">

                              <h3 className="text-xs uppercase tracking-[0.18em] text-violet-400 font-mono mb-4">
                                Achievements
                              </h3>

                              <div className="grid gap-3">

                                {edu.achievements
  .filter((achievement) => achievement.trim() !== "")
  .map((achievement) => (

                                  <div
                                    key={achievement}
                                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3"
                                  >
                                    <span className="text-emerald-400">
                                      ✓
                                    </span>

                                    <span className="text-neutral-300">
                                      {achievement}
                                    </span>

                                  </div>

                                ))}

                              </div>

                            </div>

                          )}

                          {/* Website */}

                          {edu.website && (

                            <div className="mt-8">

                              <a
                                href={edu.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-3 text-sm text-sky-400 transition hover:bg-sky-500/15"
                              >
                                Visit Institution

                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 17L17 7M17 7H8M17 7V16"
                                  />
                                </svg>

                              </a>

                            </div>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            })}
                      </div>

          {/* Empty State */}
          {sortedEducation.length === 0 && (
            <motion.div
              {...reveal(0.2)}
              className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-16 text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03]">
                <svg
                  className="h-9 w-9 text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0118 14.5C18 16.985 15.314 19 12 19s-6-2.015-6-4.5c0-1.3.287-2.686.84-3.922L12 14z"
                  />
                </svg>
              </div>

              <h2
                className="mt-8 text-2xl text-white"
                style={{
                  fontFamily:
                    "'Georgia','Times New Roman',serif",
                }}
              >
                No education records found
              </h2>

              <p className="mt-3 text-neutral-500 max-w-md mx-auto leading-7">
                Education entries published from the CMS
                will appear here automatically.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}