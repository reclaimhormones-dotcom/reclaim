import { useId, useState } from "react";
import { Plus } from "lucide-react";

export type AccordionItem = { question: string; answer: string };

/**
 * Accessible accordion with a real open/close animation.
 *
 * <details> cannot animate its own height, so each panel is a CSS grid whose
 * row track goes 0fr -> 1fr — that interpolates smoothly without measuring
 * anything in JavaScript and without hard-coding a max-height. Panels stay in
 * the DOM (hidden from assistive tech via aria-hidden) so in-page search and
 * the closing transition both keep working.
 */
export function Accordion({
  items,
  className = "",
  /** Index open on first render, or null for all closed. */
  defaultOpen = null,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question} className="surface overflow-hidden bg-background">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="tactile flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-semibold text-foreground"
              >
                <span className="min-w-0">{item.question}</span>
                <span
                  className={`icon-pod size-8 shrink-0 rounded-full transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              data-open={isOpen}
              className="accordion-panel"
            >
              <div>
                <p className="px-5 pb-5 text-pretty-body text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
