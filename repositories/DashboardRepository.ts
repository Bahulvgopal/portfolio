import { connectDB } from "@/lib/db";

import Project from "@/models/Project";
import Certificate from "@/models/Certificate";
import Education from "@/models/Education";
import Experience from "@/models/Experience";
import Skill from "@/models/Skill";

class DashboardRepository {
  async getStats() {
    await connectDB();

    const [
      projects,
      certificates,
      education,
      experience,
      skills,
    ] = await Promise.all([
      Project.countDocuments(),
      Certificate.countDocuments(),
      Education.countDocuments(),
      Experience.countDocuments(),
      Skill.countDocuments(),
    ]);

    return {
      projects,
      certificates,
      education,
      experience,
      skills,
    };
  }
}

export default new DashboardRepository();