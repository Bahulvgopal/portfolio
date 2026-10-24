"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import { Profile } from "@/types/profile";
import { ProfileFormData } from "@/schemas/profileSchema";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await api<Profile>("/api/profile");
      setProfile(data);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(data: ProfileFormData) {
    setIsUpdating(true);

    try {
      const payload: any = {
        ...data,
      };

      if (data.hero?.typingWords) {
        payload.hero = {
          ...data.hero,
          typingWords: data.hero.typingWords.map((item) => item.value),
        };
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update profile");
      }

      await loadProfile();
    } finally {
      setIsUpdating(false);
    }
  }

  return {
    profile,
    loading,
    isUpdating,
    loadProfile,
    updateProfile,
  };
}
