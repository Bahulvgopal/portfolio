"use client";

import { useFormContext } from "react-hook-form";

import type { EducationFormData } from "@/schemas/educationSchema";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";
import FormSelect from "@/components/ui/form/FormSelect";

export default function EducationAcademic() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EducationFormData>();

  return (
    <FormSection
      title="Academic Details"
      description="Add your grade or academic performance."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="Grade"
          placeholder="8.75"
          register={register("grade")}
          error={errors.grade}
        />

        <FormSelect
          label="Grade Type"
          register={register("gradeType")}
          error={errors.gradeType}
          options={[
            {
              label: "CGPA",
              value: "CGPA",
            },
            {
              label: "GPA",
              value: "GPA",
            },
            {
              label: "Percentage",
              value: "Percentage",
            },
          ]}
        />
      </div>
    </FormSection>
  );
}