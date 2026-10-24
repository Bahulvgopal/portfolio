"use client";

import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

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
  placeholder = "Type keyword and press Enter or +",
}: ChipInputProps) {
  const [input, setInput] = useState("");
  const chips = value ?? [];

  const addChip = () => {
    const chip = input.trim();
    if (!chip) return;
    if (chips.includes(chip)) {
      setInput("");
      return;
    }
    onChange([...chips, chip]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addChip();
    }
  };

  const removeChip = (chipToRemove: string) => {
    onChange(chips.filter((item) => item !== chipToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block font-rajdhani text-sm font-bold text-stone-200 tracking-wide">
        {label}
      </label>

      <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-3.5 space-y-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {/* Chip List */}
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <div
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/40 bg-gradient-to-r from-orange-500/15 to-rose-500/15 backdrop-blur-md px-3 py-1 text-xs font-rajdhani font-bold text-orange-200 shadow-[0_2px_10px_rgba(234,88,12,0.15)] group"
            >
              <span>{chip}</span>
              <button
                type="button"
                onClick={() => removeChip(chip)}
                className="text-orange-400 hover:text-white transition-colors"
                aria-label={`Remove ${chip}`}
              >
                <X size={13} />
              </button>
            </div>
          ))}

          {chips.length === 0 && (
            <span className="text-xs font-rajdhani font-medium text-stone-500 py-1">
              No tags entered yet
            </span>
          )}
        </div>

        {/* Input & Add Trigger */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.08]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-white placeholder:text-stone-500 outline-none"
          />

          <button
            type="button"
            onClick={addChip}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-orange-500/40 bg-orange-500/15 text-orange-300 font-orbitron text-[10px] font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all shadow-xs"
          >
            <Plus size={12} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
