import EducationService from "@/services/EducationService";

export async function getEducation() {
  return EducationService.getPublishedEducations();
}