import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

import { TRANSPARENT_PIXEL } from "@/lib/cloudinary";

type Action = {
  label: string;
  /** Internal route */
  to?: string;
  /** Same-page anchor or external/tel/mailto href */
  href?: string;
  hash?: string;
  /** Search params carried to the destination route. */
  search?: Record<string, string>;
  /** In-place action (e.g. opening the consultation modal) instead of a link. */
  onClick?: () => void;
};

export type MobilePageHeroProps = {
  img: string;
  alt: string;
  eyebrow: string;
  /** Headline first line(s) */
  title: string;
  /** Emphasised second line, rendered in brand green italic */
  titleAccent: string;
  subtitle: string;
  primary: Action;
  secondary?: Action;
  /** Anchor id the scroll cue jumps to */
  scrollTo: string;
  /** Tailwind object-position utility for the photo focal point */
  position?: string;
};

function ActionLink({
  action,
  className,
  children,
}: {
  action: Action;
  className: string;
  children: React.ReactNode;
}) {
  if (action.onClick) {
    return (
      <button type="button" onClick={action.onClick} className={className}>
        {children}
      </button>
    );
  }
  if (action.to) {
    return (
      <Link
        to={action.to}
        {...(action.hash ? { hash: action.hash } : {})}
        {...(action.search ? { search: action.search } : {})}
        className={className}
      >
        {children}
      </Link>
    );
  }
  const external = action.href?.startsWith("http");
  return (
    <a
      href={action.href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={className}
    >
      {children}
    </a>
  );
}

/**
 * Full-screen (single viewport) cinematic hero used on mobile for the inner
 * pages. Mirrors the home page hero language: bright photography, airy cream
 * scrims for legibility, one promise and one clear action.
 */
export function MobilePageHero({
  img,
  alt,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primary,
  secondary,
  scrollTo,
  position = "object-[50%_22%]",
}: MobilePageHeroProps) {
  /* Held until the photo has decoded, so the hero is never an empty band. */
  const [ready, setReady] = useState(false);

  return (
    <section className="relative isolate h-[100svh] overflow-hidden bg-cream lg:hidden">
      {!ready ? <div className="img-skeleton absolute inset-0" aria-hidden="true" /> : null}
      <img
        src={img || TRANSPARENT_PIXEL}
        alt={img ? alt : ""}
        width={896}
        height={1344}
        fetchPriority="high"
        onLoad={() => img && setReady(true)}
        onError={() => setReady(true)}
        className={`absolute inset-0 size-full object-cover ${position} transition-opacity duration-700 ${
          ready ? "opacity-100 motion-safe:animate-[hero-kenburns_14s_ease-out_forwards]" : "opacity-0"
        }`}
      />

      {/* Airy legibility scrims — light cream, never dark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.24)_0%,oklch(0.983_0.008_95/0.06)_30%,oklch(0.983_0.008_95/0.5)_52%,oklch(0.983_0.008_95/0.93)_68%,oklch(0.983_0.008_95/1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_16%,oklch(1_0_0/0.34)_0%,transparent_60%)]" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-9 pt-20">
        <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-brand">
          {eyebrow}
        </span>

        <h1 className="mt-3 text-[2.35rem] leading-[1.06] tracking-[-0.015em] text-brand-deep">
          {title}
          <br />
          <span className="italic text-brand">{titleAccent}</span>
        </h1>

        <p className="mt-3.5 max-w-[20rem] text-[0.875rem] leading-relaxed text-foreground/70">
          {subtitle}
        </p>

        <ActionLink
          action={primary}
          className="tactile magnetic touch-lg fill-primary mt-7 inline-flex items-center justify-center gap-2.5 text-sm tracking-wide shadow-[0_14px_34px_-16px_oklch(0.44_0.052_140/0.85)]"
        >
          {primary.label} <ArrowRight className="size-4" />
        </ActionLink>

        {secondary && (
          <ActionLink
            action={secondary}
            className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 text-[0.8rem] font-medium tracking-wide text-brand-deep/70 underline decoration-brand/30 underline-offset-4"
          >
            {secondary.label}
          </ActionLink>
        )}

        <a
          href={`#${scrollTo}`}
          aria-label="Scroll to content"
          className="icon-pod tactile mx-auto mt-6 size-11 rounded-full"
        >
          <ChevronDown className="size-4 motion-safe:animate-bounce" />
        </a>
      </div>
    </section>
  );
}
