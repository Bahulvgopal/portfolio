import Link from "next/link";
import { education } from "@/data/education";

export default function EducationPreview() {
  const preview = education.slice(0, 2);

  return (
    <section className="relative py-28 px-5 sm:px-8 lg:px-0 bg-[#0a0a0b] overflow-hidden">

      {/* blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[400px] rounded-full bg-violet-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[130px]" />

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* -- Header -- */}
        <div className="mb-5">
          <span className="
            inline-flex items-center gap-1.5
            px-3 py-1 rounded-full mb-5
            border border-violet-400/20 bg-violet-400/[0.04]
            text-violet-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase
          ">
            <span className="w-[5px] h-[5px] rounded-full bg-violet-400 animate-pulse" />
            Background
          </span>

          <div className="flex items-end justify-between gap-6">
            <h2
              className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              My{" "}
              <em
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                education
              </em>
            </h2>

            <Link
              href="/education"
              className="
                group shrink-0 self-end mb-1
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-full
                border border-white/[0.08] bg-white/[0.03]
                text-neutral-400 font-semibold text-[11px] tracking-[0.06em] uppercase
                hover:border-violet-400/30 hover:bg-violet-400/[0.06] hover:text-violet-400
                transition-all duration-300
              "
            >
              View all
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* gradient rule */}
        <div
          className="h-px mb-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.18) 35%, rgba(56,189,248,0.12) 65%, transparent)",
          }}
        />

        {/* -- Timeline -- */}
        <div className="relative">

          {/* vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/30 via-indigo-500/20 to-transparent" />

          <div className="space-y-5">
            {preview.map((edu, i) => (
              <div key={i} className="relative pl-10 group">

                {/* timeline dot */}
                <div className="
                  absolute left-0 top-[1.6rem]
                  w-[23px] h-[23px] rounded-full
                  border border-white/[0.1] bg-[#0f0f10]
                  flex items-center justify-center
                  group-hover:border-violet-500/40
                  transition-colors duration-300
                ">
                  <div className={[
                    "w-[7px] h-[7px] rounded-full transition-colors duration-300",
                    i === 0
                      ? "bg-violet-400 group-hover:bg-violet-300"
                      : "bg-violet-500/40 group-hover:bg-violet-400",
                  ].join(" ")} />
                </div>

                {/* card */}
                <article className="
                  relative overflow-hidden
                  rounded-[22px] bg-[#0f0f10]
                  border border-white/[0.06]
                  hover:border-violet-500/20
                  hover:-translate-y-0.5
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                  transition-all duration-400
                  p-6
                ">
                  {/* top accent bar */}
                  <div className="
                    absolute top-0 left-0 right-0 h-[2px]
                    bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400
                    scale-x-0 origin-left
                    group-hover:scale-x-100
                    transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  " />

                  {/* glow */}
                  <div className="
                    absolute inset-0 pointer-events-none
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.05)_0%,transparent_65%)]
                  " />

                  <div className="relative z-10">

                    {/* top row */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3
                          className="text-[1.15rem] font-normal text-white tracking-tight leading-snug"
                          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                        >
                          {edu.degree}
                        </h3>
                        <p className="text-[12px] text-neutral-500 mt-0.5">
                          {edu.institution}
                        </p>
                      </div>

                      {edu.period && (
                        <span className="
                          shrink-0 mt-0.5
                          px-2.5 py-1 rounded-full
                          border border-white/[0.07] bg-white/[0.03]
                          font-mono text-[10px] text-neutral-600 tracking-wide
                          whitespace-nowrap
                        ">
                          {edu.period}
                        </span>
                      )}
                    </div>

                    {edu.description && (
                      <>
                        <div className="h-px bg-white/[0.05] mb-3" />
                        <p className="text-sm text-neutral-500 leading-[1.7] line-clamp-2">
                          {edu.description}
                        </p>
                      </>
                    )}
                  </div>

                  {/* bottom shimmer */}
                  <div className="
                    absolute bottom-0 left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-white/[0.08] to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  " />
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* archive hint */}
        {education.length > 2 && (
          <p className="mt-10 text-center text-[11px] font-mono text-neutral-700 tracking-[0.1em] uppercase">
            {education.length - 2} more {education.length - 2 === 1 ? "entry" : "entries"} in the full timeline
          </p>
        )}

      </div>
    </section>
  );
}