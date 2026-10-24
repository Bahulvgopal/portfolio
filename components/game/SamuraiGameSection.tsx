"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HandheldConsole from "./HandheldConsole";
import { Gamepad2, Zap, Shield, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Maximize2, Minimize2 } from "lucide-react";
import { MangaSpeechBubble } from "@/components/AnimeStickers";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function SamuraiGameSection() {
  const [liveStats, setLiveStats] = useState({
    score: 0,
    highscore: 0,
    distance: 0,
    powers: 2,
    powerTimer: 0,
    level: 1,
    levelName: "NOVICE",
    speed: 2.4,
    lives: 3,
    levelProgress: 0,
    isVictory: false,
  });

  const handleScoreUpdate = (
    score: number,
    highscore: number,
    distance: number,
    powers: number,
    powerTimer: number,
    level: number,
    levelName: string,
    speed: number,
    lives: number,
    levelProgress: number,
    isVictory: boolean
  ) => {
    setLiveStats({
      score,
      highscore,
      distance,
      powers,
      powerTimer,
      level,
      levelName,
      speed,
      lives,
      levelProgress,
      isVictory,
    });
  };

  return (
    <section id="arcade" className="relative py-16 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full bg-purple-600/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-amber-500/[0.04] blur-[130px]" />

      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-700 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              ARCADE PROTOCOL // 「走れ侍・電脳遊戯」
            </span>
            <MangaSpeechBubble text="READY PLAYER 1 🎮" className="hidden sm:inline-block" />
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-manga tracking-wide leading-none text-stone-900 uppercase">
            SAMURAI{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              RUNNER
            </span>
          </h2>

          <p className="mt-3.5 font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed max-w-xl mx-auto">
            Grab the sticks on our retro atomic purple handheld console! Conquer all 10 distinct levels — after completing each level, the speed increases as you race toward the Supreme Kensei master rank!
          </p>
        </motion.div>

        {/* Katana Energy Divider */}
        <div
          className="h-px mb-12 max-w-sm mx-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(147,51,234,0.3) 30%, rgba(245,158,11,0.3) 70%, transparent)",
          }}
        />

        {/* Main Console & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT TELEMETRY / INSTRUCTIONS (LG: 4 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 lg:col-span-4 space-y-4"
          >
            {/* Live Telemetry Card */}
            <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-stone-800">
                    MISSION STATS
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs" title="Remaining Lives">
                    {"❤️".repeat(Math.max(0, liveStats.lives)) + "🖤".repeat(Math.max(0, 3 - liveStats.lives))}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Current Score</span>
                  <p className="text-xl font-bold font-mono text-purple-700 mt-0.5">
                    {liveStats.score.toString().padStart(5, "0")}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">High Record</span>
                  <p className="text-xl font-bold font-mono text-amber-600 mt-0.5">
                    {liveStats.highscore.toString().padStart(5, "0")}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Distance</span>
                  <p className="text-lg font-bold font-mono text-stone-800 mt-0.5">
                    {liveStats.distance} <span className="text-xs text-stone-500">M</span>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <span className="text-[10px] font-mono text-amber-700 uppercase">Chakra Scrolls</span>
                  <p className="text-lg font-bold font-mono text-amber-600 mt-0.5 flex items-center gap-1">
                    {liveStats.powers} / 5
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
                  </p>
                </div>
              </div>

              {/* 10-Level Progression & Speed Meter */}
              <div className="mt-3 p-3 rounded-2xl bg-stone-100/95 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-stone-600 font-bold uppercase text-[10px] flex items-center gap-1">
                    <span>LEVEL {liveStats.level} / 10:</span>
                    <span className="text-purple-700 font-extrabold">{liveStats.levelName}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase ${
                      liveStats.isVictory
                        ? "bg-amber-100 text-amber-900 border border-amber-300 animate-bounce"
                        : liveStats.level <= 3
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : liveStats.level <= 6
                        ? "bg-sky-100 text-sky-800 border border-sky-300"
                        : liveStats.level <= 8
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-red-100 text-red-800 border border-red-300 animate-pulse"
                    }`}
                  >
                    {liveStats.speed.toFixed(1)}x SPEED
                  </span>
                </div>

                {/* Progress bar to complete current level */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-mono text-stone-500">
                    <span>LEVEL PROGRESS:</span>
                    <span>{liveStats.isVictory ? "100% (VICTORY!)" : `${liveStats.levelProgress}%`}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        liveStats.isVictory
                          ? "bg-gradient-to-r from-amber-400 to-yellow-500"
                          : liveStats.level <= 3
                          ? "bg-emerald-500"
                          : liveStats.level <= 6
                          ? "bg-sky-500"
                          : liveStats.level <= 8
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${liveStats.isVictory ? 100 : liveStats.levelProgress}%` }}
                    />
                  </div>
                </div>

                <div className="text-[9px] font-mono text-stone-400 text-center uppercase tracking-wider">
                  ⚡ SPEED INCREASES AFTER COMPLETING EACH LEVEL ⚡
                </div>
              </div>

              {/* Invincibility Status Banner */}
              <div
                className={`mt-3 p-3 rounded-2xl text-center transition-all ${
                  liveStats.powerTimer > 0
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold shadow-lg shadow-orange-500/25"
                    : "bg-purple-900/5 border border-purple-500/20 text-purple-900"
                }`}
              >
                {liveStats.powerTimer > 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 fill-black" />
                    <span className="font-mono text-xs font-black uppercase tracking-wider">
                      INVULNERABLE FOR {(liveStats.powerTimer / 1000).toFixed(1)}s!
                    </span>
                  </div>
                ) : (
                  <span className="font-mono text-xs text-stone-600">
                    Press <strong className="text-purple-700">[X]</strong> to trigger 5s Invincibility
                  </span>
                )}
              </div>
            </div>

            {/* Quick Keyboard Controls Reference */}
            <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-md space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200/60">
                <Gamepad2 className="w-4 h-4 text-purple-600" />
                <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-stone-800">
                  MANEUVER GUIDE
                </span>
              </div>

              <div className="space-y-2 text-xs font-rajdhani font-semibold text-stone-700">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-stone-200 border border-stone-300 font-mono text-[11px]">
                      W / ↑ / A
                    </kbd>
                  </span>
                  <span className="text-stone-500">Jump over low ground spikes</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-stone-200 border border-stone-300 font-mono text-[11px]">
                      S / ↓ / B
                    </kbd>
                  </span>
                  <span className="text-stone-500">Slide / Dodge flying shurikens</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-stone-200 border border-stone-300 font-mono text-[11px]">
                      A / D / ← / →
                    </kbd>
                  </span>
                  <span className="text-stone-500">Maneuver front & back</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-stone-200/50">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-2 py-0.5 rounded bg-amber-400 text-stone-950 font-bold border border-amber-500 font-mono text-[11px] shadow-sm">
                      X / E
                    </kbd>
                  </span>
                  <span className="text-amber-700 font-bold">5s Invincibility Chakra Blast</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CENTER: THE RETRO HANDHELD CONSOLE (LG: 8 COLS) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="order-1 lg:order-2 lg:col-span-8 flex flex-col items-center justify-center"
          >
            <HandheldConsole onScoreChange={handleScoreUpdate} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

