"use client";

import { useFormContext } from "react-hook-form";

import type { ExperienceFormData } from "@/schemas/experienceSchema";

import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormSection from "@/components/ui/form/FormSection";

export default function ExperiencePublishing() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ExperienceFormData>();

  return (
    <FormSection
      title="Publishing"
      description="Control the display order and visibility of this experience."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          type="number"
          label="Display Order"
          register={register("order", {
            valueAsNumber: true,
          })}
          error={errors.order}
          placeholder="0"
        />

        <FormSelect
          label="Status"
          register={register("status")}
          error={errors.status}
          options={[
            {
              label: "Published",
              value: "published",
            },
            {
              label: "Draft",
              value: "draft",
            },
          ]}
        />
      </div>
    </FormSection>
  );
}