import PageHeader from "@/components/admin/PageHeader";
import ProjectTable from "@/components/projects/ProjectTable";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="PROJECT MISSIONS"
        description="Manage, publish, and configure your portfolio software deployments and technical case studies."
        badge="DEPLOYMENTS"
        action={{
          label: "NEW MISSION",
          href: "/admin/projects/new",
        }}
      />

      <ProjectTable />
    </div>
  );
}
