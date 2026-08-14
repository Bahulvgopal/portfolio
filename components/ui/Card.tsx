interface Props {
  children: React.ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      {children}
    </div>
  );
}