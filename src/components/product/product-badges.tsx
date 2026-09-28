import type { Badge, BadgeTone } from "@/lib/products";

const toneClass: Record<BadgeTone, string> = {
  sale: "badge-sale",
  new: "badge-new",
  primary: "badge-primary",
  neutral: "",
};

export function ProductBadges({ badges, className = "" }: { badges: Badge[]; className?: string }) {
  if (badges.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((badge) => (
        <li key={badge.label} className={`badge ${toneClass[badge.tone]}`}>
          {badge.label}
        </li>
      ))}
    </ul>
  );
}
