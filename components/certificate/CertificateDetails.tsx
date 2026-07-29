"use client";

import { useFormContext } from "react-hook-form";

import type { CertificateFormData } from "@/schemas/certificateSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormCheckbox from "@/components/ui/form/FormCheckbox";

export default function CertificateDetails() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CertificateFormData>();

  const doesNotExpire = watch("doesNotExpire");

  return (
    <FormSection
      title="Certificate Details"
      description="Certificate validity and credentials."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          type="date"
          label="Issue Date"
          register={register("issueDate")}
          error={errors.issueDate}
        />

        <FormInput
          type="date"
          label="Expiry Date"
          register={register("expiryDate")}
          disabled={doesNotExpire}
          error={errors.expiryDate}
        />

        <FormInput
          label="Credential ID"
          placeholder="ABC-12345"
          register={register("credentialId")}
          error={errors.credentialId}
        />

        <FormInput
          label="Credential URL"
          placeholder="https://..."
          register={register("credentialUrl")}
          error={errors.credentialUrl}
        />
      </div>

      <FormCheckbox
        label="This certificate does not expire"
        register={register("doesNotExpire")}
      />
    </FormSection>
  );
}