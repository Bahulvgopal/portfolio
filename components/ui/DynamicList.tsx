"use client";
import { useEffect } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface DynamicListProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  fields: FieldArrayWithId<T>[];
  register: UseFormRegister<T>;
  append: UseFieldArrayAppend<T>;
  remove: UseFieldArrayRemove;
  name: Path<T>;
}

export default function DynamicList<T extends FieldValues>({
  label,
  placeholder,
  fields,
  register,
  append,
  remove,
  name,
}: DynamicListProps<T>) {
  useEffect(() => {
    if (fields.length === 0) {
      append({ value: "" } as never);
    }
  }, [fields.length, append]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-300">
          {label}
        </label>

        <button
          type="button"
          onClick={() => append({ value: "" } as never)}
          className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-sky-300 transition-all duration-200 hover:border-sky-500/40 hover:bg-sky-500/[0.08] hover:text-sky-200"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`${name}.${index}.value` as Path<T>)}
              placeholder={placeholder}
              className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:border-sky-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]"
            />

            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              className={`rounded-xl px-4 text-sm transition-all duration-200 ${
                fields.length === 1
                  ? "cursor-not-allowed border border-white/[0.06] bg-white/[0.02] text-neutral-600"
                  : "border border-rose-500/20 bg-rose-500/[0.06] text-rose-300 hover:border-rose-500/40 hover:bg-rose-500/[0.12] hover:text-rose-200"
              }`}
            >
              ✕
            </button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/[0.1] p-6 text-center text-sm text-neutral-500">
            No {label.toLowerCase()} added yet.
          </div>
        )}
      </div>
    </div>
  );
}