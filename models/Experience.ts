import { Schema, model, models, Model } from "mongoose";

export interface IExperience {
  company: string;
  role: string;

  employmentType:
    | "full-time"
    | "part-time"
    | "internship"
    | "freelance"
    | "contract"
    | "leadership"
    | "volunteer";

  location: string;

  startDate: Date;
  endDate?: Date;

  currentlyWorking: boolean;

  logo?: {
    url: string;
    publicId: string;
  };

  description: string;

  responsibilities: string[];
  skills: string[];
  achievements: string[];

  website: string;

  order: number;

  status: "draft" | "published";

  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema< IExperience >(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "internship",
        "freelance",
        "contract",
        "leadership",
        "volunteer",
      ],
      default: "full-time",
    },

    location: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: Date,

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    logo: {
      url: String,
      publicId: String,
    },

    description: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    website: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
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

const Experience: Model<IExperience> =
  models.Experience ||
  model<IExperience>("Experience", ExperienceSchema);

export default Experience;