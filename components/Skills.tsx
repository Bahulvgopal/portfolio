"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface Skill {
  _id: string;
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Mobile"
    | "Programming"
    | "AI/ML"
    | "Cloud"
    | "DevOps"
    | "Tools"
    | "Other";
  level: number;
  order: number;
  icon?: {
    url: string;
    publicId: string;
  };
}

interface SkillsProps {
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*                                  CATEGORY                                  */
/* -------------------------------------------------------------------------- */

const CATEGORY_CONFIG: Record<
  string,
  {
    description: string;
    accent: string;
    glow: string;
  }
> = {
  Frontend: {
    description:
      "Building beautiful, responsive and interactive user interfaces.",
    accent: "from-sky-400 via-blue-400 to-indigo-400",
    glow: "rgba(56,189,248,.10)",
  },
  Backend: {
    description:
      "Developing scalable APIs, authentication and business logic.",
    accent: "from-violet-400 via-purple-400 to-fuchsia-400",
    glow: "rgba(139,92,246,.10)",
  },
  Database: {
    description:
      "Designing efficient data models and high-performance queries.",
    accent: "from-emerald-400 via-green-400 to-teal-400",
    glow: "rgba(34,197,94,.10)",
  },
  Mobile: {
    description: "Cross-platform mobile application development.",
    accent: "from-cyan-400 via-sky-400 to-blue-500",
    glow: "rgba(6,182,212,.10)",
  },
  Programming: {
    description: "Programming languages used for software development.",
    accent: "from-orange-400 via-amber-400 to-yellow-400",
    glow: "rgba(249,115,22,.10)",
  },
  "AI/ML": {
    description: "Artificial Intelligence and Machine Learning technologies.",
    accent: "from-pink-400 via-rose-400 to-red-400",
    glow: "rgba(244,63,94,.10)",
  },
  Cloud: {
    description: "Cloud platforms and deployment infrastructure.",
    accent: "from-indigo-400 via-blue-500 to-cyan-400",
    glow: "rgba(99,102,241,.10)",
  },
  DevOps: {
    description: "Automation, CI/CD and production infrastructure.",
    accent: "from-lime-400 via-green-400 to-emerald-400",
    glow: "rgba(132,204,22,.10)",
  },
  Tools: {
    description: "Daily tools used throughout development workflow.",
    accent: "from-amber-400 via-orange-400 to-rose-400",
    glow: "rgba(251,191,36,.10)",
  },
  Other: {
    description: "Additional technologies and supporting tools.",
    accent: "from-gray-400 via-slate-400 to-zinc-400",
    glow: "rgba(161,161,170,.10)",
  },
};

/* -------------------------------------------------------------------------- */
/*                                 ANIMATION                                  */
/* -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function Skills({ skills }: SkillsProps) {
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};

    skills.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });

    Object.keys(groups).forEach((category) => {
      groups[category].sort((a, b) => a.order - b.order);
    });

    return groups;
  }, [skills]);

  const categories = Object.entries(groupedSkills);

  return (
    <section className="relative pb-28 pt-7 -mt-[6rem] px-5 overflow-hidden bg-[#0a0a0b] py-20 sm:py-24 lg:py-28">
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[90vw] max-w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[120px] sm:h-[420px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-violet-500/[0.06] blur-[110px] sm:h-[420px] sm:w-[420px]" />

      {/* top rule, echoes hero */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Section Heading */}
        <motion.div {...reveal()} className="mb-12 text-center sm:mb-16">
          <span
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-sky-400/20
              bg-sky-400/5
              px-3.5 py-1.5
              font-mono
              text-[10px] sm:text-[11px]
              uppercase
              tracking-[0.18em]
              text-sky-400
            "
          >
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            Technical Skills
          </span>

          <h2
            className="mt-6 text-[clamp(1.9rem,6vw,3.25rem)] font-normal tracking-tight text-white"
            style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
          >
            Technologies{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg,#38bdf8,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              I work with
            </em>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] sm:text-sm leading-7 text-neutral-400">
            My development toolkit continuously evolves as I build scalable
            products, learn modern technologies and explore better
            engineering practices.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 sm:mt-10 sm:gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {skills.length}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 sm:text-xs">
                Technologies
              </p>
            </div>

            <div className="h-10 w-px bg-white/10 sm:h-12" />

            <div>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {categories.length}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 sm:text-xs">
                Categories
              </p>
            </div>
          </div>
        </motion.div>

        {/* ====================== Skills Grid ====================== */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {categories.map(([category, items], index) => {
            const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG["Other"];

            return (
              <motion.article
                key={category}
                {...reveal(index * 0.08)}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl sm:rounded-3xl
                  border
                  border-white/10
                  bg-[#111112]
                  p-5 sm:p-7
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]
                "
              >
                {/* Accent Line */}
                <div
                  className={`
                    absolute left-0 top-0 h-[3px] w-full
                    bg-gradient-to-r ${config.accent}
                    origin-left scale-x-0
                    transition-transform duration-500
                    group-hover:scale-x-100
                  `}
                />

                {/* Glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at top, ${config.glow}, transparent 65%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 pr-2">
                      <h3
                        className="text-xl sm:text-2xl font-normal text-white"
                        style={{
                          fontFamily: "'Georgia','Times New Roman',serif",
                        }}
                      >
                        {category}
                      </h3>
                      <p className="mt-2 max-w-sm text-[13px] sm:text-sm leading-6 text-neutral-500">
                        {config.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <h4 className="text-xl sm:text-2xl font-semibold text-white">
                        {items.length}
                      </h4>
                      <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                        Skills
                      </p>
                    </div>
                  </div>

                  <div className="my-5 sm:my-6 h-px bg-white/5" />

                  {/* Skill List */}
                  <div className="space-y-4 sm:space-y-5">
                    {items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.1 + index * 0.08 + skillIndex * 0.05,
                        }}
                        className="group/item"
                      >
                        <div className="flex items-center justify-between gap-3">
                          {/* Left */}
                          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            {/* Icon */}
                            <div
                              className="
                                flex h-10 w-10 sm:h-12 sm:w-12
                                shrink-0
                                items-center justify-center
                                rounded-xl sm:rounded-2xl
                                border border-white/10
                                bg-white/[0.04]
                                transition-all duration-300
                                group-hover/item:border-white/20
                                group-hover/item:bg-white/[0.06]
                              "
                            >
                              {skill.icon?.url ? (
                                <Image
                                  src={skill.icon.url}
                                  alt={skill.name}
                                  width={22}
                                  height={22}
                                  className="h-5 w-5 object-contain sm:h-[26px] sm:w-[26px]"
                                />
                              ) : (
                                <div className="h-3 w-3 rounded-full bg-neutral-600" />
                              )}
                            </div>

                            {/* Name */}
                            <div className="min-w-0">
                              <h4 className="truncate text-sm sm:text-base font-medium text-white">
                                {skill.name}
                              </h4>
                              <p className="mt-1 truncate text-[10px] sm:text-xs uppercase tracking-wider text-neutral-600">
                                {category}
                              </p>
                            </div>
                          </div>

                          {/* Percentage */}
                          <div className="shrink-0 text-right">
                            <h5 className="text-base sm:text-lg font-semibold text-white">
                              {skill.level}%
                            </h5>
                            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-neutral-600">
                              Proficiency
                            </p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-3 sm:mt-4">
                          <div className="h-[6px] sm:h-[7px] overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: 0.2 + skillIndex * 0.05,
                              }}
                              className={`h-full rounded-full bg-gradient-to-r ${config.accent}`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            );
          })}
        </div>

        {/* ====================== Empty State ====================== */}
        {categories.length === 0 && (
          <motion.div
            {...reveal()}
            className="
              flex flex-col items-center justify-center
              rounded-2xl sm:rounded-3xl
              border border-dashed border-white/10
              bg-[#111112]
              px-6 py-16 sm:py-20
              text-center
            "
          >
            <div className="mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/5">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-sky-400/40" />
            </div>

            <h3
              className="text-xl sm:text-2xl text-white"
              style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
            >
              Skills Coming Soon
            </h3>

            <p className="mt-4 max-w-md text-[13px] sm:text-sm leading-7 text-neutral-500">
              Technologies and tools will appear here once they are published
              from the CMS.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}