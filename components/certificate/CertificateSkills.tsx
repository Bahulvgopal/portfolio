"use client";

import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import type { CertificateFormData } from "@/schemas/certificateSchema";

import FormSection from "@/components/ui/form/FormSection";
import DynamicList from "@/components/ui/DynamicList";

export default function CertificateSkills() {
  const { control, register } =
    useFormContext<CertificateFormData>();

  const skills = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <FormSection
      title="Skills"
      description="Skills gained from this certificate."
    >
      <DynamicList
        label="Skills"
        placeholder="React"
        fields={skills.fields}
        register={register}
        append={skills.append}
        remove={skills.remove}
        name="skills"
      />
    </FormSection>
  );
}