import { connectDB } from "@/lib/db";

import SkillRepository from "@/repositories/SkillRepository";
import EducationRepository from "@/repositories/EducationRepository";
import ExperienceRepository from "@/repositories/ExperienceRepository";
import ProjectRepository from "@/repositories/ProjectRepository";

import AboutClient from "@/components/about/AboutClient";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  await connectDB();

  const [
    skills,
    education,
    experiences,
    projects,
  ] = await Promise.all([
    SkillRepository.getPublishedSkills(),
    EducationRepository.getPublishedEducation(),
    ExperienceRepository.getPublishedExperiences(),
    ProjectRepository.getPublishedProjects(),
  ]);

  return (
    <AboutClient
      skills={skills}
      education={education}
      experiences={experiences}
      projectCount={projects.length}
    />
  );
}