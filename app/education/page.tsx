import { getEducation } from "@/lib/api/education";
import EducationPage from "@/components/EducationPage";
export const dynamic = "force-dynamic";
export default async function Page() {
  const education = await getEducation();

  return (
    <EducationPage education={education} />
  );
}