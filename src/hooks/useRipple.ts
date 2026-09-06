import { useEffect } from "react";

/**
 * Delegated ripple feedback for every `.tactile` control on the site.
 *
 * One document-level listener rather than per-button handlers: buttons stay
 * plain markup, and adding the class anywhere is enough to opt in. The ink
 * node removes itself when its animation ends, so nothing accumulates.
 */
export function useGlobalRipple() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Element | null;
      const host = target?.closest?.(".tactile") as HTMLElement | null;
      if (!host || host.hasAttribute("disabled") || host.dataset["noRipple"] === "true") return;

      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      /* Diameter covers the far corner so the ink always fills the control. */
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2;

      const ink = document.createElement("span");
      ink.className = "ripple-ink";
      ink.style.width = `${size}px`;
      ink.style.height = `${size}px`;
      ink.style.left = `${x - size / 2}px`;
      ink.style.top = `${y - size / 2}px`;
      ink.addEventListener("animationend", () => ink.remove(), { once: true });

      host.appendChild(ink);
    }

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);
}
