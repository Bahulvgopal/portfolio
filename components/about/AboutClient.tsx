"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import {
  FiCode,
  FiLayout,
  FiCpu,
  FiMapPin,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

import type { Skill } from "@/types/skill";
import type { Education } from "@/types/education";
import type { Experience } from "@/types/experience";

interface AboutClientProps {
  skills: Skill[];
  education: Education[];
  experiences: Experience[];
  projectCount: number;
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const strengths = [
  {
    title: "Full-Stack Development",
    description:
      "Building scalable, responsive web applications with modern technologies.",
    icon: FiCode,
  },
  {
    title: "UI & Product Thinking",
    description:
      "Designing clean, usable interfaces with performance and user experience in mind.",
    icon: FiLayout,
  },
  {
    title: "Problem Solving",
    description:
      "Turning ideas and real-world problems into working digital products.",
    icon: FiCpu,
  },
];

/* -------------------------------------------------------------------------- */
/*                              REUSABLE HELPERS                              */
/* -------------------------------------------------------------------------- */

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatPeriod(
  startDate: string,
  endDate?: string,
  current?: boolean
) {
  const start = formatDate(startDate);

  if (current) {
    return `${start} — Present`;
  }

  if (endDate) {
    return `${start} — ${formatDate(endDate)}`;
  }

  return start;
}

/* -------------------------------------------------------------------------- */
/*                              REUSABLE TILT CARD                            */
/* -------------------------------------------------------------------------- */

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const dx =
      (e.clientX - (rect.left + rect.width / 2)) /
      (rect.width / 2);

    const dy =
      (e.clientY - (rect.top + rect.height / 2)) /
      (rect.height / 2);

