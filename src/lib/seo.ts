/** Shared SEO helpers: canonical URLs, share image and structured data. */

export const SITE_URL = "https://reclaimhormones.com";
export const SHARE_IMAGE =
  "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png";

export const PUBLIC_PATHS = [
  "/",
  "/about",
  "/programs",
  "/gallery",
  "/contact",
  "/assessment",
] as const;

export function canonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/$/, "")}`;
}

/** Canonical link entry for a route `head()`. */
export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: canonical(path) }];
}

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Reclaim Hormones",
  url: SITE_URL,
  logo: SHARE_IMAGE,
  image: SHARE_IMAGE,
  description:
    "Personalized hormone health and nutrition programs for PCOS, thyroid, fertility and metabolic balance.",
  email: "reclaimhormones@gmail.com",
  telephone: "+91 86887 23142",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  founder: { "@type": "Person", name: "Dt. Kruthi Goud" },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
