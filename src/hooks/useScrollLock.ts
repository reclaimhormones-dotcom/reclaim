import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Freezes the page behind an overlay.
 *
 * `overflow: hidden` on the body is not enough here: Lenis drives the scroll
 * itself and keeps animating toward its target, so a wheel or touch gesture
 * would still move the page behind the modal. Lenis has to be stopped too.
 *
 * The body also gets padding equal to the scrollbar width it loses, otherwise
 * the whole layout jumps sideways the moment the overlay opens.
 */
export function useScrollLock(active: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!active) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;
    lenis?.stop();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      lenis?.start();
    };
  }, [active, lenis]);
}
