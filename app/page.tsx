import Hero from "@/components/Hero";

import ProjectsPreview from "@/components/ProjectsPreview";
import GithubGraph from "@/components/GithubGraph";
import GithubStats from "@/components/GithubStats";
import EducationPreview from "@/components/EducationPreview";
import CertificatesPreview from "@/components/CertificatesPreview";
import ExperiencePreview from "@/components/ExperiencePreview";

export default function Home() {
  return (
    <main className="space-y-24 bg-[#0a0a0b]">
      <Hero />
      {/* <Skills /> */}
      <div className="-mt-[4rem]"><ExperiencePreview /> 
      
      <ProjectsPreview />
      <EducationPreview />
      <CertificatesPreview />
      <GithubGraph />
      <GithubStats />
      </div>
    </main>
  );
}