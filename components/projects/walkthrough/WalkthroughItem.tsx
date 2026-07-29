"use client";

import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ImageUploader from "@/components/ui/ImageUploader";
import { ProjectInput } from "@/validations/project";

interface WalkthroughItemProps {
  index: number;
  register: UseFormRegister<ProjectInput>;
  watch: UseFormWatch<ProjectInput>;
  setValue: UseFormSetValue<ProjectInput>;
  remove: (index: number) => void;
}

export default function WalkthroughItem({
  index,
  register,
  watch,
  setValue,
  remove,
}: WalkthroughItemProps) {
  return (
    <div className="space-y-5 rounded-xl border border-slate-700 bg-slate-900/40 p-5">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold text-white">
          Step {index + 1}
        </h3>

        <button
          type="button"
          onClick={() => remove(index)}
          className="rounded-lg bg-red-500/20 px-3 py-1 text-red-400 hover:bg-red-500/30"
        >
          Remove
        </button>

      </div>

      {/* Title */}

      <div>

        <label className="mb-2 block text-sm text-white">
          Step Title
        </label>

        <input
          {...register(`walkthrough.${index}.title`)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          placeholder="Landing Page"
        />

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block text-sm text-white">
          Description
        </label>

        <textarea
          rows={4}
          {...register(`walkthrough.${index}.description`)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          placeholder="Explain what this page does..."
        />

      </div>

      {/* Device */}

      <div>

        <label className="mb-2 block text-sm text-white">
          Device
        </label>

        <select
          {...register(`walkthrough.${index}.device`)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        >
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>

      </div>

      {/* Screenshot */}

      <div>

        <label className="mb-2 block text-sm text-white">
          Screenshot
        </label>

        <ImageUploader
  folder="projects"
  value={watch(`walkthrough.${index}.image`)}
  onChange={(image) => {
  setValue(
    `walkthrough.${index}.image`,
    image,
    {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    }
  );
}}
/>

      </div>

    </div>
  );
}