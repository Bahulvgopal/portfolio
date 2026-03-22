"use client";

import { useState, useMemo } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FilterBar from "@/components/FilterBar";
import ProjectSearch from "@/components/ProjectSearch";

const techList = ["All", "Next.js", "MongoDB", "Tailwind","Python","HTML","CSS","JS"];

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
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────── */}
        <section className="pt-14 sm:pt-20 mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            Portfolio
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white mb-4 leading-tight">
            Projects
            <span aria-hidden className="block mt-2 h-1 w-12 rounded-full bg-blue-500" />
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Things I've built — from web apps to digital experiments.
            Search or filter by technology to find what interests you.
          </p>
        </section>

        {/* ── Search + Filter bar (sticky) ────────────── */}
        <div className="sticky top-14 sm:top-16 z-30
                        -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8
                        py-3 mb-8
                        backdrop-blur-md bg-white/80 dark:bg-gray-950/80
                        border-b border-gray-100 dark:border-gray-800/60">
          <div className="max-w-6xl mx-auto flex flex-col gap-3">

            {/* Search input */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                           text-gray-400 dark:text-gray-600 pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth={2}
                viewBox="0 0 24 24" aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <ProjectSearch search={search} setSearch={setSearch} />
            </div>

            {/* Filter bar */}
            <FilterBar
              options={techList}
              selected={filter}
              onChange={setFilter}
            />
          </div>
        </div>

        {/* ── Result meta ─────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest
                       text-gray-400 dark:text-gray-600"
            aria-live="polite"
          >
            {filteredProjects.length === 0
              ? "No results"
              : `${filteredProjects.length} project${filteredProjects.length !== 1 ? "s" : ""}`}
            {filter !== "All" && (
              <span className="ml-1 text-blue-500">— {filter}</span>
            )}
          </p>

          {/* Clear all */}
          {hasActiveFilter && (
            <button
              onClick={() => { setFilter("All"); setSearch(""); }}
              className="text-xs font-semibold text-gray-400 dark:text-gray-600
                         hover:text-gray-700 dark:hover:text-gray-300
                         transition-colors duration-150"
            >
              Clear all ×
            </button>
          )}
        </div>

        {/* ── Grid ────────────────────────────────────── */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center gap-4
                          border border-dashed border-gray-200 dark:border-gray-800
                          rounded-2xl text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center
                            bg-gray-100 dark:bg-gray-800 text-2xl"
                 aria-hidden>
              🔍
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                No projects found
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600">
                {search ? `No results for "${search}"` : `Nothing tagged "${filter}"`}
              </p>
            </div>
            <button
              onClick={() => { setFilter("All"); setSearch(""); }}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400
                         hover:underline underline-offset-4 transition"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
}