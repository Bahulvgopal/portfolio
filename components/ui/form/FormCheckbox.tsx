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
    <label className="flex cursor-pointer items-start gap-3.5 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl p-4 transition-all duration-300 hover:border-orange-500/40 hover:bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group">
      <input
        type="checkbox"
        {...register}
        {...props}
        className="mt-1 h-4 w-4 rounded-md border-white/20 bg-white/[0.05] accent-orange-500 outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
      />

      <div>
        <p className="font-rajdhani text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
          {label}
        </p>

        {description && (
          <p className="mt-0.5 font-rajdhani text-xs font-medium text-stone-400">
            {description}
          </p>
        )}
      </div>
    </label>
  );
}
