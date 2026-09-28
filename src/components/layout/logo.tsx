import Link from "next/link";
import { site } from "@/lib/catalog";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 font-semibold tracking-tight ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-button bg-accent text-sm font-bold text-on-accent"
      >
        SJ
      </span>
      <span className="text-lg">{site.name}</span>
    </Link>
  );
}
