import { z } from "zod";

const CloudinaryImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
});

const WalkthroughStepSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2)
    .max(100),

  description: z
    .string()
    .trim()
    .min(10)
    .max(500),

  image: CloudinaryImageSchema.nullable().optional(),

  device: z
    .enum(["desktop", "tablet", "mobile"])
    .default("desktop"),

  order: z.number().default(0),
});

export const ProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  slug: z.string().optional(),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),

  // ================= NEW FIELDS =================

  tagline: z
    .string()
    .trim()
    .max(120, "Tagline cannot exceed 120 characters")
    .default(""),

  role: z
    .string()
    .trim()
    .max(100)
    .default(""),

  duration: z
    .string()
    .trim()
    .max(50)
    .default(""),

  year: z
    .string()
    .trim()
    .max(10)
    .default(""),

  category: z
    .enum([
      "Web",
      "Mobile",
      "AI/ML",
      "Desktop",
      "Open Source",
      "Other",
    ])
    .default("Web"),

  projectType: z
    .enum(["Individual", "Team"])
    .default("Individual"),

  order: z
    .number()
    .default(0),

  // ================= EXISTING =================

  image: CloudinaryImageSchema.nullable().optional(),

  github: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  live: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  tags: z.array(z.string()).default([]),

  tech: z.array(z.string()).default([]),

  features: z.array(z.string()).default([]),

  problem: z.string().default(""),

  solution: z.string().default(""),

  learnings: z.string().default(""),

  walkthrough: z
    .array(WalkthroughStepSchema)
    .default([]),

  featured: z.boolean().default(false),

  status: z
    .enum(["draft", "published"])
    .default("draft"),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
export type CreateProjectDTO = ProjectInput;
export type UpdateProjectDTO = Partial<ProjectInput>;