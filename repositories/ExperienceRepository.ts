import ExperienceModel, {
  IExperience,
} from "@/models/Experience";
import { BaseRepository } from "./BaseRepository";
import type { Experience } from "@/types/experience";

class ExperienceRepository extends BaseRepository<IExperience> {
  constructor() {
    super(ExperienceModel);
  }

  private mapToDTO(doc: any): Experience {
    return {
      _id: doc._id.toString(),

      company: doc.company,
      role: doc.role,
      employmentType: doc.employmentType,

      location: doc.location,

      startDate: doc.startDate.toISOString(),
      endDate: doc.endDate?.toISOString(),

      currentlyWorking: doc.currentlyWorking,

     logo: doc.logo
  ? {
      url: doc.logo.url ?? "",
      publicId: doc.logo.publicId ?? "",
    }
  : undefined,

      description: doc.description,

      responsibilities: doc.responsibilities ?? [],
      skills: doc.skills ?? [],
      achievements: doc.achievements ?? [],

      website: doc.website,

      order: doc.order,

      status: doc.status,

      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  async getExperienceById(
    id: string
  ): Promise<Experience | null> {
    const experience = await this.model.findById(id).lean();

    if (!experience) return null;

    return this.mapToDTO(experience);
  }

  async getPublishedExperiences(): Promise<Experience[]> {
    const experiences = await this.model
      .find({
        status: "published",
      })
      .sort({
        order: 1,
        startDate: -1,
      })
      .lean();

    return experiences.map((e) => this.mapToDTO(e));
  }

  async getCurrentExperiences(): Promise<Experience[]> {
    const experiences = await this.model
      .find({
        currentlyWorking: true,
        status: "published",
      })
      .sort({
        order: 1,
        startDate: -1,
      })
      .lean();

    return experiences.map((e) => this.mapToDTO(e));
  }
}

export default new ExperienceRepository();