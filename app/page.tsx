import Hero from "@/components/Hero";

import ProjectsPreview from "@/components/ProjectsPreview";
import GithubGraph from "@/components/GithubGraph";
import SamuraiGameSection from "@/components/game/SamuraiGameSection";
import EducationPreview from "@/components/EducationPreview";
import CertificatesPreview from "@/components/CertificatesPreview";
import ExperiencePreview from "@/components/ExperiencePreview";
import Skills from "@/components/Skills";
import SocialDial from "@/components/SocialDial";
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

  return (
    <>
      <main className="space-y-24 bg-[#FAF8F5]">
        <Hero profile={profile} />
        <div className="-mt-[4rem]">
          <Skills skills={skills} />
          <ExperiencePreview experiences={experiences} /> 
          <ProjectsPreview projects={projects} />
          <EducationPreview education={education} />
          <CertificatesPreview certificates={certificates} />
          <GithubGraph />
          <SamuraiGameSection />
        </div>
      </main>

      {/* Persistent Floating Social Dial Widget - Floats across all sections of the homepage */}
      <SocialDial profile={profile} />
    </>
  );
}
