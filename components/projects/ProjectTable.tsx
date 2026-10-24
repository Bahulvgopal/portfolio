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
        title="No Projects Found"
        description="Launch your first project deployment to showcase it on your portfolio."
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
      {/* Top Glass Glare Line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Header bar */}
      <div className="border-b border-white/10 px-6 py-4.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-[10px] font-bold text-orange-400 tracking-widest uppercase">
            // PROJECT DEPLOYMENTS // 「一覧」
          </span>
          <span className="text-stone-500 font-mono text-xs hidden sm:inline">· · ·</span>
        </div>
        <span className="font-mono text-xs text-orange-400 font-bold">
          {projects.length} RECORDS
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-left font-orbitron text-[10px] font-bold uppercase tracking-wider text-stone-400">
              <th className="p-4 sm:p-5">Project Details</th>
              <th className="p-4 sm:p-5 hidden md:table-cell">Category</th>
              <th className="p-4 sm:p-5">Status</th>
              <th className="p-4 sm:p-5 text-center">Featured</th>
              <th className="w-28 p-4 sm:p-5">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.08]">
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
