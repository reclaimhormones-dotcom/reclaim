import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  Leaf,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/BrandIcons";

import { Accordion } from "@/components/site/Accordion";
import { BackButton } from "@/components/site/BackButton";
import { ShareMenu } from "@/components/site/ShareMenu";
import { SuggestedPrograms } from "@/components/site/SuggestedPrograms";
import { useConsultModal } from "@/hooks/useConsultModal";
import { MobilePageHero } from "@/components/site/MobilePageHero";
import { Rating } from "@/components/site/Rating";
import { Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { usePrograms, useSettings, useTestimonials, whatsappLink } from "@/hooks/useSiteContent";
import { cldOptimize } from "@/lib/cloudinary";
import { programSlug, publicPrograms, showsPrice, type ProgramDoc } from "@/lib/content-types";
import { icon } from "@/lib/site-content";
import { canonical } from "@/lib/seo";
import { getProgramShareMeta } from "@/lib/program-share.functions";

/**
 * Readable name for a slug, used for the initial document title. Programs live
 * in Firestore and are only readable in the browser, so the real title is
 * applied on the client once the document arrives (see ProgramDetailPage).
 */
function nameFromSlug(slug: string): string {
  const words = slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.length > 0 ? words.join(" ") : "Program";
}

export const Route = createFileRoute("/programs/$slug")({
  /* Fetched on the server so crawlers — which never run JS — see the real
     title, description and image of the shared program. */
  loader: ({ params }) => getProgramShareMeta({ data: params.slug }),
  head: ({ params, loaderData }) => {
    const meta = loaderData ?? null;
    const name = meta?.title || nameFromSlug(params.slug);
    const description =
      meta?.description ||
      "Personalized, root-cause hormone care with expert nutrition guidance at Reclaim Hormones.";
    const image = meta?.image ? cldOptimize(meta.image, 1200) : "";
    return {
      meta: [
        { title: `${name} — Reclaim Hormones` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — Reclaim Hormones` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: canonical(`/programs/${params.slug}`) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name,
            description,
            provider: { "@type": "MedicalBusiness", name: "Reclaim Hormones" },
            ...(image ? { image } : {}),
          }),
        },
      ],
    };
  },
  component: ProgramDetailPage,
  notFoundComponent: ProgramMissing,
});

type Detail = Omit<ProgramDoc, "id"> & { id: string };

function useProgram(slug: string): { program: Detail | null; loading: boolean } {
  const { data, loading } = usePrograms();
  const found = publicPrograms(data).find((p) => programSlug(p) === slug);
  return { program: found ? (found as Detail) : null, loading };
}

function ProgramMissing() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center lg:py-32">
        <h1 className="text-3xl text-foreground">This program isn&apos;t available</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          It may have been renamed or removed. Browse all of our current programs instead.
        </p>
        <Link
          to="/programs"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          View all programs <ArrowRight className="size-4" />
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3.5 py-1.5 text-[0.7rem] font-semibold text-brand-deep">
      {children}
    </span>
  );
}

function ProgramDetailPage() {
  const { slug } = Route.useParams();
  const { program, loading } = useProgram(slug);
  const { settings } = useSettings();
  const { data: reviews } = useTestimonials();
  const consult = useConsultModal();

  /* The server-rendered title is slug-derived; correct it once the doc lands. */
  useEffect(() => {
    if (program?.title) document.title = `${program.title} — Reclaim Hormones`;
  }, [program?.title]);

  if (loading && !program) {
    return (
      <div className="bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-5xl animate-pulse px-4 py-24">
          <div className="h-8 w-2/3 rounded-full bg-muted" />
          <div className="mt-4 h-4 w-full rounded-full bg-muted" />
          <div className="mt-2 h-4 w-5/6 rounded-full bg-muted" />
          <div className="mt-8 h-64 w-full rounded-3xl bg-muted" />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!program) throw notFound();

  const Icon = icon(program.icon ?? "Leaf");
  const points = program.points ?? [];
  const whoFor =
    program.whoFor && program.whoFor.length > 0
      ? program.whoFor
      : [
          "You have been told your reports are 'normal' but you still don't feel well.",
          "You want a root-cause plan instead of another temporary fix.",
          "You prefer food, lifestyle and habit changes you can sustain.",
        ];
  const process =
    program.process && program.process.length > 0
      ? program.process
      : [
          "Detailed consultation and history review",
          "Personalized nutrition & lifestyle plan",
          "Weekly guidance and course correction",
          "Progress review and long-term maintenance",
        ];
  const faqs =
    program.faqs && program.faqs.length > 0
      ? program.faqs
      : [
          {
            question: "How soon will I see results?",
            answer:
              "Most clients notice better energy, digestion and sleep within 3–4 weeks, with hormonal markers improving over 2–3 months of consistent follow-through.",
          },
          {
            question: "Do I need to stop my medication?",
            answer:
              "Never without your doctor. Our plans work alongside your prescribed treatment and your physician can reduce dosage when your reports improve.",
          },
          {
            question: "Is the plan Indian-food friendly?",
            answer:
              "Completely. Every plan is built around your regional cuisine, family meals, work schedule and budget.",
          },
        ];
  const stories = reviews.slice(0, 3);
  const showPrice = showsPrice(program);
  const waMessage = `Hello Reclaim Hormones,\n\nI would like to know more about the *${program.title}* program.\n\nSource: Website — Program page`;

  const sharePayload = {
    url: canonical(`/programs/${slug}`),
    title: `${program.title} — Reclaim Hormones`,
    description: program.description || "Personalized, root-cause hormone care.",
  };

  return (
    <div className="bg-background">
      <SiteHeader />

      {/* Sits below the fixed bar, above the hero on every breakpoint. */}
      <BackButton />

      <MobilePageHero
        img={program.image}
        alt={program.title}
        eyebrow={program.category === "men" ? "Men's Program" : "Women's Program"}
        title={program.title}
        titleAccent={program.duration ?? ""}
        subtitle={program.description}
        primary={{ label: "Book Consultation", onClick: () => consult.open(program.title) }}
        secondary={{ label: "Start Assessment", to: "/assessment", search: { program: program.title } }}
        scrollTo="program-details"
        position="object-top"
      />

      {/* Desktop hero */}
      <section className="hidden bg-gradient-to-b from-cream-deep via-background to-background pt-20 lg:block">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary">
              <Leaf className="size-3 text-gold" />
              {program.category === "men" ? "Men's Health Program" : "Women's Health Program"}
            </div>
            <h1 className="mt-4 text-[2.6rem] leading-[1.05] text-foreground">{program.title}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {program.longDescription || program.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {program.duration ? (
                <Chip>
                  <Clock className="size-3.5 text-gold" /> {program.duration}
                </Chip>
              ) : null}
              {showPrice ? <Chip>₹{program.price?.toLocaleString("en-IN")}</Chip> : null}
              {points.slice(0, 3).map((p) => (
                <Chip key={p}>{p}</Chip>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => consult.open(program.title)}
                className="inline-flex items-center gap-2 tactile magnetic touch-lg fill-primary text-sm font-semibold text-primary-foreground"
              >
                <CalendarCheck className="size-4" /> Book Consultation
              </button>
              <Link
                to="/assessment"
                search={{ program: program.title }}
                className="inline-flex items-center gap-2 tactile touch-lg fill-surface text-sm font-semibold text-foreground"
              >
                <ClipboardList className="size-4" /> Start Assessment
              </Link>
              {settings.whatsapp ? (
                <a
                  href={whatsappLink(settings.whatsapp, waMessage)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 tactile touch-lg fill-surface text-sm font-semibold text-foreground"
                >
                  <WhatsAppIcon className="size-4 text-brand" /> WhatsApp
                </a>
              ) : null}
              <ShareMenu payload={sharePayload} label="Share Program" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={cldOptimize(program.image, 1200)}
              alt={program.title}
              width={1200}
              height={900}
              className="h-[26rem] w-full object-cover"
            />
            <span className="absolute left-5 top-5 flex size-12 items-center justify-center rounded-full bg-background/90 backdrop-blur">
              <Icon className="size-5 text-primary" />
            </span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {points.length > 0 ? (
        <section id="program-details" className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <h2 className="text-center text-[1.6rem] text-foreground lg:text-[2rem]">
              What this program <span className="text-brand">improves</span>
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {points.map((p, i) => (
                <Reveal
                  key={p}
                  delay={Math.min(i * 80, 400)}
                  className="surface lift flex h-full items-start gap-4 p-4 sm:flex-col sm:gap-0 sm:p-6"
                >
                  <span className="icon-pod size-12 sm:size-14">
                    <CheckCircle2 className="size-5 sm:size-6" />
                  </span>
                  <p className="min-w-0 text-pretty-body text-[0.9rem] font-semibold leading-snug text-foreground sm:mt-5 sm:text-[0.95rem]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Who is it for + process */}
      <section className="bg-cream-deep">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-16">
          <Reveal className="surface surface-lg bg-background p-6 lg:p-9">
            <h2 className="text-[1.4rem] text-foreground lg:text-[1.75rem]">
              Who is it <span className="text-brand">for?</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="surface surface-lg bg-background p-6 lg:p-9">
            <h2 className="text-[1.4rem] text-foreground lg:text-[1.75rem]">
              How it <span className="text-brand">works</span>
            </h2>
            <ol className="mt-5 space-y-4">
              {process.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/12 text-xs font-bold text-brand-deep">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Success stories */}
      {stories.length > 0 ? (
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <h2 className="text-center text-[1.6rem] text-foreground lg:text-[2rem]">
              Success <span className="text-brand">stories</span>
            </h2>
            {/*
             * Snap rail on touch, grid on desktop, and the column count follows
             * however many stories exist so two never stretch across three.
             */}
            <div
              className={`no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 ${
                stories.length === 1
                  ? "sm:mx-auto sm:max-w-md sm:grid-cols-1"
                  : stories.length === 2
                    ? "sm:mx-auto sm:max-w-3xl sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {stories.map((t, i) => (
                <Reveal
                  key={t.id}
                  as="figure"
                  delay={Math.min(i * 90, 360)}
                  className="surface lift flex h-full w-[80%] shrink-0 snap-start flex-col p-5 sm:w-auto sm:p-6"
                >
                  <div className="flex items-center gap-3.5">
                    {t.photo?.trim() ? (
                      <SmartImage
                        src={t.photo}
                        alt={`${t.name}, Reclaim Hormones client`}
                        width={160}
                        className="size-16 shrink-0 rounded-full ring-2 ring-white/70"
                      />
                    ) : (
                      <span className="icon-pod size-16 shrink-0 rounded-full font-serif text-xl text-brand-deep">
                        {t.name.trim().charAt(0).toUpperCase() || "R"}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[0.9rem] font-semibold text-brand-deep">
                        {t.name}
                      </p>
                      {t.program ? (
                        <p className="mt-0.5 truncate text-[0.68rem] font-medium uppercase tracking-wide text-primary/80">
                          {t.program}
                        </p>
                      ) : null}
                      <Rating value={t.rating || 5} className="mt-1.5" />
                    </div>
                  </div>

                  <blockquote className="review-scroll mt-4 max-h-40 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2 text-pretty-body text-sm text-muted-foreground">
                    “{t.review}”
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16">
          <h2 className="text-center text-[1.6rem] text-foreground lg:text-[2rem]">
            Frequently asked <span className="text-brand">questions</span>
          </h2>
          <Accordion items={faqs} defaultOpen={0} className="mt-7" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-deep text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center lg:py-16">
          <h2 className="text-[1.6rem] leading-snug lg:text-[2rem]">
            Ready to start {program.title}?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
            Book a consultation or complete your assessment — we will build the plan around your
            body, your reports and your routine.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => consult.open(program.title)}
              className="tactile touch-lg fill-surface inline-flex items-center gap-2 text-sm"
            >
              <CalendarCheck className="size-4" /> Book Consultation
            </button>
            <Link
              to="/assessment"
              search={{ program: program.title }}
              className="tactile touch-lg inline-flex items-center gap-2 border border-primary-foreground/40 text-sm transition-colors hover:bg-primary-foreground/10"
            >
              <ClipboardList className="size-4" /> Start Assessment
            </Link>
            {settings.whatsapp ? (
              <a
                href={whatsappLink(settings.whatsapp, waMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="tactile touch-lg inline-flex items-center gap-2 border border-primary-foreground/40 text-sm transition-colors hover:bg-primary-foreground/10"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <SuggestedPrograms current={program} />

      <SiteFooter />
    </div>
  );
}
