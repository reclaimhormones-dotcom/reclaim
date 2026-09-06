import { useEffect } from "react";

/** How far a magnetic control may drift toward the cursor, in px. */
const MAX_PULL = 6;

/**
 * Magnetic hover for `.magnetic` controls.
 *
 * A single delegated pointermove nudges the hovered control a few pixels
 * toward the cursor and releases it on exit. Deliberately subtle — this is a
 * medical site, not a showreel — and limited to fine pointers, so touch users
 * (where there is no hover) and reduced-motion users get nothing at all.
 *
 * The transform is written to a custom property rather than `transform`, so it
 * composes with the press/scale that `.tactile` already applies.
 */
export function useMagneticButtons() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;

    function release(el: HTMLElement) {
      el.style.removeProperty("--magnet-x");
      el.style.removeProperty("--magnet-y");
    }

    function onMove(event: PointerEvent) {
      const target = event.target as Element | null;
      const host = target?.closest?.(".magnetic") as HTMLElement | null;

      if (host !== active) {
        if (active) release(active);
        active = host;
      }
      if (!host) return;

      /* Coalesce to one write per frame so a fast cursor cannot thrash layout. */
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        host.style.setProperty("--magnet-x", `${Math.max(-1, Math.min(1, dx)) * MAX_PULL}px`);
        host.style.setProperty("--magnet-y", `${Math.max(-1, Math.min(1, dy)) * MAX_PULL}px`);
      });
    }

    function onLeave() {
      if (active) release(active);
      active = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("blur", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (active) release(active);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);
}
