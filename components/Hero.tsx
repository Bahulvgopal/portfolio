"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Terminal,
  ArrowRight,
  Download,
  Flame,
  Eye,
} from "lucide-react";
import { Profile } from "@/types/profile";

interface HeroProps {
  profile: Profile;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isAnimeMode, setIsAnimeMode] = useState(true);
  const [activeTagIndex, setActiveTagIndex] = useState(0);

  // Rotating roles / anime skills
  const animeRoles = useMemo(
    () => [
      "Full-Stack Architect",
      "Digital World Creator",
      "Next.js Specialist",
      "Creative Engineer",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTagIndex((prev) => (prev + 1) % animeRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [animeRoles.length]);

  // 3D Mouse Parallax & Dynamic Perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 });

  // Transforms for character & glowing background halos
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const charX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const charY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const haloX = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const haloY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative bg-[#FAF8F5] overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-14 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-24"
        style={{ perspective: 1200 }}
      >
        {/* ========================================================= */}
        {/* BACKGROUND: COLORFUL ANIME GLOWS, CYBER MESH & PARTICLES */}
        {/* ========================================================= */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Main Burnt Orange Radiant Orb behind character */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.38, 0.52, 0.38],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full blur-[140px] pointer-events-none"
            style={{
              x: haloX,
              y: haloY,
              background:
                "radial-gradient(circle, rgba(234,88,12,0.42) 0%, rgba(249,115,22,0.25) 42%, rgba(217,70,239,0.12) 70%, transparent 85%)",
            }}
          />

          {/* Electric Violet Anime Mana Bloom (top-right) */}
          <div
            className="absolute -top-20 right-10 w-[440px] h-[440px] rounded-full blur-[140px] opacity-40 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(236,72,153,0.18) 50%, transparent 80%)",
            }}
          />

          {/* Warm Amber Core Dawn Aura (bottom-left) */}
          <div
            className="absolute -bottom-10 left-5 w-[460px] h-[460px] rounded-full blur-[150px] opacity-45 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245,158,11,0.36) 0%, rgba(234,88,12,0.18) 60%, transparent 80%)",
            }}
          />

          {/* Stylized Anime Cyber Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(234,88,12,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Anime Floating Mana Sparks (Kept strictly on character side so they never overlap text) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: `${8 + i * 7}%`,
                bottom: "14%",
                background: i % 2 === 0 ? "#EA580C" : "#F59E0B",
                boxShadow: "0 0 12px rgba(234,88,12,0.9), 0 0 20px rgba(245,158,11,0.6)",
              }}
              animate={{
                y: [0, -320 - (i % 3) * 70],
                opacity: [0, 0.85, 0],
                scale: [0.6, 1.4, 0.2],
                x: [(i % 2 === 0 ? 1 : -1) * 16, (i % 2 === 0 ? -1 : 1) * 20],
              }}
              transition={{
                duration: 4 + (i % 3) * 1.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Large Stylized Background Anime Kanji Watermarks (Ghost Opacity) */}
          <div className="absolute top-16 right-8 lg:right-20 select-none pointer-events-none font-black text-stone-900/[0.035] text-[130px] lg:text-[230px] leading-none tracking-tighter">
            創造
          </div>
          <div className="absolute bottom-10 left-6 lg:left-14 select-none pointer-events-none font-black text-orange-600/[0.04] text-[90px] lg:text-[180px] leading-none tracking-tighter">
            限界突破
          </div>
        </div>

        {/* Top Decorative Anime HUD Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />

        {/* ========================================================= */}
        {/* MAIN HERO CONTENT CONTAINER (RESPONSIVE GRID)             */}
        {/* ========================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-14 pt-2">

          {/* ======================================================= */}
          {/* LEFT: FREE-STANDING ANIME CHARACTER (NO BOX / NO FRAME) */}
          {/* ======================================================= */}
          <div className="w-full lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center order-1 lg:order-1">
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: charX,
                y: charY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[360px] sm:max-w-[430px] lg:max-w-[480px] flex flex-col items-center justify-center"
            >
              {/* Anime Celestial Energy Halo Ring (Spins smoothly behind figure) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] sm:w-[400px] lg:w-[450px] h-[300px] sm:h-[400px] lg:h-[450px] rounded-full border border-orange-500/20 pointer-events-none"
                style={{
                  boxShadow: "0 0 60px rgba(234,88,12,0.22), inset 0 0 45px rgba(249,115,22,0.15)",
                }}
              >
                {/* Orbital Neon Nodes on the Ring */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_12px_#EA580C]" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#F59E0B]" />
                <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#FB923C]" />
                <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#EC4899]" />
              </motion.div>

              {/* Concentric Cyber Dashed Ring */}
              <div
                className="absolute w-[240px] sm:w-[330px] lg:w-[370px] h-[240px] sm:h-[330px] lg:h-[370px] rounded-full border border-dashed border-orange-400/25 pointer-events-none animate-spin"
                style={{ animationDuration: "55s" }}
              />

              {/* Glassmorphic Character Card Frame */}
              <div
                className="relative w-full aspect-[3.7/4.8] sm:aspect-[3.8/4.9] rounded-[32px] sm:rounded-[40px] overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between items-center pointer-events-auto"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.18) 55%, rgba(255, 237, 213, 0.28) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow:
                    "0 24px 55px -10px rgba(234, 88, 12, 0.16), 0 8px 24px -4px rgba(0, 0, 0, 0.04), inset 0 2px 3px rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px rgba(234, 88, 12, 0.08)",
                }}
              >
                {/* Top Glass Card Header (HUD Badges) */}
                <div className="w-full flex items-center justify-between z-20 px-1 pt-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/85 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                    <span className="text-[10px] font-orbitron font-bold tracking-widest text-stone-700 uppercase">
                      SYS.ONLINE
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full text-[10px] font-orbitron font-bold bg-orange-500/10 text-orange-700 border border-orange-500/25 backdrop-blur-md">
                    「特級」 RANK S
                  </div>
                </div>

                {/* Subtle Inner Ambient Glow (Behind character inside the card) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, rgba(234, 88, 12, 0.16) 0%, rgba(249, 115, 22, 0.06) 50%, transparent 80%)",
                  }}
                />

                {/* Specular Diagonal Sheen across the glass */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 45%)",
                  }}
                />

                {/* Character Image (Full Crisp Colors, NO white gradient over it!) */}
                <div className="relative w-full flex-1 flex items-end justify-center z-10 -mb-3.5 sm:-mb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnimeMode ? "hero-anime-char" : "hero-real-char"}
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -15 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="relative w-full h-[105%] flex items-end justify-center"
                    >
                      <Image
                        src={
                          isAnimeMode
                            ? "/images/hero-anime.png"
                            : profile.profileImage?.url || "/images/main1.png"
                        }
                        alt={profile.fullName || "Bahul V Gopal"}
                        fill
                        priority
                        className="object-contain object-bottom select-none filter drop-shadow-[0_14px_28px_rgba(234,88,12,0.22)]"
                        sizes="(max-width: 640px) 360px, (max-width: 1024px) 440px, 480px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Minimalist Floating Switcher Pill (Surge Button Removed) */}
              <div className="relative z-30 mt-4 flex items-center justify-center">
                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-stone-200/90 p-1 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <button
                    type="button"
                    onClick={() => setIsAnimeMode(true)}
                    className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-orbitron text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isAnimeMode
                        ? "bg-[#EA580C] text-white shadow-sm"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    <Sparkles size={11} />
                    Anime
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAnimeMode(false)}
                    className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-orbitron text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      !isAnimeMode
                        ? "bg-[#EA580C] text-white shadow-sm"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    <Eye size={11} />
                    Photo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT: REDESIGNED ANIME HERO TYPOGRAPHY & LAYOUT        */}
          {/* ======================================================= */}
          <div className="w-full lg:col-span-7 xl:col-span-7 flex flex-col justify-center order-2 lg:order-2 text-center lg:text-left">

            {/* Anime Status Header Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center self-center lg:self-start gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-orange-500/25 shadow-[0_2px_12px_rgba(234,88,12,0.08)] mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EA580C]" />
              </span>
              <span className="font-rajdhani text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-stone-700">
                AVAILABLE FOR NEW OPPORTUNITIES
              </span>
              <span className="font-orbitron text-[10px] font-bold text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded">
                「活動中」
              </span>
            </motion.div>

            {/* Anime Style Headline with Manga Temple Font */}
            <div className="mb-6">
              {/* Anime Sub-kicker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-orbitron text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-orange-600 mb-2"
              >
                // LEVEL S // PROTOCOL: ARCHITECT
              </motion.div>

              {/* Main Name Greeting with Manga Temple Font */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                className="font-manga text-[clamp(2.4rem,5.6vw,4.8rem)] font-bold tracking-wide leading-[1.05] uppercase mb-3"
              >
                <span className="text-stone-900">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-[0_2px_14px_rgba(234,88,12,0.2)]">
                  {profile.fullName || "Bahul V Gopal"}
                </span>
              </motion.h1>

              {/* Anime Impact Tagline in Manga Temple Font */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
                className="font-manga uppercase text-[clamp(1.5rem,3.4vw,2.8rem)] leading-[1.15] text-stone-900 tracking-wide"
              >
                CRAFTING{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  DIGITAL REALITIES
                </span>{" "}
                &amp; NEXT-GEN WEB EXPERIENCES.
              </motion.h2>
            </div>

            {/* Anime Specialization Terminal Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center justify-center lg:justify-start gap-2.5 mb-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-stone-900/[0.04] border border-stone-200/90 backdrop-blur-md font-rajdhani text-sm sm:text-base font-bold">
                <Terminal size={15} className="text-[#EA580C]" />
                <span className="text-stone-500 uppercase tracking-widest font-semibold text-xs sm:text-sm">SPECIALIZATION:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animeRoles[activeTagIndex]}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="font-orbitron font-bold text-xs sm:text-sm text-stone-900 uppercase tracking-wider"
                  >
                    {animeRoles[activeTagIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="w-2 h-4 bg-[#EA580C] animate-pulse rounded-xs" />
              </div>
            </motion.div>

            {/* Clean, Readable Bio in Rajdhani */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.3 }}
              className="font-rajdhani font-semibold text-base sm:text-lg text-stone-600 leading-[1.65] tracking-wide max-w-xl mb-8 self-center lg:self-start"
            >
              {profile.shortBio ||
                "Computer Science student passionate about building real-world products with modern web tech. Clean UI, performance, and meaningful user experiences."}
            </motion.p>

            {/* Call To Action Buttons (Orbitron Font) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.38 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
            >
              {/* Primary View Projects Button */}
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-orbitron text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#EA580C] text-white overflow-hidden transition-all duration-300 shadow-[0_6px_22px_rgba(234,88,12,0.32)] hover:shadow-[0_10px_30px_rgba(234,88,12,0.45)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>

              {/* Secondary Resume Button */}
              <a
                href={profile.resume?.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-orbitron text-xs sm:text-sm font-bold tracking-wider uppercase bg-white/80 backdrop-blur-md text-stone-800 border border-stone-300/80 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>{profile.resume?.buttonText || "Resume"}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subtle Anime Blade Section Divider */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-0">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(234,88,12,0.25) 25%, rgba(245,158,11,0.4) 50%, rgba(234,88,12,0.25) 75%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
