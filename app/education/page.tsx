import { education } from "@/data/education";

export default function EducationPage() {
  return (
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ──────────────────────────────── */}
        <div className="pt-14 sm:pt-20 mb-12 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            Background
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white leading-tight">
            Education
            <span aria-hidden className="block mt-2 h-1 w-12 rounded-full bg-blue-500" />
          </h1>
        </div>

        {/* ── Timeline ────────────────────────────── */}
        <div className="relative flex flex-col gap-0">

          {/* Vertical rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px
                          bg-gray-200 dark:bg-gray-800" />

          {education.map((edu, i) => (
            <div key={i} className="relative pl-8 pb-10 last:pb-0">

              {/* Dot — filled for current, outlined for past */}
              <div className={[
                "absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-blue-500",
                i === 0
                  ? "bg-blue-500"
                  : "bg-white dark:bg-gray-950",
              ].join(" ")} />

              {/* Period */}
              {edu.period && (
                <span className="inline-block text-[10px] font-black uppercase
                                 tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                  {edu.period}
                </span>
              )}

              {/* Degree */}
              <h2 className="text-base sm:text-lg font-bold
                             text-gray-900 dark:text-white mb-1">
                {edu.degree}
              </h2>

              {/* Institution */}
              <p className="text-xs sm:text-sm font-semibold
                            text-gray-400 dark:text-gray-600 mb-3">
                {edu.institution}
              </p>

              {/* Description */}
              {edu.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {edu.description}
                </p>
              )}

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}