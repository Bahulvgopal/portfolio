import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 2);

  return (
    <section className="relative pb-28 pt-7 -mt-[6rem] px-5 sm:px-8 lg:px-0 bg-[#0a0a0b] overflow-hidden">

      {/* -- ambient blobs -- */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[500px] rounded-full bg-indigo-600/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-600/5 blur-[120px]" />

      {/* -- noise grain -- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* -- Header --------------------------------------------------- */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-5">

          {/* left: label + heading + subtext */}
          <div className="max-w-xl">
            <span className="
              inline-flex items-center gap-1.5
              px-3 py-1 rounded-full mb-5
              border border-sky-400/20 bg-sky-400/[0.04]
              text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase
            ">
              <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
              Featured Work
            </span>

            <h2
              className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Projects I&apos;ve{" "}
              <em
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                built
              </em>
            </h2>

            <p className="mt-4 text-sm text-neutral-500 leading-[1.75]">
              Real-world products and systems built with modern web tech —
              focused on clean engineering, performance, and meaningful UX.
            </p>
          </div>

          {/* right: view all */}
          <Link
            href="/projects"
            className="
              group inline-flex items-center gap-2 self-start lg:self-end shrink-0
              px-5 py-2.5 rounded-full
              border border-white/[0.08] bg-white/[0.03]
              text-neutral-400 font-semibold text-[11px] tracking-[0.06em] uppercase
              hover:border-sky-400/30 hover:bg-sky-400/[0.06] hover:text-sky-400
              transition-all duration-300
            "
          >
            View all projects
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* -- thin gradient rule -- */}
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.15) 35%, rgba(99,102,241,0.15) 65%, transparent)",
          }}
        />

        {/* -- Projects grid -- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* -- bottom hint -- */}
        <p className="mt-10 text-center text-[11px] font-mono text-neutral-700 tracking-[0.1em] uppercase">
          {projects.length - 2} more projects in the full archive
        </p>

      </div>
    </section>
  );
}