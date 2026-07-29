import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  register: UseFormRegisterReturn;
  description?: string;
}

export default function FormCheckbox({
  label,
  description,
  register,
  ...props
}: FormCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-200 hover:border-sky-500/25 hover:bg-white/[0.03]">
      <input
        type="checkbox"
        {...register}
        {...props}
        className="mt-1 h-4 w-4 rounded border-white/[0.2] bg-white/[0.03] accent-sky-500 outline-none focus:ring-2 focus:ring-sky-500/30"
      />

      <div>
        <p className="text-sm font-medium text-white">{label}</p>

        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>
    </label>
  );
}