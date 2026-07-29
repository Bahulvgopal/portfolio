"use client";

import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormTextarea from "@/components/ui/form/FormTextarea";
import FormImage from "@/components/ui/form/FormImage";
import FormSection from "@/components/ui/form/FormSection";

import { SettingsFormData } from "@/schemas/settingsSchema";

interface Props {
  form: UseFormReturn<SettingsFormData>;
}

export default function GeneralSection({
  form,
}: Props) {
  const {
    register,
    watch,
    setValue,
  } = form;

  return (
    <FormSection
      title="General"
      description="Basic website settings"
    >
      <FormInput
        label="Site Name"
        register={register("siteName")}
      />

      <FormTextarea
        label="Site Description"
        register={register("siteDescription")}
      />

      <FormInput
        label="Contact Email"
        register={register("contactEmail")}
      />

      <FormImage
        label="Logo"
        folder="settings"
        value={watch("logo")}
        onChange={(img) =>
          setValue("logo", img ?? undefined)
        }
      />

      <FormImage
        label="Favicon"
        folder="settings"
        value={watch("favicon")}
        onChange={(img) =>
          setValue(
            "favicon",
            img ?? undefined
          )
        }
      />
    </FormSection>
  );
}