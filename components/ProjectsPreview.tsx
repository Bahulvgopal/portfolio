import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsPreview() {
  const featured = projects.slice(0, 2);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl -mt-[9rem] mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest
                          text-gray-400 dark:text-gray-600 mb-2">
              Work
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight
                           text-gray-900 dark:text-white">
              Featured Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold
                       text-blue-600 dark:text-blue-400
                       hover:underline underline-offset-4 transition-all duration-150
                       shrink-0"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}
                 viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}