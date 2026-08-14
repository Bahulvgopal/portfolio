"use client";

import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";

import { ProfileFormData } from "@/schemas/profileSchema";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function ContactSection({
  form,
}: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormSection
      title="Contact"
      description="Contact details."
    >
      <FormInput
        label="Email"
        register={register("email")}
        error={errors.email}
      />

      <FormInput
        label="Phone"
        register={register("phone")}
        error={errors.phone}
      />

      <FormInput
        label="Location"
        register={register("location")}
        error={errors.location}
      />
    </FormSection>
  );
}