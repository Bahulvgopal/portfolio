import {
  SelectHTMLAttributes,
} from "react";
import {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";
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
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-300">
        {label}
        {required && (
          <span className="ml-1 text-rose-400">*</span>
        )}
      </label>

      <div className="relative">
        <select
          {...register}
          {...props}
          className={`w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 pr-10 text-sm text-white outline-none transition-all duration-200 focus:border-sky-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)] ${className}`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#0a0a0b] text-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-rose-400">
          {typeof error === "string"
            ? error
            : error.message}
        </p>
      )}
    </div>
  );
}