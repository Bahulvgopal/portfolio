import { notFound } from "next/navigation";

import EducationForm from "@/components/education/EducationForm";
import EducationService from "@/services/EducationService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEducationPage({
  params,
}: Props) {
  const { id } = await params;

  const education = await EducationService.getEducation(id);

  if (!education) {
    notFound();
  }

  return (
    <EducationForm
      mode="edit"
      initialData={education}
    />
  );
}