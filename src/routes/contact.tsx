import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { toast } from "sonner";

import { submitEnquiry } from "@/lib/contact-messages";
import {
  mapsLink,
  telLink,
  useContactPageContent,
  useSettings,
  usePrograms,
  whatsappLink,
} from "@/hooks/useSiteContent";
import { cldOptimize } from "@/lib/cloudinary";
import { buildLeadMessage, openWhatsApp } from "@/lib/whatsapp";
import { icon } from "@/lib/site-content";
import type { ContactPageContent } from "@/lib/site-content";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobilePageHero } from "@/components/site/MobilePageHero";

import { canonical, canonicalLink, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Reclaim Hormones — Book Your Consultation" },
      {
        name: "description",
        content:
          "Book an online or in-clinic hormone health consultation in Hyderabad. Call, WhatsApp us, or send your enquiry to reclaimhormones@gmail.com.",
      },
      { property: "og:title", content: "Contact Reclaim Hormones" },
      { property: "og:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      { name: "twitter:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      {
        property: "og:description",
        content:
          "Reach out for personalized hormone, thyroid, PCOS and metabolic health care — online or at our Hyderabad clinic.",
      },
      { property: "og:url", content: canonical("/contact") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: canonicalLink("/contact"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])) }],
  }),
  component: ContactPage,
});

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

const fieldClass =
  "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20";

/* -------------------------------- sections ------------------------------- */

