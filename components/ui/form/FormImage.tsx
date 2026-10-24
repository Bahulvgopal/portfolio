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
    <div className="space-y-1.5">
      <label className="block font-rajdhani text-sm font-bold text-stone-200 tracking-wide">
        {label}
      </label>

      {description && (
        <p className="font-rajdhani text-xs font-medium text-stone-400 mb-2">
          {description}
        </p>
      )}

      <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] backdrop-blur-xl p-4 transition-all duration-300 hover:border-orange-500/50 hover:bg-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <ImageUploader folder={folder} value={value} onChange={onChange} />
      </div>

      {error && (
        <p className="mt-1.5 font-rajdhani text-xs font-bold text-rose-400">
          {error.message}
        </p>
      )}
    </div>
  );
}
