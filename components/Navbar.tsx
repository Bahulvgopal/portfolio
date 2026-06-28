"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Experience", href: "/experience" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav
          className={[
            "max-w-6xl mx-auto rounded-[26px] relative",
            "transition-all duration-300",
            "border border-white/[0.07]",
            "backdrop-blur-xl",
            "bg-[#0f0f10]/90",
            scrolled ? "shadow-xl shadow-black/40" : "",
          ].join(" ")}
        >
          <div className="h-16 px-5 sm:px-6 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow duration-300">
                BG
              </div>
              <div className="leading-tight">
                <h2 className="font-bold text-white tracking-tight">Bahul V Gopal</h2>
                <p className="text-xs text-neutral-500">Full Stack Developer</p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={["relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200", isActive ? "text-white" : "text-neutral-500 hover:text-white"].join(" ")}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.1]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}

              {/* Resume CTA — desktop */}
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="ml-3 inline-flex items-center gap-2 rounded-full px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.03] transition-all duration-200">
                Resume
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setIsOpen((prev) => !prev)} aria-label="Menu" className="md:hidden w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200">
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="border-t border-white/[0.06] px-4 py-4 flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={["rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200", isActive ? "bg-white/[0.08] border border-white/[0.1] text-white" : "text-neutral-500 hover:bg-white/[0.05] hover:text-white"].join(" ")}
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  {/* Resume CTA — mobile */}
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-2 rounded-2xl px-4 py-3 text-center font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-500/20">
                    Download Resume ↗
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

         
        </nav>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}