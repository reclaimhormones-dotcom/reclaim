import { useMemo, type ComponentType, type SVGProps } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/site/BrandIcons";

import { useCollectionData, useDocData } from "./useFirestore";
import {
  DEFAULT_SETTINGS,
  isApproved,
  type GalleryDoc,
  type PageCopy,
  type ProgramDoc,
  type SiteSettings,
  type TestimonialDoc,
} from "@/lib/content-types";
import {
  ABOUT_DEFAULT,
  CONTACT_PAGE_DEFAULT,
  FOOTER_DEFAULT,
  GALLERY_PAGE_DEFAULT,
  HOME_DEFAULT,
  NAVIGATION_DEFAULT,
  PROGRAMS_PAGE_DEFAULT,
  blankImages,
  mergeContent,
  type AboutContent,
  type ContactPageContent,
  type FooterContent,
  type GalleryPageContent,
  type HomeContent,
  type NavigationContent,
  type ProgramsPageContent,
} from "@/lib/site-content";
import { buildWebsiteEnquiryMessage } from "@/lib/whatsapp";

/** Live site settings with sensible defaults until an admin saves them. */
export function useSettings(): { settings: SiteSettings; loading: boolean } {
  const { data, loading } = useDocData<SiteSettings>("settings", "site");
  return { settings: { ...DEFAULT_SETTINGS, ...(data ?? {}) }, loading };
}

/**
 * Every program document. Ordering is deliberately left to the client
 * (`publicPrograms`): a Firestore `orderBy("order")` silently drops documents
 * that are missing the field, which would hide a program from the website with
 * no visible cause.
 */
export function usePrograms() {
  return useCollectionData<ProgramDoc>("programs", null);
}

export function useGallery() {
  return useCollectionData<GalleryDoc>("gallery");
}

/**
 * Public testimonials: hidden stories are filtered out and featured stories
 * are shown first.
 */
export function useTestimonials() {
  const state = useCollectionData<TestimonialDoc>("testimonials");
  const data = useMemo(
    () =>
      state.data
        .filter((t) => isApproved(t))
        .sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            (a.order ?? 0) - (b.order ?? 0),
        ),
    [state.data],
  );
  return { ...state, data };
}

/** Editable copy for a page; `{}` until an admin overrides it. */
export function usePageCopy(page: "homepage" | "aboutpage" | "contactpage" | "programspage") {
  const { data, loading } = useDocData<PageCopy>("pages", page);
  return { copy: data ?? {}, loading };
}

/* --------------------------- structured page content ---------------------- */

/**
 * Page content merged over the defaults — with every default image blanked.
 *
 * Text defaults stay, so the server-rendered HTML still carries real copy for
 * crawlers. Images do not: rendering a hardcoded photo and swapping it for the
 * admin's upload a moment later is the flash this removes. Until Firestore
 * answers, image fields are empty strings and the image components hold a
 * skeleton in their place.
 */
function useMergedDoc<T>(collection: string, id: string, defaults: T): T {
  const { data } = useDocData<Record<string, unknown>>(collection, id);
  const imagelessDefaults = useMemo(() => blankImages(defaults), [defaults]);
  return useMemo(
    () => mergeContent(imagelessDefaults, data),
    [data, imagelessDefaults],
  );
}

export function useNavigationContent(): NavigationContent {
  return useMergedDoc("navigation", "main", NAVIGATION_DEFAULT);
}

export function useFooterContent(): FooterContent {
  return useMergedDoc("pages", "footer", FOOTER_DEFAULT);
}

export function useHomeContent(): HomeContent {
  return useMergedDoc("pages", "homepage", HOME_DEFAULT);
}

export function useAboutContent(): AboutContent {
  return useMergedDoc("pages", "aboutpage", ABOUT_DEFAULT);
}

export function useProgramsPageContent(): ProgramsPageContent {
  return useMergedDoc("pages", "programspage", PROGRAMS_PAGE_DEFAULT);
}

export function useGalleryPageContent(): GalleryPageContent {
  return useMergedDoc("pages", "gallerypage", GALLERY_PAGE_DEFAULT);
}

export function useContactPageContent(): ContactPageContent {
  return useMergedDoc("pages", "contactpage", CONTACT_PAGE_DEFAULT);
}

/* ---------------------------------- links --------------------------------- */

/**
 * wa.me link for a raw phone value. Without an explicit message every entry
 * point falls back to the one standard website enquiry template, so the clinic
 * receives the same structured details from any button on the site.
 */
export function whatsappLink(whatsapp: string, message?: string): string {
  const digits = (whatsapp || DEFAULT_SETTINGS.whatsapp).replace(/\D/g, "");
  const text = message ?? buildWebsiteEnquiryMessage();
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export type SocialLink = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
};

/** Social profile links that are configured in admin settings. */
export function useSocialLinks(): SocialLink[] {
  const { settings } = useSettings();
  return [
    { Icon: InstagramIcon, href: settings.instagram, label: "Instagram" },
    { Icon: FacebookIcon, href: settings.facebook, label: "Facebook" },
    {
      Icon: WhatsAppIcon,
      href: settings.whatsapp ? whatsappLink(settings.whatsapp) : "",
      label: "WhatsApp",
    },
    { Icon: YoutubeIcon, href: settings.youtube, label: "YouTube" },
    { Icon: LinkedinIcon, href: settings.linkedin, label: "LinkedIn" },
  ].filter((s) => s.href);
}
