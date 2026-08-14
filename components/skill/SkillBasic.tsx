"use client";

import { useFormContext } from "react-hook-form";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormImage from "@/components/ui/form/FormImage";
import FormSelect from "@/components/ui/form/FormSelect";

import type { SkillFormData } from "@/schemas/skillSchema";

const categories = [
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "Database", value: "Database" },
  { label: "Mobile", value: "Mobile" },
  { label: "Programming", value: "Programming" },
  { label: "AI / ML", value: "AI/ML" },
  { label: "Cloud", value: "Cloud" },
  { label: "DevOps", value: "DevOps" },
  { label: "Tools", value: "Tools" },
  { label: "Other", value: "Other" },
];

export default function SkillBasic() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SkillFormData>();

  return (
    <FormSection
      title="Skill Information"
      description="Basic information about the skill."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="Skill Name"
          placeholder="React"
          register={register("name")}
          error={errors.name}
        />

        <FormSelect
          label="Category"
          register={register("category")}
          error={errors.category}
          options={categories}
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Proficiency ({watch("level")}%)
        </label>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          {...register("level", {
            valueAsNumber: true,
          })}
          className="w-full"
        />
      </div>

      <FormImage
  label="Skill Icon"
  folder="skills"
  value={watch("icon")}
  onChange={(value) => {
    setValue("icon", value ?? undefined, {
      shouldDirty: true,
      shouldTouch: true,
    });
  }}
  error={errors.icon}
/>
    </FormSection>
  );
}