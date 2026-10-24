"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MangaSpeechBubble } from "./AnimeStickers";

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Bahulvgopal",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bahul-v-gopal-b7493b280",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_.bahul_",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/918075298373",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin and login routes
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <footer className="relative bg-[#FAF8F5] px-5 sm:px-8 lg:px-0 pt-6 pb-14 overflow-hidden">
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "128px" }}
      />

      {/* Ambient Blobs */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-orange-500/[0.04] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* -- Floating Glassmorphic Container Card -- */}
        <div
          className="
            relative overflow-hidden
            rounded-[34px] sm:rounded-[42px]
            bg-white/60 backdrop-blur-2xl
            border border-white/85
            p-8 sm:p-12
            shadow-[0_20px_50px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.03)]
          "
        >
          {/* Top Blade Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 opacity-80" />

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-orange-600 via-amber-500 to-red-600 flex items-center justify-center text-white font-orbitron font-extrabold text-lg shadow-md border border-white/30">
                  BG
                </div>
                <div>
                  <h3 className="font-manga text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide uppercase leading-none">
                    BAHUL V GOPAL
                  </h3>
                  <span className="font-orbitron text-[10px] font-bold text-orange-600 tracking-widest uppercase">
                    CYBERNETIC FULLSTACK ENGINEER // 「特級開発者」
                  </span>
                </div>
              </div>

              <p className="font-rajdhani text-sm sm:text-base font-medium text-stone-600 leading-relaxed max-w-md mb-6">
                Designing high-performance web products, scalable cloud architectures, and interactive digital
                experiences with obsessive attention to UI physics and performance.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:bahulvgopal@gmail.com"
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2 rounded-full
                    bg-white/80 backdrop-blur-md border border-stone-200/90
                    font-orbitron text-[11px] font-bold text-stone-800
                    hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50/50
                    shadow-xs transition-all duration-300
                  "
                >
                  <svg className="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  bahulvgopal@gmail.com
                </a>
                <MangaSpeechBubble text="ALWAYS OPEN ⚡" className="hidden sm:inline-block" />
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <span className="inline-flex items-center gap-2 mb-4 font-orbitron text-[10px] font-bold tracking-[0.16em] uppercase text-orange-600">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                NAVIGATION // 「道」
              </span>

              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 font-orbitron text-xs font-semibold text-stone-700 hover:text-orange-600 transition-colors duration-200 tracking-wide"
                    >
                      <span className="w-1 h-1 rounded-full bg-stone-300 group-hover:bg-orange-500 group-hover:scale-150 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <span className="inline-flex items-center gap-2 mb-4 font-orbitron text-[10px] font-bold tracking-[0.16em] uppercase text-orange-600">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                CONNECT // 「交信」
              </span>

              <p className="font-rajdhani text-sm font-medium text-stone-600 mb-5 leading-normal">
                Available for internships, high-impact projects, and interesting collaborations.
              </p>

              <Link
                href="/contact"
                className="
                  group inline-flex items-center gap-2
                  px-5 py-2.5 rounded-xl
                  font-orbitron text-xs font-bold tracking-wider uppercase
                  bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white
                  hover:shadow-[0_8px_25px_rgba(234,88,12,0.35)]
                  hover:scale-[1.02]
                  transition-all duration-200
                  mb-6
                "
              >
                <span>INITIATE CONTACT</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Social Buttons */}
              <div className="flex items-center gap-2.5">
                {socials.map(({ name, href, icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="
                      w-9 h-9 rounded-xl
                      bg-white/80 backdrop-blur-md
                      border border-stone-200/90
                      flex items-center justify-center
                      text-stone-700 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50/50
                      shadow-2xs transition-all duration-200
                    "
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-orbitron text-[10px] text-stone-500 tracking-[0.1em] uppercase">
              © {new Date().getFullYear()} BAHUL V GOPAL — ALL MISSIONS ACTIVE
            </p>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-orbitron text-[9px] font-extrabold text-emerald-700 tracking-widest uppercase">
                READY FOR WORK // 「特級・即戦力」
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
