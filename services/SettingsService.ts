import SettingsRepository from "@/repositories/SettingsRepository";
import { SettingsFormData } from "@/schemas/settingsSchema";

class SettingsService {
  async getSettings() {
    return SettingsRepository.getSettings();
  }

  async updateSettings(data: SettingsFormData) {
    return SettingsRepository.updateSettings(data);
  }
}

export default new SettingsService();