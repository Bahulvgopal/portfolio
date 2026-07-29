import Skill, { ISkill } from "@/models/Skill";
import { BaseRepository } from "./BaseRepository";
import type { Skill as SkillType } from "@/types/skill";

class SkillRepository extends BaseRepository<ISkill> {
  constructor() {
    super(Skill);
  }

  async getAllSkills(): Promise<SkillType[]> {
    const skills = await this.model
      .find()
      .sort({
        order: 1,
        category: 1,
        name: 1,
      })
      .lean();

    return skills.map((skill) => ({
      ...skill,
      _id: skill._id.toString(),
      createdAt: skill.createdAt.toISOString(),
      updatedAt: skill.updatedAt.toISOString(),
    }));
  }

  async getPublishedSkills(): Promise<SkillType[]> {
    const skills = await this.model
      .find({
        status: "published",
      })
      .sort({
        order: 1,
        category: 1,
        name: 1,
      })
      .lean();

    return skills.map((skill) => ({
      ...skill,
      _id: skill._id.toString(),
      createdAt: skill.createdAt.toISOString(),
      updatedAt: skill.updatedAt.toISOString(),
    }));
  }
}

export default new SkillRepository();