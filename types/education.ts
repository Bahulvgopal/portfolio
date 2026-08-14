export interface Education {
  _id: string;

  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;

  startDate: string;
  endDate?: string;
  currentlyStudying: boolean;

  grade?: string;
  gradeType?: "CGPA" | "Percentage" | "GPA";

  logo?: {
    url: string;
    publicId: string;
  } | null;

  description: string;

  coursework: string[];
  achievements: string[];

  website?: string;

  order: number;

  status: "draft" | "published";

  createdAt: string;
  updatedAt: string;
}