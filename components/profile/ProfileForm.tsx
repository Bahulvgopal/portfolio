"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  profileSchema,
  ProfileFormData,
} from "@/schemas/profileSchema";

import { useProfile } from "@/hooks/useProfile";

import PersonalSection from "./sections/PersonalSection";
import HeroSection from "./sections/HeroSection";
import ContactSection from "./sections/ContactSection";
import SocialSection from "./sections/SocialSection";
import ResumeSection from "./sections/ResumeSection";

import FormActions from "@/components/ui/form/FormActions";

export default function ProfileForm() {
  const {
    profile,
    loading,
    updateProfile,
    isUpdating,
  } = useProfile();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      fullName: "",
      title: "",
      shortBio: "",
      about: "",

      profileImage: undefined,

      email: "",
      phone: "",
      location: "",

      socials: {
        github: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        youtube: "",
        leetcode: "",
        hackerrank: "",
        portfolio: "",
      },

      hero: {
        heading: "",
        subtitle: "",
        typingWords: [{ value: "" }],
      },

      resume: {
        buttonText: "Download Resume",
      },
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      ...profile,

      hero: {
        heading: profile.hero?.heading ?? "",
        subtitle: profile.hero?.subtitle ?? "",
        typingWords:
          profile.hero?.typingWords?.map((word) => ({
            value: word,
          })) ?? [{ value: "" }],
      },

      resume: {
        buttonText:
          profile.resume?.buttonText ??
          "Download Resume",
        url: profile.resume?.url,
        publicId: profile.resume?.publicId,
      },
    });
  }, [profile, form]);

  // const onSubmit = (data: ProfileFormData) => {
  //   updateProfile({
  //     ...data,

  //     hero: {
  //       ...data.hero,
  //       typingWords: data.hero.typingWords.map(
  //         (item) => item.value
  //       ),
  //     },
  //   });
  // };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading profile...
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(updateProfile)}
      className="space-y-8"
    >
      <PersonalSection form={form} />

      <HeroSection form={form} />

      <ContactSection form={form} />

      <SocialSection form={form} />

      <ResumeSection form={form} />

      <FormActions
        mode="edit"
        isSubmitting={isUpdating}
        entity="Profile"
      />
    </form>
  );
}