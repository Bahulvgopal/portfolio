"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { MangaSpeechBubble } from "@/components/AnimeStickers";
import type { Project } from "@/types/project";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const techList = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      (p.tech ?? []).forEach((t) => set.add(t));
      (p.tags ?? []).forEach((t) => set.add(t));
    });
    const defaults = ["All", "Next.js", "MongoDB", "Tailwind", "Python", "HTML", "CSS", "JS"];
    const list = ["All"];
    Array.from(set).forEach((t) => {
      if (!list.includes(t)) list.push(t);
    });
    defaults.forEach((t) => {
      if (!list.includes(t)) list.push(t);
    });
    return list.slice(0, 12);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();

    return projects.filter((p) => {
      const normalizedTech = [
        ...(p.tech ?? []),
        ...(p.tags ?? []),
      ].map((t) => t.trim().toLowerCase());

      const matchesFilter =
        filter === "All" ||
        normalizedTech.includes(filter.trim().toLowerCase());

      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        normalizedTech.some((t) => t.includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, search]);

  const hasActiveFilter = filter !== "All" || search.trim() !== "";

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] pb-32 px-5 sm:px-8 lg:px-0 overflow-hidden">
      {/* -- Grain -- */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      {/* -- Ambient Glow Blobs -- */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[580px] h-[580px] rounded-full bg-orange-500/[0.05] blur-[160px] z-0" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-amber-500/[0.05] blur-[140px] z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* -- Header Section -- */}
        <section className="pt-28 sm:pt-36 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
              SYSTEM ARCHIVE // 「全プロジェクト」
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-manga tracking-wide leading-none text-stone-900 uppercase">
              PROJECTS I&apos;VE{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                BUILT
              </span>
            </h1>
            <MangaSpeechBubble text="ALL DEPLOYMENTS ⚡" className="hidden sm:inline-block" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
            className="max-w-2xl font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed"
          >
            From production web applications to full-stack platforms and digital experiments — search by
            keyword or filter by technology to explore case studies and architectures.
          </motion.p>
        </section>

        {/* -- Search + Filter Controls -- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mb-10 space-y-4"
        >
          {/* Glassmorphic Search Bar */}
          <div className="relative group">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none transition-colors duration-200 group-focus-within:text-orange-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>

            <input
              type="search"
              placeholder="Search projects by title, stack, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              className="
                w-full pl-11 pr-11 py-3.5 rounded-[18px]
                font-orbitron text-xs sm:text-sm
                bg-white/80 backdrop-blur-xl
                border border-stone-200/90
                text-stone-900 placeholder:text-stone-400
                focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10
                shadow-[0_4px_20px_rgba(234,88,12,0.04)]
                transition-all duration-300
              "
            />

            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-100/90 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Pills with no-scrollbar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {techList.map((tech) => {
              const active = filter === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`
                    px-4 py-2 rounded-full font-orbitron text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 shrink-0
                    ${
                      active
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[0_6px_20px_rgba(234,88,12,0.32)] border border-orange-500 scale-[1.03]"
                        : "border border-stone-200/90 bg-white/70 backdrop-blur-md text-stone-700 hover:border-orange-500/40 hover:text-orange-600 hover:bg-orange-50/40 shadow-xs"
                    }
                  `}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* -- Katana Energy Rule -- */}
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.25) 30%, rgba(245,158,11,0.25) 70%, transparent)",
          }}
        />

        {/* -- Result Metadata -- */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-orbitron text-[10px] sm:text-[11px] font-bold text-stone-500 tracking-[0.14em] uppercase" aria-live="polite">
            // ARCHIVE RECORDS // {filteredProjects.length}{" "}
            {filteredProjects.length !== 1 ? "PROJECTS" : "PROJECT"}
            {filter !== "All" && (
              <span className="ml-1.5 text-orange-600 font-extrabold">— {filter}</span>
            )}
          </p>

          <AnimatePresence>
            {hasActiveFilter && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setFilter("All");
                  setSearch("");
                }}
                className="inline-flex items-center gap-1.5 font-orbitron text-[10px] sm:text-[11px] font-bold text-stone-500 hover:text-orange-600 tracking-[0.12em] uppercase transition-colors duration-200"
              >
                Reset filters
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* -- Animated Projects Grid -- */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug || i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Glassmorphism Empty State */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-24 px-6 flex flex-col items-center justify-center gap-5 rounded-[28px] border border-white/90 bg-white/70 backdrop-blur-2xl shadow-[0_12px_40px_rgba(234,88,12,0.06)]"
            >
              <div className="w-16 h-16 rounded-2xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </div>

              <div className="text-center">
                <p className="font-manga text-2xl text-stone-900 tracking-wide mb-1 uppercase">
                  NO MISSIONS FOUND // 該当なし
                </p>
                <p className="font-rajdhani text-sm text-stone-500 tracking-wider">
                  {search
                    ? `No project deployments match "${search}"`
                    : `No project deployments tagged with "${filter}"`}
                </p>
              </div>

              <button
                onClick={() => {
                  setFilter("All");
                  setSearch("");
                }}
                className="px-6 py-2.5 rounded-full border border-orange-500/40 bg-white/80 font-orbitron text-[10px] font-bold text-stone-800 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/50 shadow-sm transition-all duration-200 tracking-wider uppercase"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
