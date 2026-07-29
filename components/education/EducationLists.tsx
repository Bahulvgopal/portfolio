"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import type { EducationFormData } from "@/schemas/educationSchema";

import FormSection from "@/components/ui/form/FormSection";
import DynamicList from "@/components/ui/DynamicList";

export default function EducationLists() {
  const { control, register } =
    useFormContext<EducationFormData>();

  const coursework = useFieldArray({
    control,
    name: "coursework",
  });

  const achievements = useFieldArray({
    control,
    name: "achievements",
  });

  return (
    <>
      <FormSection
        title="Coursework"
        description="Subjects or courses relevant to this education."
      >
        <DynamicList
          label="Coursework"
          placeholder="Data Structures and Algorithms"
          fields={coursework.fields}
          register={register}
          append={coursework.append}
          remove={coursework.remove}
          name="coursework"
        />
      </FormSection>

      <FormSection
        title="Achievements"
        description="Academic achievements, awards, or notable accomplishments."
      >
        <DynamicList
          label="Achievements"
          placeholder="Graduated with First Class Honors"
          fields={achievements.fields}
          register={register}
          append={achievements.append}
          remove={achievements.remove}
          name="achievements"
        />
      </FormSection>
    </>
  );
}