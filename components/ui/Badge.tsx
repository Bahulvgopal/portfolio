interface Props {
  status: "draft" | "published";
}

export default function Badge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        status === "published"
          ? "bg-green-600/20 text-green-400"
          : "bg-yellow-600/20 text-yellow-400"
      }`}
    >
      {status}
    </span>
  );
}