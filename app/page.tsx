import Hero from "@/components/Hero";

import ProjectsPreview from "@/components/ProjectsPreview";
import GithubGraph from "@/components/GithubGraph";
import GithubStats from "@/components/GithubStats";
import EducationPreview from "@/components/EducationPreview";
import CertificatesPreview from "@/components/CertificatesPreview";
import ExperiencePreview from "@/components/ExperiencePreview";
import Skills from "@/components/Skills";
import { notFound } from "next/navigation";

import { getCertificates } from "@/lib/api/certificates";
import { getProfile } from "@/lib/api/profile";
import { getProjects } from "@/lib/api/projects";
import { getEducation } from "@/lib/api/education";
import { getExperiences } from "@/lib/api/experience";
import { getSkills } from "@/lib/api/skills";

export const dynamic = "force-dynamic";

export default async function Home() {

  const profile = await getProfile();

if (!profile) {
  notFound();
}
  const projects = await getProjects();
  const certificates = await getCertificates();
  const education = await getEducation();
  const experiences = await getExperiences();
  const skills = await getSkills();
console.log("Projects:", projects.length);
console.log(projects);
  return (
    <main className="space-y-24 bg-[#0a0a0b]">
      <Hero profile={profile} />
      {/* <Skills /> */}
      <div className="-mt-[4rem]">
      <Skills skills={skills} />
      <ExperiencePreview experiences={experiences} /> 
      <ProjectsPreview projects={projects} />
      <EducationPreview education={education} />
      <CertificatesPreview certificates={certificates} />
      <GithubGraph />
      <GithubStats />
      </div>
    </main>
  );
}