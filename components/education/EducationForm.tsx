"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { educationSchema, type EducationFormData } from "@/schemas/educationSchema";
import type { Education } from "@/types/education";

import EducationBasic from "./EducationBasic";
import EducationTimeline from "./EducationTimeline";
import EducationAcademic from "./EducationAcademic";
import EducationDescription from "./EducationDescription";
import EducationLists from "./EducationLists";
import EducationPublishing from "./EducationPublishing";

import FormActions from "@/components/ui/form/FormActions";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface Props {
  mode: "create" | "edit";
  initialData?: Education;
}

function formatDate(date?: string | Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function EducationForm({ mode, initialData }: Props) {
  const router = useRouter();

  const methods = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: initialData?.institution ?? "",
      degree: initialData?.degree ?? "",
      fieldOfStudy: initialData?.fieldOfStudy ?? "",
      location: initialData?.location ?? "",
      startDate: formatDate(initialData?.startDate),
      endDate: formatDate(initialData?.endDate),
      currentlyStudying: initialData?.currentlyStudying ?? true,
      grade: initialData?.grade ?? "",
      gradeType: initialData?.gradeType ?? "CGPA",
      logo: initialData?.logo,
      description: initialData?.description ?? "",
      coursework: initialData?.coursework?.map((item) => ({ value: item })) ?? [],
      achievements: initialData?.achievements?.map((item) => ({ value: item })) ?? [],
      website: initialData?.website ?? "",
      order: initialData?.order ?? 0,
      status: initialData?.status ?? "published",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (watch("currentlyStudying")) {
      setValue("endDate", "");
    }
  }, [watch("currentlyStudying"), setValue]);

  async function onSubmit(data: EducationFormData) {
    try {
      const isEditing = mode === "edit" && initialData;

      const endpoint = isEditing
        ? `/api/education/${initialData._id}`
        : "/api/education";

      const method = isEditing ? "PATCH" : "POST";

      const payload = {
        ...data,
        coursework: data.coursework.map((item) => item.value),
        achievements: data.achievements.map((item) => item.value),
      };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "Education created successfully."
          : "Education updated successfully."
      );

      router.push("/admin/education");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  async function handleDelete() {
    if (!initialData?._id) return;
    if (!confirm("Delete this education?")) return;

    try {
      const response = await fetch(`/api/education/${initialData._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Education deleted successfully.");
      router.push("/admin/education");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0b] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* glow blobs — smaller on mobile so they never force horizontal scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-[240px] w-[240px] rounded-full bg-blue-600/[0.08] blur-[100px] sm:-top-32 sm:-right-32 sm:h-[420px] sm:w-[420px] sm:blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-violet-600/[0.06] blur-[90px] sm:h-[340px] sm:w-[340px] sm:blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div {...reveal(0)} className="mb-6 sm:mb-8">
          <h1
            className="text-[clamp(1.6rem,6vw,2.4rem)] font-black tracking-tight text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {mode === "create" ? (
              <>
                Add{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Education
                </span>
              </>
            ) : (
              <>
                Edit{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Education
                </span>
              </>
            )}
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            {mode === "create"
              ? "Add a new academic entry to your profile."
              : "Update the details of this academic entry."}
          </p>
        </motion.div>

        <FormProvider {...methods}>
          <motion.form
            {...reveal(0.08)}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            <EducationBasic />
            <EducationTimeline />
            <EducationAcademic />
            <EducationDescription />
            <EducationLists />
            <EducationPublishing />

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6">
              <FormActions
                mode={mode}
                entity="Education"
                isSubmitting={isSubmitting}
                onDelete={mode === "edit" ? handleDelete : undefined}
              />
            </div>
          </motion.form>
        </FormProvider>
      </div>
    </div>
  );
}