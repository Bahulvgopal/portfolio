import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
});

const optionalUrl = z.preprocess(
  (value) => {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    return trimmed === "" ? "" : trimmed;
  },
  z.union([z.literal(""), z.string().url()])
);

export const profileApiSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  shortBio: z.string().min(10, "Short bio must be at least 10 characters").max(300),

  profileImage: imageSchema.optional(),

  email: z.string().email("Valid email address is required"),

  socials: z.object({
    github: optionalUrl,
    linkedin: optionalUrl,
    instagram: optionalUrl,
    twitter: optionalUrl,
    youtube: optionalUrl,
    portfolio: optionalUrl,
    leetcode: optionalUrl.optional(),
    hackerrank: optionalUrl.optional(),
  }),

  resume: z.object({
    url: z.string().optional(),
    publicId: z.string().optional(),
    buttonText: z.string().min(1, "Button text is required"),
  }),

  // Optional legacy fields
  title: z.string().optional(),
  about: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  hero: z
    .object({
      heading: z.string().optional(),
      subtitle: z.string().optional(),
      typingWords: z.array(z.string()).optional(),
    })
    .optional(),
});

export type ProfileApiData = z.infer<typeof profileApiSchema>;
