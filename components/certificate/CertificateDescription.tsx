"use client";

import { useFormContext } from "react-hook-form";

import type { CertificateFormData } from "@/schemas/certificateSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormTextarea from "@/components/ui/form/FormTextarea";

export default function CertificateDescription() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CertificateFormData>();

  return (
    <FormSection
      title="Description"
      description="Additional information about this certificate."
    >
      <FormTextarea
        label="Description"
        placeholder="Describe what you learned or achieved..."
        register={register("description")}
        error={errors.description}
      />
    </FormSection>
  );
}