"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ChipInputProps {
  label: string;
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function ChipInput({
  label,
  value = [],
  onChange,
  placeholder = "Type and press Enter",
}: ChipInputProps) {
  const [input, setInput] = useState("");
  
const chips = value ?? [];
  const addChip = () => {
    const chip = input.trim();

    if (!chip) return;

    const chips = value ?? [];

if (chips.includes(chip)) {
  setInput("");
  return;
}

onChange([...chips, chip]);
    setInput("");
  };

  const removeChip = (chip: string) => {
    const chips = value ?? [];
onChange(chips.filter((item) => item !== chip));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        {label}
      </label>

      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-700 bg-slate-900 p-3">
        {(value ?? []).map((chip) => (
          <div
            key={chip}
            className="flex items-center gap-2 rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-300"
          >
            <span>{chip}</span>

            <button
              type="button"
              onClick={() => removeChip(chip)}
              className="hover:text-red-400"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addChip();
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-[160px] bg-transparent text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}