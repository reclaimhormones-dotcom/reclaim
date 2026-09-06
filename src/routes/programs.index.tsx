import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Clock,
  Compass,
  Leaf,
  MessageCircle,
} from "lucide-react";

import { usePrograms, useProgramsPageContent, useSettings, whatsappLink } from "@/hooks/useSiteContent";
import { cldOptimize } from "@/lib/cloudinary";
import {
  categoryLabel,
  programSlug,
  publicPrograms,
  showsPrice,
  type ProgramDoc,
} from "@/lib/content-types";
import { icon } from "@/lib/site-content";
import type { ProgramsPageContent } from "@/lib/site-content";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobilePageHero } from "@/components/site/MobilePageHero";
import { SmartImage } from "@/components/site/SmartImage";

import { canonical, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Our Programs — Personalized Hormone Care for Women & Men" },
      {
        name: "description",
        content:
          "Evidence-based programs for PCOS, thyroid, fertility, weight & metabolic health, menopause, low testosterone and men's hormonal health at Reclaim Hormones.",
      },
      { property: "og:title", content: "Our Programs — Reclaim Hormones" },
      { property: "og:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      { name: "twitter:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      {
        property: "og:description",
        content:
          "Personalized care for every hormone journey — root-cause programs for women and men, designed for lasting results.",
      },
      { property: "og:url", content: canonical("/programs") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: canonicalLink("/programs"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs" }])) }],
  }),
  component: ProgramsPage,
});

/** Everything a catalogue card needs, derived from a live program document. */
type ProgramCardModel = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  iconName: string;
  category: ProgramDoc["category"];
  points: string[];
  duration: string;
  price: number | null;
};

function toCardModel(p: ProgramDoc): ProgramCardModel {
  return {
    id: p.id,
    slug: programSlug(p),
    title: p.title,
    description: p.description ?? "",
    image: p.image ?? "",
    iconName: p.icon ?? "Leaf",
    category: p.category === "men" ? "men" : "women",
    points: p.points ?? [],
    duration: p.duration?.trim() ?? "",
    price: showsPrice(p) ? (p.price ?? null) : null,
  };
}

/**
 * Keeps the grid looking deliberate at any catalogue size: a single program
 * gets one centred card rather than one lonely column in a five-column row.
 */
function gridClass(count: number): string {
  if (count <= 1) return "max-w-sm grid-cols-1";
  if (count === 2) return "max-w-2xl grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
}

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

