"use client";

import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { Plus } from "lucide-react";

import type { ProjectInput } from "@/validations/project";
import WalkthroughItem from "./WalkthroughItem";

interface WalkthroughEditorProps {
  control: Control<ProjectInput>;
  register: UseFormRegister<ProjectInput>;
  watch: UseFormWatch<ProjectInput>;
  setValue: UseFormSetValue<ProjectInput>;
}

export default function WalkthroughEditor({
  control,
  register,
  watch,
  setValue,
}: WalkthroughEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "walkthrough",
  });

  return (
    <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/20 bg-slate-950/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]">
      {/* Top Glass Glare Line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 p-6 sm:p-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-orbitron text-[9px] font-bold text-orange-400 tracking-widest uppercase">
              // VISUAL CASE STUDY // 「工程」
            </span>
            <span className="text-stone-500 font-mono text-xs hidden sm:inline">· · ·</span>
          </div>

          <h2 className="font-orbitron text-base sm:text-lg font-black text-white uppercase tracking-wide">
            PROJECT WALKTHROUGH & SCREENSHOTS
          </h2>

          <p className="mt-1 font-rajdhani text-sm font-semibold text-stone-300">
            Showcase milestone screens, interactive steps, target viewports, and deep-dive notes.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              description: "",
              device: "desktop",
              order: fields.length,
              image: {
                url: "",
                publicId: "",
              },
            })
          }
          className="
            inline-flex items-center gap-2 rounded-2xl
            bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600
            px-5 py-3
            font-orbitron text-xs font-black uppercase tracking-wider text-white
            shadow-[0_4px_20px_rgba(249,115,22,0.4)]
            transition-all duration-300 hover:scale-105 border border-white/25
            self-start sm:self-auto shrink-0
          "
        >
          <Plus size={15} />
          <span>ADD STEP ({fields.length})</span>
        </button>
      </div>

      {/* Steps List */}
      <div className="p-6 sm:p-7 space-y-6">
        {fields.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
            <p className="font-rajdhani text-sm font-semibold text-stone-400">
              No walkthrough steps attached yet. Click &quot;+ ADD STEP&quot; to begin building your visual gallery.
            </p>
          </div>
        ) : (
          fields.map((field, index) => (
            <WalkthroughItem
              key={field.id}
              index={index}
              register={register}
              watch={watch}
              setValue={setValue}
              remove={remove}
            />
          ))
        )}
      </div>
    </div>
  );
}
