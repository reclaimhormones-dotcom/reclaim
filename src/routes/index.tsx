import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Leaf,
  ClipboardList,
  ChevronRight,
  Quote,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/BrandIcons";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteLink } from "@/components/site/SiteLink";
import { SmartImage } from "@/components/site/SmartImage";
import { MobileCarousel } from "@/components/site/MobileCarousel";
import { Reveal } from "@/components/site/Reveal";
import { Rating } from "@/components/site/Rating";
import { cldOptimize } from "@/lib/cloudinary";
import { embedUrl, programSlug, publicPrograms } from "@/lib/content-types";
import { ORGANIZATION_JSONLD, canonical, canonicalLink } from "@/lib/seo";
import { icon } from "@/lib/site-content";
import type { HomeContent } from "@/lib/site-content";
import {
  useGallery,
  useHomeContent,
  useNavigationContent,
  usePrograms,
  useSettings,
  useSocialLinks,
  useTestimonials,
  whatsappLink,
} from "@/hooks/useSiteContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reclaim Hormones — Personalized Hormone & Metabolic Nutrition Care" },
      {
        name: "description",
        content:
          "Personalized nutrition and lifestyle care for PCOS, thyroid, diabetes, fertility and metabolic health, guided by Dt. Kruthi Goud, MSc Clinical Nutrition.",
      },
      { property: "og:title", content: "Reclaim Hormones — Reclaim Your Balance" },
      { property: "og:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      { name: "twitter:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      {
        property: "og:description",
        content:
          "Evidence-based, root-cause hormone care with personalized nutrition plans and continuous support.",
      },
      { property: "og:url", content: canonical("/") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: canonicalLink("/"),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ORGANIZATION_JSONLD) },
    ],
  }),
  component: Index,
});

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary">
      <Leaf className="size-3 text-gold" />
      <span>{children}</span>
      <Leaf className="size-3 text-gold" />
    </div>
  );
}

