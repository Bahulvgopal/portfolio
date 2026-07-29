"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { WalkthroughEditor } from "@/components/projects/walkthrough";
import { ProjectSchema, type ProjectInput } from "@/validations/project";
import type { Project } from "@/types/project";

import ChipInput from "@/components/ui/form/ChipInput";
import FormSection from "@/components/ui/form/FormSection";
import FormInput from "@/components/ui/form/FormInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormTextarea from "@/components/ui/form/FormTextarea";
import FormImage from "@/components/ui/form/FormImage";
import FormCheckbox from "@/components/ui/form/FormCheckbox";
import FormActions from "@/components/ui/form/FormActions";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface ProjectFormProps {
  mode: "create" | "edit";
  initialData?: Project;
}

export default function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectInput>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      tagline: initialData?.tagline ?? "",
      role: initialData?.role ?? "",
      duration: initialData?.duration ?? "",
      year: initialData?.year ?? "",
      category: initialData?.category ?? "Web",
      projectType: initialData?.projectType ?? "Individual",
      order: initialData?.order ?? 0,
      image: initialData?.image ?? null,
      github: initialData?.github ?? "",
      live: initialData?.live ?? "",
      tags: initialData?.tags ?? [],
      tech: initialData?.tech ?? [],
      features: initialData?.features ?? [],
      problem: initialData?.problem ?? "",
      solution: initialData?.solution ?? "",
      learnings: initialData?.learnings ?? "",
      walkthrough: initialData?.walkthrough ?? [],
      featured: initialData?.featured ?? false,
      status: initialData?.status ?? "draft",
    },
  });

  const tags = useWatch({ control, name: "tags" });

  useEffect(() => {
    if (!initialData) return;

    reset({
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      tagline: initialData.tagline ?? "",
      role: initialData.role ?? "",
      duration: initialData.duration ?? "",
      year: initialData.year ?? "",
      category: initialData.category ?? "Web",
      projectType: initialData.projectType ?? "Individual",
      order: initialData.order ?? 0,
      image: initialData.image ?? null,
      github: initialData.github ?? "",
      live: initialData.live ?? "",
      tags: initialData?.tags ?? [],
      tech: initialData.tech ?? [],
      features: initialData.features ?? [],
      problem: initialData.problem ?? "",
      solution: initialData.solution ?? "",
      learnings: initialData.learnings ?? "",
      walkthrough: initialData.walkthrough ?? [],
      featured: initialData.featured ?? false,
      status: initialData.status ?? "draft",
    });
  }, [initialData, reset]);

  const router = useRouter();

  async function onSubmit(data: ProjectInput) {
    try {
      const endpoint =
        mode === "create" ? "/api/projects" : `/api/projects/${initialData!._id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to create project");
      }

      toast.success(
        mode === "create"
          ? "Project created successfully!"
          : "Project updated successfully!"
      );

      router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  async function handleDelete() {
    if (!initialData?._id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/projects/${initialData._id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete project");
      }

      toast.success("Project deleted successfully!");
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
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
                  Project
                </span>
              </>
            ) : (
              <>
                Edit{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Project
                </span>
              </>
            )}
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            {mode === "create"
              ? "Add a new project to your portfolio."
              : "Update the details of this project."}
          </p>
        </motion.div>

        <motion.form
          {...reveal(0.08)}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 sm:space-y-6"
        >
          <FormSection
            title="Overview"
            description="The core details visitors see first."
          >
            <FormInput
              label="Title"
              required
              register={register("title")}
              error={errors.title}
              placeholder="Portfolio Website"
            />

            <FormInput
              label="Tagline"
              register={register("tagline")}
              error={errors.tagline}
              placeholder="One-line summary of the project"
            />

            <FormTextarea
              label="Description"
              rows={6}
              register={register("description")}
              error={errors.description}
            />
          </FormSection>

          <FormSection
            title="Details"
            description="Role, timeline, and classification."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <FormInput
                label="Role"
                register={register("role")}
                error={errors.role}
                placeholder="Full Stack Developer"
              />

              <FormInput
                label="Duration"
                register={register("duration")}
                error={errors.duration}
                placeholder="2 Months"
              />

              <FormInput
                label="Year"
                register={register("year")}
                error={errors.year}
                placeholder="2026"
              />

              <FormInput
                type="number"
                label="Display Order"
                register={register("order", { valueAsNumber: true })}
                error={errors.order}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <FormSelect
                label="Category"
                register={register("category")}
                error={errors.category}
                options={[
                  { label: "Web", value: "Web" },
                  { label: "Mobile", value: "Mobile" },
                  { label: "AI/ML", value: "AI/ML" },
                  { label: "Desktop", value: "Desktop" },
                  { label: "Open Source", value: "Open Source" },
                  { label: "Other", value: "Other" },
                ]}
              />

              <FormSelect
                label="Project Type"
                register={register("projectType")}
                error={errors.projectType}
                options={[
                  { label: "Individual", value: "Individual" },
                  { label: "Team", value: "Team" },
                ]}
              />
            </div>
          </FormSection>

          <FormSection
            title="Thumbnail"
            description="The cover image shown in project listings."
          >
            <FormImage
              label="Thumbnail"
              folder="projects"
              value={watch("image")}
              onChange={(image) =>
                setValue("image", image, { shouldValidate: true })
              }
              error={errors.image}
            />
          </FormSection>

          <FormSection
            title="Walkthrough"
            description="Step-by-step breakdown of the project build."
          >
            <div className="-mx-1 overflow-x-auto px-1">
              <WalkthroughEditor
                control={control}
                register={register}
                watch={watch}
                setValue={setValue}
              />
            </div>
          </FormSection>

          <FormSection
            title="Links"
            description="Where visitors can see the project live or view its source."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <FormInput
                label="GitHub URL"
                register={register("github")}
                error={errors.github}
                placeholder="https://github.com/username/repo"
              />

              <FormInput
                label="Live Demo URL"
                register={register("live")}
                error={errors.live}
                placeholder="https://project.vercel.app"
              />
            </div>
          </FormSection>

          <FormSection
            title="Tags"
            description="Keywords used for filtering and search."
          >
            <ChipInput
              label="Project Tags"
              value={tags ?? []}
              onChange={(newTags) =>
                setValue("tags", newTags, { shouldDirty: true })
              }
              placeholder="Type a tag and press Enter"
            />
          </FormSection>

          <FormSection
            title="Publishing"
            description="Control visibility and highlight status."
          >
            <FormCheckbox
              label="Featured Project"
              description="Show this project in the featured section."
              register={register("featured")}
            />

            <FormSelect
              label="Status"
              register={register("status")}
              error={errors.status}
              options={[
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
              ]}
            />
          </FormSection>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6">
            <FormActions
              mode={mode}
              entity="Project"
              isSubmitting={isSubmitting}
              onDelete={mode === "edit" ? handleDelete : undefined}
            />
          </div>
        </motion.form>
      </div>
    </div>
  );
}