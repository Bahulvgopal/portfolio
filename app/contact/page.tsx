"use client";

import { useState } from "react";

type Status = "" | "loading" | "success" | "error";

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
    <main className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ────────────────────────────────── */}
        <div className="pt-14 sm:pt-20 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 mb-3">
            Get in touch
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                         text-gray-900 dark:text-white leading-tight mb-4">
            Contact Me
            <span aria-hidden className="block mt-2 h-1 w-12 rounded-full bg-blue-500" />
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
            Have a project in mind, a question, or just want to say hi?
            Fill out the form and I'll get back to you.
          </p>
        </div>

        {/* ── Two-col layout on lg ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Info sidebar */}
          {/* <div className="lg:col-span-2 flex flex-col gap-6">
            {[
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
                       strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: "bahulvgopal@gmail.com",
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
                       strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Location",
                value: "Kariavattom, Kerala, India",
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                ),
                label: "GitHub",
                value: "github.com/Bahulvgopal",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                bg-blue-50 dark:bg-blue-950/40
                                text-blue-600 dark:text-blue-400">
                  {icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest
                                text-gray-400 dark:text-gray-600 mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div> */}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name"
                     className="text-xs font-bold uppercase tracking-widest
                                text-gray-400 dark:text-gray-600">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm
                           bg-white dark:bg-gray-900
                           border border-gray-200 dark:border-gray-700
                           text-gray-900 dark:text-white
                           placeholder:text-gray-400 dark:placeholder:text-gray-600
                           focus:outline-none focus:ring-2 focus:ring-blue-500/40
                           focus:border-blue-400 dark:focus:border-blue-500
                           transition-colors duration-150"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email"
                     className="text-xs font-bold uppercase tracking-widest
                                text-gray-400 dark:text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm
                           bg-white dark:bg-gray-900
                           border border-gray-200 dark:border-gray-700
                           text-gray-900 dark:text-white
                           placeholder:text-gray-400 dark:placeholder:text-gray-600
                           focus:outline-none focus:ring-2 focus:ring-blue-500/40
                           focus:border-blue-400 dark:focus:border-blue-500
                           transition-colors duration-150"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message"
                     className="text-xs font-bold uppercase tracking-widest
                                text-gray-400 dark:text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="What's on your mind?"
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl text-sm resize-none
                           bg-white dark:bg-gray-900
                           border border-gray-200 dark:border-gray-700
                           text-gray-900 dark:text-white
                           placeholder:text-gray-400 dark:placeholder:text-gray-600
                           focus:outline-none focus:ring-2 focus:ring-blue-500/40
                           focus:border-blue-400 dark:focus:border-blue-500
                           transition-colors duration-150"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2
                         px-6 py-3 rounded-xl text-sm font-semibold
                         bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                         disabled:opacity-60 disabled:cursor-not-allowed
                         text-white shadow-md shadow-blue-500/25
                         transition-all duration-150 mt-1"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor"
                       strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>

            {/* Status messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl
                              bg-green-50 dark:bg-green-950/40
                              border border-green-200 dark:border-green-800
                              text-green-700 dark:text-green-400 text-sm font-medium">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor"
                     strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Message sent! I'll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl
                              bg-red-50 dark:bg-red-950/40
                              border border-red-200 dark:border-red-800
                              text-red-700 dark:text-red-400 text-sm font-medium">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor"
                     strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}