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
    <div className="flex flex-col-reverse items-stretch gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {mode === "edit" && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="w-full rounded-xl border border-rose-500/20 bg-rose-500/[0.06] px-5 py-3 text-sm font-semibold text-rose-300 transition-all duration-200 hover:border-rose-500/40 hover:bg-rose-500/[0.12] hover:text-rose-200 sm:w-auto"
          >
            Delete
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_0_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-neutral-100 hover:shadow-[0_0_48px_rgba(255,255,255,0.14)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting
          ? mode === "create"
            ? "Creating..."
            : "Updating..."
          : mode === "create"
          ? `Create ${entity}`
          : `Update ${entity}`}
      </button>
    </div>
  );
}