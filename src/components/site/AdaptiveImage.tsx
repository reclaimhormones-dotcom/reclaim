import { useEffect, useRef, useState } from "react";

import { cldOptimize, cldSrcSet } from "@/lib/cloudinary";

/**
 * An image that the layout adapts to, rather than the other way round.
 *
 * Admin-uploaded photos arrive in every shape — portrait phone shots, wide
 * banners, square posters — and forcing them all into one fixed frame is what
 * was slicing heads and text off program posters. This measures the image's
 * real aspect ratio as it decodes and applies that ratio to its own container,
 * so the full picture is always shown, uncropped and undistorted.
 *
 * The ratio comes from `naturalWidth/naturalHeight`, so it works for every
 * image already in Firestore with no schema change and nothing for an admin to
 * fill in. `ratio` can seed a known value to avoid the initial settle, and
 * `minRatio`/`maxRatio` stop an extreme panorama or a very tall portrait from
 * distorting the surrounding layout.
 */
export function AdaptiveImage({
  src,
  alt,
  width = 1200,
  className = "",
  imgClassName = "",
  sizes,
  eager = false,
  ratio,
  minRatio = 0.6,
  maxRatio = 2.2,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  width?: number;
  /** Wrapper classes. Width is yours to set; height follows the image. */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
  /** Known width/height ratio, if the caller already has one. */
  ratio?: number;
  /** Tallest portrait allowed, as width/height. */
  minRatio?: number;
  /** Widest panorama allowed, as width/height. */
  maxRatio?: number;
  rounded?: string;
}) {
  const [measured, setMeasured] = useState<number | null>(ratio ?? null);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const full = src ? cldOptimize(src, width) : "";
  const srcSet = src ? cldSrcSet(src, width) : "";

  function measure(img: HTMLImageElement | null) {
    /* A broken upload must not leave the shimmer running forever. */
    if (!img?.naturalWidth || !img.naturalHeight) {
      setLoaded(true);
      return;
    }
    const raw = img.naturalWidth / img.naturalHeight;
    setMeasured(Math.min(maxRatio, Math.max(minRatio, raw)));
    setLoaded(true);
  }

  /* A cached image can finish before React attaches onLoad. */
  useEffect(() => {
    if (imgRef.current?.complete) measure(imgRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  /* Until the real ratio is known, hold a calm 4:3 so nothing jumps far. */
  const applied = measured ?? 4 / 3;

  return (
    <div
      className={`relative overflow-hidden transition-[aspect-ratio] duration-500 ${
        loaded ? "" : "img-skeleton"
      } ${rounded} ${className}`}
      style={{ aspectRatio: String(applied) }}
      {...(loaded ? {} : { "aria-hidden": "true" })}
    >
      {src ? (
        <img
          ref={imgRef}
          src={full}
          {...(srcSet ? { srcSet } : {})}
          alt={alt}
          {...(sizes ? { sizes } : {})}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={(e) => measure(e.currentTarget)}
          onError={() => setLoaded(true)}
          /*
           * `contain` is the whole point: the container already matches the
           * image's ratio, so nothing is letterboxed in practice, and any
           * clamped extreme is shown whole rather than cropped.
           */
          className={`size-full object-contain transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      ) : null}
    </div>
  );
}
