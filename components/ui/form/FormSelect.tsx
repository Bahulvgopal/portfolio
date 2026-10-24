import { SelectHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError | string;
  required?: boolean;
}

export default function FormSelect({
  label,
  options,
  register,
  error,
  required,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block font-rajdhani text-sm font-bold text-stone-200 tracking-wide">
        {label}
        {required && (
          <span className="ml-1 text-orange-400 font-bold">*</span>
        )}
      </label>

      <div className="relative">
        <select
          {...register}
          {...props}
          className={`
            w-full appearance-none rounded-2xl border border-white/15
            bg-white/[0.04] backdrop-blur-xl
            px-4 py-3.5 pr-10 text-sm text-white outline-none
            transition-all duration-300
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]
            hover:border-white/25 hover:bg-white/[0.06]
            focus:border-orange-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-orange-500/25
            ${className}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#0b0f19] text-white py-2"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-orange-400"
        />
      </div>

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
