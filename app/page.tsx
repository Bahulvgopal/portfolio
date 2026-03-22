import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ProjectsPreview from "@/components/ProjectsPreview";
import GithubGraph from "@/components/GithubGraph";
import GithubStats from "@/components/GithubStats";
import EducationPreview from "@/components/EducationPreview";
import CertificatesPreview from "@/components/CertificatesPreview";
import ExperiencePreview from "@/components/ExperiencePreview";

export default function Home() {
  return (
    <main className="space-y-24">
      <Hero />
      <Skills />
      <ProjectsPreview />
      <ExperiencePreview /> 
      <EducationPreview />
      <CertificatesPreview />
      <GithubGraph />
      <GithubStats />
    </main>
  );
}