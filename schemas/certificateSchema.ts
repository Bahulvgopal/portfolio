import { z } from "zod";

const certificateBaseSchema = z.object({
  title: z.string().min(1, "Title is required"),

  issuer: z.string().min(1, "Issuer is required"),

  credentialId: z.string().optional(),

  credentialUrl: z
    .string()
    .url("Invalid URL")
    .or(z.literal(""))
    .optional(),

  issueDate: z.string().min(1),

  expiryDate: z.string().optional(),

  doesNotExpire: z.boolean(),

  description: z.string().optional(),

  skills: z.array(
    z.object({
      value: z.string().min(1),
    })
  ),

  logo: z
    .object({
      url: z.string(),
      publicId: z.string(),
    })
    .optional(),

  order: z.number(),

  status: z.enum([
    "published",
    "draft",
  ]),
});

export const certificateSchema =
  certificateBaseSchema;

export const updateCertificateSchema =
  certificateBaseSchema.partial();

export type CertificateFormData =
  z.infer<typeof certificateSchema>;