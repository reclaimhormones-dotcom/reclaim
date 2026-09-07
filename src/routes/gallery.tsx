import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Images,
  Leaf,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

import { useGallery, useGalleryPageContent } from "@/hooks/useSiteContent";
import { TRANSPARENT_PIXEL, cldOptimize } from "@/lib/cloudinary";
import { icon } from "@/lib/site-content";
import type { GalleryPageContent } from "@/lib/site-content";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/content-types";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useConsultModal } from "@/hooks/useConsultModal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobilePageHero } from "@/components/site/MobilePageHero";
import { Skeleton, SmartImage } from "@/components/site/SmartImage";
import { AdaptiveImage } from "@/components/site/AdaptiveImage";
import { Reveal } from "@/components/site/Reveal";

import { canonical, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Moments of Healing at Reclaim Hormones" },
      {
        name: "description",
        content:
          "Explore our clinic, seminars, awareness camps and real client transformation stories from the Reclaim Hormones hormone-health community.",
      },
      { property: "og:title", content: "Gallery — Reclaim Hormones" },
      { property: "og:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      { name: "twitter:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      {
        property: "og:description",
        content:
          "A visual journey through our clinic, community events and real transformation stories.",
      },
      { property: "og:url", content: canonical("/gallery") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: canonicalLink("/gallery"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])) }],
  }),
  component: GalleryPage,
});

const CATEGORIES = ["All", ...GALLERY_CATEGORIES] as const;
type Category = (typeof CATEGORIES)[number];

/* -------------------------------- helpers -------------------------------- */

function Eyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary ${
        center ? "justify-center" : ""
      }`}
    >
      <Leaf className="size-3 shrink-0 text-gold" />
      <span>{children}</span>
      <Leaf className="size-3 shrink-0 text-gold" />
    </div>
  );
}

/* -------------------------------- sections ------------------------------- */

function GalleryHero({
  hero,
  stats,
}: {
  hero: GalleryPageContent["hero"];
  stats: GalleryPageContent["stats"];
}) {
  return (
    <section className="hidden lg:block relative overflow-hidden bg-gradient-to-b from-cream-deep via-background to-background pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-14">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-[2.1rem] leading-[1.15] tracking-[-0.01em] text-brand-deep lg:text-[3rem]">
            {hero.title}
            <br />
            <span className="text-brand">{hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">{hero.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#photos"
              className="inline-flex items-center gap-2 tactile magnetic touch-lg fill-primary text-sm font-semibold text-primary-foreground"
            >
              <Images className="size-4" /> {hero.primaryLabel}
            </a>
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-sage-soft"
            >
              <Sparkles className="size-4" /> {hero.secondaryLabel}
            </a>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src={hero.image ? cldOptimize(hero.image, 1400) : TRANSPARENT_PIXEL}
              alt={hero.imageAlt}
              width={1400}
              height={1000}
              className="h-[17rem] w-full object-cover object-[65%_30%] sm:h-[21rem] lg:h-[25rem]"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:absolute lg:-bottom-6 lg:left-4 lg:mt-0 lg:w-64">
            {stats.slice(0, 2).map((stat) => {
              const Icon = icon(stat.icon);
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-background/95 p-4 text-center backdrop-blur"
                >
                  <Icon className="mx-auto size-4 text-gold" />
                  <p className="mt-1.5 font-serif text-xl text-brand-deep">{stat.value}</p>
                  <p className="mt-0.5 text-[0.68rem] leading-tight text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onMove,
}: {
  photos: { img: string; alt: string; caption: string; cat: string }[];
  index: number;
  onClose: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  /* Horizontal drag distance while a swipe is in progress. */
  const [drag, setDrag] = useState(0);
  const swipe = useRef<{ x: number; y: number; active: boolean } | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    }
    window.addEventListener("keydown", onKey);

    /* Lock the page behind the overlay and hand focus to the dialog, then
       give it back to the page when the lightbox closes. */
    const restoreFocus = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      restoreFocus?.focus?.();
    };
  }, [onClose, onMove]);

  /* Reset any in-flight drag when the visible photo changes. */
  useEffect(() => setDrag(0), [index]);

  const photo = photos[index];
  if (!photo) return null;

  function onPointerDown(e: React.PointerEvent) {
    swipe.current = { x: e.clientX, y: e.clientY, active: true };
  }

  function onPointerMove(e: React.PointerEvent) {
    const start = swipe.current;
    if (!start?.active) return;
    const dx = e.clientX - start.x;
    /* Ignore mostly-vertical gestures so the caption stays scrollable. */
    if (Math.abs(dx) < Math.abs(e.clientY - start.y)) return;
    setDrag(dx);
  }

  function onPointerUp() {
    const dx = drag;
    swipe.current = null;
    setDrag(0);
    if (Math.abs(dx) > 60) onMove(dx < 0 ? 1 : -1);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || "Gallery photo"}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-brand-deep/92 p-4 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="tactile absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10"
      >
        <X className="size-5" />
      </button>

      <figure
        className="max-h-[82vh] w-full max-w-4xl touch-pan-y animate-in zoom-in-95 duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          key={photo.img}
          src={cldOptimize(photo.img, 1600)}
          alt={photo.alt}
          draggable={false}
          style={{
            transform: `translate3d(${drag}px, 0, 0)`,
            transition: drag === 0 ? "transform 0.35s var(--ease-premium)" : "none",
            opacity: 1 - Math.min(Math.abs(drag) / 400, 0.4),
          }}
          className="mx-auto max-h-[72vh] w-auto select-none rounded-3xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-sm text-primary-foreground/85">
          {photo.caption}
          <span className="ml-2 text-xs uppercase tracking-[0.12em] text-primary-foreground/60">
            {photo.cat}
          </span>
          <span className="ml-2 text-xs tabular-nums text-primary-foreground/50">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      <div className="mt-5 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => onMove(-1)}
          className="tactile flex size-12 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => onMove(1)}
          className="tactile flex size-12 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function PhotoGrid({ content }: { content: GalleryPageContent["grid"] }) {
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<number | null>(null);
  const { data: live, loading } = useGallery();
  const photos = useMemo(() => {
    /* Live photos only — no seeded stand-ins that would be swapped out. */
    return live.map((g) => ({
      img: g.url,
      alt: g.caption || "Reclaim Hormones gallery photo",
      cat: g.category as GalleryCategory,
      caption: g.caption,
    }));
  }, [live]);
  const shown = useMemo(
    () => (active === "All" ? photos : photos.filter((p) => p.cat === active)),
    [active, photos],
  );

  return (
    <section id="photos" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-center text-[1.6rem] leading-snug text-foreground lg:text-[2rem]">
          {content.heading} <span className="text-brand">{content.headingAccent}</span>
        </h2>

        <div className="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex min-w-max justify-start gap-2 lg:min-w-0 lg:justify-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`tactile shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold ${
                  active === c
                    ? "fill-primary"
                    : "fill-surface text-muted-foreground hover:text-brand-deep"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && photos.length === 0 ? (
          <div className="mt-7 columns-2 gap-4 lg:columns-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="mb-4 h-52 w-full" />
            ))}
          </div>
        ) : shown.length === 0 ? (
          /* Genuinely empty, now that there are no seeded stand-in photos. */
          <div className="surface surface-lg mx-auto mt-8 max-w-md border-dashed px-6 py-14 text-center">
            <span className="icon-pod mx-auto size-14 rounded-full">
              <Images className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-5 font-serif text-lg text-brand-deep">Photos coming soon</p>
            <p className="mx-auto mt-2 max-w-xs text-pretty-body text-sm text-muted-foreground">
              {active === "All"
                ? "We're adding photos of the clinic and our community events."
                : `No photos in “${active}” yet — try another category.`}
            </p>
          </div>
        ) : (
          <div className="mt-8 columns-2 gap-4 [column-fill:_balance] lg:columns-3 lg:gap-5">
            {shown.map((photo, i) => (
              <Reveal
                key={`${photo.img}-${i}`}
                as="figure"
                delay={Math.min((i % 6) * 80, 400)}
                className="group surface lift mb-4 break-inside-avoid overflow-hidden lg:mb-5"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${photo.caption || "gallery photo"}`}
                  className="block w-full cursor-zoom-in text-left"
                >
                  {/* Height follows the photo, so nothing is cropped. */}
                  <AdaptiveImage
                    src={photo.img}
                    alt={photo.alt}
                    width={900}
                    sizes="(min-width: 1024px) 24rem, 45vw"
                    rounded=""
                    className="w-full"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                  />
                </button>
                <figcaption className="flex items-center justify-between gap-3 p-4">
                  <span className="min-w-0 text-xs font-medium text-foreground">
                    {photo.caption}
                  </span>
                  <span className="shrink-0 rounded-full bg-sage-soft px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-brand-deep">
                    {photo.cat}
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {open !== null ? (
        <Lightbox
          photos={shown}
          index={open}
          onClose={() => setOpen(null)}
          onMove={(dir) =>
            setOpen((cur) =>
              cur === null ? cur : (cur + dir + shown.length) % shown.length,
            )
          }
        />
      ) : null}
    </section>
  );
}

function ImpactStats({
  heading,
  stats,
}: {
  heading: string;
  stats: GalleryPageContent["stats"];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-deep">
      <Leaf className="pointer-events-none absolute -right-6 top-6 size-44 text-primary-foreground/10" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <h2 className="text-center text-[1.5rem] leading-snug text-primary-foreground lg:text-[1.9rem]">
          {heading}
        </h2>
        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = icon(stat.icon);
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-foreground/10 lg:p-6"
              >
                <Icon className="mx-auto size-5 text-gold" />
                <p className="mt-2 font-serif text-2xl text-primary-foreground lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.7rem] leading-tight text-primary-foreground/75">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stories({ content }: { content: GalleryPageContent["stories"] }) {
  return (
    <section id="stories" className="scroll-mt-20 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-center text-[1.6rem] leading-snug text-foreground lg:text-[2rem]">
          {content.heading} <span className="text-brand">{content.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          {content.sub}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {content.items.map(({ name, tag, result, quote, img }, i) => (
            <Reveal
              key={name}
              as="article"
              delay={Math.min(i * 90, 360)}
              className="group surface lift flex h-full flex-col overflow-hidden"
            >
              <SmartImage
                src={img}
                alt={`${name} — ${tag} transformation`}
                width={1000}
                zoom
                sizes="(min-width: 1024px) 22rem, 85vw"
                className="aspect-[4/3] w-full lg:aspect-[16/10]"
              />
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <span className="inline-flex w-fit rounded-full bg-sage-soft px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-brand-deep">
                  {tag}
                </span>
                <span className="icon-pod mt-4 size-10">
                  <Quote className="size-4 fill-current" />
                </span>
                <p className="mt-3 flex-1 text-pretty-body text-sm text-muted-foreground">{quote}</p>
                <div className="mt-5">
                  <hr className="rule-soft" />
                  <p className="mt-4 text-sm font-semibold text-foreground">{name}</p>
                  <p className="mt-0.5 text-xs text-primary">{result}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCta({ content }: { content: GalleryPageContent["cta"] }) {
  const consult = useConsultModal();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-border bg-sage-soft px-6 py-9 text-center lg:px-10">
          <Leaf className="mx-auto size-5 text-gold" />
          <h2 className="mt-3 text-[1.5rem] leading-snug text-brand-deep lg:text-[1.9rem]">
            {content.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {content.sub}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => consult.open()}
              className="inline-flex items-center gap-2 tactile magnetic touch-lg fill-primary text-sm font-semibold text-primary-foreground"
            >
              <CalendarCheck className="size-4" /> {content.primaryLabel}
            </button>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-background"
            >
              {content.secondaryLabel} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryPage() {
  const page = useGalleryPageContent();
  const m = page.mobileHero;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <MobilePageHero
          img={cldOptimize(m.img, 1024)}
          alt={m.alt}
          eyebrow={m.eyebrow}
          title={m.title}
          titleAccent={m.titleAccent}
          subtitle={m.subtitle}
          primary={{ label: m.primaryLabel, href: "#photos" }}
          secondary={{ label: m.secondaryLabel, href: "#stories" }}
          scrollTo="photos"
          position={m.position}
        />
        <GalleryHero hero={page.hero} stats={page.stats} />
        <PhotoGrid content={page.grid} />
        <ImpactStats heading={page.statsHeading} stats={page.stats} />
        <Stories content={page.stories} />
        <GalleryCta content={page.cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
