import { useState } from "react";

import { cldOptimize } from "@/lib/cloudinary";

/** Neutral shimmer block used while content or images load. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted/60 ${className}`} aria-hidden="true" />;
}

/**
 * Progressive image: a tiny blurred Cloudinary placeholder is shown first and
 * the full-quality image fades in once it has decoded.
 */
export function SmartImage({
  src,
  alt,
  width = 1200,
  className = "",
  imgClassName = "",
  sizes,
  eager = false,
}: {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const full = cldOptimize(src, width);
  const tiny = src.includes("/upload/")
    ? src.replace("/upload/", "/upload/f_auto,q_10,w_40,e_blur:400/")
    : src;

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
        src={full}
        alt={alt}
        {...(sizes ? { sizes } : {})}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`size-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
