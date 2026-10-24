"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "" | "loading" | "success" | "error";

const reveal = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const inputClasses =
  "w-full px-4 py-3 rounded-xl text-sm bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm transition-colors duration-200";

const labelClasses =
  "font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "bahulvgopal@gmail.com",
    href: "mailto:bahulvgopal@gmail.com",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    label: "WhatsApp",
    value: "+91 80752 98373",
    href: "https://wa.me/918075298373",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
    ),
  },
  {
    label: "GitHub",
    value: "github.com/bahul",
    href: "https://github.com/Bahulvgopal",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 6.77 5.07 5.07 0 0019.91 3S18.73 2.65 16 4.48a13.38 13.38 0 00-7 0C6.27 2.65 5.09 3 5.09 3A5.07 5.07 0 005 6.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0010 20.13V24" />
    ),
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formspree.io/f/mjgadyjw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] pb-28 pt-28 sm:pt-36 px-5 sm:px-8 lg:px-0 overflow-hidden">
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: GRAIN_URL, backgroundRepeat: "repeat", backgroundSize: "128px" }}
      />

      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-orange-500/[0.04] blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-amber-500/[0.04] blur-[140px]" />

      {/* decorative oversized word */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-[4%] text-[13vw] font-black leading-none select-none text-stone-900/[0.02] tracking-tighter hidden lg:block"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Talk
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div {...reveal(0.05)} className="mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6 border border-orange-500/25 bg-orange-500/5 text-orange-600 font-mono text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-orange-600 animate-pulse" />
            Get in touch
          </span>

          <h1
            className="text-[clamp(2.4rem,6.5vw,4.2rem)] font-normal tracking-tight leading-[1.05] text-stone-900"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Let&apos;s{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(90deg, #EA580C, #C2410C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              build
            </em>{" "}
            <span className="font-light italic text-stone-500">something.</span>
          </h1>

          <p className="mt-5 text-sm sm:text-[15px] text-stone-600 max-w-md leading-[1.75]">
            Have a project in mind, a question, or just want to say hi? Fill out the form and I&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left — contact info */}
          <motion.div {...reveal(0.12)} className="lg:col-span-2 flex flex-col gap-3">
            {CONTACT_LINKS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white hover:border-orange-500/30 hover:shadow-md transition-all duration-300 px-5 py-4 shadow-sm"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center text-orange-600 group-hover:border-orange-500/30 transition-colors duration-300">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                    {c.icon}
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className={labelClasses}>{c.label}</span>
                  <span className="text-sm text-stone-800 group-hover:text-orange-600 transition-colors duration-300">
                    {c.value}
                  </span>
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 mt-1 shadow-sm">
              <p className="text-[13px] text-stone-600 leading-relaxed">
                Based in Trivandrum, Kerala — open to remote work and freelance projects.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            {...reveal(0.18)}
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className={inputClasses}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className={labelClasses}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="What's on your mind?"
                required
                rows={5}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#EA580C] text-white hover:bg-[#C2410C] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg mt-1"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {/* Status messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-[#061c14]/90 via-[#0a1520]/95 to-[#061c14]/90 p-4 shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981]" />
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-emerald-400">
                        TRANSMISSION CONFIRMED // 「送信完了」
                      </span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-300">
                        SYS_200_OK
                      </span>
                    </div>
                    <p className="mt-1 font-rajdhani text-xs font-medium text-emerald-100/90 leading-relaxed">
                      Your dispatch has penetrated the firewall! Bahul has received your transmission and will review it promptly.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative overflow-hidden rounded-2xl border border-rose-500/40 bg-gradient-to-r from-[#1f090d]/90 via-[#120a15]/95 to-[#1f090d]/90 p-4 shadow-[0_0_25px_rgba(244,63,94,0.25)] backdrop-blur-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_12px_#f43f5e]" />
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/15 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron text-xs font-bold uppercase tracking-wider text-rose-400">
                        SIGNAL FAILURE // 「通信途絶」
                      </span>
                      <span className="rounded bg-rose-500/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-rose-300">
                        ERR_CARRIER
                      </span>
                    </div>
                    <p className="mt-1 font-rajdhani text-xs font-medium text-rose-100/90 leading-relaxed">
                      Tactical link failed. Please verify your message details or establish contact directly via WhatsApp or Email.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </main>
  );
}
