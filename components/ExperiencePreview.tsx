import { experiences } from "@/data/experience";
import Link from "next/link";

export default function ExperiencePreview() {
  const preview = experiences.slice(0, 2);

  return (
    <section className="px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Experience
      </h2>

      <div className="max-w-4xl mx-auto relative border-gray-300 dark:border-gray-700 pl-6 space-y-10">
        
        {preview.map((exp, i) => (
          <div key={i} className="relative">
            
            {/* Timeline dot */}

            <div className="p-5 rounded-2xl border bg-white/30 dark:bg-gray-800/30 backdrop-blur">
              
              <h3 className="text-lg font-semibold">
                {exp.role}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {exp.company} • {exp.period}
              </p>

              <p className="mt-2 text-sm">
                {exp.description}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* View All */}
      <div className="text-center mt-8">
        <Link
          href="/experience"
          className="text-blue-500 hover:underline"
        >
          View All →
        </Link>
      </div>
    </section>
  );
}