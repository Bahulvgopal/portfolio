import { z } from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required."),

  category: z.enum([
    "Frontend",
    "Backend",
    "Database",
    "Mobile",
    "Programming",
    "AI/ML",
    "Cloud",
    "DevOps",
    "Tools",
    "Other",
  ]),

  

  icon: z
    .object({
      publicId: z.string(),
      url: z.string().url(),
    })
    .optional(),

  order: z.number(),

  status: z.enum([
    "published",
    "draft",
  ]),
});

export const updateSkillSchema =
  skillSchema.partial();

export type SkillFormData =
  z.infer<typeof skillSchema>;