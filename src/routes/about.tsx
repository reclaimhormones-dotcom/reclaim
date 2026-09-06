import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Leaf,
  Quote,
  Star,
  Instagram,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/BrandIcons";
import type { LucideIcon } from "lucide-react";

import { useAboutContent, useSettings, whatsappLink } from "@/hooks/useSiteContent";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobilePageHero } from "@/components/site/MobilePageHero";
import { cldOptimize } from "@/lib/cloudinary";
import { icon } from "@/lib/site-content";
import type { AboutContent } from "@/lib/site-content";

import { canonical, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Reclaim Hormones — Science, Compassion, Real Results" },
      {
        name: "description",
        content:
          "Meet Dt. Kruthi Goud and the Reclaim Hormones team. Clinical science with personalized nutrition for PCOS, thyroid, diabetes, fertility and metabolic health.",
      },
      {
        property: "og:title",
        content: "About Reclaim Hormones — Science. Compassion. Real Results.",
      },
      {
        property: "og:description",
        content:
          "Our story, philosophy, experts, treatment process and clinic experience — built to help you reclaim hormonal balance naturally.",
      },
      { property: "og:url", content: canonical("/about") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content:
          "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png",
      },
      {
        name: "twitter:image",
        content:
          "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png",
      },
    ],
    links: canonicalLink("/about"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])) }],
  }),
  component: AboutPage,
});

/* -------------------------------- helpers -------------------------------- */

function Eyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary ${
        center ? "justify-center" : ""
      }`}
    >
      <span>{children}</span>
      <Leaf className="size-3 shrink-0 text-gold" />
    </div>
  );
}

function IconBubble({ icon: Icon, className = "" }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-soft ${className}`}
    >
      <Icon className="size-5 text-primary" />
    </span>
  );
}

/* -------------------------------- sections ------------------------------- */

