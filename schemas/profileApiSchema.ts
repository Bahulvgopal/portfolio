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
  fullName: z.string().min(2),

  title: z.string().min(2),

  shortBio: z.string().min(10).max(200),

  about: z.string().min(30),

  profileImage: imageSchema.optional(),

  email: z.string().email(),

  phone: z.string().optional(),

  location: z.string().optional(),

  socials: z.object({
    github: optionalUrl,
    linkedin: optionalUrl,
    instagram: optionalUrl,
    twitter: optionalUrl,
    youtube: optionalUrl,
    leetcode: optionalUrl,
    hackerrank: optionalUrl,
    portfolio: optionalUrl,
  }),

  hero: z.object({
    heading: z.string(),
    subtitle: z.string(),

    // <-- THIS IS THE DIFFERENCE
    typingWords: z.array(z.string()),
  }),

  resume: z.object({
    url: z.string().optional(),
    publicId: z.string().optional(),
    buttonText: z.string(),
  }),
});

export type ProfileApiData = z.infer<typeof profileApiSchema>;