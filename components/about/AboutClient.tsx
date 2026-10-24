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
  FiDownload,
  FiZap,
} from "react-icons/fi";

import {
  ChibiHeroSticker,
  AnimeChakraSticker,
  MangaActionBadge,
  MangaSpeechBubble,
  QuestCompleteSticker,
} from "@/components/AnimeStickers";

import type { Skill } from "@/types/skill";
import type { Education } from "@/types/education";
import type { Experience } from "@/types/experience";

interface AboutClientProps {
  skills: Skill[];
  education: Education[];
  experiences: Experience[];
  projectCount: number;
}

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const strengths = [
  {
    title: "Full-Stack Engineering",
    japanese: "「全能開発」",
    description:
      "Architecting scalable web platforms, responsive full-stack applications, and resilient cloud APIs with Next.js, Node.js, and MongoDB.",
    icon: FiCode,
    tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    title: "UI Physics & Glassmorphism",
    japanese: "「電脳意匠」",
    description:
      "Crafting immersive, hyper-polished glassmorphic interfaces with 3D magnetic tilt physics, silky spring transitions, and responsive aesthetics.",
    icon: FiLayout,
    tags: ["Tailwind CSS", "Framer Motion", "KaTeX", "Design Systems"],
  },
  {
    title: "Problem Solving & Leadership",
    japanese: "「課題解決」",
    description:
      "Active leader in technical innovation initiatives at IEDC, driving community collaboration, hackathons, and converting complex ideas into shipped code.",
    icon: FiCpu,
    tags: ["IEDC Lead", "Community Building", "Hackathons", "Product Thinking"],
  },
];

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
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
  if (current) return `${start} – PRESENT`;
  if (endDate) return `${start} – ${formatDate(endDate)}`;
  return start;
}

