import { z } from "zod";

const employmentTypes = [
  "full-time",
  "part-time",
  "internship",
  "freelance",
  "contract",
  "leadership",
  "volunteer",
] as const;

const statusTypes = [
  "draft",
  "published",
] as const;

/* ================= Base Schema ================= */

export const experienceBaseSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company/Organization is required.")
    .max(100),

  role: z
    .string()
    .trim()
    .min(2, "Role is required.")
    .max(100),

  employmentType: z.enum(employmentTypes),

  location: z.string().optional(),

  startDate: z.string().min(1, "Start date is required."),

  endDate: z.string().optional(),

  currentlyWorking: z.boolean(),

  logo: z
    .object({
      url: z.string(),
      publicId: z.string(),
    })
    .nullable()
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description is too short.")
    .max(1000),

  responsibilities: z.array(
  z.object({
    value: z.string(),
  })
),

skills: z.array(
  z.object({
    value: z.string(),
  })
),


  achievements: z
  .array(
    z.object({
      value: z.string(),
    })
  )
  .default([]),

  website: z
    .string()
    .url("Invalid website URL.")
    .optional()
    .or(z.literal("")),

  order: z.number().min(0),

  status: z.enum(statusTypes),
});

/* ================= Create Schema ================= */

export const experienceSchema =
  experienceBaseSchema.refine(
    (data) =>
      data.currentlyWorking || !!data.endDate,
    {
      path: ["endDate"],
      message:
        "End date is required unless currently working.",
    }
  );

/* ================= Update Schema ================= */

export const updateExperienceSchema =
  experienceBaseSchema.partial();

export type ExperienceFormData = z.infer<
  typeof experienceSchema
>;