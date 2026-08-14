import ExperienceService from "@/services/ExperienceService";

export async function getExperiences() {
  return ExperienceService.getPublishedExperiences();
}