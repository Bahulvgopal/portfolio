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
import ContactSection from "./sections/ContactSection";
import SocialSection from "./sections/SocialSection";
import ResumeSection from "./sections/ResumeSection";
import FormActions from "@/components/ui/form/FormActions";
import Loader from "@/components/ui/Loader";

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
      shortBio: "",
      profileImage: undefined,
      email: "",
      socials: {
        github: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        youtube: "",
        portfolio: "",
      },
      resume: {
        buttonText: "Download Resume",
      },
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      fullName: profile.fullName ?? "",
      shortBio: profile.shortBio ?? "",
      profileImage: profile.profileImage,
      email: profile.email ?? "",
      socials: {
        github: profile.socials?.github ?? "",
        linkedin: profile.socials?.linkedin ?? "",
        instagram: profile.socials?.instagram ?? "",
        twitter: profile.socials?.twitter ?? "",
        youtube: profile.socials?.youtube ?? "",
        portfolio: profile.socials?.portfolio ?? "",
      },
      resume: {
        buttonText: profile.resume?.buttonText ?? "Download Resume",
        url: profile.resume?.url,
        publicId: profile.resume?.publicId,
      },
    });
  }, [profile, form]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      {/* Header Glass Card */}
      <div className="relative overflow-hidden rounded-[30px] sm:rounded-[34px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-3xl bg-gradient-to-br from-[#FF5E3A]/30 to-[#FF2A54]/25 blur-2xl z-0"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
                // IDENTITY MATRIX // 「個人情報」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                ACTIVE IDENTITY &amp; TELEMETRY
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              ADMIN PROFILE CONFIGURATION
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              Manage personal identity, hero intro bio, contact email, social networks, and downloadable resume.
            </p>
          </div>

          <div className="text-stone-500 font-mono text-xs hidden sm:block tracking-widest self-start">
            · · ·
          </div>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(updateProfile)}
        className="space-y-6 sm:space-y-8"
      >
        <PersonalSection form={form} />
        <ContactSection form={form} />
        <SocialSection form={form} />
        <ResumeSection form={form} />

        <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
          <FormActions
            mode="edit"
            isSubmitting={isUpdating}
            entity="Profile"
          />
        </div>
      </form>
    </div>
  );
}
