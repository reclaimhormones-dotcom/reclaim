import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-reveal primitives.
 *
 * Content renders normally on the server and stays visible if JavaScript never
 * runs: the hidden state lives behind `html[data-reveal-ready="true"]`, a flag
 * only set in the browser.
 *
 * The decision of whether to hide an element happens in a layout effect, before
 * the browser paints. Anything already on screen is promoted straight to "in"
 * and never animates, so a load, a refresh mid-page or a deep link cannot
 * flash blank content. Only elements still below the fold start hidden and
 * wait for the observer. Motion is opacity + transform, so reveals stay on the
 * compositor, and each element unobserves itself once it has fired.
 */

/* Layout effects must not run during SSR; fall back to a no-op there. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

let readyMarked = false;

function markReady() {
  if (readyMarked || typeof document === "undefined") return;
  readyMarked = true;
  document.documentElement.setAttribute("data-reveal-ready", "true");
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a plain div. */
  as?: ElementType;
  className?: string;
  /** Stagger offset in ms, applied as a CSS transition-delay. */
  delay?: number;
  /** How much of the element must be visible before it settles in. */
  amount?: number;
  /** Nudges the trigger line so cards settle just before they are fully in view. */
  rootMargin?: string;
};

export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
  amount = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  /* Server and first client render agree on "out"; nothing is hidden yet
     because the html-level ready flag is still absent. */
  const [state, setState] = useState<"out" | "in">("out");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    markReady();

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setState("in");
      return;
    }

    /* Already on screen at mount: show it now, before the first paint. */
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setState("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, rootMargin]);

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps each child in a <Reveal> with an increasing delay, so a grid of cards
 * cascades instead of snapping in as one block. The stagger is capped so a long
 * list never leaves the last card waiting.
 */
export function RevealGroup({
  children,
  className = "",
  step = 90,
  maxDelay = 540,
  childClassName = "",
}: {
  children: ReactNode[];
  className?: string;
  /** Delay added per child, in ms. */
  step?: number;
  maxDelay?: number;
  childClassName?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={Math.min(i * step, maxDelay)} className={childClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
