interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="border-b border-white/[0.08] px-6 py-4">
        <h2
          className="text-lg font-black tracking-tight text-white"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-neutral-400">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-6 p-6">
        {children}
      </div>
    </section>
  );
}