/* ── 3D Magnetic Frosted Glass Card ────────────────────────────────────────── */
function FrostedTabletCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: dy * -5, y: dx * 5 });
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
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`
        relative overflow-hidden
        rounded-[34px] sm:rounded-[38px]
        p-2.5 sm:p-3.5
        bg-white/45 backdrop-blur-2xl
        border border-white/80
        shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04),inset_0_0_20px_rgba(255,255,255,0.3)]
        hover:shadow-[0_28px_65px_rgba(234,88,12,0.18)]
        hover:border-orange-500/40
        transition-all duration-300
        ${className}
      `}
    >
      {/* Top Radiant Energy Blade Accent */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left", height: "3px" }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-30 pointer-events-none"
      />

      {/* Ambient Glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        } bg-[radial-gradient(circle_at_50%_0%,rgba(234,88,12,0.08)_0%,transparent_65%)]`}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export default function AboutClient({
  skills,
  education,
  experiences,
  projectCount,
}: AboutClientProps) {
  const skillGroups = Object.entries(
    skills.reduce<Record<string, Skill[]>>((groups, skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
      return groups;
    }, {})
  );

  const currentEducation =
    education.find((item) => item.currentlyStudying) ?? education[0];

  const hasCurrentExperience = experiences.some(
    (item) => item.currentlyWorking
  );

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] px-4 pt-20 sm:pt-28 sm:px-6 lg:px-8 pb-32 text-stone-900 overflow-hidden">
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      {/* Ambient Blobs */}
      <div className="pointer-events-none fixed -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-orange-500/[0.05] blur-[160px] z-0" />
      <div className="pointer-events-none fixed bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/[0.05] blur-[150px] z-0" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-20 sm:space-y-24">
        {/* =================================================================== */}
        {/* 1. HERO BIO SECTION                                                */}
        {/* =================================================================== */}
        <section className="pt-8 sm:pt-12">
          {/* Section Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
              CHARACTER PROFILE // 「冒険者録」
            </span>
            <MangaSpeechBubble text="LEVEL 99 DEV ⚡" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Bio Card (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <FrostedTabletCard>
                <div className="flex flex-col gap-3">
                  {/* Top Compartment */}
                  <div className="rounded-[26px] sm:rounded-[28px] bg-gradient-to-b from-white/75 via-white/60 to-white/70 backdrop-blur-xl border border-white/85 p-6 sm:p-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04)]">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider">
                          // ORIGIN LORE // 「人物伝」
                        </span>
                        <h1 className="font-manga text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-wide uppercase leading-none mt-1">
                          BAHUL V{" "}
                          <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                            GOPAL
                          </span>
                        </h1>
                      </div>

                      {/* Anime Action Stamp */}
                      <MangaActionBadge size={75} className="shrink-0 -mt-2 -mr-2 hidden sm:block" />
                    </div>

                    <p className="font-rajdhani text-lg sm:text-xl font-bold text-stone-800 leading-snug mb-4">
                      Full-Stack Software Engineer &amp; Creative Technologist based in Trivandrum, Kerala.
                    </p>

                    <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 leading-relaxed mb-4">
                      I build scalable, modern web products driven by clean system architecture, silky micro-interactions,
                      and meaningful user experiences. When I write code, I treat UI engineering as an art form—blending
                      physics-driven design with robust full-stack reliability.
                    </p>

                    <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 leading-relaxed mb-6">
                      Beyond academics, I actively spearhead technical initiatives at{" "}
                      <span className="font-bold text-stone-900">IEDC</span>, organizing hackathons, mentoring peers,
                      and transforming raw concepts into working software deployments.
                    </p>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-200/60">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-stone-200/80 font-orbitron text-[10px] font-bold text-stone-700 shadow-xs">
                        <FiMapPin className="text-orange-600 w-3.5 h-3.5" />
                        Trivandrum, Kerala
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-orbitron text-[10px] font-extrabold text-emerald-700 shadow-xs">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        AVAILABLE FOR WORK // 「即戦力」
                      </span>
                    </div>
                  </div>

                  {/* Bottom Compartment (Action Deck) */}
                  <div className="rounded-[20px] sm:rounded-[22px] bg-gradient-to-b from-white/80 via-white/70 to-white/75 backdrop-blur-xl border border-white/85 px-5 py-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.98)] flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-orbitron text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-md hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)] transition-all hover:scale-[1.02]"
                    >
                      <span>INITIATE CONTACT</span>
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/resume"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-orbitron text-xs font-bold tracking-wider uppercase bg-white/80 border border-stone-200/90 text-stone-800 hover:text-orange-600 hover:border-orange-500 shadow-xs transition-colors"
                    >
                      <FiDownload className="w-3.5 h-3.5 text-orange-600" />
                      <span>VIEW RESUME</span>
                    </Link>
                  </div>
                </div>
              </FrostedTabletCard>
            </motion.div>

            {/* Right Telemetry Column (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              {/* Chibi Dev Hero Sticker Floating Showcase */}
              <div className="relative rounded-[34px] sm:rounded-[38px] p-6 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-white/60 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(234,88,12,0.06),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-between overflow-hidden">
                <div className="max-w-[60%]">
                  <span className="font-orbitron text-[9px] font-bold text-orange-600 tracking-widest uppercase">
                    HERO CLASS
                  </span>
                  <h3 className="font-manga text-2xl font-black text-stone-900 uppercase">
                    CHIBI ARCHITECT
                  </h3>
                  <p className="font-rajdhani text-xs font-semibold text-stone-600 mt-1">
                    Specialized in turning coffee and ideas into clean, reactive software systems.
                  </p>
                </div>
                <div className="shrink-0">
                  <ChibiHeroSticker size={105} />
                </div>
              </div>

              {/* 4 Stat Telemetry Pods */}
              <div className="grid grid-cols-2 gap-3.5">
                <FrostedTabletCard>
                  <div className="p-5 flex flex-col justify-between h-full">
                    <span className="font-orbitron text-[9px] font-bold text-orange-600 tracking-wider">
                      // STAT_01
                    </span>
                    <h3 className="font-orbitron text-3xl sm:text-4xl font-extrabold text-stone-900 my-2">
                      {projectCount}+
                    </h3>
                    <p className="font-rajdhani text-xs font-semibold uppercase tracking-wider text-stone-600">
                      Projects Built
                    </p>
                  </div>
                </FrostedTabletCard>

                <FrostedTabletCard>
                  <div className="p-5 flex flex-col justify-between h-full">
                    <span className="font-orbitron text-[9px] font-bold text-orange-600 tracking-wider">
                      // STAT_02
                    </span>
                    <h3 className="font-rajdhani text-2xl sm:text-3xl font-extrabold text-stone-900 my-2 truncate">
                      {currentEducation?.degree.includes("B.Tech") ? "B.Tech" : currentEducation?.degree || "CS"}
                    </h3>
                    <p className="font-rajdhani text-xs font-semibold uppercase tracking-wider text-stone-600">
                      Computer Science
                    </p>
                  </div>
                </FrostedTabletCard>

                <FrostedTabletCard>
                  <div className="p-5 flex flex-col justify-between h-full">
                    <span className="font-orbitron text-[9px] font-bold text-orange-600 tracking-wider">
                      // STAT_03
                    </span>
                    <h3 className="font-rajdhani text-2xl sm:text-3xl font-extrabold text-orange-600 my-2">
                      IEDC Lead
                    </h3>
                    <p className="font-rajdhani text-xs font-semibold uppercase tracking-wider text-stone-600">
                      Leadership &amp; Tech
                    </p>
                  </div>
                </FrostedTabletCard>

                <FrostedTabletCard>
                  <div className="p-5 flex flex-col justify-between h-full">
                    <span className="font-orbitron text-[9px] font-bold text-orange-600 tracking-wider">
                      // STAT_04
                    </span>
                    <h3 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-emerald-600 my-2">
                      100%
                    </h3>
                    <p className="font-rajdhani text-xs font-semibold uppercase tracking-wider text-stone-600">
                      Ready to Build
                    </p>
                  </div>
                </FrostedTabletCard>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. CORE SUPERPOWERS / STRENGTHS                                    */}
        {/* =================================================================== */}
        <section>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 mb-2 block">
                SPECIAL ABILITIES // 「特殊能力」
              </span>
              <h2 className="font-manga text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 uppercase">
                CORE{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                  SUPERPOWERS
                </span>
              </h2>
            </div>
            <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 max-w-md">
              Primary engineering disciplines and technical proficiencies I bring to every software mission.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {strengths.map((item, index) => {
              const Icon = item.icon;
              return (
                <FrostedTabletCard key={item.title}>
                  <div className="flex flex-col justify-between h-full gap-3">
                    {/* Top Chamber */}
                    <div className="rounded-[24px] sm:rounded-[26px] bg-gradient-to-b from-white/75 via-white/60 to-white/70 backdrop-blur-xl border border-white/85 p-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.98)] flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-600 shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-orbitron text-[10px] font-bold text-orange-600">
                          // ABILITY_0{index + 1}
                        </span>
                      </div>

                      <h3 className="font-rajdhani text-2xl font-bold text-stone-900 mb-1">
                        {item.title}
                      </h3>
                      <span className="font-manga text-xs text-stone-500 tracking-wider block mb-3">
                        {item.japanese}
                      </span>

                      <p className="font-rajdhani text-sm font-medium text-stone-600 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-200/60">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-lg font-orbitron text-[9px] font-bold bg-white/80 border border-stone-200/80 text-stone-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Chamber */}
                    <div className="rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-white/80 via-white/70 to-white/75 backdrop-blur-xl border border-white/85 px-4 py-2.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.98)] flex items-center justify-between">
                      <span className="font-orbitron text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                        MASTERY LEVEL
                      </span>
                      <span className="font-orbitron text-[10px] font-extrabold text-orange-600">
                        ★ S-CLASS
                      </span>
                    </div>
                  </div>
                </FrostedTabletCard>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. TECH ARSENAL / SKILLS MATRIX                                    */}
        {/* =================================================================== */}
        <section>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase text-orange-600 mb-2 block">
                COMBAT ARSENAL // 「技術装備」
              </span>
              <h2 className="font-manga text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 uppercase">
                TECH{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                  STACK
                </span>
              </h2>
            </div>
            <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 max-w-md">
              Categorized technologies, frameworks, runtime environments, and developer tools in my everyday workflow.
            </p>
          </div>

          {/* Groups Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map(([category, items], i) => (
              <FrostedTabletCard key={category}>
                <div className="flex flex-col justify-between h-full gap-3">
                  {/* Top Chamber */}
                  <div className="rounded-[24px] sm:rounded-[26px] bg-gradient-to-b from-white/75 via-white/60 to-white/70 backdrop-blur-xl border border-white/85 p-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.98)] flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider uppercase">
                        // ARSENAL_0{i + 1}
                      </span>
                      <span className="font-mono text-[10px] text-stone-400">
                        {items.length} {items.length === 1 ? "TOOL" : "TOOLS"}
                      </span>
                    </div>

                    <h3 className="font-rajdhani text-2xl font-bold text-stone-900 uppercase tracking-tight mb-4">
                      {category}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill._id}
                          className="px-3 py-1.5 rounded-xl font-orbitron text-[11px] font-semibold bg-white/80 border border-stone-200/80 text-stone-800 shadow-2xs hover:border-orange-500 hover:text-orange-600 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Chamber */}
                  <div className="rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-white/80 via-white/70 to-white/75 backdrop-blur-xl border border-white/85 px-4 py-2.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.98)] flex items-center justify-between">
                    <span className="font-orbitron text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      DOMAIN
                    </span>
                    <span className="font-orbitron text-[10px] font-bold text-orange-600 uppercase">
                      READY
                    </span>
                  </div>
                </div>
              </FrostedTabletCard>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. QUEST COMPLETE / LET'S BUILD SOMETHING GREAT                     */}
        {/* =================================================================== */}
        <section className="pt-6">
          <FrostedTabletCard className="!rounded-[40px] sm:!rounded-[44px]">
            <div className="p-8 sm:p-14 text-center relative overflow-hidden">
              {/* Center Chakra Flame Watermark Sticker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
                <AnimeChakraSticker size={260} />
              </div>

              {/* Quest Complete Stamp */}
              <div className="mb-6 flex justify-center">
                <QuestCompleteSticker />
              </div>

              <h2 className="font-manga text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 uppercase tracking-wide leading-none mb-4">
                READY TO TEAM UP?{" "}
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                  LET&apos;S BUILD
                </span>
              </h2>

              <p className="font-rajdhani text-base sm:text-lg font-medium text-stone-600 max-w-xl mx-auto leading-relaxed mb-8">
                I&apos;m actively exploring software engineering roles, high-impact internships, freelance collaborations,
                and innovative product builds. Let&apos;s turn ambitious visions into shipped reality.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-orbitron text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-lg hover:shadow-[0_10px_30px_rgba(234,88,12,0.35)] hover:scale-[1.03] transition-all"
                >
                  <span>INITIATE MISSION</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-orbitron text-xs font-bold tracking-wider uppercase bg-white/80 border border-stone-200/90 text-stone-800 hover:text-orange-600 hover:border-orange-500 shadow-xs transition-colors"
                >
                  <FiZap className="w-4 h-4 text-orange-600" />
                  <span>EXPLORE PROJECTS</span>
                </Link>
              </div>
            </div>
          </FrostedTabletCard>
        </section>
      </div>
    </main>
  );
}
