import Image from "next/image";
import Link from "next/link";
import { certificates } from "@/data/certificates";

export default function CertificatesPreview() {
  const preview = certificates.slice(0, 2);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest
                          text-gray-400 dark:text-gray-600 mb-2">
              Credentials
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight
                           text-gray-900 dark:text-white">
              Certificates
            </h2>
          </div>

          <Link
            href="/certificates"
            className="inline-flex items-center gap-1.5 text-sm font-semibold
                       text-blue-600 dark:text-blue-400 shrink-0
                       hover:underline underline-offset-4 transition"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor"
                 strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {preview.map((cert, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-200 dark:border-gray-800
                         bg-white dark:bg-gray-900/60 overflow-hidden
                         hover:border-blue-400 dark:hover:border-blue-600
                         hover:shadow-lg hover:shadow-blue-500/10
                         transition-all duration-300"
            >
              {/* Image */}
              {cert.image ? (
                <div className="relative w-full h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-[1.03]
                               transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              ) : (
                /* Placeholder when no image */
                <div className="w-full h-44 sm:h-48 flex items-center justify-center
                                bg-gradient-to-br from-blue-50 to-indigo-100
                                dark:from-blue-950/40 dark:to-indigo-950/40">
                  <svg className="w-10 h-10 text-blue-300 dark:text-blue-700"
                       fill="none" stroke="currentColor" strokeWidth={1.5}
                       viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}

              {/* Body */}
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white
                                 truncate mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-600 font-medium">
                    {cert.issuer}
                    {cert.year && (
                      <span className="ml-1.5 pl-1.5 border-l border-gray-200
                                       dark:border-gray-700">
                        {cert.year}
                      </span>
                    )}
                  </p>
                </div>

                {/* Verified badge */}
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5
                                 rounded-full text-[10px] font-bold uppercase tracking-widest
                                 bg-green-50 dark:bg-green-950/40
                                 text-green-600 dark:text-green-400
                                 border border-green-200 dark:border-green-800">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}