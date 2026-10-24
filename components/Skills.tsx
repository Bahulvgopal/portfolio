"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Layers,
  LayoutGrid,
  Zap,
  Flame,
  ShieldCheck,
  Code2,
  Terminal,
} from "lucide-react";
import {
  ChibiHeroSticker,
  MangaActionBadge,
  MangaSpeechBubble,
} from "@/components/AnimeStickers";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiGit,
  SiGithub,
  SiVscodium,
  SiVercel,
  SiPostman,
  SiPython,
  SiDocker,
  SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

export interface Skill {
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
  order: number;
  icon?: {
    url: string;
    publicId: string;
  };
}

interface SkillsProps {
  skills: Skill[];
}

const CATEGORY_META: Record<
  string,
  {
    description: string;
    japanese: string;
    code: string;
    accent: string;
    glow: string;
    level: string;
  }
> = {
  Frontend: {
    description: "Crafting reactive, high-performance user interfaces and responsive web realities.",
    japanese: "「フロントエンド」",
    code: "DOM-01",
    accent: "from-orange-500 via-amber-500 to-red-500",
    glow: "rgba(234,88,12,0.18)",
    level: "RANK S",
  },
  Backend: {
    description: "Architecting high-concurrency microservices, robust REST APIs and auth pipelines.",
    japanese: "「バックエンド」",
    code: "SRV-02",
    accent: "from-amber-600 via-orange-600 to-rose-600",
    glow: "rgba(217,119,6,0.18)",
    level: "RANK S",
  },
  Database: {
    description: "Designing high-throughput data models, indexing and scalable document stores.",
    japanese: "「データベース」",
    code: "DAT-03",
    accent: "from-orange-600 via-amber-600 to-emerald-600",
    glow: "rgba(234,88,12,0.18)",
    level: "RANK A+",
  },
  Tools: {
    description: "Daily DevOps, version control pipelines, terminal tooling and cloud deployment.",
    japanese: "「ツール・運用」",
    code: "TLS-04",
    accent: "from-orange-600 via-amber-600 to-rose-600",
    glow: "rgba(234,88,12,0.18)",
    level: "RANK S",
  },
  Programming: {
    description: "Algorithmic engineering, data structures, and multi-paradigm languages.",
    japanese: "「プログラミング」",
    code: "PRG-05",
    accent: "from-red-600 via-orange-600 to-amber-500",
    glow: "rgba(220,38,38,0.18)",
    level: "RANK S",
  },
  "AI/ML": {
    description: "Machine learning integration, intelligent automations and neural workflows.",
    japanese: "「人工知能」",
    code: "AIM-06",
    accent: "from-rose-500 via-orange-500 to-amber-500",
    glow: "rgba(244,63,94,0.18)",
    level: "RANK A+",
  },
  DevOps: {
    description: "Continuous integration, cloud deployment pipelines and production monitoring.",
    japanese: "「デブオプス」",
    code: "OPS-07",
    accent: "from-amber-500 via-orange-500 to-red-500",
    glow: "rgba(245,158,11,0.18)",
    level: "RANK A+",
  },
  Other: {
    description: "Specialized utilities and next-gen engineering tools.",
    japanese: "「拡張装備」",
    code: "EXT-08",
    accent: "from-stone-500 via-orange-600 to-amber-600",
    glow: "rgba(120,113,108,0.18)",
    level: "RANK A",
  },
};

// Skill mastery / power ratings for cyberpunk power gauge
const SKILL_POWER: Record<string, number> = {
  "React": 96,
  "Next.js": 95,
  "JavaScript": 94,
  "TypeScript": 90,
  "HTML": 98,
  "CSS": 96,
  "Tailwind CSS": 96,
  "Node.js": 92,
  "Express.js": 90,
  "Rest APIs": 94,
  "MongoDB": 89,
  "Mongoose": 88,
  "GitHub": 94,
  "Git": 92,
  "VS Code": 96,
  "Vercel": 92,
  "Postman": 90,
  "Python": 86,
  "Docker": 84,
};

