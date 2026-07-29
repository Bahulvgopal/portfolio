import Link from "next/link";

import ProjectTable from "@/components/projects/ProjectTable";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-slate-400">
            Manage your portfolio projects.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          + New Project
        </Link>
      </div>

      <ProjectTable />
    </div>
  );
}