import cloudinary from "@/lib/cloudinary";

import EducationRepository from "@/repositories/EducationRepository";
import type {
  EducationFormData,
  EducationApiData,
} from "@/schemas/educationSchema";

class EducationService {
  /* ================= CREATE ================= */

  async createEducation(data: EducationFormData) {
  return EducationRepository.create({
    ...data,
    logo: data.logo ?? undefined,
    startDate: new Date(data.startDate),
    endDate: data.endDate
      ? new Date(data.endDate)
      : undefined,
    coursework: data.coursework.map((item) => item.value),
    achievements: data.achievements.map((item) => item.value),
  });
}

  /* ================= READ ================= */

  async getEducations() {
    return EducationRepository.findAll();
  }

  async getPublishedEducations() {
    return EducationRepository.getPublishedEducation();
  }

  async getCurrentEducations() {
    return EducationRepository.getCurrentEducation();
  }

  async getEducation(id: string) {
    return EducationRepository.getEducationById(id);
  }

  /* ================= UPDATE ================= */

  async updateEducation(
  id: string,
  data: Partial<EducationApiData>
) {
    const education = await EducationRepository.findById(id);

    if (!education) {
      return null;
    }

    if (
      data.logo?.publicId &&
      education.logo?.publicId &&
      data.logo.publicId !== education.logo.publicId
    ) {
      await cloudinary.uploader.destroy(
        education.logo.publicId
      );
    }

   return EducationRepository.update(id, {
  ...data,
  logo: data.logo ?? undefined,
  startDate: data.startDate
    ? new Date(data.startDate)
    : undefined,
  endDate: data.endDate
    ? new Date(data.endDate)
    : undefined,
  coursework: data.coursework,
  achievements: data.achievements,
});
  }

  /* ================= DELETE ================= */

  async deleteEducation(id: string) {
    const education = await EducationRepository.findById(id);

    if (!education) {
      return null;
    }

    if (education.logo?.publicId) {
      await cloudinary.uploader.destroy(
        education.logo.publicId
      );
    }

    return EducationRepository.delete(id);
  }
}

export default new EducationService();