import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { useFooterContent, useSettings, useSocialLinks } from "@/hooks/useSiteContent";
import { SiteLink } from "./SiteLink";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteFooter() {
  const { settings } = useSettings();
  const copy = useFooterContent();

  const contact = [
    { icon: Phone, value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    { icon: Mail, value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, value: settings.address },
    { icon: Clock, value: settings.hours },
  ];

  const socials = useSocialLinks();

  return (
    <>
      <footer className="bg-brand-deep text-primary-foreground">
        <div className="mx-auto gap-8 px-4 py-10 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:px-8 lg:py-12">
          <div>
            <span className="inline-flex rounded-xl bg-primary-foreground/95 px-3 py-2">
              {copy.logo ? (
                <img
                  src={copy.logo}
                  alt="Reclaim Hormones — Nourishing Hormones. Restoring You."
                  loading="lazy"
                  className="h-9 w-auto"
                />
              ) : (
                <div className="h-9 w-32 animate-pulse rounded-md bg-muted/50" />
              )}
            </span>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-primary-foreground/70">
              {copy.tagline}
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-primary-foreground/70">
              {copy.blurb}
            </p>
            {socials.length > 0 ? (
              <div className="mt-4 flex items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold text-primary-foreground">
              {copy.quickLinksHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-primary-foreground/75">
              {copy.quickLinks.map((item) => (
                <li key={item.label}>
                  <SiteLink
                    to={item.to}
                    className="transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold text-primary-foreground">
              {copy.programsHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-primary-foreground/75">
              {copy.programLinks.map((p) => (
                <li key={p}>
                  <SiteLink to="/programs" className="transition-colors hover:text-primary-foreground">
                    {p}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 lg:mt-0" id="contact">
            <h3 className="text-sm font-semibold text-primary-foreground">{copy.contactHeading}</h3>
            <ul className="mt-3 space-y-2 text-xs text-primary-foreground/75">
              {contact.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-center gap-2">
                  <Icon className="size-3.5 shrink-0 text-gold" />
                  {href ? (
                    <a href={href} className="min-w-0 break-words hover:text-primary-foreground">
                      {value}
                    </a>
                  ) : (
                    <span className="min-w-0 break-words">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[0.7rem] text-primary-foreground/70 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>{copy.copyright}</p>
            <p>
              Designed &amp; Developed by{" "}
              <a
                href="https://thedreamteamservices.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-gold transition-opacity hover:opacity-80"
              >
                Dream Team Services
              </a>
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </>
  );
}
