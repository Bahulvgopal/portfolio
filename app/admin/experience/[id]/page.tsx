import { notFound } from "next/navigation";

import ExperienceForm from "@/components/experience/ExperienceForm";
import { connectDB } from "@/lib/db"; // Use your actual DB file
import ExperienceService from "@/services/ExperienceService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditExperiencePage({
  params,
}: PageProps) {
  await connectDB();

  const { id } = await params;

 const experience =
  await ExperienceService.getExperience(id);

if (!experience) {
  notFound();
}

return (
  <ExperienceForm
    mode="edit"
    initialData={experience}
  />
);
}