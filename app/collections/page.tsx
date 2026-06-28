"use client";

import { motion } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiMongoose,
  SiGit, SiGithub, SiVscodium, SiVercel, SiPostman,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

/* --- skill icon map ------------------------------------------------------- */
const ICON_MAP: Record<string, React.ReactNode> = {
  HTML:          <SiHtml5      className="text-orange-400" />,
  CSS:           <SiCss        className="text-blue-400" />,
  JavaScript:    <SiJavascript className="text-yellow-400" />,
  React:         <SiReact      className="text-cyan-400" />,
  "Next.js":     <SiNextdotjs  className="text-white" />,
  "Tailwind CSS":<SiTailwindcss className="text-sky-400" />,
  "Node.js":     <SiNodedotjs  className="text-green-500" />,
  "Express.js":  <SiExpress    className="text-neutral-300" />,
  "REST APIs":   <TbApi        className="text-violet-400" />,
  MongoDB:       <SiMongodb    className="text-green-400" />,
  Mongoose:      <SiMongoose   className="text-red-400" />,
  Git:           <SiGit        className="text-orange-500" />,
  GitHub:        <SiGithub     className="text-neutral-300" />,
  "VS Code":     <SiVscodium   className="text-blue-500" />,
  Vercel:        <SiVercel     className="text-white" />,
  Postman:       <SiPostman    className="text-orange-400" />,
};

/* --- data ----------------------------------------------------------------- */
const skillGroups = [
  {
    title: "Frontend",
    description: "Building fast, responsive, and delightful user interfaces.",
    accent: "from-sky-400 via-blue-400 to-indigo-400",
    glow: "rgba(56,189,248,0.06)",
    hoverBorder: "hover:border-sky-500/20",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    description: "Scalable APIs and solid application logic.",
    accent: "from-violet-400 via-purple-400 to-fuchsia-400",
    glow: "rgba(139,92,246,0.06)",
    hoverBorder: "hover:border-violet-500/20",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    description: "Structuring and managing data efficiently at scale.",
    accent: "from-emerald-400 via-green-400 to-teal-400",
    glow: "rgba(52,211,153,0.06)",
    hoverBorder: "hover:border-emerald-500/20",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools & Workflow",
    description: "The daily toolkit for building, shipping, and iterating.",
    accent: "from-amber-400 via-orange-400 to-rose-400",
    glow: "rgba(251,191,36,0.06)",
    hoverBorder: "hover:border-amber-500/20",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Postman"],
  },
];

/* --- animation helpers ---------------------------------------------------- */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
});

/* --- component ------------------------------------------------------------- */
export default function Skills() {
  return (
    <section className="relative py-28 px-5 sm:px-8 lg:px-0 bg-[#5858a7] overflow-hidden">

      {/* ambient blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* -- Header ----------------------------------------------------- */}
        <motion.div {...reveal(0)} className="text-center mb-16">
          <span className="
            inline-flex items-center gap-1.5
            px-3 py-1 rounded-full mb-5
            border border-sky-400/20 bg-sky-400/[0.04]
            text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase
          ">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Tech Stack
          </span>

          <h2
            className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Technoles I{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              work with
            </em>
          </h2>

          <p className="mt-4 text-sm text-neutral-500 max-w-md mx-auto leading-[1.75]">
            Tools and technologies I use to design, build, and ship modern digital products.
          </p>

          <div
            className="mt-8 h-px max-w-xs mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.2) 40%, rgba(129,140,248,0.2) 70%, transparent)",
            }}
          />
        </motion.div>

        {/* -- Grid ------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillGroups.map((group, i) => (
            <motion.article
              key={group.title}
              {...reveal(0.06 + i * 0.08)}
              className={`
                group relative overflow-hidden
                rounded-[26px] bg-[#0f0f10]
                border border-white/[0.06]
                ${group.hoverBorder}
                hover:-translate-y-1
                hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]
                transition-all duration-500
                p-7
              `}
            >
              {/* top accent bar */}
              <div className={`
                absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r ${group.accent}
                scale-x-0 origin-left
                group-hover:scale-x-100
                transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              `} />

              {/* ambient glow on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${group.glow} 0%, transparent 65%)`,
                }}
              />

              <div className="relative z-10">

                {/* card header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="text-[1.35rem] font-normal text-white tracking-tight"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                      {group.title}
                    </h3>
                    <p className="text-[12px] text-neutral-600 leading-relaxed mt-1">
                      {group.description}
                    </p>
                  </div>

                  <span className="font-mono text-[9px] text-neutral-700 tracking-[0.12em] shrink-0 mt-1 ml-4">
                    {String(group.skills.length).padStart(2, "0")} skills
                  </span>
                </div>

                <div className="h-px bg-white/[0.05] my-5" />

                {/* skill pills with icons */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.06 + j * 0.04, duration: 0.4, ease: "backOut" }}
                      className="
                        inline-flex items-center gap-1.5
                        px-3 py-1.5 rounded-full
                        border border-white/[0.07] bg-white/[0.03]
                        text-[11px] font-mono font-medium tracking-wide text-neutral-500
                        hover:border-white/15 hover:text-neutral-300 hover:bg-white/[0.06]
                        transition-all duration-300 cursor-default
                      "
                    >
                      <span className="text-[13px] leading-none">
                        {ICON_MAP[skill]}
                      </span>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* bottom shimmer */}
              <div className="
                absolute bottom-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-white/10 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              " />
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}