function ProgramCard({
  program,
  learnMoreLabel,
}: {
  program: ProgramCardModel;
  learnMoreLabel: string;
}) {
  const Icon = icon(program.iconName);
  const visiblePoints = program.points.slice(0, 3);
  const extraPoints = program.points.length - visiblePoints.length;

  return (
    <Link
      to="/programs/$slug"
      params={{ slug: program.slug }}
      aria-label={`${program.title} — ${learnMoreLabel}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_1px_2px_oklch(0.35_0.048_142/4%),0_12px_30px_-22px_oklch(0.35_0.048_142/28%)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_4px_10px_oklch(0.35_0.048_142/6%),0_28px_50px_-28px_oklch(0.35_0.048_142/38%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={program.image}
          alt={program.title}
          width={800}
          sizes="(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 85vw"
          className="size-full"
          imgClassName="object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-brand-deep/5 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur">
          <Icon className="size-[1.15rem] text-primary" />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-background/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand-deep backdrop-blur">
          {categoryLabel(program.category)}
        </span>
        {program.duration ? (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-white drop-shadow">
            <Clock className="size-3.5" aria-hidden="true" />
            {program.duration}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-[1.15rem] leading-snug text-brand-deep">{program.title}</h3>
        {program.description ? (
          <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-muted-foreground">
            {program.description}
          </p>
        ) : null}

        {visiblePoints.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {visiblePoints.map((p) => (
              <li
                key={p}
                className="rounded-full bg-sage-soft px-2.5 py-1 text-[0.65rem] font-medium text-brand-deep"
              >
                {p}
              </li>
            ))}
            {extraPoints > 0 ? (
              <li className="rounded-full px-1.5 py-1 text-[0.65rem] font-medium text-muted-foreground">
                +{extraPoints} more
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="min-w-0">
            {program.price !== null ? (
              <p className="font-serif text-lg leading-none text-brand-deep">
                ₹{program.price.toLocaleString("en-IN")}
              </p>
            ) : null}
            <span
              className={`text-[0.72rem] font-semibold text-primary ${
                program.price !== null ? "mt-1.5 block" : ""
              }`}
            >
              {learnMoreLabel}
            </span>
          </div>
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
            aria-hidden="true"
          >
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------- sections ------------------------------- */

function ProgramsHero({ hero }: { hero: ProgramsPageContent["hero"] }) {
  return (
    <section className="hidden lg:block relative overflow-hidden bg-gradient-to-b from-cream-deep via-background to-background pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-8 lg:py-14">
        <div>
          <span className="inline-flex rounded-full bg-sage-soft px-3.5 py-1.5 text-[0.68rem] font-medium tracking-[0.06em] text-brand-deep">
            {hero.badge}
          </span>

          <h1 className="mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.01em] text-brand-deep lg:text-[3rem]">
            {hero.title}
            <span className="mt-2 block text-[1.9rem] leading-snug text-foreground">
              {hero.subtitle}
              <br />
              <span className="text-brand">{hero.subtitleAccent}</span> Journey
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">{hero.body}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {hero.points.map((point) => {
              const Icon = icon(point.icon);
              return (
                <div key={point.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{point.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{point.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src={cldOptimize(hero.image, 1600)}
              alt={hero.imageAlt}
              width={1600}
              height={1000}
              className="h-[17rem] w-full object-cover object-[62%_35%] sm:h-[21rem] lg:h-[24rem]"
            />
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-sage-soft/80 p-5 text-center backdrop-blur lg:absolute lg:-bottom-6 lg:right-4 lg:mt-0 lg:w-56 lg:bg-sage-soft/95">
            <Leaf className="mx-auto size-5 text-gold" />
            <p className="mt-2 font-serif text-lg leading-snug text-brand-deep">{hero.cardTitle}</p>
            <p className="mt-2 text-xs text-muted-foreground">{hero.cardSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramGrid({
  title,
  accent,
  items,
  id,
  learnMoreLabel,
  showHeading,
}: {
  title: string;
  accent: string;
  items: ProgramCardModel[];
  id?: string;
  learnMoreLabel: string;
  showHeading: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <div id={id} className="scroll-mt-28">
      {showHeading ? (
        <h2 className="text-center text-[1.5rem] leading-snug text-foreground lg:text-[1.9rem]">
          {title} <span className="text-brand">{accent}</span>
        </h2>
      ) : null}
      <div className={`mx-auto mt-7 grid gap-5 lg:gap-6 ${gridClass(items.length)}`}>
        {items.map((p) => (
          <ProgramCard key={p.id} program={p} learnMoreLabel={learnMoreLabel} />
        ))}
      </div>
    </div>
  );
}

function CatalogueSkeleton() {
  return (
    <div className="mx-auto mt-9 grid gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-border/70 bg-card"
          aria-hidden="true"
        >
          <div className="aspect-[4/3] w-full animate-pulse bg-muted/60" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-muted/60" />
            <div className="h-3 w-full animate-pulse rounded-full bg-muted/60" />
            <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted/60" />
            <div className="h-7 w-2/3 animate-pulse rounded-full bg-muted/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CatalogueEmpty({ content }: { content: ProgramsPageContent["sections"] }) {
  return (
    <div className="mx-auto mt-9 max-w-lg rounded-3xl border border-dashed border-border bg-card/60 px-6 py-12 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-sage-soft">
        <Compass className="size-6 text-primary" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-serif text-xl text-brand-deep">{content.emptyHeading}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.emptyBody}</p>
      <Link
        to="/contact"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep"
      >
        {content.emptyCtaLabel} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

type Filter = "all" | "women" | "men";

function ProgramsSections({ content }: { content: ProgramsPageContent["sections"] }) {
  const { data, loading } = usePrograms();
  const [filter, setFilter] = useState<Filter>("all");

  const programs = useMemo(() => publicPrograms(data).map(toCardModel), [data]);
  const women = useMemo(() => programs.filter((p) => p.category === "women"), [programs]);
  const men = useMemo(() => programs.filter((p) => p.category === "men"), [programs]);

  /* Chips only earn their space once both audiences have something to show. */
  const showFilters = women.length > 0 && men.length > 0;
  const active: Filter = showFilters ? filter : "all";
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: content.allLabel, count: programs.length },
    { id: "women", label: content.womenLabel, count: women.length },
    { id: "men", label: content.menLabel, count: men.length },
  ];

  /* Split headings are only meaningful when both groups are on screen. */
  const showGroupHeadings = active === "all" && showFilters;
  const visibleWomen = active === "men" ? [] : women;
  const visibleMen = active === "women" ? [] : men;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-[1.7rem] leading-snug text-foreground lg:text-[2.15rem]">
          {content.heading} <span className="text-brand">{content.headingAccent}</span>
        </h2>
        {content.sub ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
            {content.sub}
          </p>
        ) : null}

        {showFilters ? (
          <div
            role="group"
            aria-label={content.eyebrow}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {filters.map((f) => {
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(f.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "bg-brand-deep text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:border-brand/40 hover:bg-secondary"
                  }`}
                >
                  {f.label}
                  <span
                    className={`rounded-full px-1.5 text-[0.65rem] font-semibold tabular-nums ${
                      isActive ? "bg-primary-foreground/20" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {loading && programs.length === 0 ? <CatalogueSkeleton /> : null}

        {!loading && programs.length === 0 ? <CatalogueEmpty content={content} /> : null}

        {programs.length > 0 ? (
          <>
            <ProgramGrid
              id="women"
              title={content.womenHeading}
              accent={content.womenAccent}
              items={visibleWomen}
              learnMoreLabel={content.learnMoreLabel}
              showHeading={showGroupHeadings}
            />
            {visibleWomen.length > 0 && visibleMen.length > 0 ? (
              <div className="h-14" aria-hidden="true" />
            ) : null}
            <ProgramGrid
              id="men"
              title={content.menHeading}
              accent={content.menAccent}
              items={visibleMen}
              learnMoreLabel={content.learnMoreLabel}
              showHeading={showGroupHeadings}
            />
          </>
        ) : null}
      </div>
    </section>
  );
}

function Approach({ content }: { content: ProgramsPageContent["approach"] }) {
  return (
    <section className="relative overflow-hidden bg-cream-deep">
      <Leaf className="pointer-events-none absolute -right-6 top-10 size-40 text-sage opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[1.75rem]">
          <img
            src={cldOptimize(content.image, 1400)}
            alt={content.imageAlt}
            loading="lazy"
            width={1400}
            height={1000}
            className="h-[16rem] w-full object-cover lg:h-[22rem]"
          />
          <div className="absolute bottom-4 right-4 flex size-24 flex-col items-center justify-center rounded-full border border-border bg-background/95 text-center backdrop-blur">
            <Leaf className="size-3.5 text-gold" />
            <p className="mt-1 px-2 text-[0.62rem] font-semibold leading-tight text-brand-deep">
              {content.badge}
            </p>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[1.6rem] leading-snug text-foreground lg:text-[2rem]">
            {content.heading}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {content.body}
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            {content.items.map((item) => {
              const Icon = icon(item.icon);
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Glimpses({ content }: { content: ProgramsPageContent["glimpses"] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-14">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {content.items.map(({ img, alt }) => (
            <div key={img} className="overflow-hidden rounded-xl">
              <img
                src={cldOptimize(img, 1000)}
                alt={alt}
                loading="lazy"
                width={1000}
                height={750}
                className="h-28 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-36 lg:h-44"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-brand-deep"
          >
            {content.ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CtaBand({ content }: { content: ProgramsPageContent["cta"] }) {
  const { settings } = useSettings();
  return (
    <section className="bg-background pb-12 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-brand-deep px-6 py-8 lg:px-10 lg:py-10">
          <Leaf className="pointer-events-none absolute -right-4 -top-4 size-36 text-primary-foreground/10" />
          <div className="relative lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div>
              <h2 className="text-[1.45rem] leading-snug text-primary-foreground lg:text-[1.75rem]">
                {content.heading}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                {content.sub}
              </p>
            </div>

            <div className="mt-6 grid gap-3 lg:mt-0 lg:w-72 lg:shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-between gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-brand-deep transition-opacity hover:opacity-90"
              >
                <span className="inline-flex items-center gap-2">
                  {content.primaryLabel} <CalendarCheck className="size-4" />
                </span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/assessment"
                className="inline-flex items-center justify-between gap-2 rounded-lg border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <span className="inline-flex items-center gap-2">
                  {content.secondaryLabel} <ClipboardList className="size-4" />
                </span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappLink(settings.whatsapp)}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 lg:hidden"
              >
                <MessageCircle className="size-4" /> {content.whatsappLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsPage() {
  const page = useProgramsPageContent();
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
          primary={{ label: m.primaryLabel, href: "#programs-start" }}
          secondary={{ label: m.secondaryLabel, to: "/contact" }}
          scrollTo="programs-start"
          position={m.position}
        />
        <div id="programs-start" className="scroll-mt-16" />
        <ProgramsHero hero={page.hero} />
        <ProgramsSections content={page.sections} />
        <Approach content={page.approach} />
        <Glimpses content={page.glimpses} />
        <CtaBand content={page.cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
