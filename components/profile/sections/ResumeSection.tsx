"use client";

import { UseFormReturn } from "react-hook-form";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormImage from "@/components/ui/form/FormImage";

import { ProfileFormData } from "@/schemas/profileSchema";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function ResumeSection({
  form,
}: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <FormSection
      title="Resume"
      description="Upload your latest resume."
    >
      <FormImage
        label="Resume"
        folder="portfolio/resume"
        value={watch("resume") as any}
        onChange={(file) =>
          setValue("resume", file as any)
        }
      />

      <FormInput
        label="Button Text"
        register={register("resume.buttonText")}
        error={errors.resume?.buttonText}
        placeholder="Download Resume"
      />
    </FormSection>
  );
}