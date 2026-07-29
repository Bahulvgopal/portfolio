import ProjectService from "@/services/ProjectService";

export async function getProjects() {
  return await ProjectService.getPublishedProjects();
}