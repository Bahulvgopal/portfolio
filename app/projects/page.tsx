import { connectDB } from "@/lib/db";
import ProjectService from "@/services/ProjectService";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  await connectDB();

  const projects = await ProjectService.getPublishedProjects();

  const serializedProjects = JSON.parse(JSON.stringify(projects));

  return <ProjectsClient projects={serializedProjects} />;
}