function ContactHero({ hero }: { hero: ContactPageContent["hero"] }) {
  const { settings } = useSettings();
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
              href={telLink(settings.phone)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep"
            >
              <Phone className="size-4" /> {settings.phone}
            </a>
            <a
              href={whatsappLink(settings.whatsapp)}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-sage-soft"
            >
              <MessageCircle className="size-4" /> {hero.whatsappLabel}
            </a>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {hero.assurances.map((item) => {
              const Icon = icon(item.icon);
              return (
                <div key={item.title} className="flex gap-3 sm:flex-col sm:gap-2">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted-foreground">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] lg:mt-0">
          <img
            src={cldOptimize(hero.image, 1400)}
            alt={hero.imageAlt}
            width={1400}
            height={1000}
            className="h-[16rem] w-full object-cover object-[62%_35%] sm:h-[20rem] lg:h-[24rem]"
          />
        </div>
      </div>
    </section>
  );
}

function ContactCards({ content }: { content: ContactPageContent["cards"] }) {
  const { settings } = useSettings();
  const cards = [
    {
      icon: Phone,
      title: content.callTitle,
      lines: [settings.phone],
      action: { label: content.callActionLabel, href: telLink(settings.phone) },
    },
    {
      icon: MessageCircle,
      title: content.whatsappTitle,
      lines: [content.whatsappLine],
      action: { label: content.whatsappActionLabel, href: whatsappLink(settings.whatsapp) },
    },
    {
      icon: Mail,
      title: content.emailTitle,
      lines: [settings.email],
      action: { label: content.emailActionLabel, href: `mailto:${settings.email}` },
    },
    {
      icon: MapPin,
      title: content.visitTitle,
      lines: [settings.address],
      action: { label: content.visitActionLabel, href: mapsLink(settings.address) },
    },
  ];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-2 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, lines, action }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_oklch(0.35_0.048_142/4%),0_10px_28px_-22px_oklch(0.35_0.048_142/22%)]"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-sage-soft">
                <Icon className="size-4 text-primary" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
              {lines.map((l) => (
                <p
                  key={l}
                  className="mt-1 break-words text-xs leading-relaxed text-muted-foreground"
                >
                  {l}
                </p>
              ))}
              <a
                href={action.href}
                {...(action.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="mt-3 inline-block text-xs font-semibold text-primary transition-colors hover:text-brand-deep"
              >
                {action.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquiryForm({
  content,
  side,
}: {
  content: ContactPageContent["form"];
  side: ContactPageContent["side"];
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [gender, setGender] = useState<"female" | "male">("female");
  const { settings } = useSettings();
  const { data: livePrograms } = usePrograms();
  const programOptions = livePrograms
    .filter((p) => p.active !== false && p.category === (gender === "male" ? "men" : "women"))
    .map((p) => p.title);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      const lead = {
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? ""),
        gender: String(fd.get("gender") ?? gender),
        program: String(fd.get("program") ?? ""),
        concern: String(fd.get("concern") ?? ""),
        mode: String(fd.get("mode") ?? ""),
        message: String(fd.get("message") ?? ""),
        source: "Book Consultation",
      };
      await submitEnquiry(lead);
      form.reset();
      setSent(true);
      toast.success("Enquiry received — opening WhatsApp so our team can reply faster.");
      openWhatsApp(settings.whatsapp, buildLeadMessage(lead));
    } catch (err) {
      const message =
        err && typeof err === "object" && "issues" in err
          ? ((err as { issues: { message: string }[] }).issues[0]?.message ??
            "Please check your details")
          : err instanceof Error
            ? err.message
            : "Could not send your message";
      toast.error(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[1.5rem] leading-snug text-foreground lg:text-[1.85rem]">
            {content.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.sub}</p>

          {sent ? (
            <div className="mt-6 rounded-xl border border-border bg-sage-soft p-6 text-center">
              <CheckCircle2 className="mx-auto size-7 text-primary" />
              <p className="mt-3 font-serif text-lg text-brand-deep">{content.successTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {content.successSub}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-4 text-xs font-semibold text-primary underline-offset-4 hover:underline"
              >
                {content.successAgainLabel}
              </button>
            </div>
          ) : (
            <form className="mt-6 grid gap-4" onSubmit={(e) => void handleSubmit(e)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-medium text-foreground">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={`mt-1.5 ${fieldClass}`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs font-medium text-foreground">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    className={`mt-1.5 ${fieldClass}`}
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-foreground">Gender *</span>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {(["female", "male"] as const).map((g) => (
                    <label key={g} className="inline-flex items-center gap-2 capitalize">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="size-3.5 accent-[var(--primary)]"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              {programOptions.length > 0 ? (
                <div>
                  <label htmlFor="program" className="text-xs font-medium text-foreground">
                    Program you are interested in
                  </label>
                  <select id="program" name="program" defaultValue="" className={`mt-1.5 ${fieldClass}`}>
                    <option value="">Not sure yet — please advise</option>
                    {programOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-xs font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`mt-1.5 ${fieldClass}`}
                  />
                </div>
                <div>
                  <label htmlFor="concern" className="text-xs font-medium text-foreground">
                    Primary Concern
                  </label>
                  <select
                    id="concern"
                    name="concern"
                    defaultValue=""
                    className={`mt-1.5 ${fieldClass}`}
                  >
                    <option value="" disabled>
                      Select a concern
                    </option>
                    {content.concerns.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="mode" className="text-xs font-medium text-foreground">
                  Preferred Consultation Mode
                </label>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {content.modes.map((m, i) => (
                    <label key={m} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="mode"
                        value={m}
                        defaultChecked={i === 0}
                        className="size-3.5 accent-[var(--primary)]"
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-medium text-foreground">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share your symptoms, reports or questions…"
                  className={`mt-1.5 resize-none ${fieldClass}`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
              >
                <Send className="size-4" /> {sending ? "Sending…" : content.submitLabel}
              </button>
              <p className="text-[0.68rem] leading-relaxed text-muted-foreground">
                {content.disclaimer}
              </p>
            </form>
          )}
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={cldOptimize(side.image, 1200)}
              alt={side.imageAlt}
              loading="lazy"
              width={1200}
              height={900}
              className="h-44 w-full object-cover lg:h-52"
            />
            <div className="p-5">
              <h3 className="text-sm font-semibold text-foreground">{side.hoursHeading}</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                {side.hours.map(({ day, time }) => (
                  <li
                    key={day}
                    className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0 last:pb-0"
                  >
                    <span className="min-w-0">{day}</span>
                    <span className="shrink-0 font-medium text-foreground">{time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-gold" />
                {side.hoursNote}
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-border">
            <iframe
              title={side.mapTitle}
              src={side.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full border-0 lg:h-64"
            />
          </div>

          {settings.instagram ? (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-border bg-sage-soft px-5 py-4 transition-colors hover:bg-accent"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-brand-deep">
                  {side.instagramTitle}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {side.instagramSub}
                </span>
              </span>
              <Instagram className="size-5 shrink-0 text-primary" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Faqs({ content }: { content: ContactPageContent["faqs"] }) {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        <Eyebrow center>{content.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-center text-[1.55rem] leading-snug text-foreground lg:text-[1.9rem]">
          {content.heading} <span className="text-brand">{content.headingAccent}</span>
        </h2>
        <div className="mt-7 space-y-3">
          {content.items.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-border bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-foreground">
                <span className="min-w-0">{q}</span>
                <span className="shrink-0 text-lg leading-none text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta({ content }: { content: ContactPageContent["cta"] }) {
  const { settings } = useSettings();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-2xl bg-brand-deep px-6 py-9 text-center lg:px-10">
          <Leaf className="pointer-events-none absolute -right-4 -top-4 size-36 text-primary-foreground/10" />
          <div className="relative">
            <h2 className="text-[1.5rem] leading-snug text-primary-foreground lg:text-[1.9rem]">
              {content.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
              {content.sub}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={telLink(settings.phone)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-brand-deep transition-opacity hover:opacity-90"
              >
                <CalendarCheck className="size-4" /> {content.primaryLabel}
              </a>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {content.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const page = useContactPageContent();
  const { settings } = useSettings();
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
          primary={{ label: m.primaryLabel, href: telLink(settings.phone) }}
          secondary={{ label: m.secondaryLabel, href: whatsappLink(settings.whatsapp) }}
          scrollTo="contact-start"
          position={m.position}
        />
        <div id="contact-start" className="scroll-mt-16" />
        <ContactHero hero={page.hero} />
        <ContactCards content={page.cards} />
        <EnquiryForm content={page.form} side={page.side} />
        <Faqs content={page.faqs} />
        <ContactCta content={page.cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
