import mongoose, { Schema, model, models, Model } from "mongoose";

export interface ICloudinaryImage {
  url: string;
  publicId: string;
}

export interface IWalkthroughStep {
  title: string;
  description: string;
  image?: ICloudinaryImage | null;
  device: "desktop" | "tablet" | "mobile";
  order: number;
}

export interface IProject {
  title: string;
  slug: string;
  description: string;
  tagline: string;
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

  image?: ICloudinaryImage;

  github: string;
  live: string;

  tags: string[];
  tech: string[];
  features: string[];

  problem: string;
  solution: string;
  learnings: string;

  walkthrough: IWalkthroughStep[];

  featured: boolean;

  status: "draft" | "published";

  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    tagline: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Web",
        "Mobile",
        "AI/ML",
        "Desktop",
        "Open Source",
        "Other",
      ],
      default: "Web",
    },

    projectType: {
      type: String,
      enum: ["Individual", "Team"],
      default: "Individual",
    },

    order: {
      type: Number,
      default: 0,
    },

    image: {
  url: {
    type: String,
    default: "",
  },

  publicId: {
    type: String,
    default: "",
  },
},

    github: {
      type: String,
      default: "",
    },

    live: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    tech: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String,
      },
    ],

    problem: {
      type: String,
      default: "",
    },

    solution: {
      type: String,
      default: "",
    },

    learnings: {
      type: String,
      default: "",
    },

    walkthrough: [
      {
        title: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        image: {
          url: {
            type: String,
            required: true,
          },

          publicId: {
            type: String,
            required: true,
          },
        },

        device: {
          type: String,
          enum: ["desktop", "tablet", "mobile"],
          default: "desktop",
        },

        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel: Model<IProject> =
  models.Project ||
  model<IProject>("Project", ProjectSchema);

export default ProjectModel;