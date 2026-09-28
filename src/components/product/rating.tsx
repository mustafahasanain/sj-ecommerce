import { Star } from "lucide-react";

type RatingProps = {
  value: number;
  count?: number;
  className?: string;
};

export function Rating({ value, count, className = "" }: RatingProps) {
  const filled = Math.round(value);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="sr-only">Rated {value} out of 5</span>
      <span className="flex gap-0.5 text-rating" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${i < filled ? "fill-current" : "text-line-strong"}`}
            strokeWidth={1.5}
          />
        ))}
      </span>
      {count !== undefined && (
        <span className="text-xs text-ink-muted">
          ({count.toLocaleString("en-US")}
          <span className="sr-only"> reviews</span>)
        </span>
      )}
    </div>
  );
}
