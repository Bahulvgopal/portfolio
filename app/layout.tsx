import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import Script from "next/script";

export const metadata = {
  title: "Bahul | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
  <body>

    {/* 🔥 Google Analytics */}
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