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
  mergeContent,
  type AboutContent,
  type ContactPageContent,
  type FooterContent,
  type GalleryPageContent,
  type HomeContent,
  type NavigationContent,
  type ProgramsPageContent,
} from "@/lib/site-content";

/** Live site settings with sensible defaults until an admin saves them. */
export function useSettings(): { settings: SiteSettings; loading: boolean } {
  const { data, loading } = useDocData<SiteSettings>("settings", "site");
  return { settings: { ...DEFAULT_SETTINGS, ...(data ?? {}) }, loading };
}

export function usePrograms() {
  return useCollectionData<ProgramDoc>("programs");
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

function useMergedDoc<T>(collection: string, id: string, defaults: T): T {
  const { data } = useDocData<Record<string, unknown>>(collection, id);
  return useMemo(() => mergeContent(defaults, data), [data, defaults]);
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

export function whatsappLink(whatsapp: string, message?: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const text = message ?? "Hi! I would like to know more about your hormone care programs.";
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
