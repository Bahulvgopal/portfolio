import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2).max(100),

  tagline: z.string().min(5).max(200),

  about: z.string().min(20),

  email: z.string().email().optional().or(z.literal("")),

  phone: z.string().optional(),

  location: z.string().optional(),

  profileImage: z.string().optional(),

  resume: z.string().optional(),

  github: z.string().url().optional().or(z.literal("")),

  linkedin: z.string().url().optional().or(z.literal("")),

  twitter: z.string().url().optional().or(z.literal("")),

  instagram: z.string().url().optional().or(z.literal("")),

  website: z.string().url().optional().or(z.literal("")),
});