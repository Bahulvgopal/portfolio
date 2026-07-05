"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiVscodium, SiVercel, SiPostman,
  SiInstagram, SiX, SiFacebook, SiYoutube, SiDribbble,
  SiBehance, SiPinterest, SiTiktok, SiDiscord, SiTelegram,
  SiSnapchat,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
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
  initial: { opacity: 0, x: -60 },
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

const STATS = [
  { value: "10+", label: "Projects" },
  { value: "Next.js", label: "Primary Stack" },
  { value: "Open", label: "To Hire" },
];

const SOCIALS = [
  { icon: <SiGithub />, href: "https://github.com/Bahulvgopal?tab=overview&from=2024-12-01&to=2024-12-31", label: "GitHub" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/bahul-v-gopal-b7493b280", label: "LinkedIn" },
  { icon: <SiInstagram />, href: "https://www.instagram.com/_.bahul_?igsh=MTM5OG1kd3FwMnBrZg==", label: "Instagram" },
  // { icon: <SiX />, href: "https://x.com/", label: "X" },
  { icon: <SiFacebook />, href: "https://www.facebook.com/bahulakul.bahulakul", label: "Facebook" },
  // { icon: <SiYoutube />, href: "https://youtube.com/", label: "YouTube" },
  // { icon: <SiDribbble />, href: "https://dribbble.com/", label: "Dribbble" },
  // { icon: <SiBehance />, href: "https://behance.net/", label: "Behance" },
  // { icon: <SiPinterest />, href: "https://pinterest.com/", label: "Pinterest" },
  // { icon: <SiTiktok />, href: "https://tiktok.com/", label: "TikTok" },
  // { icon: <SiDiscord />, href: "https://discord.com/", label: "Discord" },
  // { icon: <SiTelegram />, href: "https://telegram.org/", label: "Telegram" },
  // { icon: <SiSnapchat />, href: "https://snapchat.com/", label: "Snapchat" },
];

function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
className="
flex items-center justify-center
w-12 h-12
rounded-full
border border-white/[0.08]
bg-white/[0.03]
text-neutral-400
text-[20px]
hover:border-sky-500/40
hover:text-sky-400
hover:-translate-y-1
hover:scale-110
transition-all
duration-300
"        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export default function HeroWithSkills() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div className="bg-[#0a0a0b]">

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative md:py-[8rem] min-h-screen flex items-center overflow-hidden px-5 sm:px-8 lg:px-0 -mt-[5rem]">

        {/* grain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]" style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }} />

        {/* blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-blue-600/[0.08] blur-[160px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[140px]" />

        {/* top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        

        <div className="relative z-10 w-full max-w-7xl mx-auto py-20 sm:py-24 lg:py-0 lg:min-h-screen flex items-center">

          {/* ===== MOBILE LAYOUT (stacked: image → text) ===== */}
          <div className="flex flex-col py-8 w-full lg:hidden gap-8">

            {/* Mobile image */}
            <motion.div
              {...slideIn(0.06)}
              className="relative w-full flex justify-center"
            >
              {/* glow behind image */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-sky-500/10 via-blue-500/5 to-transparent blur-2xl" />
              <div className="relative w-64 h-80 sm:w-72 sm:h-96">
                <motion.div style={{ y: imgY }} className="absolute inset-0">
                  <Image
                    src="/images/main1.png"
                    alt="Bahul"
                    fill
                    className="object-cover object-top"
                    sizes="520px"
                    
                    priority
                  />
                </motion.div>
                {/* bottom fade so image bleeds into bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                {/* subtle side fades */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/40 via-transparent to-[#0a0a0b]/40" /> */}
              </div>
            </motion.div>

            {/* Mobile text */}
            <div className="flex flex-col">
              <motion.h1 {...reveal(0.1)} className="text-[clamp(2.6rem,10vw,5rem)] font-black leading-[0.9] tracking-tight text-white mb-5" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
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
                    <motion.path d="M2 8 C40 2, 80 12, 120 6 S180 2, 198 7" stroke="url(#sqGradM)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="sqGradM" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br />
                <span className="text-[clamp(1.6rem,7vw,3.5rem)] font-light italic text-neutral-400">I build</span>{" "}
                <span className="bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">digital</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">experiences.</span>
              </motion.h1>

              <motion.p {...reveal(0.18)} className="text-[clamp(0.9rem,2.5vw,1rem)] text-neutral-400 leading-[1.75] mb-6">
                Computer Science student passionate about building real-world products with modern web tech. Clean UI, performance, meaningful UX.
              </motion.p>

              {/* <motion.div {...reveal(0.22)} className="flex flex-wrap gap-2 mb-8">
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
              </motion.div> */}

              <motion.div {...reveal(0.26)} className="flex flex-wrap gap-3">
                <Link href="/projects" className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-[0_0_32px_rgba(255,255,255,0.08)]">
                  View Projects
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-white/[0.12] text-neutral-300 hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Resume
                </a>
              </motion.div>

              {/* Social icons */}
              <motion.div {...reveal(0.32)} className="mt-8 pt-6 flex justify-center items-center border-t border-white/[0.06]">
                <SocialRow />
              </motion.div>
            </div>
          </div>

          {/* ===== DESKTOP LAYOUT (image LEFT, text RIGHT) ===== */}
          <div className="hidden lg:grid w-full grid-cols-[480px_1fr] xl:grid-cols-[520px_1fr] items-center gap-12 xl:gap-20">

            {/* LEFT — image */}
            <motion.div {...slideIn(0.1)} className="relative flex items-end -mt-[15rem] justify-center  h-[88vh]">

              {/* glow halo behind the figure */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] h-[560px] rounded-full blur-[80px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(56,189,248,0.12) 0%, rgba(129,140,248,0.07) 50%, transparent 80%)" }}
              />

              

              {/* image — no frame, just the transparent-bg figure */}
              <motion.div style={{ y: imgY }} className="relative w-full h-full">
                <Image
                  src="/images/main1.png"
                  alt="Bahul"
                  fill
                  className="object-contain object-bottom"
                  sizes="520px"
                  priority
                />
                {/* subtle bottom fade to anchor into page */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/10 to-transparent" style={{ maskImage: "linear-gradient(to top, black 0%, black 8%, transparent 30%)" }} />
              </motion.div>
            </motion.div>

            {/* RIGHT — text */}
            <div className="flex flex-col">

              <motion.h1 {...reveal(0.08)} className="text-[clamp(2.8rem,5.5vw,6rem)] font-black leading-[0.9] tracking-tight text-white mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
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
                    <motion.path d="M2 8 C40 2, 80 12, 120 6 S180 2, 198 7" stroke="url(#sqGradD)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="sqGradD" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br className="hidden sm:block" />
                <span className="text-[clamp(2rem,4vw,5rem)] font-light italic text-neutral-400">I build</span>{" "}
                <span className="bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">digital</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">experiences.</span>
              </motion.h1>

              <motion.p {...reveal(0.18)} className="max-w-lg text-[clamp(0.9rem,1.5vw,1.05rem)] text-neutral-400 leading-[1.75] mb-8">
                Computer Science student passionate about building real-world products with modern web tech. From wedding platforms to scalable systems — clean UI, performance, meaningful UX.
              </motion.p>

              

              <motion.div {...reveal(0.26)} className="flex flex-wrap gap-3 mb-8">
                <Link href="/projects" className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-[0_0_32px_rgba(255,255,255,0.08)] hover:shadow-[0_0_48px_rgba(255,255,255,0.14)]">
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

                
              </motion.div>

              {/* Social icons */}
              <motion.div {...reveal(0.3)} className="mb-10 mt-[2rem] flex justify-center items-center">
                <SocialRow />
              </motion.div>


            </div>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-0">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.12) 30%, rgba(129,140,248,0.12) 70%, transparent)" }} />
      </div>

      {/* ===== SKILLS ===== */}
      <section className="relative py-10 px-5 sm:px-8 lg:px-0 overflow-hidden">

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