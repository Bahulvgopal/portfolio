import { z } from "zod";

export const ProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  shortDescription: z
    .string()
    .trim()
    .min(10)
    .max(250),

  description: z
    .string()
    .trim()
    .min(20),

  technologies: z
    .array(z.string())
    .default([]),

  thumbnail: z
  .object({
    url: z.string().url(),
    publicId: z.string(),
  })
  .nullable(),

  images: z
    .array(z.string().url())
    .default([]),

  githubUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  featured: z
    .boolean()
    .default(false),

  status: z.enum(["draft", "published"]),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;