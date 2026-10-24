"use client";

import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";

import { ProfileFormData } from "@/schemas/profileSchema";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function SocialSection({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormSection
      title="Social Networks"
      description="Direct links displayed on your floating interactive social dial."
    >
      <FormInput
        label="GitHub"
        register={register("socials.github")}
        error={errors.socials?.github}
        placeholder="https://github.com/username"
      />

      <FormInput
        label="LinkedIn"
        register={register("socials.linkedin")}
        error={errors.socials?.linkedin}
        placeholder="https://linkedin.com/in/username"
      />

      <FormInput
        label="Instagram"
        register={register("socials.instagram")}
        error={errors.socials?.instagram}
        placeholder="https://instagram.com/username"
      />

      <FormInput
        label="Twitter / X"
        register={register("socials.twitter")}
        error={errors.socials?.twitter}
        placeholder="https://x.com/username"
      />

      <FormInput
        label="YouTube"
        register={register("socials.youtube")}
        error={errors.socials?.youtube}
        placeholder="https://youtube.com/@username"
      />

      <FormInput
        label="Portfolio / Website"
        register={register("socials.portfolio")}
        error={errors.socials?.portfolio}
        placeholder="https://bahulvgopal.me"
      />
    </FormSection>
  );
}
