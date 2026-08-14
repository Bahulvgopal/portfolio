"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectRow from "./ProjectRow";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState"

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
    <div className="overflow-hidden rounded-2xl border border-slate-800">
    <table className="w-full">
      <thead className="bg-slate-900">
  <tr className="text-left text-sm uppercase tracking-wide text-slate-400">
    <th className="px-6 py-4">Project</th>
    <th className="px-6 py-4">Status</th>
    <th className="px-6 py-4">Featured</th>
    <th className="px-6 py-4">Actions</th>
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
  );
}