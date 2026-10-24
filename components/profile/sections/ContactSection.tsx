"use client";

import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";

import { ProfileFormData } from "@/schemas/profileSchema";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function ContactSection({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormSection
      title="Contact"
      description="Direct contact details used across your public profile."
    >
      <FormInput
        label="Email Address"
        register={register("email")}
        error={errors.email}
        placeholder="bahulvgopal@gmail.com"
        required
      />
    </FormSection>
  );
}
