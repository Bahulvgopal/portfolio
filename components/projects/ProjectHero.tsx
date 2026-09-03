"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft, HiExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ProjectHero({ project }: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mb-20"
    >
      {/* Back Button */}
      <motion.div variants={item} className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition"
        >
          <HiArrowLeft />
          Back to Projects
        </Link>
      </motion.div>

     {/* Hero image */}
{project.image?.url && (
  <motion.div
  variants={item}
  className="relative w-full mb-10 sm:mb-14 rounded-[18px] sm:rounded-[26px] overflow-hidden border border-white/[0.06] bg-[#0f0f10] shadow-[0_16px_48px_rgba(0,0,0,0.5)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
>
    <Image
      src={project.image.url}
      alt={project.title}
      width={1600}
      height={1000}
      className="h-auto w-full object-contain"
      priority
      sizes="(max-width: 768px) 100vw, 768px"
    />

    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0b]/20 via-transparent to-transparent" />
  </motion.div>
)}

      {/* Title */}
      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-black text-white leading-tight"
      >
        {project.title}
      </motion.h1>

      {/* Tagline */}
      {project.tagline && (
        <motion.p
          variants={item}
          className="mt-4 text-xl text-sky-400 font-medium"
        >
          {project.tagline}
        </motion.p>
      )}

      {/* Description */}
      <motion.p
        variants={item}
        className="mt-6 max-w-3xl text-neutral-400 leading-8"
      >
        {project.description}
      </motion.p>

      {/* Tags */}
      {project.tags?.length > 0 && (
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap gap-3"
        >
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}

      {/* Buttons */}
      <motion.div
        variants={item}
        className="mt-10 flex flex-wrap gap-4"
      >
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-neutral-200 transition"
          >
            <HiExternalLink />
            Live Demo
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-white hover:bg-white/5 transition"
          >
            <SiGithub />
            GitHub
          </a>
        )}
      </motion.div>
    </motion.section>
  );
}