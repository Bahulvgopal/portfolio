import ProjectModel, { IProject } from "@/models/Project";
import { BaseRepository } from "./BaseRepository";
import type { Project } from "@/types/project";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super(ProjectModel);
  }

  private mapToDTO(doc: any): Project {
    return {
      _id: doc._id.toString(),

      title: doc.title,
      slug: doc.slug,
      tagline: doc.tagline,
      description: doc.description,
      role: doc.role,
      duration: doc.duration,
      year: doc.year,

      category: doc.category,
      projectType: doc.projectType,

      order: doc.order,

      image: doc.image
        ? {
            url: doc.image.url ?? "",
            publicId: doc.image.publicId ?? "",
          }
        : undefined,

      github: doc.github,
      live: doc.live,

      tags: doc.tags ?? [],
      tech: doc.tech ?? [],
      features: doc.features ?? [],

      problem: doc.problem,
      solution: doc.solution,
      learnings: doc.learnings,

      walkthrough:
        doc.walkthrough?.map((step: any) => ({
          title: step.title,
          description: step.description,
          image: {
            url: step.image.url,
            publicId: step.image.publicId,
          },
          device: step.device,
          order: step.order,
        })) ?? [],

      featured: doc.featured,

      status: doc.status,

      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  async getProjects(): Promise<Project[]> {
    const projects = await this.model
      .find()
      .sort({ createdAt: -1 })
      .lean();

    return projects.map((p) => this.mapToDTO(p));
  }

  async getPublishedProjects(): Promise<Project[]> {
    const projects = await this.model
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean();

    return projects.map((p) => this.mapToDTO(p));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.model
      .find({
        featured: true,
        status: "published",
      })
      .sort({ createdAt: -1 })
      .lean();

    return projects.map((p) => this.mapToDTO(p));
  }

  async getProjectById(
    id: string
  ): Promise<Project | null> {
    const project = await this.model.findById(id).lean();

    if (!project) return null;

    return this.mapToDTO(project);
  }

  async getProjectBySlug(
    slug: string
  ): Promise<Project | null> {
    const project = await this.model
      .findOne({ slug })
      .lean();

    if (!project) return null;

    return this.mapToDTO(project);
  }
}

export default new ProjectRepository();