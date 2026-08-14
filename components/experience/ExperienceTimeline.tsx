"use client";

import { useFormContext } from "react-hook-form";

import type { ExperienceFormData } from "@/schemas/experienceSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormCheckbox from "@/components/ui/form/FormCheckbox";

export default function ExperienceTimeline() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ExperienceFormData>();

  const currentlyWorking = watch("currentlyWorking");

  return (
    <FormSection
      title="Timeline"
      description="Specify when you started and ended this experience."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          type="date"
          label="Start Date"
          register={register("startDate")}
          error={errors.startDate}
          required
        />

        <FormInput
          type="date"
          label="End Date"
          register={register("endDate")}
          error={errors.endDate}
          disabled={currentlyWorking}
        />
      </div>

      <FormCheckbox
        label="Currently Working Here"
        description="Leave the end date empty if this is your current position."
        register={register("currentlyWorking")}
      />
    </FormSection>
  );
}