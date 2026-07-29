"use client";

import { useFormContext } from "react-hook-form";

import type { EducationFormData } from "@/schemas/educationSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormTextarea from "@/components/ui/form/FormTextarea";

export default function EducationDescription() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EducationFormData>();

  return (
    <FormSection
      title="Description"
      description="Provide additional details about your education."
    >
      <FormTextarea
        label="Description"
        placeholder="Describe your academic journey, activities, clubs, projects, or anything worth highlighting..."
        register={register("description")}
        error={errors.description}
      />
    </FormSection>
  );
}