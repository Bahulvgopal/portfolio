import SkillService from "@/services/SkillService";

export async function getSkills() {
  return SkillService.getPublishedSkills();
}