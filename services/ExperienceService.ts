import cloudinary from "@/lib/cloudinary";

import ExperienceRepository from "@/repositories/ExperienceRepository";
import type { ExperienceFormData } from "@/schemas/experienceSchema";

class ExperienceService {
  /* ================= CREATE ================= */

  async createExperience(data: ExperienceFormData) {
    return ExperienceRepository.create({
      ...data,
      logo: data.logo ?? undefined,
      startDate: new Date(data.startDate),
      endDate: data.endDate
        ? new Date(data.endDate)
        : undefined,
      responsibilities: data.responsibilities.map(
        (item) => item.value
      ),
      skills: data.skills.map((item) => item.value),
      achievements: data.achievements.map(
        (item) => item.value
      ),
    });
  }

  /* ================= READ ================= */

  async getExperiences() {
    return ExperienceRepository.findAll();
  }

  async getPublishedExperiences() {
    return ExperienceRepository.getPublishedExperiences();
  }

  async getCurrentExperiences() {
    return ExperienceRepository.getCurrentExperiences();
  }

  async getExperience(id: string) {
    return ExperienceRepository.getExperienceById(id);
  }

  /* ================= UPDATE ================= */

  async updateExperience(
    id: string,
    data: Partial<ExperienceFormData>
  ) {
    const experience = await ExperienceRepository.findById(id);

    if (!experience) {
      return null;
    }

    if (
      data.logo?.publicId &&
      experience.logo?.publicId &&
      data.logo.publicId !== experience.logo.publicId
    ) {
      await cloudinary.uploader.destroy(
        experience.logo.publicId
      );
    }

    return ExperienceRepository.update(id, {
      ...data,
      logo: data.logo ?? undefined,
      startDate: data.startDate
        ? new Date(data.startDate)
        : undefined,
      endDate: data.endDate
        ? new Date(data.endDate)
        : undefined,
      responsibilities: data.responsibilities
        ? data.responsibilities.map((item) => item.value)
        : undefined,
      skills: data.skills
        ? data.skills.map((item) => item.value)
        : undefined,
      achievements: data.achievements
        ? data.achievements.map((item) => item.value)
        : undefined,
    });
  }

  /* ================= DELETE ================= */

  async deleteExperience(id: string) {
    const experience = await ExperienceRepository.findById(id);

    if (!experience) {
      return null;
    }

    if (experience.logo?.publicId) {
      await cloudinary.uploader.destroy(
        experience.logo.publicId
      );
    }

    return ExperienceRepository.delete(id);
  }
}

export default new ExperienceService();