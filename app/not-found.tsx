"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  Home,
  Globe,
  Sparkles,
  RotateCcw,
  Radio,
} from "lucide-react";
import { ChibiHeroSticker, AnimeChakraSticker, MangaSpeechBubble } from "@/components/AnimeStickers";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#FAF8F5] pt-28 sm:pt-36 pb-32 px-5 sm:px-8 lg:px-0 overflow-hidden text-stone-900 flex items-center justify-center">
      {/* ── 1. BACKGROUND GRAIN & AMBIENT ANIME RADIANCE ────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      {/* Burnt Orange Radiant Aura */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] sm:h-[650px] rounded-full blur-[150px] opacity-40 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(234, 88, 12, 0.35) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-rose-500/[0.06] blur-[140px] z-0"
      />

      {/* ── 2. MAIN 404 ISEKAI DIMENSIONAL RIFT CONTAINER ───────────── */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Glitch Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 font-orbitron text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
          // DIMENSIONAL ANOMALY // 「次元の狭間」
        </motion.div>

        {/* Anime Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mb-2"
        >
          <MangaSpeechBubble text="CHOU MATTE! WHERE ARE WE?! ⚡" />
        </motion.div>

        {/* Central Chibi Lost Developer + Chakra Flame */}
        <div className="relative my-2 sm:my-4 flex items-center justify-center">
          <ChibiHeroSticker size={130} className="relative z-10 filter drop-shadow-[0_15px_30px_rgba(234,88,12,0.35)]" />
          <div className="absolute -top-3 -right-6 z-0 opacity-80 scale-75 sm:scale-90">
            <AnimeChakraSticker size={75} />
          </div>
        </div>

        {/* Gigantic Anime 404 Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="relative select-none"
        >
          <h1 className="font-manga text-[clamp(5.5rem,17vw,11.5rem)] font-black leading-[0.88] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 filter drop-shadow-[0_4px_20px_rgba(234,88,12,0.3)]">
            404
          </h1>

          {/* Japanese Sub-label Watermark */}
          <p className="font-manga text-stone-400 text-sm sm:text-lg tracking-[0.3em] uppercase mt-1">
            「空間跳躍失敗 · 領域消失」
          </p>
        </motion.div>

        {/* Subtitle in Manga & Orbitron */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="font-manga text-xl sm:text-3xl text-stone-900 tracking-wide uppercase mt-4 mb-3"
        >
          REALITY NOT FOUND IN THIS TIMELINE
        </motion.h2>

        {/* Frosted Glass Story Tablet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          className="relative max-w-xl mx-auto rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/85 p-5 sm:p-7 shadow-[0_20px_50px_rgba(234,88,12,0.1),0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] mb-8"
        >
          <p className="font-rajdhani text-sm sm:text-base font-semibold text-stone-600 leading-relaxed">
            You&apos;ve drifted past the dimensional gateway into an unrendered sector of the cyber void.
            The page coordinates you entered do not exist, were erased by system security, or got sucked into an alternate isekai realm.
          </p>
        </motion.div>

        {/* ── 3. ANIME ACTION CTA DECK ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full"
        >
          {/* Primary CTA: Teleport Home */}
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-orbitron text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white shadow-[0_8px_25px_rgba(234,88,12,0.35)] hover:shadow-[0_12px_32px_rgba(234,88,12,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <Home size={17} className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="relative z-10">TELEPORT TO SANCTUARY // 「帰還」</span>
            <ArrowRight size={16} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA: Projects Archive */}
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-orbitron text-xs sm:text-sm font-bold tracking-wider uppercase bg-white/80 backdrop-blur-md text-stone-800 border border-stone-200/80 hover:border-orange-500/40 hover:text-orange-600 hover:bg-orange-50/50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Globe size={16} className="text-orange-600" />
            <span>BROWSE ARCHIVES // 「作品録」</span>
          </Link>

          {/* Tertiary CTA: Contact Beacon */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-orbitron text-xs sm:text-sm font-bold tracking-wider uppercase bg-stone-100/80 hover:bg-white text-stone-700 hover:text-orange-600 border border-stone-200/60 transition-all duration-200 shadow-xs hover:shadow-sm"
          >
            <Radio size={16} className="text-orange-600" />
            <span>TRANSMIT DISTRESS BEACON</span>
          </Link>
        </motion.div>

        {/* Micro Telemetry Footer */}
        <div className="mt-12 font-mono text-[10px] text-stone-400 tracking-widest uppercase flex items-center gap-2 select-none">
          <span>COORDINATES: UNRESOLVED</span>
          <span className="text-orange-500">·</span>
          <span>GATEWAY TIMEOUT: 0x404_VOID</span>
        </div>
      </div>
    </main>
  );
}

