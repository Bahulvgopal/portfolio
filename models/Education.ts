import { Schema, model, models, Model } from "mongoose";

export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;

  startDate: Date;
  endDate?: Date;

  currentlyStudying: boolean;

  grade: string;
  gradeType: "CGPA" | "Percentage" | "GPA";

  logo?: {
    url: string;
    publicId: string;
  };

  description: string;

  coursework: string[];
  achievements: string[];

  website: string;

  order: number;

  status: "draft" | "published";

  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
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
    currentlyStudying: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      default: "",
    },
    gradeType: {
      type: String,
      enum: ["CGPA", "Percentage", "GPA"],
      default: "CGPA",
    },
    logo: {
      url: String,
      publicId: String,
    },
    description: {
      type: String,
      required: true,
    },
    coursework: {
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

const Education: Model<IEducation> =
  models.Education ||
  model<IEducation>("Education", EducationSchema);

export default Education;