import { Schema, model, models, type InferSchemaType } from "mongoose";

const certificateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },

    credentialId: {
      type: String,
      default: "",
      trim: true,
    },

    credentialUrl: {
      type: String,
      default: "",
      trim: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    doesNotExpire: {
      type: Boolean,
      default: true,
    },

    description: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    logo: {
      url: String,
      publicId: String,
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

export type ICertificate = InferSchemaType<
  typeof certificateSchema
>;

export default models.Certificate ||
  model("Certificate", certificateSchema);