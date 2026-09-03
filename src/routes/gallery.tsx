import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
import { cldOptimize } from "@/lib/cloudinary";
import { icon, GALLERY_SEED } from "@/lib/site-content";
import type { GalleryPageContent } from "@/lib/site-content";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/content-types";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobilePageHero } from "@/components/site/MobilePageHero";
import { Skeleton, SmartImage } from "@/components/site/SmartImage";

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
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep"
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
              src={cldOptimize(hero.image, 1400)}
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
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || "Gallery photo"}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-brand-deep/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-primary-foreground/30 p-2 text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10"
      >
        <X className="size-5" />
      </button>

      <figure
        className="max-h-[82vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cldOptimize(photo.img, 1600)}
          alt={photo.alt}
          className="mx-auto max-h-[72vh] w-auto rounded-2xl object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-primary-foreground/85">
          {photo.caption}
          <span className="ml-2 text-xs uppercase tracking-[0.12em] text-primary-foreground/60">
            {photo.cat}
          </span>
          <span className="ml-2 text-xs text-primary-foreground/50">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      <div className="mt-4 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => onMove(-1)}
          className="flex size-11 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => onMove(1)}
          className="flex size-11 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
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
    const source = live.length > 0 ? live : GALLERY_SEED.map((g, i) => ({ id: String(i), ...g }));
    return source.map((g) => ({
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

        <div className="-mx-4 mt-7 overflow-x-auto px-4 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex min-w-max justify-start gap-2 lg:min-w-0 lg:justify-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:bg-sage-soft hover:text-brand-deep"
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
        ) : (
          <div className="mt-7 columns-2 gap-4 [column-fill:_balance] lg:columns-3">
            {shown.map((photo, i) => (
              <figure
                key={`${photo.img}-${i}`}
                className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${photo.caption || "gallery photo"}`}
                  className="block w-full text-left"
                >
                  <SmartImage
                    src={photo.img}
                    alt={photo.alt}
                    width={900}
                    className={i % 3 === 0 ? "h-64 lg:h-80" : "h-48 lg:h-56"}
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
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
              </figure>
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
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 text-center"
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

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {content.items.map(({ name, tag, result, quote, img }) => (
            <article
              key={name}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={cldOptimize(img, 1000)}
                alt={`${name} — ${tag} transformation`}
                loading="lazy"
                width={1000}
                height={750}
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit rounded-full bg-sage-soft px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-brand-deep">
                  {tag}
                </span>
                <Quote className="mt-3 size-5 text-gold" />
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{quote}</p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="mt-0.5 text-xs text-primary">{result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCta({ content }: { content: GalleryPageContent["cta"] }) {
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
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep"
            >
              <CalendarCheck className="size-4" /> {content.primaryLabel}
            </Link>
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
