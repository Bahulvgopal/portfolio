import ImageUploader from "@/components/ui/ImageUploader";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface FormImageProps {
  label: string;
  folder: string;
  value: { url: string; publicId: string } | null | undefined;
  onChange: (image: { url: string; publicId: string } | null) => void;
  description?: string;
  error?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<{ url: string; publicId: string }>>;
}

export default function FormImage({
  label,
  folder,
  value,
  onChange,
  description,
  error,
}: FormImageProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-300">
        {label}
      </label>

      {description && (
        <p className="mb-4 text-sm text-neutral-500">{description}</p>
      )}

      <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] p-4 transition-colors duration-200 hover:border-sky-500/30">
        <ImageUploader folder={folder} value={value} onChange={onChange} />
      </div>

      {error && <p className="mt-2 text-sm text-rose-400">{error.message}</p>}
    </div>
  );
}