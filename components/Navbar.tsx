"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home",         href: "/" },
  { name: "About",        href: "/about" },
  { name: "Projects",     href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Certificates", href: "/certificates" },
  // { name: "Experience",  href: "/collections" },
  { name: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav
        className={[
          "sticky top-0 z-50 w-full",
          "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md",
          "border-b border-gray-200/60 dark:border-gray-800/60",
          "transition-shadow duration-300",
          scrolled ? "shadow-sm shadow-black/5 dark:shadow-black/20" : "",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight
                         text-gray-900 dark:text-white shrink-0
                         hover:opacity-70 transition-opacity duration-200"
            >
              Bahul V Gopal
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={[
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
                    ].join(" ")}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile: ThemeToggle + hamburger */}
            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="p-2 rounded-md text-gray-600 dark:text-gray-300
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-colors duration-150"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          className={[
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
          aria-hidden={!isOpen}
        >
          <div className="border-t border-gray-200/60 dark:border-gray-800/60
                          bg-white/95 dark:bg-gray-900/95
                          px-4 sm:px-6 py-2 flex flex-col gap-0.5">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                    "text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      isActive ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600",
                    ].join(" ")}
                  />
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-1 pt-3 pb-1 border-t border-gray-100 dark:border-gray-800 px-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}