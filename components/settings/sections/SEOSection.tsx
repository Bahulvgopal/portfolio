"use client";

import {
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormTextarea from "@/components/ui/form/FormTextarea";
import FormSection from "@/components/ui/form/FormSection";
import DynamicList from "@/components/ui/DynamicList";

import { SettingsFormData } from "@/schemas/settingsSchema";

interface Props {
  form: UseFormReturn<SettingsFormData>;
}

export default function SEOSection({
  form,
}: Props) {
  const {
    register,
    control,
  } = form;

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "seo.keywords",
  });

  return (
    <FormSection
      title="SEO"
      description="Search engine optimization"
    >
      <FormInput
        label="Meta Title"
        register={register("seo.metaTitle")}
      />

      <FormTextarea
        label="Meta Description"
        register={register(
          "seo.metaDescription"
        )}
      />

      <DynamicList
        label="Keywords"
        placeholder="Next.js"
        fields={fields}
        register={register}
        append={append}
        remove={remove}
        name="seo.keywords"
      />
    </FormSection>
  );
}