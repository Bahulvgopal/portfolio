"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAnimeConfirm } from "@/components/ui/AnimeConfirmModal";
import { FiVideo, FiCpu, FiLayers, FiAlertCircle, FiAward, FiCheck } from "react-icons/fi";

import { WalkthroughEditor } from "@/components/projects/walkthrough";
import { ProjectSchema, type ProjectInput, cleanVideoUrl } from "@/validations/project";
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
  transition: { duration: 0.65, ease: EASE, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function getVideoEmbed(url: string) {
  if (!url) return null;
  const str = url.trim();
  const iframeMatch = str.match(/src=["']([^"']+)["']/i);
  const target = iframeMatch ? iframeMatch[1] : str;

  const ytMatch = target.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch) return { type: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };

  const vimeoMatch = target.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };

  const loomMatch = target.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/i);
  if (loomMatch) return { type: "iframe", src: `https://www.loom.com/embed/${loomMatch[1]}` };

  if (target.match(/\.(mp4|webm|ogg)$/i) || target.includes("cloudinary.com")) {
    return { type: "video", src: target };
  }

  return null;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  initialData?: Project;
}

export default function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const confirm = useAnimeConfirm();
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
      videoUrl: initialData?.videoUrl ?? "",
      github: initialData?.github ?? "",
      live: initialData?.live ?? "",
      tags: initialData?.tags ?? [],
      tech: initialData?.tech ?? [],
      features: initialData?.features ?? [],
      highlights: initialData?.highlights ?? [],
      problem: initialData?.problem ?? "",
      solution: initialData?.solution ?? "",
      challenges: initialData?.challenges ?? "",
      architecture: initialData?.architecture ?? "",
      learnings: initialData?.learnings ?? "",
      walkthrough: initialData?.walkthrough ?? [],
      featured: initialData?.featured ?? false,
      status: initialData?.status ?? "published",
    },
  });

  const tags = useWatch({ control, name: "tags" });
  const tech = useWatch({ control, name: "tech" });
  const features = useWatch({ control, name: "features" });
  const highlights = useWatch({ control, name: "highlights" });
  const videoUrlValue = useWatch({ control, name: "videoUrl" });

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
      videoUrl: initialData.videoUrl ?? "",
      github: initialData.github ?? "",
      live: initialData.live ?? "",
      tags: initialData.tags ?? [],
      tech: initialData.tech ?? [],
      features: initialData.features ?? [],
      highlights: initialData.highlights ?? [],
      problem: initialData.problem ?? "",
      solution: initialData.solution ?? "",
      challenges: initialData.challenges ?? "",
      architecture: initialData.architecture ?? "",
      learnings: initialData.learnings ?? "",
      walkthrough: initialData.walkthrough ?? [],
      featured: initialData.featured ?? false,
      status: initialData.status ?? "published",
    });
  }, [initialData, reset]);

  const router = useRouter();

  const onInvalid = (formErrors: any) => {
    console.error("Form validation errors:", formErrors);
    const errKeys = Object.keys(formErrors);
    if (errKeys.length > 0) {
      const firstField = errKeys[0];
      const message = formErrors[firstField]?.message || "Invalid input";
      toast.error(`Please fix ${firstField}: ${message}`);
    }
  };

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
        throw new Error(result.message || "Failed to save project");
      }

      toast.success(
        mode === "create"
          ? "Project deployment created successfully!"
          : "Project mission updated successfully!"
      );

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  async function handleDelete() {
    if (!initialData?._id) return;

    const confirmed = await confirm({
      title: "PURGE PROJECT MISSION",
      subtitle: "TACTICAL PURGE DECREE // 「緊急消去警告」",
      message: `Permanently delete "${initialData.title}"? All walkthrough checkpoints and media linkages will be lost.`,
      confirmText: "EXECUTE PURGE // 削除実行",
      cancelText: "ABORT // 中止",
      variant: "danger",
    });
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

  const videoPreview = getVideoEmbed(videoUrlValue || "");

  return (
    <div className="space-y-8">
      {/* Header Glass Card */}
      <motion.div
        {...reveal(0)}
        className="relative overflow-hidden rounded-[30px] sm:rounded-[34px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FF5E3A]/30 to-[#FF2A54]/25 blur-2xl z-0"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
                // PROJECT STUDIO // 「プロジェクト編集」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                {mode === "create" ? "NEW DEPLOYMENT" : "MISSION EDIT"}
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-wide">
              {mode === "create" ? "NEW MISSION DEPLOYMENT" : "UPDATE MISSION PARAMETERS"}
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              {mode === "create"
                ? "Publish a new software deployment with case study breakdown, demo videos, and technical lore."
                : `Refine architecture, telemetry, video showcase, and case study parameters for ${initialData?.title || "this project"}.`}
            </p>
          </div>

          <div className="text-stone-500 font-mono text-xs hidden sm:block tracking-widest self-start">
            · · ·
          </div>
        </div>
      </motion.div>

      <div>

        <motion.form
          {...reveal(0.08)}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
          className="space-y-6"
        >
          {/* ================================================================= */}
          {/* 1. CORE OVERVIEW                                                  */}
          {/* ================================================================= */}
          <FormSection
            title="Core Overview"
            description="The title, brief pitch, and high-level summary seen by users."
          >
            <FormInput
              label="Mission Title"
              required
              register={register("title")}
              error={errors.title}
              placeholder="e.g. Amoraweds E-Commerce Platform"
            />

            <FormInput
              label="Tagline (Punchy One-Liner)"
              register={register("tagline")}
              error={errors.tagline}
              placeholder="e.g. Modern Full-Stack Wedding Registry & Gift Logistics System"
            />

            <FormTextarea
              label="Main Description"
              rows={5}
              register={register("description")}
              error={errors.description}
              placeholder="Comprehensive summary of what the system does, who it serves, and key capabilities..."
            />
          </FormSection>

          {/* ================================================================= */}
          {/* 2. MEDIA SHOWCASE & DEMO VIDEO                                    */}
          {/* ================================================================= */}
          <FormSection
            title="Media Showcase & Interactive Video"
            description="Visual media and live video walkthroughs of the product in action."
          >
            {/* Thumbnail */}
            <FormImage
              label="Project Hero / Thumbnail Image"
              folder="projects"
              value={watch("image")}
              onChange={(image) =>
                setValue("image", image, { shouldValidate: true })
              }
              error={errors.image}
            />

            {/* Video URL Input */}
            <div className="space-y-2 mt-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-stone-200 flex items-center gap-2">
                  <FiVideo className="text-orange-500 w-4 h-4" />
                  <span>Demo Video Walkthrough URL (Optional)</span>
                </label>
                <span className="text-[11px] font-mono text-stone-400">
                  YouTube, Vimeo, Loom, or MP4
                </span>
              </div>

              <input
                {...register("videoUrl")}
                type="text"
                onBlur={(e) => {
                  register("videoUrl").onBlur(e);
                  const cleaned = cleanVideoUrl(e.target.value);
                  if (cleaned !== e.target.value) {
                    setValue("videoUrl", cleaned, { shouldValidate: true, shouldDirty: true });
                  }
                }}
                placeholder="https://www.youtube.com/watch?v=... or https://www.loom.com/share/..."
                className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              />
              {errors.videoUrl && (
                <p className="text-xs text-red-400 mt-1">{errors.videoUrl.message}</p>
              )}

              {/* Video Live Preview */}
              {videoPreview && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-orange-500/30 bg-black/50 p-2 shadow-lg">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 px-2 py-1 block">
                    ✓ Video Preview Attached
                  </span>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mt-1">
                    {videoPreview.type === "iframe" ? (
                      <iframe
                        src={videoPreview.src}
                        title="Demo Video Preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video src={videoPreview.src} controls className="w-full h-full object-contain" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </FormSection>

          {/* ================================================================= */}
          {/* 3. DEEP DIVE: ARCHITECTURE & CHALLENGES                          */}
          {/* ================================================================= */}
          <FormSection
            title="System Architecture & Deep Dive Lore"
            description="The engineering hurdles, technical decisions, and architecture story."
          >
            <FormTextarea
              label="Architecture & System Design"
              rows={4}
              register={register("architecture")}
              error={errors.architecture}
              placeholder="e.g. Distributed Next.js server actions with MongoDB replicas, Tailwind styling, and Cloudinary CDN caching..."
            />

            <FormTextarea
              label="Key Challenges & Obstacles Overcome"
              rows={4}
              register={register("challenges")}
              error={errors.challenges}
              placeholder="e.g. Complex cart synchronization under high concurrency, 60 FPS mobile scroll rendering..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormTextarea
                label="The Problem"
                rows={4}
                register={register("problem")}
                error={errors.problem}
                placeholder="What limitation or pain point existed before this product?"
              />

              <FormTextarea
                label="The Solution"
                rows={4}
                register={register("solution")}
                error={errors.solution}
                placeholder="How did this application resolve the problem effectively?"
              />
            </div>

            <FormTextarea
              label="Key Learnings & Takeaways"
              rows={3}
              register={register("learnings")}
              error={errors.learnings}
              placeholder="Key technical growth, framework insights, or patterns discovered during development..."
            />
          </FormSection>

          {/* ================================================================= */}
          {/* 4. HIGHLIGHTS & KEY FEATURES                                      */}
          {/* ================================================================= */}
          <FormSection
            title="Key Highlights & Features"
            description="Punchy quantifiable achievements and bullet points."
          >
            <div>
              <ChipInput
                label="Impact Metrics & Technical Wins (Press Enter)"
                value={highlights ?? []}
                onChange={(newHighlights) =>
                  setValue("highlights", newHighlights, { shouldDirty: true })
                }
                placeholder="e.g. 99.9% Uptime, Sub-80ms API response, 10k+ Monthly Users..."
              />
              <p className="mt-2 text-xs text-stone-400">
                Quantifiable metrics that highlight project performance and reliability.
              </p>
            </div>

            <div className="mt-5">
              <ChipInput
                label="Key Features & Capabilities (Press Enter)"
                value={features ?? []}
                onChange={(newFeatures) =>
                  setValue("features", newFeatures, { shouldDirty: true })
                }
                placeholder="e.g. Real-Time Sync, Stripe Checkout, Responsive Dark Mode..."
              />
            </div>
          </FormSection>

          {/* ================================================================= */}
          {/* 5. METADATA & TELEMETRY SPECS                                     */}
          {/* ================================================================= */}
          <FormSection
            title="Telemetry Specifications"
            description="Role, duration, category, and catalog classification."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <FormInput
                label="Your Role"
                register={register("role")}
                error={errors.role}
                placeholder="Lead Full-Stack Developer"
              />

              <FormInput
                label="Duration"
                register={register("duration")}
                error={errors.duration}
                placeholder="e.g. 3 Months"
              />

              <FormInput
                label="Year of Build"
                register={register("year")}
                error={errors.year}
                placeholder="2024"
              />

              <FormInput
                type="number"
                label="Display Order (Sort weight)"
                register={register("order", { valueAsNumber: true })}
                error={errors.order}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 mt-5">
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

          {/* ================================================================= */}
          {/* 6. TECHNOLOGY & TAGS                                              */}
          {/* ================================================================= */}
          <FormSection
            title="Tech Stack & Search Tags"
            description="Technologies power public project filter chips; tags power search."
          >
            <ChipInput
              label="Tech Stack (Chips)"
              value={tech ?? []}
              onChange={(newTech) =>
                setValue("tech", newTech, { shouldDirty: true })
              }
              placeholder="Next.js, MongoDB, Tailwind, TypeScript..."
            />

            <div className="mt-5">
              <ChipInput
                label="Search Tags & Keywords"
                value={tags ?? []}
                onChange={(newTags) =>
                  setValue("tags", newTags, { shouldDirty: true })
                }
                placeholder="e-commerce, fullstack, portfolio, saas..."
              />
            </div>
          </FormSection>

          {/* ================================================================= */}
          {/* 7. WALKTHROUGH BUILD STEPS                                        */}
          {/* ================================================================= */}
          <FormSection
            title="Step-by-Step Build Walkthrough"
            description="Chronological milestones and device screenshots."
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

          {/* ================================================================= */}
          {/* 8. EXTERNAL REPO & LIVE DEPLOYMENT                                 */}
          {/* ================================================================= */}
          <FormSection
            title="External Deployments & Links"
            description="Where visitors can view the live app or repository."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <FormInput
                label="GitHub Source URL"
                register={register("github")}
                error={errors.github}
                placeholder="https://github.com/Bahulvgopal/..."
              />

              <FormInput
                label="Live Demo URL"
                register={register("live")}
                error={errors.live}
                placeholder="https://project.vercel.app"
              />
            </div>
          </FormSection>

          {/* ================================================================= */}
          {/* 9. PUBLISHING & VISIBILITY                                        */}
          {/* ================================================================= */}
          <FormSection
            title="Publishing Status"
            description="Control homepage showcase and visibility state."
          >
            <FormCheckbox
              label="Featured Project (★ S-Rank)"
              description="Display prominently on the homepage mission showcase."
              register={register("featured")}
            />

            <FormSelect
              label="Visibility Status"
              register={register("status")}
              error={errors.status}
              options={[
                { label: "Published (Live to public)", value: "published" },
                { label: "Draft (Hidden from public)", value: "draft" },
              ]}
            />
          </FormSection>

          {/* Actions Bar */}
          <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
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
