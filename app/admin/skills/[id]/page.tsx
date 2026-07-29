import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db"; // or "@/lib/mongodb", whichever your project uses
import SkillForm from "@/components/skill/SkillForm";
import SkillService from "@/services/SkillService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSkillPage({
  params,
}: Props) {
  await connectDB(); // <-- This is the missing piece

  const { id } = await params;



    const skill = await SkillService.getSkill(id);

console.log("Skill from service:", JSON.stringify(skill, null, 2));

  if (!skill) {
    notFound();
  }

  return (
    <SkillForm
      mode="edit"
      initialData={JSON.parse(JSON.stringify(skill))}
    />
  );
}