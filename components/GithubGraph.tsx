"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function GithubGraph() {
  return (
    <section className="relative py-28 px-5 sm:px-8 lg:px-0 overflow-hidden bg-[#0a0a0b]">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-blue-700/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-violet-700/5 blur-[130px]" />

      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Activity
          </span>

          {/* Title */}
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
              Contributions
            </em>
          </h2>

          <p className="mt-4 text-sm text-neutral-500 max-w-md mx-auto leading-[1.75]">
            A year of commits, builds, and shipping. Every square tells a story.
          </p>

          {/* Gradient rule */}
          <div
            className="h-px mt-8 max-w-xs mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.2) 40%, rgba(129,140,248,0.2) 70%, transparent)",
            }}
          />
        </div>

        {/* Calendar card */}
        <div className="relative rounded-[26px] bg-[#0f0f10] border border-white/[0.06] hover:border-white/[0.10] transition-all duration-500 p-6 sm:p-10 overflow-hidden group">

          {/* Top accent bar on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            }}
          />

          {/* Radial glow on hover */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.05) 0%, transparent 65%)",
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-5 right-5 w-px h-10 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute top-5 right-5 h-px w-10 bg-gradient-to-l from-white/10 to-transparent" />
          <div className="absolute bottom-5 left-5 w-px h-10 bg-gradient-to-t from-white/10 to-transparent" />
          <div className="absolute bottom-5 left-5 h-px w-10 bg-gradient-to-r from-white/10 to-transparent" />

          {/* Calendar */}
          <div className="flex justify-center overflow-x-auto pb-2">
            <GitHubCalendar
              username="Bahulvgopal"
              blockSize={13}
              blockMargin={4}
              fontSize={12}
              theme={{
                dark: [
                  "#161617",   // empty
                  "#0e3a50",   // level 1
                  "#0e6282",   // level 2
                  "#1490b8",   // level 3
                  "#38bdf8",   // level 4 — sky-400
                ],
              }}
              style={{
                color: "rgba(255,255,255,0.35)",
              }}
            />
          </div>

          {/* Bottom shimmer */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { value: "Open Source", label: "Contributor" },
            { value: "Daily", label: "Commit Habit" },
            { value: "GitHub", label: "Bahulvgopal" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="group rounded-2xl p-4 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 text-center"
            >
              <div
                className="text-base sm:text-lg font-black text-white mb-0.5"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {value}
              </div>
              <div className="text-[10px] text-neutral-500 font-medium tracking-wide uppercase font-mono">
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}