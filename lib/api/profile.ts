import ProfileService from "@/services/ProfileService";

export async function getProfile() {
  return await ProfileService.getProfile();
}