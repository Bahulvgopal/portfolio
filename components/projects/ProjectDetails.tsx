"use client";

import type { Project } from "@/types/project";

import ProjectHero from "./ProjectHero";
import ProjectInfo from "./ProjectInfo";
import ProjectWalkthrough from "./ProjectWalkthrough";
import ProjectNavigation from "./ProjectNavigation";

interface Props {
  project: Project;
  prev?: Project | null;
  next?: Project | null;
}

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function ProjectDetails({
  project,
  prev,
  next,
}: Props) {
  return (
    <main className="relative min-h-screen bg-[#FAF8F5] pt-28 sm:pt-36 pb-28 overflow-hidden text-stone-900">
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      {/* Ambient Blobs */}
      <div className="pointer-events-none fixed -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-orange-500/[0.05] blur-[160px] z-0" />
      <div className="pointer-events-none fixed bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/[0.05] blur-[150px] z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <ProjectHero project={project} />
        <ProjectInfo project={project} />
        <ProjectWalkthrough project={project} />
        <ProjectNavigation prev={prev} next={next} />
      </div>
    </main>
  );
}
