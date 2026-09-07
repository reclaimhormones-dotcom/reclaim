import { useEffect, useRef, useState } from "react";

import { useNavigationContent } from "@/hooks/useSiteContent";

/**
 * Premium full-screen intro loader.
 * - Ivory canvas, centred brand mark with a soft reveal
 * - Drifting botanical particles (transform/opacity only, 60fps safe)
 * - Sage progress line that completes once assets are ready (1.8s min, 2.5s max)
 * - Fades away without layout shift; fully skipped for reduced-motion users
 */

const MIN_MS = 1400;
const MAX_MS = 1700;
const FADE_MS = 1200;

const LEAVES = [
  { left: "8%", delay: "0s", duration: "24s", size: 34, drift: "16px", opacity: 0.4 },
  { left: "22%", delay: "-4s", duration: "32s", size: 22, drift: "-12px", opacity: 0.3 },
  { left: "38%", delay: "-8s", duration: "28s", size: 44, drift: "24px", opacity: 0.2 },
  { left: "54%", delay: "-2s", duration: "36s", size: 26, drift: "-18px", opacity: 0.35 },
  { left: "68%", delay: "-6s", duration: "30s", size: 38, drift: "14px", opacity: 0.25 },
  { left: "82%", delay: "-10s", duration: "34s", size: 28, drift: "-16px", opacity: 0.32 },
  { left: "92%", delay: "-3s", duration: "26s", size: 20, drift: "12px", opacity: 0.28 },
];

function Leaf({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M21 3c-7.5.4-12.2 3-14.7 6.6C4 12.9 4.3 16.8 6.8 19.3 9.3 21.8 13.2 22 16.4 19.7 20 17.2 20.6 10.5 21 3Z"
        fill="currentColor"
      />
      <path
        d="M20 4C15 8 10.5 12.6 6.4 19.6"
        stroke="oklch(1 0 0 / 0.55)"
        strokeWidth="0.9"
        fill="none"
      />
    </svg>
  );
}

export function SiteLoader() {
  const nav = useNavigationContent();
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const startRef = useRef(Date.now());
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setGone(true);
      return;
    }

    document.documentElement.dataset["loading"] = "true";

    let assetsReady = document.readyState === "complete";
    const onLoad = () => {
      assetsReady = true;
    };
    window.addEventListener("load", onLoad);

    let frame = 0;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let goneTimer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;
    
    let currentProgress = 0;
    let targetProgress = 0;
    let holdTimerStarted = false;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;

      if (!finished) {
        if ((assetsReady && elapsed >= MIN_MS) || elapsed >= MAX_MS) {
          targetProgress = 100;
        } else {
          targetProgress = (elapsed / MAX_MS) * 100;
        }
      }

      // Smooth easing (lerp) towards target
      currentProgress += (targetProgress - currentProgress) * 0.12;

      // Snap to 100 when close enough to finish
      if (currentProgress >= 99.9) {
        currentProgress = 100;
      }

      // Direct DOM manipulation for zero-flicker 60FPS
      if (barRef.current) barRef.current.style.width = `${currentProgress}%`;
      if (textRef.current) textRef.current.innerText = `${Math.floor(currentProgress)}%`;

      if (currentProgress === 100) {
        if (!holdTimerStarted) {
          holdTimerStarted = true;
          finished = true;
          fadeTimer = setTimeout(() => setLeaving(true), 200);
          goneTimer = setTimeout(() => setGone(true), 200 + FADE_MS);
        }
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (goneTimer) clearTimeout(goneTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!gone) return;
    delete document.documentElement.dataset["loading"];
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`site-loader fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${
        leaving ? "site-loader--leaving" : ""
      }`}
    >
      {/* soft radial warmth */}
      <div className="site-loader__glow pointer-events-none absolute inset-0" />

      {/* botanical particles */}
      <div className="pointer-events-none absolute inset-0">
        {LEAVES.map((leaf, i) => (
          <span
            key={i}
            className="site-loader__leaf absolute text-brand"
            style={{
              left: leaf.left,
              opacity: leaf.opacity,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              ["--leaf-drift" as string]: leaf.drift,
            }}
          >
            <Leaf size={leaf.size} />
          </span>
        ))}
      </div>

      <div className="site-loader__mark relative flex flex-col items-center px-6">
        {/*
         * The admin's logo, never a bundled stand-in. Until it arrives the
         * space is held open at the same size so the mark does not jump in.
         */}
        {nav.logo ? (
          <img
            src={nav.logo}
            alt={nav.logoAlt || "Reclaim Hormones"}
            width={640}
            height={168}
            className="h-auto w-[min(74vw,26rem)] select-none"
            fetchPriority="high"
          />
        ) : (
          <div className="h-24 w-[min(74vw,26rem)]" aria-hidden="true" />
        )}
        {/* Progress bar container (aligned to logo width, spaced 24px below) */}
        <div className="mt-6 flex w-[min(74vw,26rem)] items-center gap-3">
          <div className="site-loader__track h-[2px] w-full overflow-hidden rounded-full">
            <div
              ref={barRef}
              className="site-loader__bar h-full w-0 rounded-full"
            />
          </div>
          <span 
            ref={textRef} 
            className="w-[32px] text-right text-[0.65rem] font-semibold text-brand-deep/60 tabular-nums"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
