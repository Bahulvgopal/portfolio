"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MangaSpeechBubble } from "./AnimeStickers";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function GithubGraph() {
  return (
    <section className="relative py-12 px-5 sm:px-8 lg:px-0 overflow-hidden bg-[#FAF8F5]">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-orange-500/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-amber-500/[0.04] blur-[130px]" />

      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* -- Header -------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-600 font-orbitron text-[10px] font-bold tracking-[0.18em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
              ACTIVITY TELEMETRY // 「年間活動記録」
            </span>
            <MangaSpeechBubble text="ALWAYS SHIPPING ⚡" className="hidden sm:inline-block" />
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-manga tracking-wide leading-none text-stone-900 uppercase">
            GITHUB{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
              CONTRIBUTIONS
            </span>
          </h2>

          <p className="mt-3.5 font-rajdhani text-sm sm:text-base font-medium text-stone-600 tracking-wide leading-relaxed max-w-lg mx-auto">
            A continuous timeline of commits, builds, and shipped features. Every square represents
            real-world engineering problem solving.
          </p>
        </motion.div>

        {/* -- Katana Energy Rule -- */}
        <div
          className="h-px mb-10 max-w-xs mx-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.3) 30%, rgba(245,158,11,0.3) 70%, transparent)",
          }}
        />

        {/* -- Dual-Compartment Frosted Glassmorphism Card -- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="
            group relative overflow-hidden
            rounded-[34px] sm:rounded-[38px]
            p-2.5 sm:p-3.5
            bg-white/45 backdrop-blur-2xl
            border border-white/80
            shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04),inset_0_0_20px_rgba(255,255,255,0.3)]
            hover:shadow-[0_28px_65px_rgba(234,88,12,0.18)]
            hover:border-orange-500/40
            transition-all duration-300
            flex flex-col gap-2.5 sm:gap-3
          "
        >
          {/* Top Radiant Energy Blade Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-30 opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* 1. TOP COMPARTMENT (Calendar Heatmap) */}
          <div
            className="
              relative z-10 overflow-hidden
              rounded-[26px] sm:rounded-[28px]
              bg-gradient-to-b from-white/75 via-white/60 to-white/70
              backdrop-blur-xl
              border border-white/85
              p-5 sm:p-8
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.02)]
            "
          >
            {/* Top Telemetry Info Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200/60">
              <div className="flex items-center gap-2">
                <span className="font-orbitron text-[10px] sm:text-xs font-bold text-orange-600 tracking-wider">
                  // DEPLOYMENT HEATMAP // 2024–2025
                </span>
                <span className="hidden sm:inline text-stone-300 text-xs">|</span>
                <span className="hidden sm:inline font-manga text-[11px] text-stone-500 tracking-wider">
                  「開発記録」
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-orbitron text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  LIVE SYNCED
                </span>
              </div>
            </div>

            {/* Calendar Canvas with no-scrollbar */}
            <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
              <GitHubCalendar
                username="Bahulvgopal"
                blockSize={13}
                blockMargin={4}
                fontSize={12}
                theme={{
                  light: ["#F5F2EB", "#fed7aa", "#fb923c", "#ea580c", "#9a3412"],
                  dark: ["#F5F2EB", "#fed7aa", "#fb923c", "#ea580c", "#9a3412"],
                }}
              />
            </div>
          </div>

          {/* 2. BOTTOM COMPARTMENT (Control Deck / Quick Action Tray) */}
          <div
            className="
              relative z-10 overflow-hidden
              rounded-[20px] sm:rounded-[22px]
              bg-gradient-to-b from-white/80 via-white/70 to-white/75
              backdrop-blur-xl
              border border-white/85
              px-4 sm:px-6 py-3.5
              shadow-[inset_0_2px_4px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.02)]
              flex flex-wrap items-center justify-between gap-3
              group-hover:bg-white/85
              transition-all duration-300
            "
          >
            {/* Left: GitHub Profile Action Link */}
            <a
              href="https://github.com/Bahulvgopal"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/link inline-flex items-center gap-2.5
                font-orbitron text-xs font-bold text-stone-900
                hover:text-orange-600 group-hover/link:text-orange-600
                transition-colors duration-200 tracking-wider uppercase
              "
            >
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>EXPLORE @BAHULVGOPAL ON GITHUB</span>
              <svg className="w-3.5 h-3.5 text-orange-600 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* Right: Telemetry Badges */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/90 text-stone-700 font-orbitron text-[9px] font-bold tracking-wider uppercase shadow-xs">
                NODE_ENV // PROD
              </span>
              <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 font-orbitron text-[9px] font-extrabold tracking-wider uppercase shadow-xs">
                ACTIVE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
