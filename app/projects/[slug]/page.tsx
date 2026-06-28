"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiArrowLeft, HiArrowRight, HiExternalLink } from "react-icons/hi";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <main className="min-h-screen pt-[4rem] -mt-[5rem] bg-[#0a0a0b] pb-20 sm:pb-28 lg:pb-32 relative overflow-x-hidden">

      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }} />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] lg:w-[700px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-blue-700/5 blur-[100px] lg:blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[200px] sm:w-[300px] lg:w-[420px] h-[200px] sm:h-[300px] lg:h-[420px] rounded-full bg-violet-700/5 blur-[80px] lg:blur-[130px]" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">

        {/* Back */}
        <motion.div {...reveal(0)} className="pt-10 sm:pt-14 mb-8 sm:mb-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors duration-200 group">
            <HiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            All Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header {...reveal(0.06)} className="mb-10 sm:mb-12">

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium tracking-[0.12em] uppercase font-mono border border-sky-400/20 bg-sky-400/[0.04] text-sky-400">
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-white mb-4 sm:mb-5" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {project.title}
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-[1.8] mb-6 sm:mb-8 max-w-2xl">
            {project.description}
          </p>

          <div className="h-px mb-6 sm:mb-8" style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.2), rgba(129,140,248,0.2) 60%, transparent)" }} />

          {/* Buttons — all attributes on one line to avoid Turbopack parse error */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-[0_0_32px_rgba(255,255,255,0.08)] hover:shadow-[0_0_48px_rgba(255,255,255,0.14)]">
                <HiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-white/[0.12] text-neutral-300 hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-200">
                <SiGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                GitHub
              </a>
            )}
          </div>
        </motion.header>

        {/* Hero image */}
        {project.image && (
          <motion.div {...reveal(0.1)} className="relative w-full aspect-video mb-10 sm:mb-14 rounded-[18px] sm:rounded-[26px] overflow-hidden border border-white/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.5)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/40 via-transparent to-transparent" />
          </motion.div>
        )}

        {/* Sections */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">

          {project.problem && (
            <motion.section {...reveal(0.14)} className="group relative overflow-hidden rounded-[18px] sm:rounded-[26px] bg-[#0f0f10] border border-white/[0.06] hover:border-white/[0.10] transition-all duration-500 p-5 sm:p-7">
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-3 sm:mb-4 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase">
                  <span className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] rounded-full bg-sky-400" />
                  Description
                </span>
                <p className="text-neutral-400 leading-[1.8] text-xs sm:text-sm">{project.problem}</p>
              </div>
            </motion.section>
          )}

          {(project.features ?? []).length > 0 && (
            <motion.section {...reveal(0.17)} className="group relative overflow-hidden rounded-[18px] sm:rounded-[26px] bg-[#0f0f10] border border-white/[0.06] hover:border-white/[0.10] transition-all duration-500 p-5 sm:p-7">
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" style={{ background: "linear-gradient(90deg, #a78bfa, #e879f9)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 0%, rgba(167,139,250,0.06) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-3 sm:mb-4 border border-violet-400/20 bg-violet-400/[0.04] text-violet-400 font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase">
                  <span className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] rounded-full bg-violet-400" />
                  Features
                </span>
                <ul className="space-y-2 sm:space-y-3">
                  {(project.features ?? []).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-neutral-400 leading-[1.7]">
                      <span className="mt-[7px] w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-violet-400/60 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}

          {(project.screenshots ?? []).length > 0 && (
            <motion.section {...reveal(0.20)}>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-4 sm:mb-5 border border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-400 font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase">
                <span className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] rounded-full bg-emerald-400" />
                Screenshots
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(project.screenshots ?? []).map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-[14px] sm:rounded-[18px] overflow-hidden border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                    <Image src={img} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/30 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {project.learnings && (
            <motion.section {...reveal(0.23)} className="group relative overflow-hidden rounded-[18px] sm:rounded-[26px] bg-[#0f0f10] border border-white/[0.06] hover:border-white/[0.10] transition-all duration-500 p-5 sm:p-7">
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" style={{ background: "linear-gradient(90deg, #fb923c, #f43f5e)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 0%, rgba(251,146,60,0.06) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-3 sm:mb-4 border border-orange-400/20 bg-orange-400/[0.04] text-orange-400 font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase">
                  <span className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] rounded-full bg-orange-400" />
                  Learnings
                </span>
                <p className="text-neutral-400 leading-[1.8] text-xs sm:text-sm">{project.learnings}</p>
              </div>
            </motion.section>
          )}
        </div>

        {/* Prev / Next */}
        <motion.div {...reveal(0.28)} className="grid grid-cols-2 gap-3 sm:gap-4 mt-10 sm:mt-14">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-2 sm:gap-3 rounded-[14px] sm:rounded-[18px] border border-white/[0.06] bg-[#0f0f10] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 px-3 sm:px-5 py-3 sm:py-4">
              <HiArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-mono text-neutral-600 uppercase tracking-[0.12em] mb-0.5">Previous</p>
                <p className="text-xs sm:text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200 truncate">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-end gap-2 sm:gap-3 rounded-[14px] sm:rounded-[18px] border border-white/[0.06] bg-[#0f0f10] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 px-3 sm:px-5 py-3 sm:py-4 text-right">
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-mono text-neutral-600 uppercase tracking-[0.12em] mb-0.5">Next</p>
                <p className="text-xs sm:text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200 truncate">{next.title}</p>
              </div>
              <HiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <div />}
        </motion.div>

      </div>
    </main>
  );
}