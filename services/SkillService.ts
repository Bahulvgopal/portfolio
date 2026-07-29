import SkillRepository from "@/repositories/SkillRepository";
import cloudinary from "@/lib/cloudinary";
import type { SkillFormData } from "@/schemas/skillSchema";

class SkillService {
  async createSkill(data: SkillFormData) {
    return SkillRepository.create(data);
  }

  async getSkills() {
    return SkillRepository.getAllSkills();
  }

  async getPublishedSkills() {
    return SkillRepository.getPublishedSkills();
  }

  async getSkill(id: string) {
    return SkillRepository.findById(id);
  }

  async updateSkill(
    id: string,
    data: Partial<SkillFormData>
  ) {
    const existing =
      await SkillRepository.findById(id);

    if (!existing) return null;

    if (
      existing.icon?.publicId &&
      data.icon &&
      existing.icon.publicId !==
        data.icon.publicId
    ) {
      await cloudinary.uploader.destroy(
        existing.icon.publicId
      );
    }

    return SkillRepository.update(id, data);
  }

  async deleteSkill(id: string) {
    const skill =
      await SkillRepository.findById(id);

    if (!skill) return null;

    if (skill.icon?.publicId) {
      await cloudinary.uploader.destroy(
        skill.icon.publicId
      );
    }

    return SkillRepository.delete(id);
  }
}

export default new SkillService();