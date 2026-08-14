"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import FormSection from "@/components/ui/form/FormSection";
import DynamicList from "@/components/ui/DynamicList";

import type { ExperienceFormData } from "@/schemas/experienceSchema";

export default function ExperienceLists() {
  const { control, register } =
    useFormContext<ExperienceFormData>();

  const responsibilities = useFieldArray({
    control,
    name: "responsibilities",
  });

  const skills = useFieldArray({
    control,
    name: "skills",
  });

  const achievements = useFieldArray({
    control,
    name: "achievements",
  });

  return (
    <>
      <FormSection
        title="Responsibilities"
        description="List your primary responsibilities."
      >
        <DynamicList
          label="Responsibilities"
          placeholder="Managed a team of developers..."
          fields={responsibilities.fields}
          register={register}
          append={responsibilities.append}
          remove={responsibilities.remove}
          name="responsibilities"
        />
      </FormSection>

      <FormSection
        title="Skills"
        description="Technologies and skills used."
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

      <FormSection
        title="Achievements"
        description="Highlight your achievements."
      >
        <DynamicList
          label="Achievements"
          placeholder="Improved application performance by 40%"
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