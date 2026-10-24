"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  LayoutGrid,
  Zap,
  ShieldCheck,
  Code2,
} from "lucide-react";
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
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

/* --- skill icon map ------------------------------------------------------- */
const ICON_MAP: Record<string, React.ReactNode> = {
  HTML: <SiHtml5 className="text-[#ea580c]" size={26} />,
  CSS: <SiCss className="text-[#2563eb]" size={26} />,
  JavaScript: <SiJavascript className="text-[#ca8a04]" size={26} />,
  React: <SiReact className="text-[#0ea5e9]" size={26} />,
  "Next.js": <SiNextdotjs className="text-stone-900" size={26} />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06b6d4]" size={26} />,
  "Node.js": <SiNodedotjs className="text-[#16a34a]" size={26} />,
  "Express.js": <SiExpress className="text-stone-800" size={26} />,
  "REST APIs": <TbApi className="text-[#ea580c]" size={28} />,
  MongoDB: <SiMongodb className="text-[#15803d]" size={26} />,
  Mongoose: <SiMongoose className="text-[#dc2626]" size={26} />,
  Git: <SiGit className="text-[#ea580c]" size={26} />,
  GitHub: <SiGithub className="text-stone-900" size={26} />,
  "VS Code": <SiVscodium className="text-[#0284c7]" size={26} />,
  Vercel: <SiVercel className="text-stone-900" size={26} />,
  Postman: <SiPostman className="text-[#ea580c]" size={26} />,
};

const SKILL_POWER: Record<string, number> = {
  React: 96,
  "Next.js": 95,
  JavaScript: 94,
  HTML: 98,
  CSS: 96,
  "Tailwind CSS": 96,
  "Node.js": 92,
  "Express.js": 90,
  "REST APIs": 94,
  MongoDB: 89,
  Mongoose: 88,
  GitHub: 94,
  Git: 92,
  "VS Code": 96,
  Vercel: 92,
  Postman: 90,
};

/* --- data ----------------------------------------------------------------- */
const skillGroups = [
  {
    title: "Frontend",
    japanese: "「フロントエンド」",
    code: "DOM-01",
    description: "Crafting reactive, high-performance user interfaces and responsive web realities.",
    accent: "from-orange-500 via-amber-500 to-red-500",
    glow: "rgba(234,88,12,0.18)",
    level: "RANK S",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    japanese: "「バックエンド」",
    code: "SRV-02",
    description: "Architecting high-concurrency microservices, robust REST APIs and auth pipelines.",
    accent: "from-amber-600 via-orange-600 to-rose-600",
    glow: "rgba(217,119,6,0.18)",
    level: "RANK S",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    japanese: "「データベース」",
    code: "DAT-03",
    description: "Designing high-throughput data models, indexing and scalable document stores.",
    accent: "from-orange-600 via-amber-600 to-emerald-600",
    glow: "rgba(234,88,12,0.18)",
    level: "RANK A+",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools & Workflow",
    japanese: "「ツール・運用」",
    code: "TLS-04",
    description: "Daily DevOps, version control pipelines, terminal tooling and cloud deployment.",
    accent: "from-orange-600 via-amber-600 to-rose-600",
    glow: "rgba(234,88,12,0.18)",
    level: "RANK S",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Postman"],
  },
];