    setTilt({
      x: dy * -5,
      y: dx * 5,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative overflow-hidden rounded-[24px] bg-[#0f0f10] border border-white/[0.07] cursor-default will-change-transform ${className}`}
    >
      <motion.div
        animate={{
          scaleX: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: "left",
          height: "2px",
        }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 z-10"
      />

      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${50 + tilt.y * 4}% ${50 + tilt.x * 4}%,
            rgba(56,189,248,0.07) 0%,
            transparent 70%
          )`,
        }}
      />

      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SECTION LABEL                                 */
/* -------------------------------------------------------------------------- */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-sky-400/80 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function AboutClient({
  skills,
  education,
  experiences,
  projectCount,
}: AboutClientProps) {
  /*
   * Group database skills by category.
   */
  const skillGroups = Object.entries(
    skills.reduce<Record<string, Skill[]>>(
      (groups, skill) => {
        if (!groups[skill.category]) {
          groups[skill.category] = [];
        }

        groups[skill.category].push(skill);

        return groups;
      },
      {}
    )
  );

  /*
   * Current education is used for the hero stat.
   */
  const currentEducation =
    education.find(
      (item) => item.currentlyStudying
    ) ?? education[0];

  /*
   * Determine whether there is current experience.
   */
  const hasCurrentExperience =
    experiences.some(
      (item) => item.currentlyWorking
    );

  return (
    <main className="min-h-screen bg-[#080809] px-4 -mt-[5rem] pt-5 sm:px-6 lg:px-8 pb-28 text-white">
      <div className="max-w-6xl mx-auto">

        {/* ------------------------------------------------------------------ */}
        {/* HERO                                                               */}
        {/* ------------------------------------------------------------------ */}

        <section className="pt-20 sm:pt-28 pb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <SectionLabel>
              About Me
            </SectionLabel>

            <div className="grid lg:grid-cols-2 gap-14 items-center">

              <div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-white"
                  style={{
                    fontFamily:
                      "'Georgia', 'Times New Roman', serif",
                  }}
                >
                  Building products,
                  <br />
                  learning fast,
                  <br />
                  <span className="text-sky-400">
                    solving real problems.
                  </span>
                </h1>

                <p className="text-base text-neutral-400 leading-relaxed mb-4">
                  I&apos;m{" "}
                  <span className="font-semibold text-white">
                    Bahul V Gopal
                  </span>
                  , a Computer Science student passionate
                  about building meaningful digital products
                  using modern web technologies.
                </p>

                <p className="text-base text-neutral-400 leading-relaxed mb-8">
                  Beyond academics, I actively contribute to
                  technical and innovation-driven communities
                  including{" "}
                  <span className="font-semibold text-white">
                    IEDC
                  </span>
                  , where I work on technology initiatives,
                  collaboration, leadership and event execution.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-400">
                    <FiMapPin className="text-sky-400" />
                    Trivandrum, Kerala
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <FiCheckCircle />
                    Open to internships &amp; freelance
                  </span>
                </div>
              </div>

              {/* HERO STATS */}

              <div className="grid grid-cols-2 gap-4">

                <TiltCard>
                  <div className="p-7">
                    <h3 className="text-3xl font-black text-white mb-2 font-mono">
                      {projectCount}+
                    </h3>

                    <p className="text-sm text-neutral-500">
                      Projects Built
                    </p>
                  </div>
                </TiltCard>

                <TiltCard>
                  <div className="p-7">
                    <h3 className="text-3xl font-black text-white mb-2 font-mono">
                      {currentEducation
                        ? currentEducation.degree.includes("B.Tech")
                          ? "B.Tech"
                          : currentEducation.degree
                        : "—"}
                    </h3>

                    <p className="text-sm text-neutral-500">
                      {currentEducation
                        ? currentEducation.fieldOfStudy ||
                          "Education"
                        : "Education"}
                    </p>
                  </div>
                </TiltCard>

                <TiltCard>
                  <div className="p-7">
                    <h3 className="text-3xl font-black text-white mb-2 font-mono">
                      {hasCurrentExperience
                        ? "Active"
                        : "Open"}
                    </h3>

                    <p className="text-sm text-neutral-500">
                      Leadership &amp; Tech
                    </p>
                  </div>
                </TiltCard>

                <TiltCard>
                  <div className="p-7">
                    <h3 className="text-3xl font-black text-white mb-2 font-mono">
                      Open
                    </h3>

                    <p className="text-sm text-neutral-500">
                      To Opportunities
                    </p>
                  </div>
                </TiltCard>

              </div>
            </div>
          </motion.div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* EDUCATION                                                          */}
        {/* ------------------------------------------------------------------ */}

        <section className="py-20 border-t border-white/[0.06]">
          <SectionLabel>
            Education
          </SectionLabel>

          <h2
            className="text-3xl font-black text-white mb-10"
            style={{
              fontFamily: "'Georgia', serif",
            }}
          >
            Education Journey
          </h2>

          {education.length > 0 ? (
            <div className="space-y-4">
              {education.map((edu) => (
                <TiltCard key={edu._id}>
                  <div className="p-7 flex flex-wrap justify-between gap-4 items-start">

                    <div>
                      {edu.currentlyStudying && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-400 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                          Current
                        </span>
                      )}

                      <h3 className="text-xl font-bold text-white">
                        {edu.degree}
                      </h3>

                      <p className="text-neutral-500 mt-1.5 text-sm">
                        {edu.institution}
                      </p>

                      {edu.fieldOfStudy && (
                        <p className="text-neutral-600 mt-1 text-xs">
                          {edu.fieldOfStudy}
                        </p>
                      )}
                    </div>

                    <span className="text-sm font-mono text-sky-400/70 tabular-nums mt-1">
                      {formatPeriod(
                        edu.startDate,
                        edu.endDate,
                        edu.currentlyStudying
                      )}
                    </span>

                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              No education information available.
            </p>
          )}
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* STRENGTHS                                                          */}
        {/* ------------------------------------------------------------------ */}

        <section className="py-20 border-t border-white/[0.06]">
          <SectionLabel>
            Strengths
          </SectionLabel>

          <h2
            className="text-3xl font-black text-white mb-10"
            style={{
              fontFamily: "'Georgia', serif",
            }}
          >
            What I Bring
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {strengths.map((item) => {
              const Icon = item.icon;

              return (
                <TiltCard key={item.title}>
                  <div className="p-7">
                    <Icon className="text-2xl text-sky-400 mb-5" />

                    <h3 className="text-lg font-bold text-white mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* EXPERIENCE                                                         */}
        {/* ------------------------------------------------------------------ */}

        <section className="py-20 border-t border-white/[0.06]">
          <SectionLabel>
            Experience
          </SectionLabel>

          <h2
            className="text-3xl font-black text-white mb-10"
            style={{
              fontFamily: "'Georgia', serif",
            }}
          >
            Leadership &amp; Experience
          </h2>

          {experiences.length > 0 ? (
            <div className="space-y-4">
              {experiences.map((item) => (
                <TiltCard key={item._id}>
                  <div className="p-7">

                    <div className="flex justify-between flex-wrap gap-3 mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {item.role}
                        </h3>

                        <p className="text-neutral-500 mt-1 text-sm">
                          {item.company}
                        </p>

                        {item.location && (
                          <p className="text-neutral-600 mt-1 text-xs">
                            {item.location}
                          </p>
                        )}
                      </div>

                      <span className="text-sm font-mono text-sky-400/70 tabular-nums">
                        {formatPeriod(
                          item.startDate,
                          item.endDate,
                          item.currentlyWorking
                        )}
                      </span>
                    </div>

                    <div className="h-px bg-white/[0.06] mb-5" />

                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>

                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              No experience information available.
            </p>
          )}
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* TECH STACK                                                         */}
        {/* ------------------------------------------------------------------ */}

        <section className="py-20 border-t border-white/[0.06]">
          <SectionLabel>
            Skills
          </SectionLabel>

          <h2
            className="text-3xl font-black text-white mb-10"
            style={{
              fontFamily: "'Georgia', serif",
            }}
          >
            Tech Stack
          </h2>

          {skillGroups.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {skillGroups.map(
                ([category, items]) => (
                  <TiltCard key={category}>
                    <div className="p-7">

                      <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-400/80 mb-5">
                        {category}
                      </h3>

                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {items.map((skill, index) => (
                          <span
                            key={skill._id}
                            className="text-[12px] font-medium tracking-wide text-neutral-500 hover:text-neutral-300 transition-colors duration-300"
                          >
                            {skill.name}

                            {index <
                              items.length - 1 && (
                              <span className="text-neutral-700 mx-2">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>

                    </div>
                  </TiltCard>
                )
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              No skills available.
            </p>
          )}
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* CTA                                                                */}
        {/* ------------------------------------------------------------------ */}

        <section className="mt-4 mb-8">
          <TiltCard className="!rounded-[32px]">
            <div className="p-12 sm:p-16 text-center">

              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <span className="inline-flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-sky-400/80 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Let&apos;s Connect
              </span>

              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight"
                style={{
                  fontFamily: "'Georgia', serif",
                }}
              >
                Let&apos;s Build Something Great
              </h2>

              <p className="max-w-xl mx-auto text-neutral-400 leading-relaxed mb-10 text-sm">
                I&apos;m open to internships, freelance work,
                collaborations and interesting opportunities
                where I can learn, contribute and build.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors duration-200"
              >
                Contact Me
                <FiArrowRight className="text-base" />
              </Link>

            </div>
          </TiltCard>
        </section>

      </div>
    </main>
  );
}