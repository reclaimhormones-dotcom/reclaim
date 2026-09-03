import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ClipboardList, Leaf, MessageCircle } from "lucide-react";

import { usePrograms, useProgramsPageContent, useSettings, whatsappLink } from "@/hooks/useSiteContent";
import { cldOptimize } from "@/lib/cloudinary";
import { programSlug } from "@/lib/content-types";
import { icon } from "@/lib/site-content";
import type { ProgramsPageContent } from "@/lib/site-content";
import { PROGRAM_SEED } from "@/lib/site-content";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobilePageHero } from "@/components/site/MobilePageHero";
import { Skeleton, SmartImage } from "@/components/site/SmartImage";

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

type Program = {
  icon: string;
  img: string;
  title: string;
  sub: string;
  points: string[];
  slug: string;
  price?: number | undefined;
  showPrice?: boolean | undefined;
  duration?: string | undefined;
};

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
  program: Program;
  learnMoreLabel: string;
}) {
  const Icon = icon(program.icon);
  return (
    <article className="tilt-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_oklch(0.35_0.048_142/4%),0_10px_28px_-20px_oklch(0.35_0.048_142/25%)] transition-shadow hover:shadow-[0_2px_4px_oklch(0.35_0.048_142/6%),0_16px_34px_-18px_oklch(0.35_0.048_142/28%)]">
      <div className="relative">
        <SmartImage
          src={program.img}
          alt={program.title}
          width={900}
          className="h-40 sm:h-44"
          imgClassName="object-top"
        />
        <span className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-background/90 backdrop-blur">
          <Icon className="size-4.5 text-primary" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground">{program.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{program.sub}</p>
        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          {program.points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" />
              <span className="min-w-0">{p}</span>
            </li>
          ))}
        </ul>
        {program.duration || (program.showPrice !== false && program.price) ? (
          <p className="mt-3 text-xs font-semibold text-brand-deep">
            {program.duration ? <span>{program.duration}</span> : null}
            {program.duration && program.showPrice !== false && program.price ? " · " : ""}
            {program.showPrice !== false && program.price
              ? `₹${program.price.toLocaleString("en-IN")}`
              : ""}
          </p>
        ) : null}
        <Link
          to="/programs/$slug"
          params={{ slug: program.slug }}
          className="mt-4 inline-flex items-center gap-2 pt-1 text-xs font-semibold text-primary transition-colors hover:text-brand-deep"
        >
          {learnMoreLabel} <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
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
}: {
  title: string;
  accent: string;
  items: Program[];
  id?: string;
  learnMoreLabel: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-center text-[1.6rem] leading-snug text-foreground lg:text-[2rem]">
        {title} <span className="text-brand">{accent}</span>
      </h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((p) => (
          <ProgramCard key={p.title} program={p} learnMoreLabel={learnMoreLabel} />
        ))}
      </div>
    </div>
  );
}

function ProgramsSections({ content }: { content: ProgramsPageContent["sections"] }) {
  const { data: live, loading } = usePrograms();
  const source =
    live.length > 0
      ? live.filter((p) => p.active !== false)
      : PROGRAM_SEED.map((p, i) => ({ ...p, id: String(i) }));

  const mapped = source.map((p) => ({
    icon: p.icon ?? "Leaf",
    img: p.image,
    title: p.title,
    sub: p.description,
    points: p.points ?? [],
    category: p.category,
    slug: programSlug({ ...p, id: p.id }),
    price: (p as { price?: number }).price,
    showPrice: (p as { showPrice?: boolean }).showPrice,
    duration: (p as { duration?: string }).duration,
  }));
  const women = mapped.filter((p) => p.category === "women");
  const men = mapped.filter((p) => p.category === "men");

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        {loading && live.length === 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))}
          </div>
        ) : null}
        <div className="mt-5">
          <ProgramGrid
            id="women"
            title={content.womenHeading}
            accent={content.womenAccent}
            items={women}
            learnMoreLabel={content.learnMoreLabel}
          />
        </div>
        <div className="mt-14">
          <ProgramGrid
            id="men"
            title={content.menHeading}
            accent={content.menAccent}
            items={men}
            learnMoreLabel={content.learnMoreLabel}
          />
        </div>
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
