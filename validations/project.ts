import { z } from "zod";

export function cleanVideoUrl(val: unknown): string {
  if (!val || typeof val !== "string") return "";
  let str = val.trim();
  if (!str) return "";

  // Check if user pasted an <iframe> embed snippet
  const iframeMatch = str.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    str = iframeMatch[1].trim();
  }

  // Prepend https:// if protocol is missing
  if (!/^https?:\/\//i.test(str)) {
    if (/^(www\.|youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com|loom\.com)/i.test(str)) {
      str = `https://${str}`;
    }
  }

  return str;
}

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

  tagline: z
    .string()
    .trim()
    .max(140, "Tagline cannot exceed 140 characters")
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

  image: CloudinaryImageSchema.nullable().optional(),

  videoUrl: z
    .string()
    .transform((val) => cleanVideoUrl(val))
    .refine(
      (val) => {
        if (!val || val === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Please provide a valid URL (e.g. https://www.youtube.com/watch?v=...)" }
    )
    .optional()
    .or(z.literal("")),

  github: z
    .string()
    .trim()
    .transform((val) => {
      if (!val) return "";
      let s = val.trim();
      if (!/^https?:\/\//i.test(s) && (s.startsWith("github.com") || s.startsWith("www.github.com"))) {
        s = `https://${s}`;
      }
      return s;
    })
    .refine(
      (val) => {
        if (!val || val === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid GitHub URL" }
    )
    .optional()
    .or(z.literal("")),

  live: z
    .string()
    .trim()
    .transform((val) => {
      if (!val) return "";
      let s = val.trim();
      if (!/^https?:\/\//i.test(s) && (s.startsWith("www.") || (s.includes(".") && !s.includes(" ")))) {
        s = `https://${s}`;
      }
      return s;
    })
    .refine(
      (val) => {
        if (!val || val === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid Live URL" }
    )
    .optional()
    .or(z.literal("")),

  tags: z.array(z.string()).default([]),

  tech: z.array(z.string()).default([]),

  features: z.array(z.string()).default([]),

  highlights: z.array(z.string()).default([]),

  problem: z.string().default(""),

  solution: z.string().default(""),

  challenges: z.string().default(""),

  architecture: z.string().default(""),

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
