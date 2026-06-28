"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiVscodium, SiVercel, SiPostman,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0, y = 32) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: EASE, delay },
});

const slideIn = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, ease: EASE, delay },
});



const TAGS = ["React", "Next.js", "MongoDB", "TypeScript", "TailwindCSS"];

const ICON_MAP: Record<string, { icon: React.ReactNode; color: string }> = {
  HTML:           { icon: <SiHtml5 />,       color: "#f97316" },
  CSS:            { icon: <SiCss />,         color: "#60a5fa" },
  JavaScript:     { icon: <SiJavascript />,  color: "#facc15" },
  React:          { icon: <SiReact />,       color: "#22d3ee" },
  "Next.js":      { icon: <SiNextdotjs />,   color: "#e5e5e5" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#38bdf8" },
  "Node.js":      { icon: <SiNodedotjs />,   color: "#4ade80" },
  "Express.js":   { icon: <SiExpress />,     color: "#d4d4d4" },
  "REST APIs":    { icon: <TbApi />,         color: "#a78bfa" },
  MongoDB:        { icon: <SiMongodb />,     color: "#4ade80" },
  Mongoose:       { icon: <SiMongodb />,     color: "#f87171" },
  Git:            { icon: <SiGit />,         color: "#fb923c" },
  GitHub:         { icon: <SiGithub />,      color: "#d4d4d4" },
  "VS Code":      { icon: <SiVscodium />,    color: "#60a5fa" },
  Vercel:         { icon: <SiVercel />,      color: "#ffffff" },
  Postman:        { icon: <SiPostman />,     color: "#f97316" },
};

const skillGroups = [
  {
    title: "Frontend",
    description: "Fast, responsive, and delightful user interfaces.",
    gradientFrom: "#38bdf8",
    gradientTo: "#818cf8",
    glowColor: "rgba(56,189,248,0.07)",
    borderHover: "hover:border-sky-500/25",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    description: "Scalable APIs and solid application logic.",
    gradientFrom: "#a78bfa",
    gradientTo: "#e879f9",
    glowColor: "rgba(167,139,250,0.07)",
    borderHover: "hover:border-violet-500/25",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    description: "Structured, efficient data at any scale.",
    gradientFrom: "#4ade80",
    gradientTo: "#2dd4bf",
    glowColor: "rgba(74,222,128,0.07)",
    borderHover: "hover:border-emerald-500/25",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools & Workflow",
    description: "The daily toolkit for building and shipping.",
    gradientFrom: "#fb923c",
    gradientTo: "#f43f5e",
    glowColor: "rgba(251,146,60,0.07)",
    borderHover: "hover:border-orange-500/25",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Postman"],
  },
];

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function HeroWithSkills() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div className="bg-[#0a0a0b]">

      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden px-5 md:py-[7rem] py-9 sm:px-8 lg:px-0 -mt-[5rem]">

        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]" style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }} />
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full bg-blue-600/[0.08] blur-[160px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[140px]" />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] items-center gap-10 lg:gap-16 py-20 sm:py-24 lg:py-0 lg:min-h-screen">

          <div className="flex flex-col">

            <motion.h1 {...reveal(0.08)} className="text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.9] tracking-tight text-white mb-5" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Bahul</span>
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.7 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path d="M2 8 C40 2, 80 12, 120 6 S180 2, 198 7" stroke="url(#sqGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="sqGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>{" "}
              <br className="hidden sm:block" />
              <span className="text-[clamp(2rem,6vw,5rem)] font-light italic text-neutral-400">I build</span>{" "}
              <span className="bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">digital</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">experiences.</span>
            </motion.h1>

            <motion.p {...reveal(0.18)} className="max-w-lg text-[clamp(0.9rem,2vw,1.05rem)] text-neutral-400 leading-[1.75] mb-8">
              Computer Science student passionate about building real-world products with modern web tech. From wedding platforms to scalable systems — clean UI, performance, meaningful UX.
            </motion.p>

            <motion.div {...reveal(0.22)} className="flex flex-wrap gap-2 mb-10">
              {TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: "backOut" }}
                  className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-neutral-400 border border-white/[0.08] bg-white/[0.03] hover:border-blue-500/40 hover:text-blue-300 transition-colors duration-200 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs — all <a> attributes on one line to avoid Turbopack parse error */}
            <motion.div {...reveal(0.26)} className="flex flex-col xs:flex-row flex-wrap gap-3 mb-14">
              <Link href="/projects" className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-[0_0_32px_rgba(255,255,255,0.08)] hover:shadow-[0_0_48px_rgba(255,255,255,0.14)] overflow-hidden">
                <span className="relative z-10">View Projects</span>
                <svg className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-white/[0.12] text-neutral-300 hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Resume
              </a>

              <a href="https://wa.me/918075298373" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/[0.08] hover:border-emerald-500/40 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </motion.div>

            
          </div>

          {/* Mobile image */}
          <div className="relative h-72 rounded-3xl overflow-hidden lg:hidden">
            <Image src="/images/bahul.jpeg" alt="Bahul" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 50vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[#0a0a0b]/80 backdrop-blur-md px-4 py-3">
              <p className="text-sm font-semibold text-white">Building real-world products 🚀</p>
              <p className="text-xs text-neutral-400 mt-0.5">Next.js · MongoDB · Full Stack</p>
            </div>
          </div>

          {/* Desktop image */}
          <motion.div {...slideIn(0.14)} className="hidden lg:flex relative h-[82vh] flex-col">
            <div className="absolute -inset-6 rounded-[52px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-violet-500/10 blur-3xl" />
            <div className="relative flex-1 overflow-hidden rounded-[36px] border border-white/[0.07] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                <Image src="/images/bahul.jpeg" alt="Bahul" fill className="object-cover object-center" sizes="50vw" priority />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/20 to-transparent" />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                style={{ transformOrigin: "top" }}
                className="absolute top-6 right-6 w-px h-16 bg-gradient-to-b from-white/20 to-transparent"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
                style={{ transformOrigin: "right" }}
                className="absolute top-6 right-6 h-px w-16 bg-gradient-to-l from-white/20 to-transparent"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Divider */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-0">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.12) 30%, rgba(129,140,248,0.12) 70%, transparent)" }} />
      </div>

      {/* Skills */}
      <section className="relative py-28 px-5 sm:px-8 lg:px-0 overflow-hidden">

        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-blue-700/5 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-violet-700/5 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }} />

        <div className="relative z-10 max-w-6xl mx-auto">

          <motion.div {...revealInView(0)} className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
              <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
              Tech Stack
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Technologies I{" "}
              <em className="italic" style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                work with
              </em>
            </h2>
            <p className="mt-4 text-sm text-neutral-500 max-w-md mx-auto leading-[1.75]">
              Tools and technologies I use to design, build, and ship modern digital products.
            </p>
          </motion.div>

          <motion.div {...revealInView(0.05)} className="h-px mb-12 max-w-xs mx-auto" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.2) 40%, rgba(129,140,248,0.2) 70%, transparent)" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGroups.map((group, i) => (
              <motion.article
                key={group.title}
                {...revealInView(0.07 + i * 0.07)}
                className={`group relative overflow-hidden rounded-[26px] bg-[#0f0f10] border border-white/[0.06] ${group.borderHover} hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500 p-7`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ background: `linear-gradient(90deg, ${group.gradientFrom}, ${group.gradientTo})` }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${group.glowColor} 0%, transparent 65%)` }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[1.35rem] font-normal text-white tracking-tight leading-snug" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                      {group.title}
                    </h3>
                    <span className="font-mono text-[9px] text-neutral-700 tracking-[0.12em] mt-1 shrink-0 ml-3">
                      {String(group.skills.length).padStart(2, "0")} skills
                    </span>
                  </div>
                  <p className="text-[12px] text-neutral-600 leading-relaxed mb-5">{group.description}</p>
                  <div className="h-px bg-white/[0.05] mb-5" />
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, j) => {
                      const meta = ICON_MAP[skill];
                      return (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.88 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.12 + i * 0.05 + j * 0.04, duration: 0.35, ease: "backOut" }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] font-mono text-[10px] font-medium tracking-wide text-neutral-500 hover:border-white/[0.14] hover:text-neutral-300 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                        >
                          {meta && (
                            <span className="text-[13px] leading-none" style={{ color: meta.color }}>
                              {meta.icon}
                            </span>
                          )}
                          {skill}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}