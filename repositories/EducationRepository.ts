import EducationModel, {
  IEducation,
} from "@/models/Education";
import { BaseRepository } from "./BaseRepository";
import type { Education } from "@/types/education";

class EducationRepository extends BaseRepository<IEducation> {
  constructor() {
    super(EducationModel);
  }

  private mapToDTO(doc: any): Education {
    return {
      _id: doc._id.toString(),

      institution: doc.institution,
      degree: doc.degree,
      fieldOfStudy: doc.fieldOfStudy,
      location: doc.location,

      startDate: doc.startDate.toISOString(),
      endDate: doc.endDate?.toISOString(),

      currentlyStudying: doc.currentlyStudying,

      grade: doc.grade,
      gradeType: doc.gradeType,

      logo: doc.logo
        ? {
            url: doc.logo.url ?? "",
            publicId: doc.logo.publicId ?? "",
          }
        : null,

      description: doc.description,

      coursework: doc.coursework ?? [],
      achievements: doc.achievements ?? [],

      website: doc.website,

      order: doc.order,

      status: doc.status,

      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  async getEducationById(
  id: string
): Promise<Education | null> {
  const education = await this.model.findById(id).lean();

  if (!education) {
    return null;
  }

  return this.mapToDTO(education);
}

  async getPublishedEducation(): Promise<Education[]> {
    const educations = await this.model
      .find({
        status: "published",
      })
      .sort({
        order: 1,
        startDate: -1,
      })
      .lean();

    return educations.map((e) => this.mapToDTO(e));
  }

  async getCurrentEducation(): Promise<Education[]> {
    const educations = await this.model
      .find({
        currentlyStudying: true,
        status: "published",
      })
      .sort({
        order: 1,
        startDate: -1,
      })
      .lean();

    return educations.map((e) => this.mapToDTO(e));
  }
}

export default new EducationRepository();