import { Star } from "lucide-react";

/**
 * Star rating that pops in one star at a time when it scrolls into view.
 *
 * The animation is driven by the nearest `[data-reveal]` ancestor rather than
 * by mount, so ratings inside an off-screen card wait their turn. A single
 * accessible label replaces the decorative icons for screen readers.
 */
export function Rating({
  value,
  max = 5,
  className = "",
  size = "sm",
}: {
  value: number;
  max?: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  const filled = Math.max(0, Math.min(max, Math.round(value)));
  const iconSize = size === "lg" ? "size-[1.05rem]" : "size-3.5";

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${filled} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          style={{ animationDelay: `${i * 90}ms` }}
          className={`star-pop ${iconSize} ${
            i < filled ? "fill-gold text-gold" : "fill-transparent text-border"
          }`}
        />
      ))}
    </span>
  );
}