const getFallbackIcon = (name: string): React.ReactNode => {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes("react")) return <SiReact className="text-[#0ea5e9]" size={26} />;
  if (normalized.includes("next")) return <SiNextdotjs className="text-stone-900" size={26} />;
  if (normalized.includes("node")) return <SiNodedotjs className="text-[#16a34a]" size={26} />;
  if (normalized.includes("express")) return <SiExpress className="text-stone-800" size={26} />;
  if (normalized.includes("mongo") && !normalized.includes("mongoose")) return <SiMongodb className="text-[#15803d]" size={26} />;
  if (normalized.includes("mongoose")) return <SiMongoose className="text-[#dc2626]" size={26} />;
  if (normalized.includes("html")) return <SiHtml5 className="text-[#ea580c]" size={26} />;
  if (normalized.includes("css")) return <SiCss className="text-[#2563eb]" size={26} />;
  if (normalized.includes("javascript") || normalized === "js") return <SiJavascript className="text-[#ca8a04]" size={26} />;
  if (normalized.includes("typescript") || normalized === "ts") return <SiTypescript className="text-[#3b82f6]" size={26} />;
  if (normalized.includes("tailwind")) return <SiTailwindcss className="text-[#06b6d4]" size={26} />;
  if (normalized.includes("git") && !normalized.includes("github")) return <SiGit className="text-[#ea580c]" size={26} />;
  if (normalized.includes("github")) return <SiGithub className="text-stone-900" size={26} />;
  if (normalized.includes("vs code") || normalized.includes("vscode")) return <SiVscodium className="text-[#0284c7]" size={26} />;
  if (normalized.includes("vercel")) return <SiVercel className="text-stone-900" size={26} />;
  if (normalized.includes("postman")) return <SiPostman className="text-[#ea580c]" size={26} />;
  if (normalized.includes("api") || normalized.includes("rest")) return <TbApi className="text-[#ea580c]" size={28} />;
  if (normalized.includes("python")) return <SiPython className="text-[#0284c7]" size={26} />;
  if (normalized.includes("docker")) return <SiDocker className="text-[#0284c7]" size={26} />;
  return <Cpu className="text-[#ea580c]" size={24} />;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"matrix" | "deck">("matrix");

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};

    skills.forEach((skill) => {
      const cat = skill.category || "Other";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(skill);
    });

    Object.keys(groups).forEach((category) => {
      groups[category].sort((a, b) => a.order - b.order);
    });

    return groups;
  }, [skills]);

  const categories = useMemo(() => Object.entries(groupedSkills), [groupedSkills]);

  // Unique categories list for filtering
  const categoryFilters = useMemo(() => {
    const list = ["All", ...Object.keys(groupedSkills)];
    return list;
  }, [groupedSkills]);

  // Filtered skills for Grid Matrix view
  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [skills, selectedCategory]);

  return (
    <section className="relative pb-28 pt-8 -mt-[4rem] px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]">
      {/* ── 1. AMBIENT ANIME LIGHTING & CYBER MESH BACKGROUND ───────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Warm Burnt Orange Glow Orb (Top Center) */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[900px] h-[450px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(234, 88, 12, 0.22) 0%, rgba(245, 158, 11, 0.14) 50%, transparent 80%)",
          }}
        />

        {/* Amber Radiant Aura (Bottom Right) */}
        <div
          className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-35 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(234, 88, 12, 0.12) 55%, transparent 75%)",
          }}
        />

        {/* Violet Tech Aura (Bottom Left) */}
        <div
          className="absolute bottom-10 -left-20 w-[420px] h-[420px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(234, 88, 12, 0.08) 60%, transparent 80%)",
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

        {/* Large Anime Kanji Ghost Watermarks */}
        <div className="absolute top-20 left-8 select-none pointer-events-none font-black text-stone-900/[0.03] text-[120px] lg:text-[200px] leading-none tracking-tighter">
          技術
        </div>
        <div className="absolute bottom-16 right-10 select-none pointer-events-none font-black text-orange-600/[0.035] text-[100px] lg:text-[180px] leading-none tracking-tighter">
          覚醒
        </div>

        {/* Floating anime mana sparks */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`tech-spark-${i}`}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: i % 2 === 0 ? "#EA580C" : "#F59E0B",
              boxShadow: "0 0 10px rgba(234,88,12,0.8)",
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* Top Anime Section Blade Divider */}
      <div className="relative max-w-6xl mx-auto px-5 mb-14">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(234,88,12,0.2) 20%, rgba(245,158,11,0.35) 50%, rgba(234,88,12,0.2) 80%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── 2. ANIME CYBER HEADER & HUD STATUS RIBBON ───────────────── */}
        <div className="text-center mb-10 sm:mb-14">
          {/* Main Title Container with Floating Chibi Sticker */}
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="font-manga text-[clamp(2.4rem,6vw,4.5rem)] font-bold tracking-wide uppercase text-stone-900 leading-[1.05]"
            >
              TECHNOLOGIES I{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-[0_2px_14px_rgba(234,88,12,0.22)]">
                MASTERED
              </span>
            </motion.h2>

            {/* Peeking Floating Chibi Sticker on Desktop */}
            <div className="hidden lg:block absolute -right-24 -top-8 pointer-events-auto">
              <ChibiHeroSticker size={88} />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed"
          >
            Battle-tested frameworks, modern architectural protocols, and next-gen web realities built for high scale.
          </motion.p>

          {/* Anime HUD Stats Pod Strip with Action Badge */}
          <div className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              className="w-full grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_12px_36px_rgba(234,88,12,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)]"
            >
              {/* Stat 1: Total Arsenal */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-orange-50/60 border border-orange-500/15">
                <span className="font-orbitron text-[9px] sm:text-[10px] font-bold text-orange-600 tracking-wider">
                  [01] ARSENAL
                </span>
                <span className="font-manga text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {skills.length}
                </span>
                <span className="font-rajdhani text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Technologies
                </span>
              </div>

              {/* Stat 2: Combat Domains */}
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-amber-50/60 border border-amber-500/15">
                <span className="font-orbitron text-[9px] sm:text-[10px] font-bold text-amber-700 tracking-wider">
                  [02] DOMAINS
                </span>
                <span className="font-manga text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {categories.length}
                </span>
                <span className="font-rajdhani text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Disciplines
                </span>
              </div>
            </motion.div>

            {/* Anime Sticker Stamp */}
            <div className="shrink-0">
              <MangaActionBadge size={85} />
            </div>
          </div>
        </div>

        {/* ── 3. INTERACTIVE CATEGORY FILTER BAR & VIEW TOGGLE ───────── */}
        <div className="mb-8 sm:mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Cyber Filter Pills (Wrapped cleanly, zero scrollbar) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryFilters.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? skills.length
                  : groupedSkills[category]?.length || 0;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl font-orbitron text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                    isSelected
                      ? "text-white shadow-[0_6px_20px_rgba(234,88,12,0.35)] scale-105"
                      : "bg-white/70 backdrop-blur-xl border border-white/85 text-stone-600 hover:text-stone-900 hover:border-orange-500/40 hover:bg-orange-50/40"
                  }`}
                  style={{
                    background: isSelected
                      ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                      : undefined,
                  }}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/25 text-white"
                        : "bg-stone-200/80 text-stone-600 group-hover:bg-orange-500/20 group-hover:text-orange-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (Grid Matrix vs Arsenal Decks) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("matrix")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-orbitron text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                viewMode === "matrix"
                  ? "bg-[#EA580C] text-white shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <LayoutGrid size={13} />
              <span>Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("deck")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-orbitron text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                viewMode === "deck"
                  ? "bg-[#EA580C] text-white shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <Layers size={13} />
              <span>Decks</span>
            </button>
          </div>
        </div>

        {/* ── 4. VIEW MODE 1: HOLOGRAPHIC BENTO GRID MATRIX ─────────── */}
        <AnimatePresence mode="wait">
          {viewMode === "matrix" ? (
            <motion.div
              key="view-matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5"
            >
              {filteredSkills.map((skill, index) => {
                const power = SKILL_POWER[skill.name] || 90;
                const catMeta = CATEGORY_META[skill.category] || CATEGORY_META["Other"];

                return (
                  <motion.div
                    key={skill._id || skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(index * 0.03, 0.3),
                      ease: EASE,
                    }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/85 shadow-[0_10px_30px_rgba(234,88,12,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-orange-500/50 hover:shadow-[0_20px_45px_rgba(234,88,12,0.16)] transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Top Specular Sheen (glides on hover) */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-orange-500/10 via-amber-400/5 to-transparent" />

                    {/* Top Category Tag */}
                    <div className="flex items-center justify-end w-full mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-orbitron font-bold bg-stone-100/90 group-hover:bg-orange-50 text-stone-500 group-hover:text-orange-600 transition-colors uppercase">
                        {skill.category}
                      </span>
                    </div>

                    {/* Center Icon Orb */}
                    <div className="relative my-2 flex items-center justify-center">
                      {/* Ambient Glow behind icon */}
                      <div className="absolute w-14 h-14 rounded-full bg-orange-500/15 blur-lg group-hover:bg-orange-500/30 group-hover:scale-125 transition-all duration-300" />

                      <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.95)] group-hover:scale-110 group-hover:border-orange-500/40 transition-all duration-300">
                        {skill.icon?.url ? (
                          <Image
                            src={skill.icon.url}
                            alt={skill.name}
                            width={30}
                            height={30}
                            className="object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          getFallbackIcon(skill.name)
                        )}
                      </div>
                    </div>

                    {/* Skill Info & Name */}
                    <div className="mt-3 text-center">
                      <h4 className="font-rajdhani text-base sm:text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors truncate">
                        {skill.name}
                      </h4>

                      {/* Power Gauge Meter */}
                      <div className="mt-3 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden border border-stone-200/80">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${power}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.6)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* ── 5. VIEW MODE 2: GROUPED ARSENAL DECKS ─────────────────── */
            <motion.div
              key="view-deck"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7"
            >
              {categories.map(([category, items], catIndex) => {
                const config = CATEGORY_META[category] || CATEGORY_META["Other"];

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: catIndex * 0.08, ease: EASE }}
                    className="group relative rounded-3xl p-6 sm:p-7 bg-white/70 backdrop-blur-2xl border border-white/85 shadow-[0_14px_40px_rgba(234,88,12,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-orange-500/40 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Top Radiant Anime Blade Line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${config.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    {/* Ambient Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${config.glow}, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Deck Header */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <h3 className="font-manga text-2xl sm:text-3xl font-bold uppercase text-stone-900 tracking-wide">
                          {category}
                        </h3>
                        <span className="font-orbitron text-xs font-bold text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                          {items.length} SKILLS
                        </span>
                      </div>

                      <p className="font-rajdhani text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-medium">
                        {config.description}
                      </p>

                      {/* Skills Bento Chips */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                        {items.map((skill) => (
                          <div
                            key={skill._id || skill.name}
                            className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 hover:bg-orange-50/70 border border-stone-200/80 hover:border-orange-500/40 transition-all duration-200 group/chip hover:scale-[1.03] shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-50 border border-stone-200/80 shrink-0 group-hover/chip:border-orange-500/40 transition-colors">
                              {skill.icon?.url ? (
                                <Image
                                  src={skill.icon.url}
                                  alt={skill.name}
                                  width={18}
                                  height={18}
                                  className="object-contain"
                                />
                              ) : (
                                getFallbackIcon(skill.name)
                              )}
                            </div>
                            <span className="font-rajdhani text-xs sm:text-sm font-bold text-stone-900 group-hover/chip:text-orange-600 transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 6. EMPTY STATE (FALLBACK) ───────────────────────────────── */}
        {skills.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/85 text-center shadow-lg">
            <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 mb-4 animate-pulse">
              <Code2 size={24} />
            </div>
            <h3 className="font-manga text-2xl font-bold uppercase text-stone-900">
              ARSENAL INITIALIZING...
            </h3>
            <p className="font-rajdhani text-sm text-stone-600 mt-2 max-w-md">
              Technology protocols are being published from the central command mainframe.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
