export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Mobile"
  | "Programming"
  | "AI/ML"
  | "Cloud"
  | "DevOps"
  | "Tools"
  | "Other";

export interface Skill {
  _id: string;

  name: string;

  category: SkillCategory;

  

  icon?: {
    publicId: string;
    url: string;
  };

  order: number;

  status: "published" | "draft";

  createdAt: string;
  updatedAt: string;
}