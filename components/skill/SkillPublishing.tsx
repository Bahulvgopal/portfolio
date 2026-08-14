"use client";

import { useFormContext } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormSection from "@/components/ui/form/FormSection";

import type { SkillFormData } from "@/schemas/skillSchema";

export default function SkillPublishing() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SkillFormData>();

  return (
    <FormSection
      title="Publishing"
      description="Control how this skill appears."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          type="number"
          label="Display Order"
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