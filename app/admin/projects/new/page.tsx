import ProjectForm from "@/components/projects/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Create Project
        </h1>

        <p className="text-slate-400">
          Add a new project to your portfolio.
        </p>
      </div>

      <ProjectForm mode="create" />
    </div>
  );
}