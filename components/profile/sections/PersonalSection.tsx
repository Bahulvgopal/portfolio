"use client";

import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormTextarea from "@/components/ui/form/FormTextarea";
import FormSection from "@/components/ui/form/FormSection";
import FormImage from "@/components/ui/form/FormImage";

import { ProfileFormData } from "@/schemas/profileSchema";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function PersonalSection({
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
      title="Personal Information"
      description="Manage your basic profile details."
    >
      <FormImage
        label="Profile Image"
        folder="portfolio/profile"
        value={watch("profileImage") ?? null}
        onChange={(image) =>
          setValue("profileImage", image as any)
        }
      />

      <FormInput
        label="Full Name"
        register={register("fullName")}
        error={errors.fullName}
        placeholder="Bahul V Gopal"
        required
      />

      <FormInput
        label="Professional Title"
        register={register("title")}
        error={errors.title}
        placeholder="Full Stack Developer"
        required
      />

      <FormTextarea
        label="Short Bio"
        register={register("shortBio")}
        error={errors.shortBio}
        placeholder="Write a short introduction..."
      />

      <FormTextarea
        label="About Me"
        register={register("about")}
        error={errors.about}
        placeholder="Tell visitors more about yourself..."
      />
    </FormSection>
  );
}