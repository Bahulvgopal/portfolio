export type EmploymentType =
  | "full-time"
  | "part-time"
  | "internship"
  | "freelance"
  | "contract"
  | "leadership"
  | "volunteer";

export type ExperienceStatus = "draft" | "published";

export interface ExperienceLogo {
  url: string;
  publicId: string;
}

export interface Experience {
  _id: string;

  company: string;
  role: string;

  employmentType: EmploymentType;

  location?: string;

  startDate: string;
  endDate?: string;

  currentlyWorking: boolean;

  logo?: ExperienceLogo;

  description: string;

  responsibilities: string[];

  skills: string[];

  achievements: string[];

  website?: string;

  order: number;

  status: ExperienceStatus;

  createdAt: string;
  updatedAt: string;
}