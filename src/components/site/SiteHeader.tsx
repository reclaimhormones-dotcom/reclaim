import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  ChevronRight,
  Home,
  Image as ImageIcon,
  Leaf,
  Menu,
  Phone,
  Sprout,
  User,
  X,
  HeartHandshake,
} from "lucide-react";

import { useNavigationContent, useSocialLinks } from "@/hooks/useSiteContent";
import { useConsultModal } from "@/hooks/useConsultModal";
import { SiteLink } from "./SiteLink";

const NAV_ICONS = {
  Home: Home,
  "About Us": User,
  Programs: Sprout,
  Gallery: ImageIcon,
  Contact: Phone,
} as Record<string, typeof Home>;

/** Soft botanical sprig used as decorative corner art in the mobile menu. */
function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M20 180C60 140 100 100 170 40" />
        <path d="M60 140c-6-22 4-42 24-50 4 22-6 42-24 50Z" fill="currentColor" fillOpacity="0.5" />
        <path d="M74 126c22-2 38 10 42 30-22 4-40-8-42-30Z" fill="currentColor" fillOpacity="0.4" />
        <path d="M100 100c-6-22 4-42 24-50 4 22-6 42-24 50Z" fill="currentColor" fillOpacity="0.5" />
        <path d="M114 86c22-2 38 10 42 30-22 4-40-8-42-30Z" fill="currentColor" fillOpacity="0.35" />
        <path d="M142 58c-4-20 6-36 24-42 2 20-8 36-24 42Z" fill="currentColor" fillOpacity="0.45" />
      </g>
    </svg>
  );
}

/**
 * Shared site header. All labels, links and the logo come from the
 * `navigation/main` document in the CMS.
 *
 * `overlay` = the page starts with a full-screen hero, so the bar floats
 * transparently until the user scrolls. Otherwise it is solid from the start.
 */
