import { z } from "zod";

export const certificateApiSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),

  credentialId: z.string().optional(),

  credentialUrl: z
    .string()
    .url()
    .or(z.literal(""))
    .optional(),

  issueDate: z.string(),

  expiryDate: z.string().optional(),

  doesNotExpire: z.boolean(),

  description: z.string().optional(),

  skills: z.array(z.string()),

  logo: z.object({
    url: z.string(),
    publicId: z.string(),
  }).optional(),

  order: z.number(),

  status: z.enum(["published", "draft"]),
});

export const updateCertificateApiSchema =
  certificateApiSchema.partial();

export type CertificateApiData =
  z.infer<typeof certificateApiSchema>;

export type UpdateCertificateApiData =
  z.infer<typeof updateCertificateApiSchema>;