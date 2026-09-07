import { useEffect, useRef, useState } from "react";

import { cldOptimize } from "@/lib/cloudinary";

/** Neutral shimmer block used while content or images load. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted/60 ${className}`} aria-hidden="true" />;
}

/**
 * Progressive image.
 *
 * A tiny blurred Cloudinary placeholder holds the layout, then the full image
 * cross-fades in once it has actually decoded — so a photo never flashes in
 * half-painted. Set `zoom` for the slow settle-in scale used across the site;
 * it rides the parent <Reveal> so the motion is tied to scroll position
 * rather than to load timing.
 */
export function SmartImage({
  src,
  alt,
  width = 1200,
  className = "",
  imgClassName = "",
  sizes,
  eager = false,
  zoom = false,
}: {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
  /** Soft scale-down as the image settles into view. */
  zoom?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const full = src ? cldOptimize(src, width) : "";
  const tiny = src.includes("/upload/")
    ? src.replace("/upload/", "/upload/f_auto,q_10,w_40,e_blur:400/")
    : src;

  /* A cached image can finish before React attaches onLoad, which would leave
     the photo stuck at opacity 0. Reconcile against the DOM after mount. */
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [full]);

  /*
   * No URL yet means the admin's data has not arrived. Hold a skeleton rather
   * than painting anything — the site never shows a stand-in photo that would
   * be swapped out a moment later. Declared after the hooks so their order
   * never changes between renders.
   */
  if (!src) {
    return (
      <div className={`relative overflow-hidden bg-muted/50 ${className}`} aria-hidden="true">
        <div className="size-full animate-pulse bg-muted/60" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-muted/40 ${className}`}>
      {!loaded ? (
        <img
          src={tiny}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 size-full scale-105 object-cover blur-md ${imgClassName}`}
        />
      ) : null}
      <img
        ref={imgRef}
        src={full}
        alt={alt}
        {...(sizes ? { sizes } : {})}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`size-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${zoom ? "img-zoom" : ""} ${imgClassName}`}
      />
    </div>
  );
}
