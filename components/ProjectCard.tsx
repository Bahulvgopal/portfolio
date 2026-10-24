"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Partial<Project> & {
    title: string;
    slug: string;
    description?: string;
  };
  index?: number;
}

export default function ProjectCard({
  project,
  index = 0,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  /* 3D Magnetic tilt physics on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    setTilt({ x: dy * -6, y: dx * 6 });
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const techBadges = (
    project.tech && project.tech.length > 0 ? project.tech : project.tags ?? []
  ).slice(0, 5);

  const extraTechCount =
    (project.tech?.length || project.tags?.length || 0) - techBadges.length;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="
        group relative overflow-hidden
        rounded-[34px] sm:rounded-[38px]
        p-2.5 sm:p-3.5
        bg-white/45 backdrop-blur-2xl
        border border-white/80
        will-change-transform
        shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04),inset_0_0_20px_rgba(255,255,255,0.3)]
        hover:shadow-[0_28px_65px_rgba(234,88,12,0.18)]
        hover:border-orange-500/40
        transition-all duration-300
        flex flex-col gap-2.5 sm:gap-3
        h-full justify-between
      "
    >
      {/* -- Cyber Blade Top Radiant Energy Bar -- */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left", height: "3px" }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-30 pointer-events-none"
      />

      {/* -- Specular Glass Sheen Cursor Reflection across the Tablet Frame -- */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.85) 0%, rgba(234,88,12,0.06) 35%, transparent 70%)`,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 pointer-events-none z-20 mix-blend-soft-light rounded-[34px] sm:rounded-[38px]"
      />

      {/* -- Ambient Glow Reflection on Hover -- */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.8 : 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(234,88,12,0.1) 0%, transparent 65%)`,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none z-10 rounded-[34px] sm:rounded-[38px]"
      />

      {/* ========================================================================= */}
      {/* 1. TOP COMPARTMENT (Main Content Panel)                                    */}
      {/* ========================================================================= */}
      <div
        className="
          relative z-10 overflow-hidden
          rounded-[26px] sm:rounded-[28px]
          bg-gradient-to-b from-white/75 via-white/60 to-white/70
          backdrop-blur-xl
          border border-white/85
          p-4 sm:p-5 lg:p-6
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.02)]
          flex flex-col justify-between
          flex-1
        "
      >
        <div>
          {/* Visual Preview Window */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] mb-4 sm:mb-5 border border-white/75 bg-stone-100/80 shadow-inner group/media">
            {project.image?.url ? (
              <>
                <Image
                  src={project.image.url}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={!project.image.url.includes("res.cloudinary.com")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </>
            ) : (
              /* Stylized Anime Cyber Visual Fallback */
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-850 to-orange-950/90 flex flex-col items-center justify-center p-6 select-none overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                    backgroundSize: "18px 18px",
                  }}
                />
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-orange-500/30 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

                <span className="absolute right-3 bottom-1 font-manga text-5xl font-black text-white/[0.06] select-none pointer-events-none tracking-widest">
                  電脳開発
                </span>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-lg group-hover:border-orange-500/60 group-hover:scale-110 transition-all duration-300">
                    <span className="font-orbitron font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200">
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="mt-2 font-orbitron text-[9px] font-bold text-amber-200/90 tracking-widest uppercase">
                    {project.category ?? "CYBER DEPLOYMENT"}
                  </span>
                </div>
              </div>
            )}

            {/* Top-Left Category & Rank Pill */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white border border-white/20 font-orbitron text-[9px] font-bold tracking-wider uppercase shadow-sm">
                {project.category ?? "PROJECT"}
              </span>
              {project.featured !== false && (
                <span className="px-2 py-0.5 rounded-full bg-orange-600/90 backdrop-blur-md text-white font-orbitron text-[9px] font-extrabold tracking-wider uppercase shadow-sm border border-orange-400/40">
                  ★ S-RANK
                </span>
              )}
            </div>

            {/* Top-Right Year Pill */}
            <div className="absolute top-2.5 right-2.5 z-20">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-800 font-mono text-[10px] font-bold border border-white/90 shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                {project.year ?? "2024"}
              </span>
            </div>
          </div>

          {/* Mission Index Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-wider">
              // MISSION_{String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-stone-300 text-xs">|</span>
            <span className="font-manga text-[11px] text-stone-500 tracking-wider">
              「特級・PROJECT」
            </span>
          </div>

          {/* Project Title */}
          <Link href={`/projects/${project.slug}`} className="block group/title">
            <h3 className="font-rajdhani text-2xl sm:text-[1.65rem] font-bold tracking-tight text-stone-900 group-hover/title:text-orange-600 transition-colors duration-200 line-clamp-1">
              {project.title}
            </h3>
          </Link>

          {/* Tagline / Description */}
          <p className="text-sm text-stone-600 leading-relaxed line-clamp-2 mt-2 mb-4 font-normal">
            {project.description || project.tagline || "High-performance digital system engineered with modern web technologies."}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5">
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="
                  px-2.5 py-1 rounded-lg
                  text-[10px] font-orbitron font-semibold
                  bg-white/70 backdrop-blur-sm
                  border border-stone-200/80
                  text-stone-700
                  group-hover:border-orange-500/30
                  group-hover:bg-orange-50/50
                  group-hover:text-orange-950
                  transition-colors duration-200
                "
              >
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="px-2 py-1 rounded-lg text-[10px] font-orbitron font-semibold bg-stone-100/80 text-stone-500">
                +{extraTechCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM COMPARTMENT (Interactive Control Deck / Action Tray)            */}
      {/* ========================================================================= */}
      <div
        className="
          relative z-10 overflow-hidden
          rounded-[20px] sm:rounded-[22px]
          bg-gradient-to-b from-white/80 via-white/70 to-white/75
          backdrop-blur-xl
          border border-white/85
          px-4 sm:px-5 py-3 sm:py-3.5
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.02)]
          flex items-center justify-between
          group-hover:bg-white/85
          transition-all duration-300
        "
      >
        {/* Left: View Case Study CTA Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="
            group/link inline-flex items-center gap-2
            font-orbitron text-xs font-bold text-stone-900
            hover:text-orange-600 group-hover/link:text-orange-600
            transition-colors duration-200 tracking-wider uppercase
          "
        >
          <span>VIEW CASE STUDY</span>
          <motion.svg
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-3.5 h-3.5 text-orange-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </Link>

        {/* Right: Direct Actions (Live Demo / GitHub) + System Tag */}
        <div className="flex items-center gap-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Live Demo"
              className="p-1.5 sm:p-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/90 text-stone-700 hover:text-orange-600 hover:bg-white shadow-xs transition-all duration-200 hover:scale-110"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="GitHub Repository"
              className="p-1.5 sm:p-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/90 text-stone-700 hover:text-orange-600 hover:bg-white shadow-xs transition-all duration-200 hover:scale-110"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
          <span className="font-mono text-[10px] text-stone-400 tracking-widest uppercase pl-1 hidden sm:inline">
            SYS_0{index + 1}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
