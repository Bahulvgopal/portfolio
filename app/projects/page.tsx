"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const techList = ["All", "Next.js", "MongoDB", "Tailwind", "Python", "HTML", "CSS", "JS"];

const EASE = [0.16, 1, 0.3, 1] as const;

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
});

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.tech.includes(filter);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const hasActiveFilter = filter !== "All" || search.trim() !== "";

  return (
    <main className="relative -mt-[5rem] min-h-screen bg-[#0a0a0b] pb-32 px-5 sm:px-8 lg:px-0 overflow-hidden">

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.03] z-0"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -left-32 w-[560px] h-[560px] rounded-full bg-blue-600/[0.06] blur-[160px] z-0" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.05] blur-[140px] z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* -- Header -- */}
        <section className="pt-28 sm:pt-36 mb-14">
          <motion.div {...revealInView(0)}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
              <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            {...revealInView(0.06)}
            className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[0.9] tracking-tight text-white mb-6"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Projects I&apos;ve{" "}
            <em
              className="italic font-black"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              built
            </em>
          </motion.h1>

          <motion.p
            {...revealInView(0.12)}
            className="max-w-xl text-[clamp(0.9rem,2vw,1.05rem)] text-neutral-400 leading-[1.75]"
          >
            From web apps to digital experiments — search or filter by
            technology to find what interests you.
          </motion.p>
        </section>

        {/* -- Search + Filter -- */}
        <motion.div {...revealInView(0.18)} className="mb-10 space-y-4">

          {/* Search input */}
          <div className="relative group">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none transition-colors duration-200 group-focus-within:text-sky-400"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>

            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              className="w-full pl-11 pr-11 py-3.5 rounded-[16px] text-sm bg-[#0f0f10] border border-white/[0.07] text-white placeholder:text-neutral-600 focus:outline-none focus:border-sky-500/40 focus:bg-[#111112] transition-all duration-300 font-mono"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/[0.07] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {techList.map((tech) => {
              const active = filter === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={[
                    "px-4 py-2 rounded-full font-mono text-[11px] font-medium tracking-wide transition-all duration-200",
                    active
                      ? "bg-sky-400/10 border border-sky-400/40 text-sky-400"
                      : "border border-white/[0.07] bg-white/[0.02] text-neutral-500 hover:border-white/[0.14] hover:text-neutral-300 hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gradient rule */}
        <div
          className="h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.15) 35%, rgba(129,140,248,0.15) 65%, transparent)",
          }}
        />

        {/* -- Result meta -- */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono text-[10px] text-neutral-600 tracking-[0.12em] uppercase" aria-live="polite">
            {filteredProjects.length === 0
              ? "No results"
              : `${filteredProjects.length} project${filteredProjects.length !== 1 ? "s" : ""}`}
            {filter !== "All" && (
              <span className="ml-1 text-sky-500">— {filter}</span>
            )}
          </p>

          <AnimatePresence>
            {hasActiveFilter && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                onClick={() => { setFilter("All"); setSearch(""); }}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neutral-600 hover:text-neutral-300 tracking-[0.1em] uppercase transition-colors duration-200"
              >
                Clear all
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* -- Grid -- */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="py-28 flex flex-col items-center justify-center gap-5 rounded-[26px] border border-white/[0.06] bg-[#0f0f10]"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center">
                <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-sm font-normal text-white mb-1.5" style={{ fontFamily: "'Georgia', serif" }}>
                  No projects found
                </p>
                <p className="text-[12px] text-neutral-600 font-mono">
                  {search
                    ? `Nothing matching "${search}"`
                    : `Nothing tagged "${filter}"`}
                </p>
              </div>

              <button
                onClick={() => { setFilter("All"); setSearch(""); }}
                className="px-5 py-2 rounded-full border border-white/[0.07] bg-white/[0.02] font-mono text-[11px] text-neutral-500 hover:border-sky-500/30 hover:text-sky-400 hover:bg-sky-500/[0.04] transition-all duration-200 tracking-wide"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}