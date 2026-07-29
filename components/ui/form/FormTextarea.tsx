import { TextareaHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | string;
  required?: boolean;
}

export default function FormTextarea({
  label,
  register,
  error,
  required,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-300">
        {label}
        {required && <span className="ml-1 text-rose-400">*</span>}
      </label>

      <textarea
        {...register}
        {...props}
        className={`min-h-[140px] w-full rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:border-sky-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)] ${className}`}
      />

      {error && (
        <p className="mt-2 text-sm text-rose-400">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
}