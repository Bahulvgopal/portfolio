"use client";

import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";

import { SettingsFormData } from "@/schemas/settingsSchema";

interface Props {
  form: UseFormReturn<SettingsFormData>;
}

export default function AnalyticsSection({
  form,
}: Props) {
  const { register } = form;

  return (
    <FormSection
      title="Analytics"
      description="Tracking & analytics"
    >
      <FormInput
        label="Google Analytics ID"
        register={register(
          "analytics.googleAnalyticsId"
        )}
      />

      <FormInput
        label="Google Tag Manager ID"
        register={register(
          "analytics.googleTagManagerId"
        )}
      />

      <FormInput
        label="Search Console Verification"
        register={register(
          "analytics.googleSearchConsole"
        )}
      />
    </FormSection>
  );
}