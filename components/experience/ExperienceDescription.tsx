"use client";

import { useFormContext } from "react-hook-form";

import type { ExperienceFormData } from "@/schemas/experienceSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormTextarea from "@/components/ui/form/FormTextarea";

export default function ExperienceDescription() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ExperienceFormData>();

  return (
    <FormSection
      title="Description"
      description="Describe your role, responsibilities, and impact."
    >
      <FormTextarea
        label="Description"
        placeholder="Describe your role, responsibilities, achievements, and impact..."
        register={register("description")}
        error={errors.description}
      />
    </FormSection>
  );
}