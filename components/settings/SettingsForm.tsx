"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  settingsSchema,
  SettingsFormData,
} from "@/schemas/settingsSchema";

import { useSettings } from "@/hooks/useSettings";

import GeneralSection from "./sections/GeneralSection";
import SEOSection from "./sections/SEOSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import FormActions from "@/components/ui/form/FormActions";
import Loader from "@/components/ui/Loader";

export default function SettingsForm() {
  const {
    settings,
    loading,
    isUpdating,
    updateSettings,
  } = useSettings();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "",
      siteDescription: "",
      contactEmail: "",
      logo: undefined,
      favicon: undefined,
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [{ value: "" }],
      },
      analytics: {
        googleAnalyticsId: "",
        googleTagManagerId: "",
        googleSearchConsole: "",
      },
    },
  });

  useEffect(() => {
    if (!settings) return;

    form.reset({
      siteName: settings.siteName ?? "",
      siteDescription: settings.siteDescription ?? "",
      contactEmail: settings.contactEmail ?? "",
      logo: settings.logo,
      favicon: settings.favicon,
      seo: {
        metaTitle: settings.seo?.metaTitle ?? "",
        metaDescription: settings.seo?.metaDescription ?? "",
        keywords:
          settings.seo?.keywords?.map((keyword) => ({
            value: keyword,
          })) ?? [{ value: "" }],
      },
      analytics: {
        googleAnalyticsId:
          settings.analytics?.googleAnalyticsId ?? "",
        googleTagManagerId:
          settings.analytics?.googleTagManagerId ?? "",
        googleSearchConsole:
          settings.analytics?.googleSearchConsole ?? "",
      },
    });
  }, [settings, form]);

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
                // SYSTEM PREFERENCES // 「環境設定」
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[9px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(249,115,22,0.4)]">
                GLOBAL SEO & ANALYTICS
              </span>
            </div>

            <h1 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              SYSTEM SETTINGS
            </h1>

            <p className="mt-2 font-rajdhani text-sm sm:text-base font-semibold text-stone-300">
              Configure search engine indexing, metadata, Google Analytics, and core branding parameters.
            </p>
          </div>

          <div className="text-stone-500 font-mono text-xs hidden sm:block tracking-widest self-start">
            · · ·
          </div>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(updateSettings)}
        className="space-y-6 sm:space-y-8"
      >
        <GeneralSection form={form} />
        <SEOSection form={form} />
        <AnalyticsSection form={form} />

        <div className="rounded-[28px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
          <FormActions
            mode="edit"
            isSubmitting={isUpdating}
            entity="Settings"
          />
        </div>
      </form>
    </div>
  );
}
