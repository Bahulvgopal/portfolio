import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | string;
  required?: boolean;
}

export default function FormInput({
  label,
  register,
  error,
  required,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block font-rajdhani text-sm font-bold text-stone-200 tracking-wide">
        {label}
        {required && (
          <span className="ml-1 text-orange-400 font-bold">*</span>
        )}
      </label>

      <input
        {...register}
        {...props}
        className={`
          w-full rounded-2xl border border-white/15
          bg-white/[0.04] backdrop-blur-xl
          px-4 py-3.5 text-sm text-white placeholder:text-stone-500
          outline-none transition-all duration-300
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]
          hover:border-white/25 hover:bg-white/[0.06]
          focus:border-orange-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/25
          ${className}
        `}
      />

      {error && (
        <p className="mt-1.5 font-rajdhani text-xs font-bold text-rose-400">
          {typeof error === "string"
            ? error
            : error.message}
        </p>
      )}
    </div>
  );
}
