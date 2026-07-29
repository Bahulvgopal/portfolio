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
    const payload = {
      ...data,

      hero: {
        ...data.hero,
        typingWords: data.hero.typingWords.map(
          (item) => item.value
        ),
      },
    };

    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

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