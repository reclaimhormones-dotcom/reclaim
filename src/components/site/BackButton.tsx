import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/**
 * Back control for a detail page.
 *
 * Goes back through history when there is somewhere to go back to, so a reader
 * returns to the exact list position they came from. Landing here cold — a
 * shared link, a search result — has no history to use, so it falls back to
 * the given route instead of trapping the visitor or leaving the site.
 */
export function BackButton({
  fallbackTo = "/programs",
  label = "Back",
  className = "",
}: {
  fallbackTo?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  function goBack() {
    /* history.length is 1 on a cold load in a fresh tab. */
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
      return;
    }
    void router.navigate({ to: fallbackTo });
  }

  return (
    <div className={`mx-auto max-w-7xl px-4 pt-20 lg:px-8 lg:pt-24 ${className}`}>
      <button
        type="button"
        onClick={goBack}
        className="tactile group inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-4 py-2.5 text-sm font-medium text-brand-deep backdrop-blur transition-colors hover:bg-accent"
      >
        <ArrowLeft
          className="size-4 text-brand transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        {label}
      </button>
    </div>
  );
}
