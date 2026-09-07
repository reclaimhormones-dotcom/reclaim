import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import type { TestimonialDoc } from "@/lib/content-types";

/** Cards shown per page before pagination kicks in. */
const PAGE_SIZE = 6;

/**
 * Testimonials laid out according to how many there are.
 *
 * The clinic controls the count from the dashboard, so the layout has to hold
 * up at one story and at fifty without anyone touching CSS:
 *
 *   1  — a single centred featured card, not one card stranded in a 3-up grid
 *   2  — side by side, centred, so the row does not stretch across three slots
 *   3+ — a balanced responsive grid
 *   >6 — the same grid, paginated, so the section never runs down the page
 *
 * Mobile is always a single column with generous spacing.
 */
export function TestimonialGrid({ items }: { items: TestimonialDoc[] }) {
  const [page, setPage] = useState(0);

  if (items.length === 0) return null;

  const pages = Math.ceil(items.length / PAGE_SIZE);
  const visible = pages > 1 ? items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) : items;

  const columns =
    items.length === 1
      ? "mx-auto max-w-md grid-cols-1"
      : items.length === 2
        ? "mx-auto max-w-3xl grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div className={`mt-8 grid gap-5 lg:gap-6 ${columns}`}>
        {visible.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i * 90, 360)} className="h-full">
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </div>

      {pages > 1 ? (
        <nav
          aria-label="More stories"
          className="mt-8 flex items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous stories"
            className="tactile flex size-10 items-center justify-center rounded-full border border-border bg-background text-brand-deep transition-colors hover:bg-accent disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Stories page ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page ? "w-6 bg-primary" : "w-1.5 bg-primary/25"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page === pages - 1}
            aria-label="More stories"
            className="tactile flex size-10 items-center justify-center rounded-full border border-border bg-background text-brand-deep transition-colors hover:bg-accent disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
