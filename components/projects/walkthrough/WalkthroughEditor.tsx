"use client";

import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

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
    <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/30 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Project Walkthrough
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Showcase each important screen of your project with a title,
            description, screenshot, and target device.
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
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          + Add Step
        </button>

      </div>

      {fields.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center text-slate-500">
          No walkthrough steps added yet.
        </div>
      )}

      <div className="space-y-6">

        {fields.map((field, index) => (
          <WalkthroughItem
            key={field.id}
            index={index}
            register={register}
            watch={watch}
            setValue={setValue}
            remove={remove}
          />
        ))}

      </div>
    </div>
  );
}