"use client";

import { useFormContext } from "react-hook-form";

import type { ExperienceFormData } from "@/schemas/experienceSchema";

import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormImage from "@/components/ui/form/FormImage";
import FormSection from "@/components/ui/form/FormSection";

export default function ExperienceBasic() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ExperienceFormData>();

  return (
    <FormSection
      title="Company Information"
      description="Basic information about your work experience."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="Company"
          required
          placeholder="Google"
          register={register("company")}
          error={errors.company}
        />

        <FormInput
          label="Role"
          required
          placeholder="Software Engineer"
          register={register("role")}
          error={errors.role}
        />

        <FormSelect
          label="Employment Type"
          register={register("employmentType")}
          error={errors.employmentType}
          options={[
            {
              label: "Leadership",
              value: "leadership",
            },
            {
              label: "Internship",
              value: "internship",
            },
            {
              label: "Full Time",
              value: "full-time",
            },
            {
              label: "Part Time",
              value: "part-time",
            },
            {
              label: "Freelance",
              value: "freelance",
            },
            {
              label: "Contract",
              value: "contract",
            },
            {
              label: "Volunteer",
              value: "volunteer",
            },
          ]}
        />

        <FormInput
          label="Location"
          placeholder="Trivandrum, Kerala"
          register={register("location")}
          error={errors.location}
        />

        <div className="md:col-span-2">
          <FormInput
            type="url"
            label="Website"
            placeholder="https://example.com"
            register={register("website")}
            error={errors.website}
          />
        </div>

        <div className="md:col-span-2">
          <FormImage
            label="Company Logo"
            description="Upload the company logo (optional)."
            folder="experience"
            value={watch("logo")}
            onChange={(image) =>
              setValue("logo", image, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
        </div>
      </div>
    </FormSection>
  );
}