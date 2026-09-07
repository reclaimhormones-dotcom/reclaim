import { useEffect, useRef, useState } from "react";

import { cldOptimize, cldSrcSet } from "@/lib/cloudinary";

/** Neutral shimmer block used while content or images load. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`img-skeleton rounded-xl ${className}`} aria-hidden="true" />;
}

/**
 * Progressive image.
 *
 * A CSS shimmer fills the frame from the first painted frame and the photo
 * cross-fades over it once it has actually decoded, so an image area is never
 * blank and never pops in half-painted. The placeholder is deliberately CSS
 * rather than a tiny remote rendition: fetching one cost a second round trip
 * per image and left the box empty until it arrived.
 *
 * A `srcset` is emitted so phones download a phone-sized file. Pass `sizes`
 * whenever the rendered width is known — without it the browser assumes full
 * viewport width and over-downloads.
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
  const srcSet = src ? cldSrcSet(src, width) : "";

  /* A cached image can finish before React attaches onLoad, which would leave
     the photo stuck at opacity 0. Reconcile against the DOM after mount. */
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [full]);

  return (
    <div
      className={`relative overflow-hidden ${loaded ? "" : "img-skeleton"} ${className}`}
      /* The shimmer is decorative; the photo above carries the alt text. */
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
          onLoad={() => setLoaded(true)}
          /* A broken or removed upload must not leave a shimmer running forever. */
          onError={() => setLoaded(true)}
          className={`size-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${zoom ? "img-zoom" : ""} ${imgClassName}`}
        />
      ) : null}
    </div>
  );
}
