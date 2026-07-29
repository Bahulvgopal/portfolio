"use client";

import { useFormContext } from "react-hook-form";

import type { CertificateFormData } from "@/schemas/certificateSchema";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";
import FormSelect from "@/components/ui/form/FormSelect";

export default function CertificatePublishing() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CertificateFormData>();

  return (
    <FormSection
      title="Publishing"
      description="Control display order and visibility."
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