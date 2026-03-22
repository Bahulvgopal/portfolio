import Link from "next/link";

export default function ProjectCard({ project }: any) {
  return (
    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 border border-white/20 hover:scale-105 hover:shadow-2xl transition duration-300">
      <h3 className="text-xl font-semibold">
        {project.title}
      </h3>

      <p className="text-gray-700 dark:text-gray-300 mt-2">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t: string) => (
          <span
            key={t}
            className="text-xs px-2 py-1 bg-white/20 rounded backdrop-blur"
          >
            {t}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="inline-block mt-5 text-blue-500 font-medium"
      >
        View Details →
      </Link>
    </div>
  );
}