/** Scroll depth at which the bar turns solid. */
const SOLID_AFTER = 60;
/** Never tuck the bar away while it still overlaps the top of the page. */
const HIDE_AFTER = 80;
/** Movement below this is trackpad jitter or overscroll, not a direction. */
const DELTA_MIN = 4;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const socials = useSocialLinks();
  const nav = useNavigationContent();
  const consult = useConsultModal();

  /*
   * Solid-vs-transparent and hide-vs-reveal both come off one rAF-throttled
   * listener, so state changes at most once per frame. Direction is measured
   * against the last committed position and small deltas are ignored, which is
   * what stops the bar flickering during trackpad jitter or rubber-band
   * overscroll.
   */
  useEffect(() => {
    let lastY = window.scrollY;
    let queued = false;

    const update = () => {
      queued = false;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > SOLID_AFTER);

      const delta = y - lastY;
      /* Hold `lastY` until the page has actually moved, so slow drags still
         accumulate into a direction instead of being discarded. */
      if (Math.abs(delta) < DELTA_MIN) return;

      /* Down hides, up reveals immediately; near the top it always shows. */
      setHiddenByScroll(y > HIDE_AFTER && delta > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the full-screen mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const transparent = overlay && !scrolled;
  /* The mobile menu is a child of this element, so the bar must stay put while
     the menu is up — see the transform note on the header below. */
  const hidden = hiddenByScroll && !open;

  return (
    <header
      /* Tabbing into the bar while it is tucked away brings it straight back,
         so keyboard users never chase an off-screen control. */
      onFocusCapture={() => setHiddenByScroll(false)}
      className={`fixed top-0 z-50 w-full transition-transform duration-250 ease-[var(--ease-premium)] ${
        /*
         * The translate is applied ONLY while hidden — never a `translate-y-0`
         * resting state. Any transform here would make this element the
         * containing block for the full-screen mobile menu below, which is
         * `position: fixed` and would then be trapped inside the bar.
         *
         * Translating a fixed element also costs no reflow, so hiding and
         * revealing never shifts the page underneath.
         */
        hidden ? "-translate-y-full" : ""
      }`}
    >
      {/*
       * Two stacked surfaces rather than one swapped background: a gradient
       * cannot interpolate to a flat colour, so switching them directly pops.
       * Cross-fading their opacity gives a genuinely smooth 250ms change.
       */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border-b border-border/70 bg-background/92 transition-opacity duration-250 ${
          transparent ? "opacity-0" : "opacity-100 backdrop-blur-xl"
        } ${scrolled ? "shadow-[var(--shadow-e1)]" : ""}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/60 to-transparent transition-opacity duration-250 ${
          transparent ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between lg:px-8 lg:py-4">
        <Link to="/" className="min-w-0">
          {/* Skeleton, never a bundled logo, until the admin's data lands. */}
          {nav.logo ? (
            <img src={nav.logo} alt={nav.logoAlt} className="h-8 w-auto lg:h-10" />
          ) : (
            <div className="h-8 w-32 animate-pulse rounded-md bg-muted/60 lg:h-10 lg:w-40" />
          )}
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.items.map((item) => {
            const active = pathname === item.to;
            return (
              <SiteLink
                key={item.label}
                to={item.to}
                className={`text-sm transition-colors hover:text-brand ${
                  active
                    ? "border-b-2 border-brand pb-0.5 font-medium text-brand"
                    : "text-foreground/80"
                }`}
              >
                {item.label}
              </SiteLink>
            );
          })}
        </nav>

        {/* Opens the booking modal in place rather than navigating away. */}
        <button
          type="button"
          onClick={() => consult.open()}
          className="tactile hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep lg:inline-flex"
        >
          <CalendarCheck className="size-4" />
          {nav.buttonLabel}
        </button>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="justify-self-end text-primary lg:hidden"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Full-screen mobile menu */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex h-[100svh] flex-col overflow-hidden bg-cream lg:hidden"
        >
          {/* Decorative botanicals */}
          <Sprig className="pointer-events-none absolute -left-10 -top-8 size-52 rotate-[18deg] text-brand/25" />
          <Sprig className="pointer-events-none absolute -right-14 top-1/3 size-56 -scale-x-100 text-brand/20" />

          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-[1.5vh] pt-[1.5vh]">
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full border border-brand/30 bg-cream/70 text-brand-deep backdrop-blur transition-colors active:bg-brand/10"
              >
                <X className="size-5" />
              </button>
            </div>

            {nav.logo ? (
              <img
                src={nav.logo}
                alt={nav.logoAlt}
                className="mx-auto h-[8vh] max-h-14 min-h-9 w-auto max-w-[70%] shrink-0 object-contain"
              />
            ) : (
              <div className="mx-auto h-[8vh] max-h-14 min-h-9 w-40 shrink-0 animate-pulse rounded-md bg-muted/60" />
            )}

            <div className="mt-[2vh] shrink-0">
              <div className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brand">
                <Leaf className="size-3.5 text-brand/70" />
                {nav.menuEyebrow}
                <Leaf className="size-3.5 text-brand/70" />
              </div>
              <h2 className="mt-[1vh] font-serif text-[clamp(1.5rem,5.6vw,2rem)] leading-tight text-brand-deep">
                {nav.menuHeading} <span className="text-brand">{nav.menuHeadingAccent}</span>
                <Leaf className="ml-2 inline size-5 text-brand/70" />
              </h2>
              <div className="mt-[1.2vh] h-px w-20 bg-brand/40" />
            </div>

            <nav className="mt-[1.5vh] flex min-h-0 flex-1 flex-col justify-between">
              {nav.items.map((item, i) => {
                const Icon = NAV_ICONS[item.label] ?? Leaf;
                const active = pathname === item.to;
                return (
                  <div key={item.label} className="flex min-h-0 flex-1 flex-col justify-center">
                    <SiteLink
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 rounded-2xl px-3 py-[0.9vh] transition-colors ${
                        active ? "bg-brand/10" : ""
                      }`}
                    >
                      <span
                        className={`flex size-[clamp(2.4rem,6.2vh,3rem)] shrink-0 items-center justify-center rounded-2xl ${
                          active
                            ? "bg-brand text-primary-foreground shadow-[0_10px_24px_-14px_oklch(0.44_0.052_140/0.9)]"
                            : "bg-brand/10 text-brand-deep"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span
                        className={`flex-1 text-[clamp(1rem,4.4vw,1.125rem)] ${
                          active ? "font-medium text-brand" : "text-brand-deep"
                        }`}
                      >
                        {item.label}
                      </span>
                      <ChevronRight
                        className={`size-5 ${active ? "text-brand" : "text-brand-deep/60"}`}
                      />
                    </SiteLink>
                    {i < nav.items.length - 1 && (
                      <div className="mx-3 mt-[0.6vh] h-px bg-brand-deep/10" />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Wave footer */}
          <div className="relative shrink-0">
            <svg
              viewBox="0 0 390 90"
              preserveAspectRatio="none"
              aria-hidden
              className="block h-[6vh] max-h-16 min-h-8 w-full"
            >
              <path
                d="M0 60C90 20 150 70 250 34c60-22 100-24 140-14v70H0Z"
                className="fill-brand/25"
              />
              <path
                d="M0 72C80 42 160 84 250 52c60-21 100-18 140-8v46H0Z"
                className="fill-brand/45"
              />
              <path d="M0 84C90 60 150 90 250 68c60-13 100-12 140-6v28H0Z" className="fill-brand" />
            </svg>
            <div className="relative -mt-px bg-brand px-6 pb-[max(1.6vh,env(safe-area-inset-bottom))] pt-1.5 text-primary-foreground">
              <Sprig className="pointer-events-none absolute -right-4 bottom-2 size-32 -scale-x-100 text-primary-foreground/30" />
              <div className="relative flex items-center gap-4">
                <span className="flex size-[clamp(2.25rem,5.5vh,3rem)] shrink-0 items-center justify-center rounded-full bg-primary-foreground/90 text-brand">
                  <HeartHandshake className="size-6" />
                </span>
                <p className="flex-1 text-[0.74rem] leading-snug text-primary-foreground/90">
                  {nav.menuFooterText}
                </p>
                <div className="h-[6vh] max-h-14 w-px bg-primary-foreground/25" />
                <div className="shrink-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground/80">
                    {nav.menuFollowLabel}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    {socials.map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="flex size-8 items-center justify-center rounded-full border border-primary-foreground/50"
                      >
                        <Icon className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
