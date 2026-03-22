import Link from "next/link";
import { education } from "@/data/education";

export default function EducationPreview() {
  const preview = education.slice(0, 2);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest
                          text-gray-400 dark:text-gray-600 mb-2">
              Background
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight
                           text-gray-900 dark:text-white">
              Education
            </h2>
          </div>

          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 text-sm font-semibold
                       text-blue-600 dark:text-blue-400 shrink-0
                       hover:underline underline-offset-4 transition"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                 strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Timeline cards */}
        <div className="relative flex flex-col gap-0">

          {/* Vertical rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px
                          bg-gray-200 dark:bg-gray-800" />

          {preview.map((edu, i) => (
            <div key={i} className="relative pl-8 pb-8 last:pb-0">

              {/* Dot — filled for most recent (i === 0) */}
              <div className={[
                "absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-blue-500",
                i === 0 ? "bg-blue-500" : "bg-white dark:bg-gray-950",
              ].join(" ")} />

              {/* Card */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                              bg-white dark:bg-gray-900/60
                              hover:border-blue-400 dark:hover:border-blue-600
                              hover:shadow-md hover:shadow-blue-500/10
                              transition-all duration-300 p-4 sm:p-5">

                {/* Period chip */}
                {edu.period && (
                  <span className="inline-block text-[10px] font-black uppercase
                                   tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                    {edu.period}
                  </span>
                )}

                <h3 className="text-sm sm:text-base font-bold
                               text-gray-900 dark:text-white mb-1">
                  {edu.degree}
                </h3>

                <p className="text-xs font-semibold text-gray-400 dark:text-gray-600">
                  {edu.institution}
                </p>

                {edu.description && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400
                                leading-relaxed line-clamp-2">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}