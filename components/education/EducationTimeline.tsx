"use client";

import { useFormContext } from "react-hook-form";

import type { EducationFormData } from "@/schemas/educationSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormCheckbox from "@/components/ui/form/FormCheckbox";

export default function EducationTimeline() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<EducationFormData>();

  const currentlyStudying = watch("currentlyStudying");

  return (
    <FormSection
      title="Academic Timeline"
      description="Specify the duration of your education."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          type="date"
          label="Start Date"
          required
          register={register("startDate")}
          error={errors.startDate}
        />

        <FormInput
          type="date"
          label="End Date"
          disabled={currentlyStudying}
          register={register("endDate")}
          error={errors.endDate}
        />
      </div>

      <FormCheckbox
        label="Currently Studying"
        description="Enable this if you're currently enrolled."
        register={register("currentlyStudying")}
      />
    </FormSection>
  );
}