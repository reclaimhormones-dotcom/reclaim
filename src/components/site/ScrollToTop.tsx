import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useLenis } from "lenis/react";

/**
 * Starts every forward navigation at the top of the destination page.
 *
 * Lenis owns the scroll position: it keeps its own animated offset and writes
 * it back to the window on each frame. So a plain `window.scrollTo(0, 0)` —
 * including the router's own scroll restoration — gets overwritten on the very
 * next frame, which is why following a link from halfway down the home page
 * used to land you halfway down the next one. Lenis has to be told directly.
 *
 * Back and forward are deliberately left alone. A `popstate` sets a flag that
 * suppresses the reset for that navigation, so the browser and the router's
 * restoration can put the reader back where they were.
 */
export function ScrollToTop() {
  const lenis = useLenis();
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash }),
  });
  const poppingRef = useRef(false);
  /* Skips the very first run so a deep link or a refresh keeps its position. */
  const mountedRef = useRef(false);

  useEffect(() => {
    function onPopState() {
      poppingRef.current = true;
      /* Cleared once the resulting route render has settled. */
      window.setTimeout(() => {
        poppingRef.current = false;
      }, 150);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    /* Back/forward: leave history restoration to do its job. */
    if (poppingRef.current) return;
    /* An in-page anchor is its own scroll target. */
    if (hash) return;

    /* Reset both owners: the window for the initial paint, and Lenis so its
       next frame does not write the old offset straight back. */
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, hash, lenis]);

  return null;
}
