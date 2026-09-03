"use client";

import { useEffect, useState } from "react";
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

type GithubStatsData = {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  languages: {
    name: string;
    count: number;
  }[];
};

function StatItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-600 font-mono">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function OverviewCard({ stats }: { stats: GithubStatsData | null }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatItem
        label="Repositories"
        value={stats?.publicRepos ?? "—"}
      />

      <StatItem
        label="Followers"
        value={stats?.followers ?? "—"}
      />

      <StatItem
        label="Following"
        value={stats?.following ?? "—"}
      />

      <StatItem
        label="Stars"
        value={stats?.stars ?? "—"}
      />
    </div>
  );
}

function LanguagesCard({ stats }: { stats: GithubStatsData | null }) {
  if (!stats) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-8 rounded-lg bg-white/[0.03] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (stats.languages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[150px] text-sm text-neutral-600">
        No language data available.
      </div>
    );
  }

  const total = stats.languages.reduce(
    (sum, language) => sum + language.count,
    0
  );

  return (
    <div className="space-y-4">
      {stats.languages.map((language) => {
        const percentage = Math.round(
          (language.count / total) * 100
        );

        return (
          <div key={language.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-300">
                {language.name}
              </span>

              <span className="text-[10px] text-neutral-600 font-mono">
                {percentage}%
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-teal-400"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function GithubStats() {
  const [stats, setStats] = useState<GithubStatsData | null>(null);

  useEffect(() => {
    fetch("/api/github/stats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }

        return response.json();
      })
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error("GitHub stats error:", error);
      });
  }, []);

  const cards = [
    {
      label: "Overview",
      index: "01",
      gradientFrom: "#38bdf8",
      gradientTo: "#818cf8",
      glowColor: "rgba(56,189,248,0.07)",
      content: <OverviewCard stats={stats} />,
    },
    {
      label: "Streak",
      index: "02",
      gradientFrom: "#a78bfa",
      gradientTo: "#e879f9",
      glowColor: "rgba(167,139,250,0.07)",
      content: (
        <img
          src="https://streak-stats.demolab.com?user=Bahulvgopal&hide_border=true&background=00000000&stroke=38bdf8&ring=38bdf8&fire=f59e0b&currStreakLabel=71717a&sideLabels=71717a&dates=71717a&currStreakNum=e5e5e5&sideNums=e5e5e5"
          alt="GitHub Streak"
          loading="lazy"
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ),
    },
    {
      label: "Languages",
      index: "03",
      gradientFrom: "#4ade80",
      gradientTo: "#2dd4bf",
      glowColor: "rgba(74,222,128,0.07)",
      content: <LanguagesCard stats={stats} />,
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
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          {...revealInView(0)}
          className="text-center mb-5"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Metrics
          </span>

          <h2
            className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            GitHub{" "}
            <em
              className="italic"
              style={{
                background:
                  "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stats
            </em>
          </h2>

          <p className="mt-4 text-sm text-neutral-500 max-w-md mx-auto leading-[1.75]">
            Numbers behind the code — commits, streaks, and the
            languages powering it all.
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(
            (
              {
                label,
                index,
                gradientFrom,
                gradientTo,
                glowColor,
                content,
              },
              i
            ) => (
              <motion.div
                key={label}
                {...revealInView(0.07 + i * 0.08)}
                className="group relative flex flex-col rounded-[26px] overflow-hidden bg-[#0f0f10] border border-white/[0.06] hover:border-white/[0.10] hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
                  }}
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

                {/* Header */}
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

                {/* Content */}
                <div className="relative z-10 flex-1 px-5 py-6">
                  {content}
                </div>

                {/* Bottom shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}