"use client";

import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Trash2 } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-rose-600 text-white font-orbitron text-[10px] font-black uppercase tracking-wider shadow-xs">
            STEP {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-rajdhani text-sm font-bold text-stone-300">
            Phase Parameters
          </span>
        </div>

        <button
          type="button"
          onClick={() => remove(index)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 font-orbitron text-[10px] font-bold uppercase text-rose-300 hover:bg-rose-500/20 hover:text-white transition-all shadow-xs"
        >
          <Trash2 size={13} />
          <span>Remove</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block font-rajdhani text-sm font-bold text-stone-200">
            Step / Phase Title
          </label>
          <input
            {...register(`walkthrough.${index}.title`)}
            className="w-full rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-xl px-4 py-3 text-sm text-white placeholder:text-stone-500 outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08]"
            placeholder="e.g. Interactive Dashboard Showcase"
          />
        </div>

        {/* Device Viewport */}
        <div className="space-y-1.5">
          <label className="block font-rajdhani text-sm font-bold text-stone-200">
            Target Viewport Frame
          </label>
          <select
            {...register(`walkthrough.${index}.device`)}
            className="w-full rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-xl px-4 py-3 text-sm text-white outline-none transition-all focus:border-orange-500"
          >
            <option value="desktop" className="bg-[#0b0f19] text-white">Desktop (1920x1080)</option>
            <option value="tablet" className="bg-[#0b0f19] text-white">Tablet (iPad Viewport)</option>
            <option value="mobile" className="bg-[#0b0f19] text-white">Mobile (Smartphone Viewport)</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="block font-rajdhani text-sm font-bold text-stone-200">
          Technical Breakdown & UI Notes
        </label>
        <textarea
          rows={3}
          {...register(`walkthrough.${index}.description`)}
          className="w-full rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-3.5 text-sm text-white placeholder:text-stone-500 outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08]"
          placeholder="Explain the UX flow, animations, or architecture demonstrated in this screenshot..."
        />
      </div>

      {/* Screenshot Upload */}
      <div className="space-y-1.5">
        <label className="block font-rajdhani text-sm font-bold text-stone-200">
          Milestone Screenshot Attachment
        </label>
        <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-3 transition-colors hover:border-orange-500/40">
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
    </div>
  );
}
