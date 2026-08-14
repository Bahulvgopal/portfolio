import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  fullName: string;

  title: string;

  shortBio: string;

  about: string;

  profileImage?: {
    url: string;
    publicId: string;
  };

  email: string;

  phone?: string;

  location?: string;

  socials: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    leetcode?: string;
    hackerrank?: string;
    portfolio?: string;
  };

  hero: {
    heading: string;
    subtitle: string;
    typingWords: string[];
  };

  resume: {
    url?: string;
    publicId?: string;
    buttonText: string;
  };
}

const ProfileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    title: String,

    shortBio: String,

    about: String,

    profileImage: {
    url: String,
    publicId: String,
},

    email: {
      type: String,
      required: true,
    },

    phone: String,

    location: String,

    socials: {
      github: String,
      linkedin: String,
      instagram: String,
      twitter: String,
      youtube: String,
      leetcode: String,
      hackerrank: String,
      portfolio: String,
    },

    hero: {
      heading: String,
      subtitle: String,
      typingWords: [String],
    },

    resume:{
    url:String,
    publicId:String,
      buttonText: {
        type: String,
        default: "Download Resume",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Profile ||
  mongoose.model<IProfile>(
    "Profile",
    ProfileSchema
  );