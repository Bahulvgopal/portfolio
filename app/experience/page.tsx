import { experiences } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ──────────────────────────────── */}
        <div className="pt-14 sm:pt-20 mb-12 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            Work
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white leading-tight">
            Experience
            <span aria-hidden className="block mt-2 h-1 w-12 rounded-full bg-blue-500" />
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400
                        leading-relaxed max-w-lg">
            Roles, internships, and positions I've held along the way.
          </p>
        </div>

        {/* ── Timeline ────────────────────────────── */}
        <div className="relative flex flex-col gap-0">

          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-8 pb-10 last:pb-0">

              {/* Card */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                              bg-white dark:bg-gray-900/60
                              hover:border-blue-400 dark:hover:border-blue-600
                              hover:shadow-md hover:shadow-blue-500/10
                              transition-all duration-300 p-5 sm:p-6">

                {/* Period + type badge */}
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  {exp.period && (
                    <span className="text-[10px] font-black uppercase tracking-widest
                                     text-blue-600 dark:text-blue-400">
                      {exp.period}
                    </span>
                  )}

                  {exp.type && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold
                                     uppercase tracking-widest
                                     border
                                     ${
                                       exp.type === "Leadership"
                                         ? "bg-blue-100 text-blue-600 border-blue-200"
                                         : exp.type === "Event"
                                         ? "bg-green-100 text-green-600 border-green-200"
                                         : "bg-gray-100 text-gray-500 border-gray-200"
                                     }`}>
                      {exp.type}
                    </span>
                  )}
                </div>

                {/* Role */}
                <h2 className="text-base sm:text-lg font-bold
                               text-gray-900 dark:text-white mb-1">
                  {exp.role}
                </h2>

                {/* Company */}
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 mb-3">
                  {exp.company}
                </p>

                {/* Description */}
                {exp.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                )}

                {/* Skills / highlights */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-semibold
                                   border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-900
                                   text-gray-600 dark:text-gray-400
                                   hover:border-blue-400 dark:hover:border-blue-500
                                   hover:text-blue-600 dark:hover:text-blue-400
                                   transition-colors duration-150 cursor-default select-none"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}