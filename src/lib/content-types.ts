/** Shared Firestore document shapes for admin-managed content. */

export type ProgramFaq = { question: string; answer: string };

export type ProgramDoc = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  category: "women" | "men";
  points?: string[];
  icon?: string;
  active?: boolean;
  order: number;
  /* commercials */
  duration?: string;
  price?: number;
  showPrice?: boolean;
  /* detail page */
  longDescription?: string;
  whoFor?: string[];
  process?: string[];
  faqs?: ProgramFaq[];
};

/** URL-safe slug used by the program detail pages. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function programSlug(p: Pick<ProgramDoc, "slug" | "title" | "id">): string {
  return p.slug?.trim() ? p.slug.trim() : slugify(p.title || p.id);
}

/**
 * The programs a visitor may see, in the order the admin arranged them.
 * Every public surface goes through here so the website and the admin list
 * can never drift apart.
 */
export function publicPrograms(programs: ProgramDoc[]): ProgramDoc[] {
  return programs
    .filter((p) => p.active !== false && Boolean(p.title))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** True when the program's price should be shown to visitors. */
export function showsPrice(p: Pick<ProgramDoc, "price" | "showPrice">): boolean {
  return p.showPrice !== false && Boolean(p.price);
}

/** Human label for a program category. */
export function categoryLabel(category: ProgramDoc["category"]): string {
  return category === "men" ? "Men" : "Women";
}

export type GalleryDoc = {
  id: string;
  url: string;
  caption: string;
  category: GalleryCategory;
  order: number;
};

export const GALLERY_CATEGORIES = [
  "Clinic",
  "Consultations",
  "Events & Seminars",
  "Community",
] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type TestimonialDoc = {
  id: string;
  name: string;
  program: string;
  rating: number;
  review: string;
  photo: string;
  order: number;
  /** Media attached to the story. */
  mediaType?: "text" | "image" | "video";
  videoUrl?: string;
  /** Moderation. Undefined counts as approved for legacy documents. */
  approved?: boolean;
  featured?: boolean;
};


/** What a story actually renders, derived from the admin's chosen type. */
export type StoryLayout = "text" | "video";

/**
 * The declared type is authoritative, but it is validated against the data so
 * a story saved as "video" with no link, or a legacy document with no type at
 * all, still renders something sensible instead of an empty frame.
 *
 * Note "image" is NOT a layout: a client photo is the avatar, never a banner,
 * so a photo story lays out exactly like a text one.
 */
export function storyLayout(
  t: Pick<TestimonialDoc, "mediaType" | "photo" | "videoUrl">,
): StoryLayout {
  const hasVideo = Boolean(t.videoUrl?.trim());
  const declared = t.mediaType ?? (hasVideo ? "video" : t.photo?.trim() ? "image" : "text");
  return declared === "video" && hasVideo ? "video" : "text";
}

/** True when a testimonial may appear on the public website. */
export function isApproved(t: Pick<TestimonialDoc, "approved">): boolean {
  return t.approved !== false;
}

/** Converts a YouTube/Vimeo/or direct URL into an embeddable player URL. */
export function embedUrl(raw: string): string {
  const url = (raw || "").trim();
  if (!url) return "";
  const yt = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/);
  if (yt && /youtu/.test(url)) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

export type SiteSettings = {
  consultationPrice: number;
  upiId: string;
  qrImage: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  /* SEO & sharing */
  siteUrl: string;
  metaTitle: string;
  metaDescription: string;
  shareImage: string;
  keywords: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  consultationPrice: 1500,
  upiId: "",
  qrImage: "",
  phone: "+91 86887 23142",
  whatsapp: "918688723142",
  email: "reclaimhormones@gmail.com",
  address: "Hyderabad, Telangana",
  hours: "Mon - Sat : 9AM - 7PM",
  instagram: "",
  facebook: "",
  youtube: "",
  linkedin: "",
  siteUrl: "https://reclaimhormones.com",
  metaTitle: "Reclaim Hormones — Hormone Health & Nutrition Care",
  metaDescription:
    "Personalized hormone health and nutrition programs for PCOS, thyroid, fertility and metabolic balance, guided by Dt. Kruthi Goud.",
  shareImage:
    "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png",
  keywords:
    "hormone health, PCOS diet, thyroid nutrition, fertility nutrition, dietitian Hyderabad",
};

/** Editable copy blocks per page (headline-level, layout stays in code). */
export type PageCopy = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
};

export type NavItemDoc = { id: string; label: string; to: string; order: number };

export type FooterCopy = { tagline?: string; blurb?: string; copyright?: string };

/* ------------------------------ assessments ------------------------------ */

export type AssessmentStatus = "draft" | "awaiting_payment" | "payment_completed" | "completed";
export type PaymentStatus = "not_started" | "pending_verification" | "approved" | "rejected";

export type BasicDetails = {
  name: string;
  gender: "Female" | "Male" | "Other" | "";
  program: string;
  age: string;
  email: string;
  address: string;
  phone: string;
  healthGoal: string;
  medicalHistory: string;
  symptoms: string;
  lifestyle: string;
  previousPrograms: string;
  menstrualCycle: "Regular" | "Irregular" | "NA" | "";
  lookingToStart: string;
};

export const EMPTY_BASIC_DETAILS: BasicDetails = {
  name: "",
  gender: "",
  program: "",
  age: "",
  email: "",
  address: "",
  phone: "",
  healthGoal: "",
  medicalHistory: "",
  symptoms: "",
  lifestyle: "",
  previousPrograms: "",
  menstrualCycle: "",
  lookingToStart: "",
};

export const MEAL_SLOTS = [
  "Breakfast",
  "Morning Snack",
  "Lunch",
  "Tea",
  "Dinner",
  "Bedtime Snack",
] as const;
export type MealSlot = (typeof MEAL_SLOTS)[number];

export type MealEntry = { time: string; food: string; portion: string };
export type NutritionLog = Record<string, MealEntry>;

export const EMPTY_NUTRITION_LOG: NutritionLog = MEAL_SLOTS.reduce<NutritionLog>((acc, slot) => {
  acc[slot] = { time: "", food: "", portion: "" };
  return acc;
}, {});

export type AssessmentDoc = {
  id: string;
  details: BasicDetails;
  nutritionLog: NutritionLog;
  status: AssessmentStatus;
  paymentStatus: PaymentStatus;
  paymentScreenshot?: string;
  paymentAmount?: number;
  paymentNote?: string;
  /* Verification trail shown to the patient while step 3 is locked. */
  paymentReference?: string;
  paymentSubmittedAt?: number;
  paymentReviewNote?: string;
  paymentReviewedAt?: number;
  step: number;
  createdAt?: number;
  updatedAt?: number;
};

export type ContactMessageDoc = {
  id: string;
  name: string;
  email: string;
  phone: string;
  concern: string;
  message: string;
  createdAt?: number;
  handled?: boolean;
};

/** Normalizes a phone number to digits so it can key a Firestore document. */
export function phoneKey(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}
