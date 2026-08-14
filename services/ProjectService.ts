import slugify from "slugify";

import cloudinary from "@/lib/cloudinary";
import ProjectRepository from "@/repositories/ProjectRepository";
import type { ProjectInput } from "@/validations/project";
import type { IWalkthroughStep } from "@/models/Project";

class ProjectService {
  /* ================= CREATE ================= */

  async createProject(data: ProjectInput) {
  const slug = await this.generateUniqueSlug(data.title);

  return ProjectRepository.create({
    ...data,
    slug,

    image: data.image ?? undefined,

    walkthrough:
      data.walkthrough?.map((step) => ({
        ...step,
        image: step.image ?? undefined,
      })) ?? [],
  });
}

  /* ================= READ ================= */

  async getProjects() {
  return ProjectRepository.getProjects();
}

    async getProjectBySlug(slug: string) {
  return ProjectRepository.getProjectBySlug(slug);
}

  async getPublishedProjects() {
  return ProjectRepository.getPublishedProjects();
}

  async getFeaturedProjects() {
  return ProjectRepository.getFeaturedProjects();
}

  async getProject(id: string) {
  return ProjectRepository.getProjectById(id);
}

 /* ================= UPDATE ================= */

async updateProject(
  id: string,
  data: Partial<ProjectInput>
) {
  const project = await ProjectRepository.findById(id);

  if (!project) {
    return null;
  }

  /* ---------- Thumbnail ---------- */

  if (
    data.image?.publicId &&
    project.image?.publicId &&
    data.image.publicId !== project.image.publicId
  ) {
    await cloudinary.uploader.destroy(project.image.publicId);
  }

  /* ---------- Walkthrough Images ---------- */

  if (project.walkthrough?.length) {
   const oldImages = project.walkthrough
  .map((step) => step.image?.publicId)
  .filter((id): id is string => Boolean(id));

    const newImages =
  data.walkthrough
    ?.map((step) => step.image?.publicId)
    .filter((id): id is string => Boolean(id)) ?? [];

    const removedImages = oldImages.filter(
      (id) => id && !newImages.includes(id)
    );

    await Promise.all(
      removedImages.map((id) =>
        cloudinary.uploader.destroy(id!)
      )
    );
  }

  return ProjectRepository.update(id, {
  ...data,

  image: data.image ?? undefined,

  walkthrough: data.walkthrough ?? [],
});
}

  /* ================= DELETE ================= */

  async deleteProject(id: string) {
    const project = await ProjectRepository.findById(id);

    if (!project) {
      return null;
    }

    // Delete thumbnail
    if (project.image?.publicId) {
      await cloudinary.uploader.destroy(
        project.image.publicId
      );
    }

    // Delete screenshots
    // Delete walkthrough images
if (project.walkthrough?.length) {
  await Promise.all(
   project.walkthrough
  .filter((step) => step.image?.publicId)
  .map((step) =>
    cloudinary.uploader.destroy(step.image!.publicId)
  )
  );
}

    return ProjectRepository.delete(id);
  }

  /* ================= SLUG ================= */

  private async generateUniqueSlug(title: string) {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let count = 1;

    while (await ProjectRepository.getProjectBySlug(slug)) {
  slug = `${baseSlug}-${count++}`;
}
    return slug;
  }
}

export default new ProjectService();