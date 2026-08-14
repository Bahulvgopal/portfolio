import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
});

export const settingsSchema = z.object({
  siteName: z
    .string()
    .min(2, "Site name is required"),

  siteDescription: z
    .string()
    .min(10, "Site description is required"),

  logo: imageSchema.optional(),

  favicon: imageSchema.optional(),

  contactEmail: z
    .string()
    .email("Invalid email address"),

  seo: z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),

  keywords: z.array(
    z.object({
      value: z.string(),
    })
  ),
}),

  analytics: z.object({
    googleAnalyticsId: z.string(),

    googleTagManagerId: z.string().optional(),

    googleSearchConsole: z.string().optional(),
  }),
});

export type SettingsFormData =
  z.infer<typeof settingsSchema>;