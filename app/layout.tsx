import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import Script from "next/script";
import AnimeToaster from "@/components/ui/AnimeToaster";
import AnimeInitialLoader from "@/components/loaders/AnimeInitialLoader";
import AnimeClickLoader from "@/components/loaders/AnimeClickLoader";

export const metadata = {
  metadataBase: new URL("https://www.bahulvgopal.me"),

  title: {
    default: "Bahul V Gopal | Full Stack Developer Portfolio",
    template: "%s | Bahul V Gopal",
  },

  description:
    "Bahul V Gopal is a B.Tech Computer Science and Engineering student at University College of Engineering Kariavattom, Kerala. Full Stack Web Developer specializing in modern websites, web applications, UI/UX, and scalable digital solutions.",

  keywords: [
    "Bahul V Gopal",
    "Bahul",
    "Bahul Gopal",
    "Bahul VGopal",
    "Bahul Portfolio",
    "Full Stack Developer Kerala",
    "Web Developer Kerala",
    "Next.js Developer",
    "React Developer",
    "MERN Stack Developer",
    "Portfolio Website",
    "University College of Engineering Kariavattom",
    "B.Tech Computer Science",
    "Software Developer",
    "Website Developer",
    "Frontend Developer",
    "Backend Developer",
    "Freelance Web Developer",
  ],

  authors: [
    {
      name: "Bahul V Gopal",
      url: "https://www.bahulvgopal.me",
    },
  ],

  creator: "Bahul V Gopal",
  publisher: "Bahul V Gopal",
  category: "Technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bahulvgopal.me",
    siteName: "Bahul V Gopal Portfolio",
    title: "Bahul V Gopal | Full Stack Developer Portfolio",
    description:
      "B.Tech CSE Student & Full Stack Web Developer skilled in React, Next.js, Node.js, Express, MongoDB, TypeScript, and modern UI engineering.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bahul V Gopal - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bahul V Gopal | Full Stack Developer",
    description:
      "Full Stack Developer & B.Tech CSE Student at University College of Engineering Kariavattom.",
    creator: "@bahulvgopal",
    images: ["/og-image.png"],
  },

  verification: {
    google: "JimeTRA5YFpfdpWZSYwIxVlC5ibzQLuSEawFcNnxPkE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P5DBTLP152"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-P5DBTLP152', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Providers>
          {/* 1. Dramatic Anime Entrance Loader (Shows only on initial site open) */}
          <AnimeInitialLoader />

          {/* 2. Anime Route / Click Teleport Loader */}
          <Suspense fallback={null}>
            <AnimeClickLoader />
          </Suspense>

          <Navbar />
          {children}
          <AnimeToaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
