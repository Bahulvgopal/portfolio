"use client";

import { useFormContext } from "react-hook-form";

import type { EducationFormData } from "@/schemas/educationSchema";

import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormImage from "@/components/ui/form/FormImage";

export default function EducationBasic() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EducationFormData>();

  return (
    <FormSection
      title="Institution Information"
      description="Basic information about your education."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormInput
          label="Institution"
          required
          placeholder="University College of Engineering Kariavattom"
          register={register("institution")}
          error={errors.institution}
        />

        <FormInput
          label="Degree"
          required
          placeholder="Bachelor of Technology"
          register={register("degree")}
          error={errors.degree}
        />

        <FormInput
          label="Field of Study"
          required
          placeholder="Computer Science and Engineering"
          register={register("fieldOfStudy")}
          error={errors.fieldOfStudy}
        />

        <FormInput
          label="Location"
          placeholder="Thiruvananthapuram, Kerala"
          register={register("location")}
          error={errors.location}
        />

        <div className="md:col-span-2">
          <FormInput
            type="url"
            label="Institution Website"
            placeholder="https://www.example.edu"
            register={register("website")}
            error={errors.website}
          />
        </div>

        <div className="md:col-span-2">
          <FormImage
            label="Institution Logo"
            description="Upload your institution logo (optional)."
            folder="education"
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