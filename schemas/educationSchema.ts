import { z } from "zod";

const gradeTypes = [
  "CGPA",
  "Percentage",
  "GPA",
] as const;

const statusTypes = [
  "draft",
  "published",
] as const;

/* ================= Form Schema ================= */

export const educationBaseSchema = z.object({
  institution: z
    .string()
    .trim()
    .min(2, "Institution is required.")
    .max(150),

  degree: z
    .string()
    .trim()
    .min(2, "Degree is required.")
    .max(100),

  fieldOfStudy: z
    .string()
    .trim()
    .min(2, "Field of study is required.")
    .max(100),

  location: z.string().optional(),

  startDate: z
    .string()
    .min(1, "Start date is required."),

  endDate: z.string().optional(),

  currentlyStudying: z.boolean(),

  grade: z.string().optional(),

  gradeType: z.enum(gradeTypes).optional(),

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

  coursework: z.array(
    z.object({
      value: z.string(),
    })
  ),

  achievements: z.array(
    z.object({
      value: z.string(),
    })
  ),

  website: z
    .string()
    .url("Invalid website URL.")
    .optional()
    .or(z.literal("")),

  order: z.number().min(0),

  status: z.enum(statusTypes),
});

/* ================= Create Form Schema ================= */

export const educationSchema =
  educationBaseSchema.refine(
    (data) =>
      data.currentlyStudying || !!data.endDate,
    {
      path: ["endDate"],
      message:
        "End date is required unless currently studying.",
    }
  );

/* ================= Update Form Schema ================= */

export const updateEducationSchema =
  educationBaseSchema.partial();

/* ================= API Schema ================= */

export const educationApiSchema = z.object({
  institution: z
    .string()
    .trim()
    .min(2, "Institution is required.")
    .max(150),

  degree: z
    .string()
    .trim()
    .min(2, "Degree is required.")
    .max(100),

  fieldOfStudy: z
    .string()
    .trim()
    .min(2, "Field of study is required.")
    .max(100),

  location: z.string().optional(),

  startDate: z.string().min(1, "Start date is required."),

  endDate: z.string().optional(),

  currentlyStudying: z.boolean(),

  grade: z.string().optional(),

  gradeType: z.enum(gradeTypes).optional(),

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

  coursework: z.array(z.string()),

  achievements: z.array(z.string()),

  website: z
    .string()
    .url("Invalid website URL.")
    .optional()
    .or(z.literal("")),

  order: z.number().min(0),

  status: z.enum(statusTypes),
});

export const updateEducationApiSchema =
  educationApiSchema.partial();

/* ================= Types ================= */

export type EducationFormData = z.infer<
  typeof educationSchema
>;
export type EducationApiData = z.infer<
  typeof educationApiSchema
>;