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
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-stone-500 font-mono">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold text-stone-900">
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
            className="h-8 rounded-lg bg-stone-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (stats.languages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[150px] text-sm text-stone-500">
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
              <span className="text-xs font-medium text-stone-800">
                {language.name}
              </span>

              <span className="text-[10px] text-stone-500 font-mono">
                {percentage}%
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500"
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
      gradientFrom: "#EA580C",
      gradientTo: "#C2410C",
      glowColor: "rgba(234,88,12,0.06)",
      content: <OverviewCard stats={stats} />,
    },
    {
      label: "Streak",
      index: "02",
      gradientFrom: "#F97316",
      gradientTo: "#EA580C",
      glowColor: "rgba(249,115,22,0.06)",
      content: (
        <img
          src="https://streak-stats.demolab.com?user=Bahulvgopal&hide_border=true&background=00000000&stroke=ea580c&ring=ea580c&fire=f97316&currStreakLabel=78716c&sideLabels=78716c&dates=78716c&currStreakNum=1c1917&sideNums=1c1917"
          alt="GitHub Streak"
          loading="lazy"
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ),
    },
    {
      label: "Languages",
      index: "03",
      gradientFrom: "#EA580C",
      gradientTo: "#9A3412",
      glowColor: "rgba(234,88,12,0.06)",
      content: <LanguagesCard stats={stats} />,
    },
  ];

  return (
    <section className="relative py-10 px-5 sm:px-8 lg:px-0 overflow-hidden bg-[#FAF8F5]">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-orange-500/[0.04] blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-amber-500/[0.04] blur-[130px]" />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 border border-orange-500/25 bg-orange-500/5 text-orange-600 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-orange-600 animate-pulse" />
            Metrics
          </span>

          <h2
            className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-stone-900"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            GitHub{" "}
            <em
              className="italic"
              style={{
                background:
                  "linear-gradient(90deg, #EA580C, #C2410C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stats
            </em>
          </h2>

          <p className="mt-4 text-sm text-stone-600 max-w-md mx-auto leading-[1.75]">
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
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.2) 40%, rgba(194,65,12,0.2) 70%, transparent)",
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
                className="group relative flex flex-col rounded-[26px] overflow-hidden bg-white border border-stone-200/80 hover:border-orange-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(234,88,12,0.08)] transition-all duration-500"
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
                <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-stone-200 to-transparent" />
                <div className="absolute top-4 right-4 h-px w-8 bg-gradient-to-l from-stone-200 to-transparent" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-3">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-orange-600 font-mono">
                    {label}
                  </span>

                  <span className="font-mono text-[9px] text-stone-400 tracking-[0.12em]">
                    {index}
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-stone-100" />

                {/* Content */}
                <div className="relative z-10 flex-1 px-5 py-6">
                  {content}
                </div>

                {/* Bottom shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
