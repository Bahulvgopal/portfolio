"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { education } from "@/data/education";

/* =========================================================================
   ANIMATION HELPERS (matches hero/skills page)
   ========================================================================= */
const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* =========================================================================
   PAGE
   ========================================================================= */
export default function EducationPage() {
  return (
    <main className="relative -mt-[5rem] min-h-screen bg-[#0a0a0b] pb-28 pt-28 sm:pt-32 px-5 sm:px-8 lg:px-0 overflow-hidden">

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-blue-600/[0.07] blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-violet-600/[0.06] blur-[140px]" />

      {/* decorative oversized word */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-[4%] text-[14vw] font-black leading-none select-none text-white/[0.025] tracking-tighter hidden lg:block"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Edu
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div {...reveal(0.05)} className="mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Background
          </span>

          <h1
            className="text-[clamp(2.4rem,6.5vw,4.2rem)] font-normal tracking-tight leading-[1.05] text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            My{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              education
            </em>{" "}
            <span className="font-light italic text-neutral-400">path.</span>
          </h1>

          <p className="mt-5 text-sm sm:text-[15px] text-neutral-500 max-w-md leading-[1.75]">
            From high school to university — the schools and milestones that shaped how I think and build.
          </p>
        </motion.div>

        {/* ── Timeline ─────────────────────────────────────────────── */}
        <div className="relative">

          {/* vertical rail with gradient fade */}
          <div
            aria-hidden
            className="absolute left-[5px] sm:left-[7px] top-3 bottom-3 w-px"
            style={{
              background: "linear-gradient(to bottom, rgba(56,189,248,0.35), rgba(129,140,248,0.18), transparent)",
            }}
          />

          <div className="flex flex-col gap-0">
            {education.map((edu, i) => {
              const isCurrent = i === 0;
              return (
                <motion.div
                  key={edu.degree + edu.period}
                  {...revealInView(0.06 + i * 0.08)}
                  className="relative pl-8 sm:pl-10 pb-10 last:pb-0 group"
                >
                  {/* dot */}
                  <span
                    className={[
                      "absolute left-0 top-1.5 w-[11px] h-[11px] sm:w-3 sm:h-3 rounded-full border-2 transition-all duration-300",
                      isCurrent
                        ? "border-sky-400 bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                        : "border-white/20 bg-[#0a0a0b] group-hover:border-sky-400/50",
                    ].join(" ")}
                  />

                  {/* card */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035] hover:border-white/[0.1] transition-all duration-300 px-5 py-4 sm:px-6 sm:py-5">

                    <div className="flex items-start gap-4">

                      {/* logo */}
                      <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                        {edu.image ? (
                          <Image
                            src={edu.image}
                            alt={edu.institution}
                            fill
                            className="object-contain p-1.5"
                            sizes="56px"
                          />
                        ) : (
                          <span
                            className="text-base font-bold text-neutral-500"
                            style={{ fontFamily: "'Georgia', serif" }}
                          >
                            {edu.institution.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-sky-400/90">
                            {edu.period}
                          </span>
                          {isCurrent && (
                            <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-emerald-400/80 border border-emerald-500/25 bg-emerald-500/[0.06] rounded-full px-2 py-0.5 shrink-0">
                              Current
                            </span>
                          )}
                        </div>

                        <h2
                          className="text-lg sm:text-xl font-normal text-white tracking-tight leading-snug mb-1"
                          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                        >
                          {edu.degree}
                        </h2>

                        <p className="text-[13px] sm:text-sm text-neutral-500 font-medium">
                          {edu.institution}
                        </p>

                        {edu.description && (
                          <p className="mt-3 text-[13px] text-neutral-500 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}