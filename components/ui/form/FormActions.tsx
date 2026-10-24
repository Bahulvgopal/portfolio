import { Trash2, CheckCircle2, Loader2 } from "lucide-react";

interface FormActionsProps {
  mode: "create" | "edit";
  isSubmitting: boolean;
  entity: string;
  onDelete?: () => void;
}

export default function FormActions({
  mode,
  isSubmitting,
  entity,
  onDelete,
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse items-stretch gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {mode === "edit" && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isSubmitting}
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2
              rounded-2xl border border-rose-500/30 bg-rose-500/[0.08] backdrop-blur-xl
              px-6 py-3.5
              font-orbitron text-xs font-bold uppercase tracking-wider text-rose-300
              shadow-[0_4px_16px_rgba(244,63,94,0.15),inset_0_1px_1px_rgba(244,63,94,0.2)]
              transition-all duration-300
              hover:border-rose-500/60 hover:bg-rose-500/[0.18] hover:text-white hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Trash2 size={15} />
            <span>Delete {entity}</span>
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full sm:w-auto inline-flex items-center justify-center gap-2.5
          rounded-2xl border border-white/25
          bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600
          px-8 py-3.5
          font-orbitron text-xs font-black uppercase tracking-wider text-white
          shadow-[0_4px_24px_rgba(249,115,22,0.45)]
          transition-all duration-300
          hover:shadow-[0_8px_32px_rgba(249,115,22,0.65)] hover:scale-[1.02]
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            <span>{mode === "create" ? "CREATING RECORD..." : "SAVING MISSION CHANGES..."}</span>
          </>
        ) : (
          <>
            <CheckCircle2 size={16} />
            <span>
              {mode === "create" ? `Deploy New ${entity}` : `Update ${entity}`}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
