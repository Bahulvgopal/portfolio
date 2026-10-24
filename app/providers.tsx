"use client";

import { ThemeProvider } from "next-themes";
import { AnimeConfirmProvider } from "@/components/ui/AnimeConfirmModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
      <AnimeConfirmProvider>
        {children}
      </AnimeConfirmProvider>
    </ThemeProvider>
  );
}
