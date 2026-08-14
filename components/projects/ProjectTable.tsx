"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectRow from "./ProjectRow";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";

export default function ProjectTable() {
  const { projects, loading, removeProject } = useProjects();

  if (loading) {
    return <Loader />;
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No Projects"
        description="Create your first project."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              <th className="p-4 font-medium">Project</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="w-28 p-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <ProjectRow
                key={project._id}
                project={project}
                onDelete={removeProject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}