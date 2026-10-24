"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Topbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative flex h-18 sm:h-20 items-center justify-between border-b border-white/10 bg-[#070b14]/50 backdrop-blur-2xl px-4 sm:px-6 lg:px-8 z-20"
    >
      {/* Ambient glass glare line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* LEFT — Title & Status */}
      <div className="relative z-10 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] text-[9px] font-orbitron font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CORE ACTIVE
          </span>
          <span className="text-stone-500 font-mono text-xs hidden sm:inline">· · ·</span>
        </div>

        <h2 className="truncate font-orbitron text-base sm:text-lg font-black tracking-wide text-white uppercase">
          WORKSPACE COMMAND //{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
            STUDIO
          </span>
        </h2>
      </div>

      {/* RIGHT — Actions & Profile */}
      <div className="relative z-10 flex items-center gap-3 sm:gap-4">
        {/* Telemetry pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-mono text-xs text-stone-300">
            NEXT.JS 16 · MONGO ACTIVE
          </span>
        </div>

        <div className="hidden sm:block h-7 w-px bg-white/10" />

        {/* Profile Card */}
        <div className="flex items-center gap-2.5 sm:gap-3 p-1 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-rose-500 to-amber-500 font-black text-white shadow-[0_4px_16px_rgba(249,115,22,0.4)] border border-white/30">
            <span className="font-orbitron text-sm font-bold">B</span>
          </div>

          <div className="hidden sm:flex flex-col pr-3 leading-tight">
            <p className="font-rajdhani text-sm font-bold text-white truncate max-w-[140px]">
              Bahul V Gopal
            </p>
            <span className="inline-flex items-center gap-1 text-[9px] font-orbitron font-bold tracking-wider text-orange-400 uppercase">
              <ShieldCheck className="w-3 h-3 text-orange-400" />
              S-RANK ADMIN
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