function AboutHero({ hero }: { hero: AboutContent["hero"] }) {
  return (
    <section className="hidden lg:block bg-gradient-to-b from-cream-deep via-background to-background pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-14">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-4 text-[2.15rem] leading-[1.12] tracking-[-0.01em] text-brand-deep lg:text-[2.9rem]">
            {hero.title}
            <br />
            <span className="text-brand">{hero.titleAccent}</span>
          </h1>

          <div className="mt-5 hidden h-px w-16 bg-gold lg:block" />

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">{hero.body}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {hero.points.map((point) => {
              const Icon = icon(point.icon);
              return (
                <div key={point.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft">
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

          <Link
            to="/about"
            hash="story"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep"
          >
            {hero.ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mt-9 lg:mt-0">
          <div className="relative hidden overflow-hidden rounded-[2rem] rounded-tl-[9rem] lg:block">
            <img
              src={cldOptimize(hero.image, 1600)}
              alt={hero.imageAlt}
              width={1600}
              height={1104}
              className="h-[27rem] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 rounded-tr-2xl bg-brand-deep/95 px-6 py-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-primary-foreground">{hero.name}</p>
              <p className="mt-0.5 text-xs text-primary-foreground/75">{hero.degree}</p>
              <p className="text-xs text-primary-foreground/75">{hero.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionStory({ content }: { content: AboutContent["mission"] }) {
  return (
    <section id="specialities" className="scroll-mt-24 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-16">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[1.6rem] leading-snug text-foreground lg:text-[2rem]">
            {content.heading} <span className="text-brand">{content.headingAccent}</span>
            <br />
            {content.headingEnd}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {content.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 surface lift p-6 lg:mt-0 lg:p-8">
          <h3 className="text-center font-serif text-lg text-brand">{content.specialityHeading}</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {content.specialities.map((item) => {
              const Icon = icon(item.icon);
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft">
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

function Story({ content }: { content: AboutContent["story"] }) {
  const cards = [
    { icon: content.missionIcon, title: content.missionTitle, sub: content.missionSub },
    { icon: content.visionIcon, title: content.visionTitle, sub: content.visionSub },
  ];
  return (
    <section id="story" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-xl text-[1.5rem] leading-snug text-foreground lg:text-[2rem]">
          {content.heading}
          <br />
          <span className="text-brand">{content.headingAccent}</span>
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <img
            src={cldOptimize(content.image, 1200)}
            alt={content.imageAlt}
            loading="lazy"
            width={1200}
            height={900}
            className="h-64 w-full rounded-2xl object-cover lg:h-[26rem]"
          />

          <ol className="relative space-y-7 border-l border-border pl-8">
            {content.timeline.map((item) => {
              const Icon = icon(item.icon);
              return (
                <li key={item.title} className="relative">
                  <span className="absolute -left-[2.55rem] top-0 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-4" />
                  </span>
                  {item.year && (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                      {item.year}
                    </p>
                  )}
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground lg:text-sm">
                    {item.sub}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center surface lift p-6 text-center"
            >
              <IconBubble icon={icon(card.icon)} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {card.title}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground lg:text-sm">
                {card.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy({ content }: { content: AboutContent["philosophy"] }) {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div className="mt-6 mobile-slider lg:grid lg:grid-cols-2 lg:gap-4">
          {content.items.map((item) => {
            const Icon = icon(item.icon);
            return (
              <div
                key={item.title}
                className="flex gap-3 rounded-xl border border-border bg-card p-4 lg:p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft">
                  <Icon className="size-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground lg:text-sm">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experts({ content }: { content: AboutContent["experts"] }) {
  const { settings } = useSettings();
  return (
    <section id="experts" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div className="mt-6 grid grid-cols-3 gap-3 lg:gap-6">
          {content.items.map(({ img, name, degree, role }) => (
            <article
              key={name}
              className="flex flex-col items-center surface lift p-4 text-center lg:p-6"
            >
              <img
                src={cldOptimize(img, 500)}
                alt={name}
                loading="lazy"
                width={700}
                height={700}
                className="size-16 rounded-full object-cover object-top lg:size-24"
              />
              <p className="mt-3 text-xs font-semibold text-foreground lg:text-base">{name}</p>
              <p className="mt-1 text-[0.65rem] text-muted-foreground lg:text-xs">{degree}</p>
              <p className="mt-0.5 text-[0.65rem] text-brand lg:text-xs">{role}</p>
              {settings.instagram ? (
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${name} on Instagram`}
                    className="flex size-6 items-center justify-center rounded-full bg-sage-soft text-primary transition-colors hover:bg-sage"
                  >
                    <Instagram className="size-3" />
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ content }: { content: AboutContent["process"] }) {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <ol className="relative mt-8 mobile-slider lg:grid lg:grid-cols-5 lg:gap-6">
          {content.items.map((item) => {
            const Icon = icon(item.icon);
            return (
              <li
                key={item.n}
                className="relative surface lift p-5 lg:p-6"
              >
                <span className="mb-4 flex size-12 items-center justify-center rounded-full border border-border bg-card">
                  <Icon className="size-5 text-primary" />
                </span>
                <p className="text-xs font-semibold tracking-[0.16em] text-brand/70">{item.n}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground lg:text-sm">
                  {item.sub}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Trust({ content }: { content: AboutContent["trust"] }) {
  return (
    <section className="bg-cream-deep pb-11 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl bg-primary p-6 lg:p-10">
          <p className="flex items-center justify-center gap-2 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary-foreground">
            {content.heading} <Leaf className="size-3 text-gold" />
          </p>

          <div className="mt-7 grid grid-cols-3 gap-y-8 lg:gap-y-10">
            {content.items.map((item, i) => {
              const Icon = icon(item.icon);
              return (
                <div
                  key={item.title}
                  className={`flex flex-col items-center px-2 text-center lg:px-4 ${
                    i % 3 !== 2 ? "border-r border-primary-foreground/20" : ""
                  }`}
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary-foreground/15">
                    <Icon className="size-5 text-primary-foreground" />
                  </span>
                  <p className="mt-3 text-xs font-semibold leading-snug text-primary-foreground lg:text-sm">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-primary-foreground/75 lg:text-xs">
                    {item.sub}
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

function ClinicExperience({ content }: { content: AboutContent["clinic"] }) {
  return (
    <section id="clinic" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {content.items.map(({ img, caption }) => (
            <figure
              key={caption}
              className="overflow-hidden surface lift"
            >
              <img
                src={cldOptimize(img, 900)}
                alt={caption}
                loading="lazy"
                width={1200}
                height={900}
                className="h-32 w-full object-cover lg:h-48"
              />
              <figcaption className="px-3 py-2.5 text-center text-[0.7rem] text-muted-foreground lg:text-xs">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values({ content }: { content: AboutContent["values"] }) {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <div className="mt-7 mobile-slider mobile-slider-peek lg:grid lg:grid-cols-5 lg:gap-0">
          {content.items.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col items-center surface p-4 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:px-6 lg:shadow-none ${
                i !== content.items.length - 1 ? "lg:border-r lg:border-border" : ""
              }`}
            >
              <IconBubble icon={icon(item.icon)} />
              <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 text-[0.72rem] leading-relaxed text-muted-foreground lg:text-xs">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs({ content }: { content: AboutContent["whyUs"] }) {
  return (
    <section className="bg-cream-deep pb-11 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border lg:grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative isolate bg-brand-deep p-6 lg:p-9">
            <img
              src={cldOptimize(content.image, 1000)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={1000}
              height={800}
              className="absolute inset-0 -z-10 size-full object-cover opacity-35"
            />
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-primary-foreground/80">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.5rem] leading-snug text-primary-foreground lg:text-[1.85rem]">
              {content.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {content.points.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-xs text-primary-foreground/90 lg:text-sm"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center bg-card p-6 lg:p-9">
            <Eyebrow>{content.credentialsEyebrow}</Eyebrow>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.credentials.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <IconBubble icon={icon(item.icon)} />
                  <p className="mt-3 text-sm font-semibold leading-snug text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach({ content }: { content: AboutContent["approach"] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-border lg:block" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {content.items.map((item) => {
              const Icon = icon(item.icon);
              return (
                <div key={item.n} className="relative flex flex-col items-center text-center">
                  <span className="flex size-12 items-center justify-center rounded-full border border-border bg-card">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <p className="mt-3 text-xs font-semibold tracking-[0.16em] text-brand/70">
                    {item.n}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ content }: { content: AboutContent["testimonials"] }) {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>

        <div className="mt-7 grid gap-4 lg:grid-cols-3 lg:gap-6">
          {content.items.map((t, i) => (
            <figure
              key={t.name}
              className={`surface lift p-5 lg:block ${
                i === active ? "block" : "hidden"
              }`}
            >
              <Quote className="size-5 fill-sage text-sage" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-gold text-gold" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {content.items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`size-2 rounded-full transition-colors ${
                i === active ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ content }: { content: AboutContent["cta"] }) {
  const { settings } = useSettings();
  return (
    <section className="bg-cream-deep pb-11 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-9 text-center lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-12 lg:py-12 lg:text-left">
          <div>
            <h2 className="text-[1.6rem] leading-snug text-primary-foreground lg:text-[2rem]">
              <span className="lg:hidden">{content.mobileHeading}</span>
              <span className="hidden lg:inline">{content.heading}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-primary-foreground/80 lg:mx-0">
              {content.sub}
            </p>
          </div>

          <div className="mt-6 space-y-3 lg:mt-0 lg:ml-auto lg:w-80">
            <Link
              to="/assessment"
              className="flex items-center justify-center gap-3 rounded-md bg-card px-5 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-cream"
            >
              {content.primaryLabel} <ArrowRight className="size-4" />
            </Link>
            <p className="text-center text-xs text-primary-foreground/70">{content.orLabel}</p>
            <a
              href={whatsappLink(settings.whatsapp)}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep"
            >
              <WhatsAppIcon className="size-4" />
              {content.whatsappLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const about = useAboutContent();
  const m = about.mobileHero;
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
          primary={{ label: "Our Philosophy", to: "/about", hash: "philosophy" }}
          secondary={{ label: m.secondaryLabel, to: "/contact" }}
          scrollTo="about-start"
          position={m.position}
        />
        <div id="about-start" className="scroll-mt-16" />
        <AboutHero hero={about.hero} />
        <MissionStory content={about.mission} />
        <Story content={about.story} />
        <Philosophy content={about.philosophy} />
        <Process content={about.process} />
        <Trust content={about.trust} />
        <ClinicExperience content={about.clinic} />
        <Values content={about.values} />
        <WhyUs content={about.whyUs} />
        <Approach content={about.approach} />
        <Testimonials content={about.testimonials} />
        <CtaBand content={about.cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
