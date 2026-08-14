"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FormProvider,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  experienceSchema,
  type ExperienceFormData,
} from "@/schemas/experienceSchema";

import type { Experience } from "@/types/experience";

import ExperienceBasic from "./ExperienceBasic";
import ExperienceTimeline from "./ExperienceTimeline";
import ExperienceDescription from "./ExperienceDescription";
import ExperienceLists from "./ExperienceLists";
import ExperiencePublishing from "./ExperiencePublishing";

import FormActions from "@/components/ui/form/FormActions";

interface Props {
  mode: "create" | "edit";
  initialData?: Experience;
}

function formatDate(date?: string | Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function ExperienceForm({
  mode,
  initialData,
}: Props) {
  const router = useRouter();

  const methods = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),

    defaultValues: {
      company: initialData?.company ?? "",
      role: initialData?.role ?? "",
      employmentType:
        initialData?.employmentType ?? "leadership",
      location: initialData?.location ?? "",

      startDate: formatDate(initialData?.startDate),
      endDate: formatDate(initialData?.endDate),

      currentlyWorking:
        initialData?.currentlyWorking ?? true,

      logo: initialData?.logo,

      description: initialData?.description ?? "",

      responsibilities:
  initialData?.responsibilities?.map((item) => ({
    value: item,
  })) ?? [],

skills:
  initialData?.skills?.map((item) => ({
    value: item,
  })) ?? [],

      achievements:
  initialData?.achievements?.map((item) => ({
    value: item,
  })) ?? [],

      website: initialData?.website ?? "",

      order: initialData?.order ?? 0,

      status:
        initialData?.status ?? "published",
    },
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const currentlyWorking =
    watch("currentlyWorking");

  // const responsibilities = useFieldArray({
  //   control,
  //   name: "responsibilities",
  // });

  // const skills = useFieldArray({
  //   control,
  //   name: "skills",
  // });

  // const achievements = useFieldArray({
  //   control,
  //   name: "achievements",
  // });

  useEffect(() => {
    if (currentlyWorking) {
      setValue("endDate", "");
    }
  }, [currentlyWorking, setValue]);

  async function onSubmit(
    data: ExperienceFormData
  ) {
    try {
      const endpoint =
        mode === "create"
          ? "/api/experience"
          : `/api/experience/${initialData!._id}`;
const payload = {
  ...data,

  responsibilities: data.responsibilities.map(
    (r) => r.value
  ),

  skills: data.skills.map(
    (s) => s.value
  ),

  achievements: data.achievements.map(
    (a) => a.value
  ),
};
      const response = await fetch(endpoint, {
        method:
          mode === "create"
            ? "POST"
            : "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      });

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "Experience created successfully."
          : "Experience updated successfully."
      );

      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  async function handleDelete() {
    if (!initialData?._id) return;

    if (!confirm("Delete this experience?"))
      return;

    try {
      const response = await fetch(
        `/api/experience/${initialData._id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        "Experience deleted successfully."
      );

      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-2xl border border-slate-800 bg-slate-950 p-6"
      >
        <ExperienceBasic />

        <ExperienceTimeline />

        <ExperienceDescription />

        <ExperienceLists />

        <ExperiencePublishing />

        <FormActions
          mode={mode}
          entity="Experience"
          isSubmitting={isSubmitting}
          onDelete={
            mode === "edit"
              ? handleDelete
              : undefined
          }
        />
      </form>
    </FormProvider>
  );
}