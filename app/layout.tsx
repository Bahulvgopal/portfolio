import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://bahulvgopal.me"),

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
      url: "https://bahulvgopal.me",
    },
  ],

  creator: "Bahul V Gopal",
  publisher: "Bahul V Gopal",
  category: "Technology",

  alternates: {
    canonical: "https://bahulvgopal.me",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Bahul V Gopal | Full Stack Developer Portfolio",
    description:
      "B.Tech Computer Science and Engineering student at University College of Engineering Kariavattom. Full Stack Developer building modern websites, scalable web applications, and digital experiences.",

    url: "https://bahulvgopal.me",
    siteName: "Bahul V Gopal Portfolio",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bahul V Gopal Portfolio",
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
    google: "ADD_GOOGLE_VERIFICATION_CODE",
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
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
