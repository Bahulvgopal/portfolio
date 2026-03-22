const skills = [
  { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "HTML", "CSS"] },
  { category: "Backend",  items: ["Node.js", "MongoDB", "JavaScript"] },
  { category: "Tools",    items: ["Git", "VS Code",] },
];

const education = [
  {
    degree: "B.Tech Computer Science & Engineering",
    institution: "University College of Engineering, Kariavattom",
    period: "2025 – Present",
    current: true,
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "NSS polytechnic College, Pandalam",
    period: "2022 – 2024",
    current: false,
  },
];

const experience = [
  {
    role: "Program Coordinator",
    org: "UCE Kariavattom",
    period: "College Fest",
    desc: "Coordinated college events including treasure hunts.",
  },
  
];

const stats = [
  { value: "2025",   label: "Started B.Tech" },
  { value: "5+",    label: "Projects built" },
  { value: "Open",   label: "to opportunities" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Hero ─────────────────────────────────── */}
        <section className="pt-14 sm:pt-20 mb-16 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            About
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white mb-6 leading-tight">
            Building for the web,<br className="hidden sm:block" />
            learning every day.
          </h1>

          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400
                        leading-relaxed mb-4">
            I'm{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">Bahul V Gopal</span>,
            a B.Tech Computer Science student at{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              University College of Engineering, Kariavattom
            </span>
            . I'm a full-stack developer passionate about building scalable web
            applications and solving real-world problems with clean, maintainable code.
          </p>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400
                        leading-relaxed mb-8">
            When I'm not coding, I'm reading about system design, exploring new
            technologies, or coordinating events and design work on campus.
          </p>

          {/* Location + availability pill row */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                             border border-gray-200 dark:border-gray-700
                             bg-white dark:bg-gray-900
                             text-xs font-semibold text-gray-600 dark:text-gray-400">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor"
                   strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Trivandrum, Kerala, India
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                             border border-green-200 dark:border-green-800
                             bg-green-50 dark:bg-green-950/40
                             text-xs font-semibold text-green-700 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Open to opportunities
            </span>
          </div>
        </section>

        {/* ── Quick stats ──────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 sm:mb-20">
          {stats.map(({ value, label }) => (
            <div key={label}
                 className="rounded-2xl border border-gray-200 dark:border-gray-800
                            bg-white dark:bg-gray-900/60 p-4 text-center">
              <p className="text-2xl font-black tracking-tight
                            text-gray-900 dark:text-white mb-0.5">
                {value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest
                            text-gray-400 dark:text-gray-600">
                {label}
              </p>
            </div>
          ))}
        </div>

        <hr className="border-gray-100 dark:border-gray-800 mb-16 sm:mb-20" />

        {/* ── Education ────────────────────────────── */}
        <section className="mb-16 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-2">
            Background
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight
                         text-gray-900 dark:text-white mb-8">
            Education
          </h2>

          <div className="relative flex flex-col gap-0">
            <div className="absolute left-[7px] top-2 bottom-2 w-px
                            bg-gray-200 dark:bg-gray-800" />
            {education.map((edu, i) => (
              <div key={i} className="relative pl-8 pb-7 last:pb-0">
                <div className={[
                  "absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-blue-500",
                  edu.current ? "bg-blue-500" : "bg-white dark:bg-gray-950",
                ].join(" ")} />
                <span className="text-[10px] font-black uppercase tracking-widest
                                 text-blue-600 dark:text-blue-400 block mb-1">
                  {edu.period}
                </span>
                <p className="text-sm sm:text-base font-bold
                              text-gray-900 dark:text-white mb-0.5">
                  {edu.degree}
                </p>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-600">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 dark:border-gray-800 mb-16 sm:mb-20" />

        {/* ── Experience ───────────────────────────── */}
        <section className="mb-16 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-2">
            Experience
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight
                         text-gray-900 dark:text-white mb-8">
            What I've done
          </h2>

          <div className="flex flex-col gap-4">
            {experience.map((exp, i) => (
              <div key={i}
                   className="rounded-2xl border border-gray-200 dark:border-gray-800
                              bg-white dark:bg-gray-900/60
                              hover:border-blue-400 dark:hover:border-blue-600
                              hover:shadow-md hover:shadow-blue-500/10
                              transition-all duration-300 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <p className="text-sm sm:text-base font-bold
                                text-gray-900 dark:text-white">
                    {exp.role}
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-widest
                                   text-blue-600 dark:text-blue-400 shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 mb-2">
                  {exp.org}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 dark:border-gray-800 mb-16 sm:mb-20" />

        {/* ── Skills ───────────────────────────────── */}
        <section className="mb-16 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-2">
            Toolbox
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight
                         text-gray-900 dark:text-white mb-8">
            Skills
          </h2>

          <div className="flex flex-col gap-6">
            {skills.map(({ category, items }) => (
              <div key={category}>
                <p className="text-[10px] font-bold uppercase tracking-widest
                              text-gray-400 dark:text-gray-600 mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-full text-sm font-semibold
                                 border border-gray-200 dark:border-gray-700
                                 bg-white dark:bg-gray-900
                                 text-gray-700 dark:text-gray-300
                                 hover:border-blue-400 dark:hover:border-blue-500
                                 hover:text-blue-600 dark:hover:text-blue-400
                                 hover:bg-blue-50 dark:hover:bg-blue-950/30
                                 transition-colors duration-150 cursor-default select-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}