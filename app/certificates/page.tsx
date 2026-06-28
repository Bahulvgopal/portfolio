"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certificates } from "@/data/certificates";

/* =========================================================================
   ANIMATION HELPERS (matches hero/skills/education pages)
   ========================================================================= */
const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const revealInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* =========================================================================
   PAGE
   ========================================================================= */
export default function CertificatesPage() {
  return (
    <main className="relative -mt-[5rem] min-h-screen bg-[#0a0a0b] pb-28 pt-28 sm:pt-32 px-5 sm:px-8 lg:px-0 overflow-hidden">

      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-violet-600/[0.07] blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

      {/* decorative oversized word */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[3%] top-[4%] text-[13vw] font-black leading-none select-none text-white/[0.025] tracking-tighter hidden lg:block"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Certs
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div {...reveal(0.05)} className="mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 border border-sky-400/20 bg-sky-400/[0.04] text-sky-400 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-sky-400 animate-pulse" />
            Credentials
          </span>

          <h1
            className="text-[clamp(2.4rem,6.5vw,4.2rem)] font-normal tracking-tight leading-[1.05] text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Courses &{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              certificates
            </em>
          </h1>

          <p className="mt-5 text-sm sm:text-[15px] text-neutral-500 max-w-md leading-[1.75]">
            Programs I&apos;ve completed to sharpen my skills and stay current with the stack.
          </p>
        </motion.div>

        {/* gradient rule + count */}
        <motion.div {...reveal(0.1)} className="flex items-center gap-4 mb-10">
          <div
            className="h-px flex-1"
            style={{
              background: "linear-gradient(90deg, rgba(56,189,248,0.18), rgba(129,140,248,0.1) 60%, transparent)",
            }}
          />
          <span className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-neutral-600 shrink-0">
            {certificates.length} {certificates.length === 1 ? "Certificate" : "Certificates"}
          </span>
        </motion.div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <motion.article
              key={cert.title + i}
              {...revealInView(0.04 * (i % 6))}
              className="group relative flex flex-col overflow-hidden rounded-[22px] bg-[#0f0f10] border border-white/[0.06] hover:border-sky-500/25 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500"
            >
              {/* top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] z-10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8)" }}
              />

              {/* image / placeholder */}
              <div className="relative w-full h-40 shrink-0 overflow-hidden">
                {cert.image ? (
                  <>
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                    <svg
                      className="w-9 h-9 text-neutral-700"
                      fill="none" stroke="currentColor" strokeWidth={1.5}
                      viewBox="0 0 24 24" aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* body */}
              <div className="relative z-10 flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2
                    className="text-[15px] font-normal text-white tracking-tight leading-snug"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                  >
                    {cert.title}
                  </h2>

                  <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-emerald-400/90 border border-emerald-500/25 bg-emerald-500/[0.06]">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>

                <div className="h-px bg-white/[0.05] mt-2 mb-3" />

                {/* issuer + year */}
                <p className="text-[12px] text-neutral-500 font-medium mt-auto">
                  {cert.issuer}
                  {cert.year && (
                    <span className="ml-1.5 pl-1.5 border-l border-white/10 text-neutral-600">
                      {cert.year}
                    </span>
                  )}
                </p>

                {/* credential link */}
                
              </div>

              {/* bottom shimmer */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.article>
          ))}
        </div>

      </div>
    </main>
  );
}