function MobileHero({ hero }: { hero: HomeContent["hero"] }) {
  const [active, setActive] = useState(0);
  const slides = hero.mobileSlides;

  // Autoplay; the timer restarts whenever the slide changes (including manual taps)
  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), 5600);
    return () => window.clearTimeout(id);
  }, [active, slides.length]);

  return (
    <section className="relative isolate h-[100svh] overflow-hidden bg-cream lg:hidden">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <img
            key={`${s.img}-${i}`}
            src={cldOptimize(s.img, 1024)}
            alt={s.alt}
            width={1024}
            height={1536}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== active}
            className={`absolute inset-0 size-full object-cover ${s.position} transition-opacity duration-[1600ms] ease-in-out ${
              i === active
                ? "opacity-100 motion-safe:animate-[hero-kenburns_9s_ease-out_forwards]"
                : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Light, airy legibility scrims — cream light instead of black */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.22)_0%,oklch(0.983_0.008_95/0.06)_32%,oklch(0.983_0.008_95/0.5)_54%,oklch(0.983_0.008_95/0.92)_70%,oklch(0.983_0.008_95/1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_18%,oklch(1_0_0/0.35)_0%,transparent_60%)]" />

      {/* Content — deliberately minimal: one promise, one action */}
      <div className="relative flex h-full flex-col justify-end px-6 pb-10 pt-20 text-foreground">
        <h1 className="text-[2.6rem] leading-[1.03] tracking-[-0.015em] text-brand-deep">
          {hero.mobileTitle}
          <br />
          <span className="italic text-brand">{hero.mobileTitleAccent}</span>
        </h1>

        <p className="mt-4 max-w-[19rem] text-[0.9rem] leading-relaxed text-foreground/70">
          {hero.mobileSubtitle}
        </p>

        <a
          href="#book"
          className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_14px_34px_-16px_oklch(0.44_0.052_140/0.85)] transition-transform active:scale-[0.98]"
        >
          {hero.mobilePrimaryLabel} <ArrowRight className="size-4" />
        </a>

        <Link
          to="/assessment"
          className="mt-3 inline-flex items-center justify-center gap-2 text-[0.78rem] font-medium tracking-wide text-brand-deep/70 underline decoration-brand/30 underline-offset-4"
        >
          {hero.mobileSecondaryLabel}
        </Link>

        {/* Slide progress */}
        <div className="mt-8 flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={`${s.img}-dot-${i}`}
              type="button"
              aria-label={`Show slide ${i + 1}: ${s.caption}`}
              onClick={() => setActive(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-brand" : "w-2.5 bg-brand/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopHero({ hero, stats }: { hero: HomeContent["hero"]; stats: HomeContent["stats"] }) {
  const [active, setActive] = useState(0);
  const slides = hero.desktopSlides;

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), 6200);
    return () => window.clearTimeout(id);
  }, [active, slides.length]);

  const current = slides[Math.min(active, slides.length - 1)];

  return (
    <section className="relative isolate hidden h-screen overflow-hidden bg-cream lg:block">
      {/* Full-screen slideshow */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <img
            key={`${s.img}-${i}`}
            src={cldOptimize(s.img, 1920)}
            alt={s.alt}
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== active}
            className={`absolute inset-0 size-full object-cover ${s.position} transition-opacity duration-[1800ms] ease-in-out ${
              i === active
                ? "opacity-100 motion-safe:animate-[hero-kenburns_12s_ease-out_forwards]"
                : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Light cream scrims — bright and airy, no dark grading */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.983_0.008_95/0.97)_0%,oklch(0.983_0.008_95/0.9)_34%,oklch(0.983_0.008_95/0.55)_54%,oklch(0.983_0.008_95/0.12)_76%,oklch(0.983_0.008_95/0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.35)_0%,transparent_35%,transparent_70%,oklch(0.983_0.008_95/0.4)_100%)]" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-8 pb-12 pt-24 text-foreground">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-cream/85 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md">
          <Leaf className="size-3.5 text-brand" />
          {hero.badge}
        </div>

        <h1 className="mt-6 max-w-3xl text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-brand-deep xl:text-[4.4rem]">
          {hero.title}
          <br />
          <span className="italic text-brand">{hero.titleAccent}</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75 xl:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_18px_44px_-18px_oklch(0.44_0.052_140/0.85)] transition-transform hover:scale-[1.02]"
          >
            {hero.primaryLabel} <ArrowRight className="size-4" />
          </a>
          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-brand/25 bg-cream/75 px-8 py-4 text-sm font-medium text-brand-deep backdrop-blur-md transition-transform hover:scale-[1.02]"
          >
            {hero.secondaryLabel} <ClipboardList className="size-4" />
          </Link>
        </div>

        {/* Stats + slideshow controls */}
        <div className="mt-9 flex max-w-3xl flex-col gap-6 border-t border-brand/12 pt-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid grid-cols-4 gap-6">
            {stats.map((s) => {
              const Icon = icon(s.icon);
              return (
                <div key={s.title} className="flex flex-col gap-1.5">
                  <span className="flex size-9 items-center justify-center rounded-full border border-brand/15 bg-cream-deep">
                    <Icon className="size-4 text-brand" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-deep">{s.title}</p>
                    <p className="text-xs text-foreground/60">{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={`${s.img}-dot-${i}`}
                  type="button"
                  aria-label={`Show slide ${i + 1}: ${s.caption}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-brand" : "w-2.5 bg-brand/25"
                  }`}
                />
              ))}
            </div>
            <p
              key={current?.caption}
              className="animate-[hero-fade-up_700ms_ease-out] min-w-[10rem] text-xs font-medium uppercase tracking-[0.16em] text-foreground/60"
            >
              {current?.caption}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/50 lg:flex">
        <span className="text-[0.65rem] uppercase tracking-[0.2em]">{hero.scrollLabel}</span>
        <div className="h-8 w-px bg-gradient-to-b from-brand/50 to-transparent" />
      </div>
    </section>
  );
}

