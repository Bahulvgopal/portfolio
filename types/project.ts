export interface CloudinaryImage {
  url: string;
  publicId: string;
}

export interface WalkthroughStep {
  title: string;
  description: string;

  image: CloudinaryImage;

  device: "desktop" | "tablet" | "mobile";

  order: number;
}

export interface Project {
  _id: string;

  title: string;
  slug: string;

  tagline: string;

  description: string;

  role: string;

  duration: string;

  year: string;

  category:
    | "Web"
    | "Mobile"
    | "AI/ML"
    | "Desktop"
    | "Open Source"
    | "Other";

  projectType: "Individual" | "Team";

  order: number;

  image?: CloudinaryImage;

  github: string;
  live: string;

  tags: string[];

  tech: string[];

  features: string[];

  problem: string;

  solution: string;

  learnings: string;

  walkthrough: WalkthroughStep[];

  featured: boolean;

  status: "draft" | "published";

  createdAt: string;

  updatedAt: string;
}