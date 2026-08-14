import Settings from "@/models/Settings";
import { connectDB } from "@/lib/db";
import { SettingsFormData } from "@/schemas/settingsSchema";

class SettingsRepository {
  async getSettings() {
    await connectDB();

    return await Settings.findOne();
  }

  async updateSettings(data: SettingsFormData) {
    await connectDB();

    return await Settings.findOneAndUpdate(
      {},
      data,
      {
        new: true,
        upsert: true,
      }
    );
  }
}

export default new SettingsRepository();