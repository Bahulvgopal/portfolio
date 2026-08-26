import { notFound } from "next/navigation";
import ProjectService from "@/services/ProjectService";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { connectDB } from "@/lib/db";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Connect to MongoDB before querying
  await connectDB();

  const project = await ProjectService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projects = await ProjectService.getPublishedProjects();

  const idx = projects.findIndex((p) => p.slug === slug);

  const prev = idx > 0 ? projects[idx - 1] : null;

  const next =
    idx < projects.length - 1
      ? projects[idx + 1]
      : null;

  const serializedProject = JSON.parse(
    JSON.stringify(project)
  );

  const serializedPrev = prev
    ? JSON.parse(JSON.stringify(prev))
    : null;

  const serializedNext = next
    ? JSON.parse(JSON.stringify(next))
    : null;

  return (
    <ProjectDetails
      project={serializedProject}
      prev={serializedPrev}
      next={serializedNext}
    />
  );
}