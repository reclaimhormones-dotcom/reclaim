import { useEffect, useRef, useState } from "react";

import { NAVIGATION_DEFAULT } from "@/lib/site-content";

/**
 * Premium full-screen intro loader.
 * - Ivory canvas, centred brand mark with a soft reveal
 * - Drifting botanical particles (transform/opacity only, 60fps safe)
 * - Sage progress line that completes once assets are ready (1.8s min, 2.5s max)
 * - Fades away without layout shift; fully skipped for reduced-motion users
 */

const MIN_MS = 1800;
const MAX_MS = 2500;
const FADE_MS = 600;

const LEAVES = [
  { left: "8%", delay: "0s", duration: "13s", size: 34, drift: "26px", opacity: 0.5 },
  { left: "22%", delay: "-4s", duration: "16s", size: 22, drift: "-18px", opacity: 0.38 },
  { left: "38%", delay: "-8s", duration: "14s", size: 44, drift: "34px", opacity: 0.3 },
  { left: "54%", delay: "-2s", duration: "18s", size: 26, drift: "-28px", opacity: 0.45 },
  { left: "68%", delay: "-6s", duration: "15s", size: 38, drift: "22px", opacity: 0.34 },
  { left: "82%", delay: "-10s", duration: "17s", size: 28, drift: "-24px", opacity: 0.42 },
  { left: "92%", delay: "-3s", duration: "14s", size: 20, drift: "18px", opacity: 0.36 },
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
  const [progress, setProgress] = useState(6);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const startRef = useRef(Date.now());

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

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      setProgress(100);
      fadeTimer = setTimeout(() => setLeaving(true), 200);
      goneTimer = setTimeout(() => setGone(true), 200 + FADE_MS);
    };

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min(96, 6 + (elapsed / MAX_MS) * 90));
      if (elapsed >= MAX_MS || (assetsReady && elapsed >= MIN_MS)) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const hardStop = setTimeout(finish, MAX_MS + 120);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hardStop);
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
        <img
          src={NAVIGATION_DEFAULT.logo}
          alt=""
          width={640}
          height={168}
          className="h-auto w-[min(74vw,26rem)] select-none"
          fetchPriority="high"
        />
        <p className="site-loader__tag mt-5 text-center text-[0.62rem] uppercase tracking-[0.34em] text-brand-deep/70 sm:text-[0.7rem]">
          Nourishing Hormones · Restoring You
        </p>
      </div>

      <div className="absolute bottom-[max(1.75rem,env(safe-area-inset-bottom))] left-1/2 w-[min(78vw,20rem)] -translate-x-1/2">
        <div className="site-loader__track h-[3px] w-full overflow-hidden rounded-full">
          <div
            className="site-loader__bar h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
