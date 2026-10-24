"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  QuestCompleteSticker,
  AnimeChakraSticker,
  MangaSpeechBubble,
} from "@/components/AnimeStickers";
import type { Experience } from "@/types/experience";

type Props = {
  experiences: Experience[];
};

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

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ExperiencePreview({ experiences }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for Glowing Timeline Conduit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const preview = [...experiences]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative pb-28 pt-10 -mt-[4rem] px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] overflow-hidden"
    >
      {/* ── 1. AMBIENT BACKGROUND GLOWS & CYBER GRID ─────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Amber Radiant Glow Orb */}
        <div
          className="absolute top-10 right-0 w-[550px] h-[550px] rounded-full blur-[150px] opacity-35 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(234, 88, 12, 0.22) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 80%)",
          }}
        />

        {/* Burnt Orange Dawn Orb */}
        <div
          className="absolute -bottom-16 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(234, 88, 12, 0.1) 60%, transparent 80%)",
          }}
        />

        {/* Stylized Anime Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(234,88,12,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Large Anime Kanji Ghost Watermark */}
        <div className="absolute top-24 right-6 select-none pointer-events-none font-black text-stone-900/[0.03] text-[120px] lg:text-[220px] leading-none tracking-tighter">
          経歴
        </div>
        <div className="absolute bottom-20 left-6 select-none pointer-events-none font-black text-orange-600/[0.03] text-[100px] lg:text-[180px] leading-none tracking-tighter">
          実績
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ── 2. SECTION HEADER (ANIME GLASSMORPHISM) ─────────────────── */}
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="relative">
            {/* Main Title in Manga Temple Font with Quest Sticker */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-manga text-[clamp(2.4rem,6vw,4.5rem)] font-bold tracking-wide uppercase text-stone-900 leading-[1.05]"
              >
                WHERE I&apos;VE{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-[0_2px_14px_rgba(234,88,12,0.22)]">
                  WORKED
                </span>
              </motion.h2>

              <div className="hidden sm:inline-block">
                <QuestCompleteSticker />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-3 max-w-2xl font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed"
            >
              Engineering scalable digital realities, production microservices, and high-impact web architectures across forward-thinking teams.
            </motion.p>
          </div>

          {/* Interactive "View all" Button & Chakra Sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="flex items-center gap-4 shrink-0"
          >
            <div className="hidden md:block">
              <AnimeChakraSticker size={50} />
            </div>

            <Link
              href="/experience"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/85 text-stone-700 font-orbitron text-[11px] font-bold tracking-wider uppercase hover:border-orange-500/50 hover:text-orange-600 hover:bg-orange-50/70 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.15)] transition-all duration-200 active:scale-95"
            >
              <span>View all</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1 text-orange-600"
              />
            </Link>
          </motion.div>
        </div>

        {/* Decorative Anime Blade Divider */}
        <div className="relative mb-12 sm:mb-16">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(234,88,12,0.25) 20%, rgba(245,158,11,0.4) 50%, rgba(234,88,12,0.25) 80%, transparent 100%)",
            }}
          />
        </div>

        {/* ── 3. TIMELINE CONDUIT & SCROLLING EXPERIENCE CARDS ─────────── */}
        <div className="relative">
          {/* Background Static Conduit Track */}
          <div className="absolute left-[15px] sm:left-[23px] top-6 bottom-6 w-[2px] bg-stone-200/80 rounded-full" />

          {/* Animated Glowing Laser Energy Beam (Charges up on Scroll) */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[15px] sm:left-[23px] top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-orange-500 via-amber-500 to-red-500 shadow-[0_0_12px_rgba(234,88,12,0.9)] z-10"
          />

          <div className="space-y-6 sm:space-y-8">
            {preview.map((exp, i) => {
              const current = exp.currentlyWorking;

              return (
                <motion.div
                  key={exp._id || i}
                  initial={{ opacity: 0, x: 25, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="relative pl-10 sm:pl-16 group"
                >
                  {/* Glowing Anime Conduit Node */}
                  <div className="absolute left-[5px] sm:left-[13px] top-[1.6rem] z-20 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white/90 backdrop-blur-md border border-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.9)] group-hover:scale-115 transition-transform duration-300">
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          current
                            ? "bg-[#EA580C] shadow-[0_0_10px_#EA580C] animate-pulse"
                            : "bg-stone-400 group-hover:bg-[#EA580C] group-hover:shadow-[0_0_8px_#EA580C]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Crystal Glassmorphic Experience Card */}
                  <article className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/85 shadow-[0_12px_36px_rgba(234,88,12,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(234,88,12,0.16)] hover:-translate-y-1 transition-all duration-300 p-5 sm:p-7">
                    {/* Top Radiant Anime Blade Line */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                    {/* Ambient Glow behind card */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_25%_0%,rgba(234,88,12,0.08)_0%,transparent_60%)]" />

                    <div className="relative z-10">
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3.5 sm:gap-4">
                          {/* Company Logo Lens */}
                          <div className="relative h-13 w-13 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-2xl border border-white/90 bg-white/80 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.9)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            {exp.logo?.url ? (
                              <Image
                                src={exp.logo.url}
                                alt={exp.company}
                                fill
                                className="object-contain p-2"
                                sizes="56px"
                              />
                            ) : (
                              <span className="font-manga text-xl font-bold text-orange-600">
                                {exp.company.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* Role & Company */}
                          <div>
                            <h3 className="font-rajdhani text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors tracking-tight leading-snug">
                              {exp.role}
                            </h3>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-rajdhani text-sm sm:text-base font-semibold text-stone-700">
                                {exp.company}
                              </span>
                              {exp.website && (
                                <a
                                  href={exp.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-stone-400 hover:text-orange-600 transition-colors"
                                  aria-label={`Visit ${exp.company} website`}
                                >
                                  <ExternalLink size={13} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Badges Column: Employment & Period */}
                        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 shrink-0">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/25 bg-orange-500/10 font-orbitron text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                            {employmentLabel(exp.employmentType)}
                          </span>

                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-200/80 bg-white/80 backdrop-blur-md font-orbitron text-[10px] text-stone-600 tracking-wide whitespace-nowrap">
                            <Calendar size={11} className="text-stone-400" />
                            {formatPeriod(
                              exp.startDate,
                              exp.endDate,
                              exp.currentlyWorking
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Location & Current Status Tags */}
                      {(exp.location || current) && (
                        <div className="flex items-center gap-2.5 mb-3">
                          {exp.location && (
                            <span className="inline-flex items-center gap-1 font-orbitron text-[10px] text-stone-500 uppercase tracking-wider">
                              <MapPin size={11} className="text-orange-500" />
                              {exp.location}
                            </span>
                          )}
                          {current && (
                            <span className="inline-flex items-center gap-1 font-orbitron text-[10px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active Role
                            </span>
                          )}
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-stone-200/70 my-3.5" />

                      {/* Description */}
                      {exp.description && (
                        <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {/* Key Skills / Technologies Chips */}
                      {exp.skills?.filter(Boolean).length ? (
                        <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                          {exp.skills.filter(Boolean).map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-stone-100/90 group-hover:bg-orange-50/70 border border-stone-200/80 group-hover:border-orange-500/30 font-rajdhani text-xs font-semibold text-stone-700 group-hover:text-orange-700 transition-colors shadow-2xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
