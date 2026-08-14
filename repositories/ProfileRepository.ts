import ProfileModel, { IProfile } from "@/models/Profile";
import { BaseRepository } from "./BaseRepository";
import type { Profile as ProfileType } from "@/types/profile";

class ProfileRepository extends BaseRepository<IProfile> {
  constructor() {
    super(ProfileModel);
  }

  async getProfile(): Promise<ProfileType | null> {
  const profile = await this.model.findOne().lean();

  if (!profile) {
    return null;
  }

  return {
  ...profile,
  _id: profile._id.toString(),
};
}

  async updateProfile(data: Partial<IProfile>) {
    return this.model.findOneAndUpdate(
      {},
      data,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
  }
}

export default new ProfileRepository();