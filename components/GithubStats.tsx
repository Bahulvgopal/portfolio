"use client";

import { motion } from "framer-motion";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.75,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    delay,
  },
});

export default function GithubStats() {
  const username = "Bahulvgopal";

  const cards = [
    {
      src: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&bg_color=00000000&title_color=38bdf8&text_color=71717a&icon_color=38bdf8`,
      alt: "GitHub Stats",
      label: "Overview",
      index: "01",
      gradientFrom: "#38bdf8",
      gradientTo: "#818cf8",
      glowColor: "rgba(56,189,248,0.07)",
    },
    {
      src: `https://streak-stats.demolab.com?user=${username}&hide_border=true&background=00000000&stroke=38bdf8&ring=38bdf8&fire=f59e0b&currStreakLabel=71717a&sideLabels=71717a&dates=71717a&currStreakNum=e5e5e5&sideNums=e5e5e5`,
      alt: "GitHub Streak",
      label: "Streak",
      index: "02",
      gradientFrom: "#a78bfa",
      gradientTo: "#e879f9",
      glowColor: "rgba(167,139,250,0.07)",
    },
    {
      src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&bg_color=00000000&title_color=38bdf8&text_color=71717a`,
      alt: "Top Languages",
      label: "Languages",
      index: "03",
      gradientFrom: "#4ade80",
      gradientTo: "#2dd4bf",
      glowColor: "rgba(74,222,128,0.07)",
    },
  ];

  return (
    <section className="relative py-10 px-5 sm:px-8 lg:px-0 overflow-hidden bg-[#0a0a0b]">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-blue-700/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-violet-700/5 blur-[130px]" />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div {...revealInView(0)} className="text-center mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Metrics
          </span>

          <h2
            className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            GitHub{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stats
            </em>
          </h2>

          <p className="mt-4 text-sm text-neutral-500 max-w-md mx-auto leading-[1.75]">
            Numbers behind the code — commits, streaks, and the languages powering it all.
          </p>
        </motion.div>

        {/* Gradient rule */}
        <motion.div
          {...revealInView(0.05)}
          className="h-px mb-12 max-w-xs mx-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.2) 40%, rgba(129,140,248,0.2) 70%, transparent)",
          }}
        />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ src, alt, label, index, gradientFrom, gradientTo, glowColor }, i) => (
            <motion.div
              key={label}
              {...revealInView(0.07 + i * 0.08)}
              className="group relative flex flex-col rounded-[26px] overflow-hidden bg-[#0f0f10] border border-white/[0.06] hover:border-white/[0.10] hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
              />

              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 65%)`,
                }}
              />

              {/* Corner decoration */}
              <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="absolute top-4 right-4 h-px w-8 bg-gradient-to-l from-white/10 to-transparent" />

              {/* Card header */}
              <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-3">
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-sky-400 font-mono">
                  {label}
                </span>
                <span className="font-mono text-[9px] text-neutral-700 tracking-[0.12em]">
                  {index}
                </span>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-white/[0.05]" />

              {/* Image */}
              <div className="relative z-10 flex items-center justify-center px-5 py-6">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* Bottom shimmer */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}