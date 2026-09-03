import mongoose, { Schema, Model } from "mongoose";

export interface ISkill extends mongoose.Document {
  name: string;
  category:
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

  

  icon?: {
    publicId: string;
    url: string;
  };

  order: number;

  status: "published" | "draft";

  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Mobile",
        "Programming",
        "AI/ML",
        "Cloud",
        "DevOps",
        "Tools",
        "Other",
      ],
    },

    

    icon: {
      publicId: String,
      url: String,
    },

    order: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

const Skill: Model<ISkill> =
  mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;