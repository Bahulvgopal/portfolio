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

  // const onSubmit = (data: SettingsFormData) => {
  //   updateSettings({
  //     ...data,

  //     seo: {
  //       ...data.seo,

  //       keywords: data.seo.keywords.map(
  //         (item) => item.value
  //       ),
  //     },
  //   });
  // };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <form
  onSubmit={form.handleSubmit(updateSettings)}
  className="space-y-8"
>
      <GeneralSection form={form} />

      <SEOSection form={form} />

      <AnalyticsSection form={form} />

      <FormActions
        mode="edit"
        isSubmitting={isUpdating}
        entity="Settings"
      />
    </form>
  );
}