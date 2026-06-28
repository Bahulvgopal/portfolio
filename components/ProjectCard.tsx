"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

/* --- types ------------------------------------------------------------------ */
interface Project {
  title: string;
  description: string;
  tech: string[];
  slug: string;
  featured?: boolean;
  year?: string;
}

/* --- component --------------------------------------------------------------- */
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  /* magnetic tilt on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="
        group relative overflow-hidden
        rounded-[24px]
        bg-[#0f0f10]
        border border-white/[0.07]
        p-0
        cursor-pointer
        will-change-transform
      "
    >
      {/* -- top accent bar (grows on hover) -- */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left", height: "2px" }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 z-10"
      />

      {/* -- ambient glow that follows cursor -- */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${50 + tilt.y * 4}% ${50 + tilt.x * 4}%, rgba(56,189,248,0.08) 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* -- card body -- */}
      <div className="relative z-10 p-7">

        {/* header row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2.5">
            {/* index — stable, derived from prop */}
            <div className="
              w-8 h-8 rounded-full
              border border-white/10
              bg-white/[0.04]
              flex items-center justify-center
              text-[11px] font-bold text-neutral-500
              font-mono
            ">
              {String(index + 1).padStart(2, "0")}
            </div>

            <span className="
              text-[10px] font-bold uppercase tracking-[0.15em]
              text-sky-400/80
            ">
              {project.featured !== false ? "Featured" : "Project"}
            </span>
          </div>

          {/* year tag */}
          <span className="text-[11px] font-mono text-neutral-600 tabular-nums">
            {project.year ?? "2024"}
          </span>
        </div>

        {/* title */}
        <h3
          className="
            text-[1.45rem] sm:text-[1.6rem]
            font-black tracking-tight leading-[1.1]
            text-white mb-3
          "
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          {project.title}
        </h3>

        {/* description */}
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-6">
          {project.description}
        </p>

        {/* tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="
                px-2.5 py-1 rounded-full
                text-[10px] font-semibold tracking-wide
                bg-white/[0.04] border border-white/[0.08]
                text-neutral-400
                group-hover:border-white/[0.13] group-hover:text-neutral-300
                transition-colors duration-300
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* divider */}
        <div className="h-px bg-white/[0.06] mb-6" />

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="
              group/link inline-flex items-center gap-2
              text-sm font-semibold text-white
              hover:text-sky-400
              transition-colors duration-200
            "
          >
            <span>View Case Study</span>
            <motion.svg
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </div>
      </div>

      {/* -- bottom shimmer on hover -- */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="
          absolute bottom-0 left-0 right-0 h-[1px]
          bg-gradient-to-r from-transparent via-sky-500/30 to-transparent
        "
      />
    </motion.article>
  );
}