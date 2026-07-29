import ExperiencePage from "@/components/ExperiencePage";
import { getExperiences } from "@/lib/api/experience";

export default async function Page() {
  const experiences = await getExperiences();

  return (
    <ExperiencePage experiences={experiences} />
  );
}