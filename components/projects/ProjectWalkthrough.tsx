"use client";

import WalkthroughItem from "./WalkthroughItem";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectWalkthrough({ project }: Props) {
  const walkthrough = [...(project.walkthrough ?? [])].sort(
    (a, b) => a.order - b.order
  );

  if (walkthrough.length === 0) return null;

  return (
    <section className="mb-28">
      <div className="mb-14">
        <h2 className="text-4xl font-bold text-white">
          Project Walkthrough
        </h2>

        <p className="mt-3 max-w-2xl text-neutral-400">
          Explore the project step by step and see how the final product comes
          together.
        </p>
      </div>

      <div className="space-y-32">
        {walkthrough.map((step, index) => (
          <WalkthroughItem
            key={step.order}
            step={step}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}