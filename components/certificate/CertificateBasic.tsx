"use client";

import { useFormContext } from "react-hook-form";

import type { CertificateFormData } from "@/schemas/certificateSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormImage from "@/components/ui/form/FormImage";

export default function CertificateBasic() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CertificateFormData>();

  return (
    <FormSection
      title="Basic Information"
      description="Basic details about the certificate."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="Certificate Title"
          placeholder="Google UX Design Professional Certificate"
          register={register("title")}
          error={errors.title}
        />

        <FormInput
          label="Issuer"
          placeholder="Google"
          register={register("issuer")}
          error={errors.issuer}
        />
      </div>

      <FormImage
  label="Certificate Logo"
  folder="certificates"
  value={watch("logo")}
  onChange={(value) => setValue("logo", value ?? undefined)}
  error={errors.logo}
/>
    </FormSection>
  );
}