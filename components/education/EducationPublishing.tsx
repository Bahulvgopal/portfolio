"use client";

import { useFormContext } from "react-hook-form";

import type { EducationFormData } from "@/schemas/educationSchema";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";
import FormSelect from "@/components/ui/form/FormSelect";

export default function EducationPublishing() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EducationFormData>();

  return (
    <FormSection
      title="Publishing"
      description="Control the visibility and display order."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          type="number"
          label="Display Order"
          placeholder="0"
          register={register("order", {
            valueAsNumber: true,
          })}
          error={errors.order}
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