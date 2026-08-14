import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;

  logo?: {
    url: string;
    publicId: string;
  };

  favicon?: {
    url: string;
    publicId: string;
  };

  contactEmail: string;

  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId?: string;
    googleSearchConsole?: string;
  };
}

const SettingsSchema = new Schema(
  {
    siteName: {
      type: String,
      required: true,
    },

    siteDescription: String,

    logo: {
      url: String,
      publicId: String,
    },

    favicon: {
      url: String,
      publicId: String,
    },

    contactEmail: String,

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    analytics: {
      googleAnalyticsId: String,
      googleTagManagerId: String,
      googleSearchConsole: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings ||
  mongoose.model<ISettings>(
    "Settings",
    SettingsSchema
  );