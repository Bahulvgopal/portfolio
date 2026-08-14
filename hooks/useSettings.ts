"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import { Settings } from "@/types/settings";
import { SettingsFormData } from "@/schemas/settingsSchema";

export function useSettings() {
  const [settings, setSettings] =
    useState<Settings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isUpdating, setIsUpdating] =
    useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data =
        await api<Settings>("/api/settings");

      setSettings(data);
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(
    data: SettingsFormData
  ) {
    setIsUpdating(true);

    try {
      const payload = {
        ...data,

        seo: {
          ...data.seo,
          keywords: data.seo.keywords.map(
            (item) => item.value
          ),
        },
      };

      await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      await loadSettings();
    } finally {
      setIsUpdating(false);
    }
  }

  return {
    settings,
    loading,
    isUpdating,
    loadSettings,
    updateSettings,
  };
}