function Philosophy({ content }: { content: HomeContent["philosophy"] }) {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal className="surface-lg bg-sage-soft p-6 lg:grid lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-10 lg:p-9">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-balance-heading text-2xl text-foreground lg:text-[1.85rem]">
              {content.heading}
            </h2>
            <p className="mt-3 text-pretty-body text-sm text-muted-foreground">{content.sub}</p>
          </div>

          <div className="mt-6 mobile-slider lg:mt-0 lg:grid lg:grid-cols-4 lg:gap-3">
            {content.items.map((item, i) => {
              const Icon = icon(item.icon);
              return (
                <Reveal
                  key={item.title}
                  delay={i * 80}
                  className="flex items-center gap-4 surface lift p-5 lg:flex-col lg:items-center lg:gap-3 lg:py-7 lg:text-center"
                >
                  <span className="icon-pod size-12">
                    <Icon className="size-[1.15rem]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {item.sub}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Desktop column count for the home preview, so 2 programs don't sit in a 5-wide row. */
function gridColumns(count: number): string {
  if (count <= 2) return "lg:mx-auto lg:max-w-3xl lg:grid-cols-2 lg:gap-4";
  if (count === 3) return "lg:mx-auto lg:max-w-5xl lg:grid-cols-3 lg:gap-4";
  if (count === 4) return "lg:grid-cols-4 lg:gap-4";
  return "lg:grid-cols-5 lg:gap-4";
}

/** Home preview of the catalogue — the first few live programs, admin-ordered. */
function Programs({ content }: { content: HomeContent["programs"] }) {
  const { data, loading } = usePrograms();
  const items = publicPrograms(data).slice(0, 5);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-xl text-2xl leading-snug text-foreground lg:text-[2.1rem]">
              {content.heading}
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">{content.sub}</p>
          </div>
          <Link
            to="/programs"
            className="mt-6 inline-flex items-center justify-between gap-6 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary lg:mt-0 lg:gap-3"
          >
            {content.ctaLabel} <ArrowRight className="size-4 text-primary" />
          </Link>
        </div>

        <div className="mt-7">
          {loading && items.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-2xl border border-border/60 bg-muted/50"
                />
              ))}
            </div>
          ) : null}

          {!loading && items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-10 text-center text-sm text-muted-foreground">
              {content.emptyLabel}
            </p>
          ) : null}

          {items.length > 0 ? (
            <MobileCarousel containerClassName={gridColumns(items.length)} autoPlayDelay={4000}>
              {items.map((p, i) => {
                const Icon = icon(p.icon ?? "Leaf");
                return (
                  <Reveal key={p.id} delay={Math.min(i * 80, 400)} className="h-full">
                    <Link
                      to="/programs/$slug"
                      params={{ slug: programSlug(p) }}
                      className="group surface-glass lift flex h-full overflow-hidden lg:flex-col"
                    >
                      <div className="relative w-2/5 shrink-0 overflow-hidden lg:w-full">
                        <SmartImage
                          src={p.image}
                          alt={p.title}
                          width={800}
                          sizes="(min-width: 1024px) 18rem, 40vw"
                          className="size-full lg:h-44"
                          imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-brand-deep/45 to-transparent lg:hidden"
                          aria-hidden="true"
                        />
                        <span className="icon-pod absolute left-2.5 top-2.5 size-9 bg-card/90 backdrop-blur-md">
                          <Icon className="size-4" />
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-[1rem] font-semibold leading-snug text-foreground">
                            {p.title}
                          </h3>
                          <ArrowRight
                            className="mt-0.5 size-4 shrink-0 text-primary opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                        {p.duration ? (
                          <p className="mt-auto pt-4 text-[0.7rem] font-semibold text-brand-deep">
                            {p.duration}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </MobileCarousel>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function About({ content }: { content: HomeContent["about"] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-16">
        <div className="order-2 lg:order-1">
          <img
            src={cldOptimize(content.image, 1000)}
            alt={content.imageAlt}
            loading="lazy"
            width={912}
            height={912}
            className="mt-8 h-72 w-full rounded-xl object-cover lg:mt-0 lg:h-[24rem]"
          />
          <p className="mt-4 font-script text-3xl text-primary/80">{content.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{content.role}</p>
          <p className="text-sm text-muted-foreground">{content.degree}</p>
        </div>

        <div className="order-1 lg:order-2">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-2xl leading-snug text-foreground lg:text-[2.1rem]">
            {content.heading}
            <br />
            <span className="italic text-primary">{content.headingAccent}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{content.body}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {content.pillars.map((item) => {
              const Icon = icon(item.icon);
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center justify-between gap-6 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep lg:gap-3"
          >
            {content.ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ content }: { content: HomeContent["testimonials"] }) {
  const [active, setActive] = useState(0);
  const { data: live } = useTestimonials();
  const items =
    live.length > 0
      ? live.map((t) => ({
          quote: t.review,
          name: `— ${t.name}`,
          program: t.program,
          rating: t.rating || 5,
          photo: t.mediaType === "video" ? "" : (t.photo ?? ""),
          video: t.mediaType === "video" ? embedUrl(t.videoUrl ?? "") : "",
        }))
      : content.items.map((t) => ({ ...t, rating: 5, photo: "", video: "" }));
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-2xl leading-snug text-foreground lg:text-[2rem]">
            {content.heading} <span className="italic text-primary">{content.headingAccent}</span>
          </h2>
        </div>

        <div className="mt-7">
          <MobileCarousel
            containerClassName="lg:grid-cols-3 lg:gap-5"
            autoPlayDelay={5000}
          >
            {items.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i * 90, 360)} className="h-full">
                <figure className="surface-glass lift flex h-full flex-col p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="icon-pod size-11">
                      <Quote className="size-[1.05rem] fill-current" />
                    </span>
                    <Rating value={t.rating} />
                  </div>

                  {t.video ? (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/25 shadow-inner">
                      <iframe
                        src={t.video}
                        title={`${t.name} video story`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="aspect-video w-full"
                      />
                    </div>
                  ) : t.photo ? (
                    <SmartImage
                      src={t.photo}
                      alt={`${t.name} — client story`}
                      width={600}
                      zoom
                      className="mt-5 aspect-[4/3] rounded-2xl border border-white/25 shadow-inner"
                    />
                  ) : null}

                  <blockquote className="mt-5 text-pretty-body text-[0.95rem] text-foreground/85">
                    {t.quote}
                  </blockquote>

                  <figcaption className="mt-auto pt-6">
                    <hr className="rule-soft" />
                    <div className="mt-4 flex items-center gap-3">
                      {t.photo ? (
                        <SmartImage
                          src={t.photo}
                          alt=""
                          width={120}
                          className="size-12 shrink-0 rounded-full ring-2 ring-white/70"
                        />
                      ) : (
                        <span className="icon-pod size-12 rounded-full font-serif text-base text-brand-deep">
                          {t.name.replace(/^—\s*/, "").charAt(0)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="text-[0.92rem] font-semibold text-foreground">{t.name}</p>
                        <p className="mt-0.5 text-[0.72rem] font-medium uppercase tracking-wide text-primary/80">
                          {t.program}
                        </p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}

function Journey({ content }: { content: HomeContent["journey"] }) {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 pb-12 lg:px-8 lg:pb-16">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-2xl leading-snug text-foreground lg:text-[2rem]">
            {content.heading} <span className="italic text-primary">{content.headingAccent}</span>
          </h2>
        </div>

        <div className="mt-8">
          <MobileCarousel
            containerClassName="lg:grid-cols-3 lg:gap-6"
            autoPlayDelay={4500}
          >
            {content.steps.map((step, i) => {
              const Icon = icon(step.icon);
              return (
                <Reveal
                  key={step.n + step.title}
                  delay={Math.min(i * 90, 360)}
                  className="group surface-glass lift relative flex h-full gap-5 p-6 lg:flex-col lg:items-start lg:p-7"
                >
                  <div className="relative shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0">
                    <span className="icon-pod size-14 rounded-full">
                      <Icon className="size-6" />
                    </span>
                    <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md">
                      {step.n}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center lg:justify-start">
                    <h3 className="text-[1.05rem] font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-pretty-body text-[0.85rem] text-muted-foreground">
                      {step.sub}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </MobileCarousel>
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            to="/assessment"
            className="inline-flex w-full items-center justify-between gap-6 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep sm:w-auto sm:gap-3"
          >
            {content.ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Gallery({ content }: { content: HomeContent["gallery"] }) {
  const { data: live } = useGallery();
  /* Raw URLs — SmartImage applies the Cloudinary transform and the blurred
     placeholder itself, so optimising here would chain transforms twice. */
  const images =
    live.length > 0
      ? live.slice(0, 5).map((g) => ({ src: g.url, alt: g.caption || "" }))
      : content.images.map((g) => ({ src: g.img, alt: g.alt }));
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4">
          {images.map((g, i) => (
            <Reveal
              key={i}
              delay={Math.min(i * 80, 400)}
              className={`overflow-hidden rounded-2xl shadow-[var(--shadow-e1)] ${
                i === 0 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <SmartImage
                src={g.src}
                alt={g.alt || `Reclaim Hormones community session ${i + 1}`}
                width={800}
                zoom
                sizes="(min-width: 1024px) 15rem, 45vw"
                className={i === 0 ? "aspect-[2/1] lg:aspect-[4/3]" : "aspect-[4/3]"}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/gallery"
            className="tactile magnetic touch-lg fill-primary inline-flex w-full items-center justify-center gap-3 text-sm sm:w-auto"
          >
            {content.ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CtaBand({ content }: { content: HomeContent["cta"] }) {
  const { settings } = useSettings();
  return (
    <section id="book" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-12 lg:text-left">
        <div>
          <h2 className="text-2xl leading-snug text-primary-foreground lg:text-[2rem]">
            {content.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-primary-foreground/80 lg:mx-0 lg:max-w-xl">
            {content.sub}
          </p>
        </div>

        <div className="mt-7 lg:mt-0 lg:w-80">
          <Link
            to="/assessment"
            className="tactile touch-lg fill-surface flex items-center justify-between gap-4 text-sm text-primary"
          >
            {content.primaryLabel} <ArrowRight className="size-4" />
          </Link>
          <p className="my-3 text-center text-xs text-primary-foreground/70">{content.orLabel}</p>
          <a
            href={whatsappLink(settings.whatsapp)}
            target="_blank"
            rel="noreferrer noopener"
            className="tactile touch-lg flex items-center justify-center gap-2 border border-primary-foreground/35 text-sm text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            <WhatsAppIcon className="size-4" />
            {content.whatsappLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function MobileContact({ content }: { content: HomeContent["mobileContact"] }) {
  const { settings } = useSettings();
  const socials = useSocialLinks();
  const nav = useNavigationContent();
  const contact = [
    { icon: Phone, title: content.callLabel, value: settings.phone },
    { icon: Mail, title: content.emailLabel, value: settings.email },
    { icon: MapPin, title: content.locationLabel, value: settings.address },
    { icon: Clock, title: content.timingsLabel, value: settings.hours },
  ];
  return (
    <section id="contact" className="bg-background px-4 py-12 lg:hidden">
      <div className="surface divide-y divide-border/60 overflow-hidden">
        {contact.map(({ icon: Icon, title, value }, i) => (
          <Reveal key={title} delay={i * 70} className="flex items-center gap-4 p-4">
            <span className="icon-pod size-11">
              <Icon className="size-[1.05rem]" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 break-words text-xs text-muted-foreground">{value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-10 text-lg text-foreground">{content.socialHeading}</h3>
      <div className="mt-4 flex items-center gap-3">
        {socials.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className="icon-pod tactile size-12 rounded-full"
          >
            <Icon className="size-[1.05rem]" />
          </a>
        ))}
      </div>

      <h3 className="mt-8 text-lg text-foreground">{content.quickLinksHeading}</h3>
      <div className="mt-2">
        {nav.items.map((item) => (
          <SiteLink
            key={item.label}
            to={item.to}
            className="flex items-center justify-between border-b border-border/60 py-3 text-sm text-foreground/80"
          >
            {item.label}
            <ChevronRight className="size-4 text-muted-foreground" />
          </SiteLink>
        ))}
      </div>
    </section>
  );
}

function Index() {
  const home = useHomeContent();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader overlay />
      <main>
        <MobileHero hero={home.hero} />
        <DesktopHero hero={home.hero} stats={home.stats} />
        <Philosophy content={home.philosophy} />
        <Programs content={home.programs} />
        <About content={home.about} />
        <Testimonials content={home.testimonials} />
        <Journey content={home.journey} />
        <Gallery content={home.gallery} />
        <CtaBand content={home.cta} />
        <MobileContact content={home.mobileContact} />
      </main>
      <SiteFooter />
    </div>
  );
}
