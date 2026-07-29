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

export default function ProjectDetails({
  project,
  prev,
  next,
}: Props) {
  return (
    <main className="min-h-screen bg-[#0A0A0B] pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <ProjectHero project={project} />

        <ProjectInfo project={project} />

        <ProjectWalkthrough project={project} />

        <ProjectNavigation
          prev={prev}
          next={next}
        />
      </div>
    </main>
  );
}