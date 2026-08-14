"use client";

import {
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";

import FormInput from "@/components/ui/form/FormInput";
import FormSection from "@/components/ui/form/FormSection";
import DynamicList from "@/components/ui/DynamicList";

import { ProfileFormData } from "@/schemas/profileSchema";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function HeroSection({
  form,
}: Props) {
  const { register, control } = form;

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "hero.typingWords",
  });

  return (
    <FormSection
      title="Hero Section"
      description="Content displayed on the homepage hero."
    >
      <FormInput
        label="Hero Heading"
        register={register("hero.heading")}
        placeholder="Hi, I'm Bahul 👋"
      />

      <FormInput
        label="Hero Subtitle"
        register={register("hero.subtitle")}
        placeholder="I build modern web applications."
      />

      <DynamicList
        label="Typing Words"
        placeholder="Full Stack Developer"
        fields={fields}
        register={register}
        append={append}
        remove={remove}
        name="hero.typingWords"
      />
    </FormSection>
  );
}