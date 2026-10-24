"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft, HiExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FiVideo, FiImage, FiAward, FiZap } from "react-icons/fi";
import { MangaSpeechBubble } from "@/components/AnimeStickers";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function getVideoEmbed(url?: string) {
  if (!url) return null;
  const str = url.trim();
  const iframeMatch = str.match(/src=["']([^"']+)["']/i);
  const target = iframeMatch ? iframeMatch[1] : str;

  const ytMatch = target.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch) return { type: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0` };

  const vimeoMatch = target.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };

  const loomMatch = target.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/i);
  if (loomMatch) return { type: "iframe", src: `https://www.loom.com/embed/${loomMatch[1]}` };

  if (target.match(/\.(mp4|webm|ogg)$/i) || target.includes("cloudinary.com")) {
    return { type: "video", src: target };
  }

  return null;
}

export default function ProjectHero({ project }: Props) {
  const videoEmbed = getVideoEmbed(project.videoUrl);
  const [activeMedia, setActiveMedia] = useState<"video" | "image">(
    videoEmbed ? "video" : "image"
  );

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mb-16 pt-4"
    >
      {/* Back Button & Breadcrumbs */}
      <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/projects"
          className="
            inline-flex items-center gap-2.5 px-4 py-2 rounded-full
            bg-white/80 backdrop-blur-xl border border-stone-200/90
            text-stone-700 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50/40
            font-orbitron text-xs font-bold tracking-wider uppercase shadow-xs transition-all duration-200
          "
        >
          <HiArrowLeft className="w-3.5 h-3.5 text-orange-600" />
          <span>BACK TO MISSIONS // 「一覧」</span>
        </Link>

        {/* Category & Status Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white border border-white/20 font-orbitron text-[10px] font-bold tracking-wider uppercase shadow-xs">
            {project.category ?? "WEB"}
          </span>
          {project.featured !== false && (
            <span className="px-2.5 py-1 rounded-full bg-orange-600/90 backdrop-blur-md text-white font-orbitron text-[10px] font-extrabold tracking-wider uppercase shadow-xs border border-orange-400/40">
              ★ S-RANK MISSION
            </span>
          )}
        </div>
      </motion.div>

      {/* Main Title Area */}
      <motion.div variants={item} className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-orbitron text-[11px] font-bold text-orange-600 tracking-widest uppercase">
            // CLASSIFIED CASE STUDY // {project.year || "2024"}
          </span>
          <MangaSpeechBubble text="FEATURED MISSION ⚡" className="hidden sm:inline-block" />
        </div>

        <h1 className="font-manga text-4xl sm:text-6xl md:text-7xl font-black text-stone-900 tracking-wide uppercase leading-none">
          {project.title}
        </h1>

        {project.tagline && (
          <p className="mt-3 font-rajdhani text-xl sm:text-2xl text-orange-600 font-bold tracking-wide">
            {project.tagline}
          </p>
        )}

        <p className="mt-5 max-w-3xl font-rajdhani text-base sm:text-lg font-medium text-stone-600 leading-relaxed">
          {project.description}
        </p>

        {/* Impact Highlights Bar if available */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-700 font-orbitron text-xs font-bold tracking-wider uppercase shadow-xs"
              >
                <FiZap className="w-3.5 h-3.5 text-orange-600" />
                {highlight}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Action Buttons Row */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 px-7 py-3.5 font-orbitron text-xs font-bold tracking-wider uppercase text-white hover:shadow-[0_10px_25px_rgba(234,88,12,0.35)] hover:scale-[1.02] shadow-md transition-all duration-200"
          >
            <HiExternalLink className="w-4 h-4" />
            <span>LAUNCH LIVE MISSION</span>
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-stone-200/90 bg-white/80 backdrop-blur-xl px-6 py-3.5 font-orbitron text-xs font-bold tracking-wider uppercase text-stone-800 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/40 hover:shadow-[0_8px_20px_rgba(234,88,12,0.15)] shadow-xs transition-all duration-200"
          >
            <SiGithub className="w-4 h-4 text-orange-600" />
            <span>SOURCE CODE</span>
          </a>
        )}

        {/* Media Switcher Buttons if both Video and Image exist */}
        {videoEmbed && project.image?.url && (
          <div className="ml-auto flex items-center p-1 rounded-full bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-xs">
            <button
              onClick={() => setActiveMedia("video")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-orbitron text-[10px] font-bold tracking-wider uppercase transition-all duration-200 ${
                activeMedia === "video"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <FiVideo className="w-3.5 h-3.5" />
              <span>Video Demo</span>
            </button>
            <button
              onClick={() => setActiveMedia("image")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-orbitron text-[10px] font-bold tracking-wider uppercase transition-all duration-200 ${
                activeMedia === "image"
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <FiImage className="w-3.5 h-3.5" />
              <span>Overview Image</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* =================================================================== */}
      {/* VISUAL SHOWCASE BEZEL (Video or Image)                               */}
      {/* =================================================================== */}
      <motion.div variants={item}>
        <div className="
          relative w-full rounded-[34px] sm:rounded-[42px]
          p-2.5 sm:p-3.5
          bg-white/45 backdrop-blur-2xl
          border border-white/85
          shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04)]
          overflow-hidden
        ">
          {/* Top Katana Energy Blade Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-30 opacity-80" />

          <div className="relative w-full overflow-hidden rounded-[26px] sm:rounded-[32px] bg-stone-950 border border-white/70 shadow-inner">
            {activeMedia === "video" && videoEmbed ? (
              <div className="relative aspect-video w-full">
                {videoEmbed.type === "iframe" ? (
                  <iframe
                    src={videoEmbed.src}
                    title={`${project.title} Video Demo`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={videoEmbed.src} controls className="w-full h-full object-contain" />
                )}
              </div>
            ) : project.image?.url ? (
              <div className="relative w-full">
                <Image
                  src={project.image.url}
                  alt={project.title}
                  width={1600}
                  height={1000}
                  className="h-auto w-full object-contain"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  unoptimized={!project.image.url.includes("res.cloudinary.com")}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/20 via-transparent to-transparent" />
              </div>
            ) : (
              /* Fallback Cyber Anime Emblem */
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-stone-900 via-stone-850 to-orange-950 flex flex-col items-center justify-center p-8 select-none">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-lg">
                  <span className="font-orbitron font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-manga text-3xl text-white mt-4 uppercase">
                  {project.title}
                </h3>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