const allSkillsList = skillGroups.flatMap((group) =>
  group.skills.map((name) => ({
    name,
    category: group.title,
    level: group.level,
  }))
);

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CollectionsSkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"matrix" | "deck">("matrix");

  const categoryFilters = ["All", ...skillGroups.map((g) => g.title)];

  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") return allSkillsList;
    return allSkillsList.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen pt-28 sm:pt-36 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]">
      {/* ── 1. AMBIENT ANIME LIGHTING & CYBER MESH ─────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[900px] h-[450px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(234, 88, 12, 0.22) 0%, rgba(245, 158, 11, 0.14) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-35 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(234, 88, 12, 0.12) 55%, transparent 75%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(234,88,12,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Kanji Watermarks */}
        <div className="absolute top-24 left-8 select-none pointer-events-none font-black text-stone-900/[0.03] text-[120px] lg:text-[200px] leading-none tracking-tighter">
          技術
        </div>
        <div className="absolute bottom-20 right-10 select-none pointer-events-none font-black text-orange-600/[0.035] text-[100px] lg:text-[180px] leading-none tracking-tighter">
          覚醒
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── 2. CYBER ANIME HEADER ───────────────────────────────────── */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-manga text-[clamp(2.4rem,6vw,4.5rem)] font-bold tracking-wide uppercase text-stone-900 leading-[1.05]"
          >
            TECHNOLOGIES I{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-[0_2px_14px_rgba(234,88,12,0.22)]">
              MASTERED
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed"
          >
            Tools and architectural protocols I deploy to design, build, and ship modern digital products.
          </motion.p>

          {/* Anime HUD Stats Pod Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            className="mt-8 mx-auto max-w-md grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_12px_36px_rgba(234,88,12,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)]"
          >
            <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-orange-50/60 border border-orange-500/15">
              <span className="font-orbitron text-[9px] sm:text-[10px] font-bold text-orange-600 tracking-wider">
                [01] ARSENAL
              </span>
              <span className="font-manga text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {allSkillsList.length}
              </span>
              <span className="font-rajdhani text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Technologies
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-amber-50/60 border border-amber-500/15">
              <span className="font-orbitron text-[9px] sm:text-[10px] font-bold text-amber-700 tracking-wider">
                [02] DOMAINS
              </span>
              <span className="font-manga text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {skillGroups.length}
              </span>
              <span className="font-rajdhani text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Disciplines
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── 3. FILTER & VIEW TOGGLE ─────────────────────────────────── */}
        <div className="mb-8 sm:mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryFilters.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? allSkillsList.length
                  : skillGroups.find((g) => g.title === category)?.skills.length || 0;

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

        {/* ── 4. CONTENT VIEW (MATRIX VS DECKS) ────────────────────────── */}
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

                return (
                  <motion.div
                    key={skill.name}
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
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-orange-500/10 via-amber-400/5 to-transparent" />

                    <div className="flex items-center justify-end w-full mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-orbitron font-bold bg-stone-100/90 group-hover:bg-orange-50 text-stone-500 group-hover:text-orange-600 transition-colors uppercase">
                        {skill.category}
                      </span>
                    </div>

                    <div className="relative my-2 flex items-center justify-center">
                      <div className="absolute w-14 h-14 rounded-full bg-orange-500/15 blur-lg group-hover:bg-orange-500/30 group-hover:scale-125 transition-all duration-300" />
                      <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_6px_18px_rgba(0,0,0,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.95)] group-hover:scale-110 group-hover:border-orange-500/40 transition-all duration-300">
                        {ICON_MAP[skill.name] || <Code2 className="text-orange-600" size={24} />}
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <h4 className="font-rajdhani text-base sm:text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors truncate">
                        {skill.name}
                      </h4>

                      <div className="mt-3 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden border border-stone-200/80">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${power}%` }}
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
            <motion.div
              key="view-deck"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7"
            >
              {skillGroups.map((group, catIndex) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: catIndex * 0.08, ease: EASE }}
                  className="group relative rounded-3xl p-6 sm:p-7 bg-white/70 backdrop-blur-2xl border border-white/85 shadow-[0_14px_40px_rgba(234,88,12,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:border-orange-500/40 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${group.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${group.glow}, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h3 className="font-manga text-2xl sm:text-3xl font-bold uppercase text-stone-900 tracking-wide">
                        {group.title}
                      </h3>
                      <span className="font-orbitron text-xs font-bold text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                        {group.skills.length} SKILLS
                      </span>
                    </div>

                    <p className="font-rajdhani text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-medium">
                      {group.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {group.skills.map((skillName) => (
                        <div
                          key={skillName}
                          className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 hover:bg-orange-50/70 border border-stone-200/80 hover:border-orange-500/40 transition-all duration-200 group/chip hover:scale-[1.03] shadow-2xs"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-50 border border-stone-200/80 shrink-0 group-hover/chip:border-orange-500/40 transition-colors">
                            {ICON_MAP[skillName] || <Code2 size={18} className="text-orange-600" />}
                          </div>
                          <span className="font-rajdhani text-xs sm:text-sm font-bold text-stone-900 group-hover/chip:text-orange-600 transition-colors truncate">
                            {skillName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
