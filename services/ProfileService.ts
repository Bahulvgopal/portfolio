import { connectDB } from "@/lib/db";
import ProfileRepository from "@/repositories/ProfileRepository";
import cloudinary from "@/lib/cloudinary";

import type { ProfileApiData } from "@/schemas/profileApiSchema";

class ProfileService {
  async getProfile() {
    await connectDB();

    return ProfileRepository.getProfile();
  }

  async updateProfile(
  data: ProfileApiData
) {
  await connectDB();

  const existing =
    await ProfileRepository.getProfile();

  if (
    existing?.profileImage?.publicId &&
    data.profileImage &&
    existing.profileImage.publicId !==
      data.profileImage.publicId
  ) {
    await cloudinary.uploader.destroy(
      existing.profileImage.publicId
    );
  }

  return ProfileRepository.updateProfile({
    ...data,
    profileImage: data.profileImage ?? undefined,
    hero: {
      ...data.hero,
      typingWords: data.hero.typingWords,
    },
  });
}
}

export default new ProfileService();