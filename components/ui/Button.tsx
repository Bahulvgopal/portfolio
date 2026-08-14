import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition",
    {
      "bg-blue-600 hover:bg-blue-700 text-white":
        variant === "primary",

      "bg-slate-800 hover:bg-slate-700 text-white":
        variant === "secondary",

      "bg-red-600 hover:bg-red-700 text-white":
        variant === "danger",
    },
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}