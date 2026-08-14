"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  skillSchema,
  type SkillFormData,
} from "@/schemas/skillSchema";

import type { Skill } from "@/types/skill";

import SkillBasic from "./SkillBasic";
import SkillPublishing from "./SkillPublishing";

import FormActions from "@/components/ui/form/FormActions";

interface Props {
  mode: "create" | "edit";
  initialData?: Skill;
}

export default function SkillForm({
  mode,
  initialData,
}: Props) {
  const router = useRouter();

  const methods = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),

    defaultValues: {
      name: initialData?.name ?? "",
      category: initialData?.category ?? "Frontend",
      level: initialData?.level ?? 80,
      icon: initialData?.icon,
      order: initialData?.order ?? 0,
      status: initialData?.status ?? "published",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(data: SkillFormData) {
    try {
      const endpoint =
        mode === "create"
          ? "/api/skills"
          : `/api/skills/${initialData!._id}`;

      const response = await fetch(endpoint, {
        method:
          mode === "create"
            ? "POST"
            : "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "Skill created."
          : "Skill updated."
      );

      router.push("/admin/skills");
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

    if (!confirm("Delete this skill?")) return;

    try {
      const response = await fetch(
        `/api/skills/${initialData._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Skill deleted.");

      router.push("/admin/skills");
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
        <SkillBasic />

        <SkillPublishing />

        <FormActions
          mode={mode}
          entity="Skill"
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