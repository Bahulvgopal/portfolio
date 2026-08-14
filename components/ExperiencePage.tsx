"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Experience } from "@/types/experience";

/* ==========================================================================
   ANIMATIONS
   ========================================================================== */

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
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const,
    delay,
  },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ==========================================================================
   HELPERS
   ========================================================================== */

function formatPeriod(
  startDate: string,
  endDate?: string,
  current?: boolean
) {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (current) return `${start} – Present`;

  if (!endDate) return start;

  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${start} – ${end}`;
}

function employmentLabel(type: Experience["employmentType"]) {
  switch (type) {
    case "full-time":
      return "Full Time";

    case "part-time":
      return "Part Time";

    case "internship":
      return "Internship";

    case "freelance":
      return "Freelance";

    case "contract":
      return "Contract";

    case "leadership":
      return "Leadership";

    case "volunteer":
      return "Volunteer";

    default:
      return type;
  }
}

function employmentColor(type: Experience["employmentType"]) {
  switch (type) {
    case "full-time":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";

    case "internship":
      return "border-sky-500/20 bg-sky-500/10 text-sky-300";

    case "leadership":
      return "border-violet-500/20 bg-violet-500/10 text-violet-300";

    case "freelance":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";

    default:
      return "border-white/10 bg-white/[0.04] text-neutral-300";
  }
}

/* ==========================================================================
   TYPES
   ========================================================================== */

type Props = {
  experiences: Experience[];
};

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function ExperiencePage({
  experiences,
}: Props) {
  const sortedExperiences = [...experiences].sort(
    (a, b) =>
      new Date(b.startDate).getTime() -
      new Date(a.startDate).getTime()
  );

  return (
    <main className="relative -mt-[5rem] min-h-screen overflow-hidden bg-[#0a0a0b] px-5 pb-28 pt-28 sm:px-8 sm:pt-32 lg:px-0">

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

      {/* Background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-sky-600/[0.07] blur-[160px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet-600/[0.06] blur-[150px]"
      />

      {/* Decorative word */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-[4%] hidden select-none text-[13vw] font-black leading-none tracking-tighter text-white/[0.025] lg:block"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Work
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Header */}
        <motion.div {...reveal()} className="mb-20">

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.05] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-sky-400">

            <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-sky-400" />

            Experience

          </span>

          <h1
            className="text-[clamp(2.5rem,6vw,4.4rem)] font-normal leading-[1.05] tracking-tight text-white"
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
              }}
            >
              journey
            </em>
          </h1>

          <p className="mt-5 max-w-xl leading-8 text-neutral-500">
            A timeline of internships, leadership
            positions, freelance work, and professional
            experiences that have shaped my growth as a
            developer.
          </p>

        </motion.div>

        {/* Timeline */}
        <div className="relative">

          <div
            className="absolute bottom-3 left-[7px] top-3 hidden w-px sm:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(56,189,248,.35), rgba(129,140,248,.18), transparent)",
            }}
          />

          <div className="space-y-6">

            {sortedExperiences.map((exp, index) => {

              const current = exp.currentlyWorking;

              return (

                <motion.div
                  key={exp._id ?? index}
                  {...revealInView(index * 0.08)}
                  className="relative sm:pl-10"
                >
                                    {/* Timeline Dot */}
                  <span
                    className={[
                      "absolute left-0 top-7 hidden h-3 w-3 rounded-full border-2 sm:block",
                      current
                        ? "border-sky-400 bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,.12)]"
                        : "border-white/20 bg-[#0a0a0b]",
                    ].join(" ")}
                  />

                  <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.05]">

                    {/* Top Accent */}
                    <div className="h-px bg-gradient-to-r from-sky-500 via-indigo-500 to-transparent" />

                    <div className="p-6 sm:p-7">

                      {/* Header */}
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                        {/* Logo */}
                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">

                          {exp.logo?.url ? (
                            <Image
                              src={exp.logo.url}
                              alt={exp.company}
                              fill
                              className="object-contain p-2"
                              sizes="64px"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-neutral-500">
                              {exp.company.charAt(0)}
                            </span>
                          )}

                        </div>

                        {/* Title */}
                        <div className="flex-1">

                          <h2
                            className="text-2xl font-normal leading-tight tracking-tight text-white"
                            style={{
                              fontFamily:
                                "'Georgia','Times New Roman',serif",
                            }}
                          >
                            {exp.role}
                          </h2>

                          <p className="mt-1 text-neutral-400">
                            {exp.company}
                          </p>

                          {/* Badges */}
                          <div className="mt-4 flex flex-wrap gap-2">

                            <span
                              className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.12em] ${employmentColor(
                                exp.employmentType
                              )}`}
                            >
                              {employmentLabel(exp.employmentType)}
                            </span>

                            {exp.location && (
                              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-400">
                                📍 {exp.location}
                              </span>
                            )}

                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-sky-300">
                              {formatPeriod(
                                exp.startDate,
                                exp.endDate,
                                exp.currentlyWorking
                              )}
                            </span>

                            {current && (
                              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-300">
                                Current
                              </span>
                            )}

                          </div>

                        </div>

                      </div>

                      {/* Divider */}
                      <div className="my-6 h-px bg-white/[0.06]" />

                      {/* Description */}
                      {exp.description && (
                        <p className="leading-8 text-neutral-400">
                          {exp.description}
                        </p>
                      )}

                      {/* Responsibilities */}
                      {exp.responsibilities?.filter(Boolean).length ? (
                        <div className="mt-8">

                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-sky-300">
                            Responsibilities
                          </h3>

                          <ul className="space-y-3">

                            {exp.responsibilities
                              .filter(Boolean)
                              .map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-neutral-400"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
                                  <span>{item}</span>
                                </li>
                              ))}

                          </ul>

                        </div>
                      ) : null}  
                                            {/* Skills */}
                      {exp.skills?.filter(Boolean).length ? (
                        <div className="mt-8">

                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-sky-300">
                            Skills
                          </h3>

                          <div className="flex flex-wrap gap-2">

                            {exp.skills
                              .filter(Boolean)
                              .map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-neutral-300 transition hover:border-sky-500/30 hover:bg-sky-500/[0.08]"
                                >
                                  {skill}
                                </span>
                              ))}

                          </div>

                        </div>
                      ) : null}

                      {/* Achievements */}
                      {exp.achievements?.filter(Boolean).length ? (
                        <div className="mt-8">

                          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-sky-300">
                            Achievements
                          </h3>

                          <div className="space-y-3">

                            {exp.achievements
                              .filter(Boolean)
                              .map((achievement, i) => (
                                <div
                                  key={i}
                                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                                >
                                  <div className="flex items-start gap-3">

                                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />

                                    <p className="leading-7 text-neutral-400">
                                      {achievement}
                                    </p>

                                  </div>
                                </div>
                              ))}

                          </div>

                        </div>
                      ) : null}

                      {/* Website */}
                      {exp.website && (
                        <div className="mt-8">

                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-300 transition hover:border-sky-400 hover:bg-sky-500/20"
                          >
                            Visit Company Website

                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 17L17 7M17 7H9M17 7v8"
                              />
                            </svg>

                          </a>

                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>

              );
            })}

            {/* Empty State */}
            {sortedExperiences.length === 0 && (
              <motion.div
                {...reveal()}
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
                      d="M9.75 17L8 21l4-2 4 2-1.75-4M4 4h16v11H4V4z"
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
                  No experience found
                </h2>

                <p className="mx-auto mt-3 max-w-md leading-7 text-neutral-500">
                  Published experience entries from your CMS
                  will appear here automatically.
                </p>

              </motion.div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}