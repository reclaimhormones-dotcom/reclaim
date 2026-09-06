/**
 * Typed content schema for every editable document on the public site.
 *
 * Each page reads its document from Firestore (real-time) and merges it over
 * the defaults below, so the site renders identically before an admin has
 * saved anything and never flashes empty while the listener connects.
 *
 * All images are Cloudinary URLs — no local image assets are used.
 */

import {
  Activity,
  Apple,
  ArrowRight,
  Award,
  Baby,
  BadgeCheck,
  BookOpen,
  Brain,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Droplets,
  Dumbbell,
  Eye,
  Facebook,
  FileHeart,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Image as ImageIcon,
  Images,
  Instagram,
  Leaf,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Quote,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Stethoscope,
  Target,
  User,
  UserCheck,
  Users,
  Utensils,
  Video,
  Youtube,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------ icon registry ----------------------------- */

export const ICONS: Record<string, LucideIcon> = {
  Activity,
  Apple,
  ArrowRight,
  Award,
  Baby,
  BadgeCheck,
  BookOpen,
  Brain,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Droplets,
  Dumbbell,
  Eye,
  Facebook,
  FileHeart,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Image: ImageIcon,
  Images,
  Instagram,
  Leaf,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Quote,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Stethoscope,
  Target,
  User,
  UserCheck,
  Users,
  Utensils,
  Video,
  Youtube,
};

export const ICON_NAMES = Object.keys(ICONS).sort();

/** Resolves an icon name saved in Firestore to a component (Leaf fallback). */
export function icon(name: string | undefined): LucideIcon {
  return (name && ICONS[name]) || Leaf;
}

/* ------------------------------ Cloudinary URLs --------------------------- */

const CLD = "https://res.cloudinary.com/pumhgsff/image/upload";

export const IMG = {
  aboutDoctor: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352886/reclaim/site/jdyeb5491rksjznqlizr.jpg",
  aboutFounder: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352887/reclaim/site/z4l8ifmsqbb3izhaqbae.jpg",
  aboutHeroDesk: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352888/reclaim/site/xhyuqwcaocumgd4burjj.jpg",
  clinicConsultation: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352889/reclaim/site/ajivntb85cqn72pevezs.jpg",
  clinicHealing: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352891/reclaim/site/yyjtbj7bwbyhcapntyhu.jpg",
  clinicNutritionSession: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352892/reclaim/site/xwbldcffxoj5evm0jtzg.jpg",
  clinicReception: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352894/reclaim/site/tb3lir51dgg5bknxih8y.jpg",
  contactHero: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352895/reclaim/site/sifge64p7a1z1gysjk9l.jpg",
  expert2: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352896/reclaim/site/pxgxpzvzmqmoprzbfyau.jpg",
  expert3: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352897/reclaim/site/ioqxvfr0dzei0j5cjgg3.jpg",
  gallery1: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352898/reclaim/site/ajtwf7yoai6r4vluro36.jpg",
  gallery2: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352899/reclaim/site/zpioupaaw8oory5tn77q.jpg",
  gallery3: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352900/reclaim/site/spojnynx76aymefetqdz.jpg",
  gallery4: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352901/reclaim/site/likbwlrpfyohkikonixp.jpg",
  gallery5: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352902/reclaim/site/rcv98agsy45nifrnn9pc.jpg",
  galleryHero: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352903/reclaim/site/udsdydfsgqdt7251iehh.jpg",
  heroDesktop1: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352904/reclaim/site/aaxlnss8abiupzo6kw4d.jpg",
  heroDesktop2: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352905/reclaim/site/adccjnpishjlor3k2haq.jpg",
  heroDesktop3: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352906/reclaim/site/d9sbxmipnhw7qcih5yev.jpg",
  heroDesktop4: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352907/reclaim/site/slirqw3xl1flsqu4se2c.jpg",
  heroNutritionist: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352909/reclaim/site/dxh8wls2zcky8recerkq.jpg",
  heroSlide1: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352910/reclaim/site/rwnntn0c7qtzoifzzimj.jpg",
  heroSlide2: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352911/reclaim/site/t6rmozn3hpurovnnmgbm.jpg",
  heroSlide3: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352912/reclaim/site/dj5bpboci9pdlpka9qfk.jpg",
  heroSlide4: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352913/reclaim/site/dwkroyykidvyekeoytr3.jpg",
  logo: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png",
  mHeroAbout: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352914/reclaim/site/aqouddwjtgzi5ub5txps.jpg",
  mHeroContact: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352915/reclaim/site/jjf27vx7xypxnarvxfjx.jpg",
  mHeroGallery: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352917/reclaim/site/qgs8ypf4ymd95iuudwsu.jpg",
  mHeroPrograms: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352919/reclaim/site/jwxnmtgas4y4og61gvi3.jpg",
  programDiabetes: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352920/reclaim/site/wxewasrmlcnoqxl8xzz0.jpg",
  programInfertility: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352921/reclaim/site/e2jxsdppzk5ylreedcrb.jpg",
  programMenFertility: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352922/reclaim/site/ugzlatjwng7ghqq4or3h.jpg",
  programMenProstate: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352923/reclaim/site/ebutakm6shdroc6rvn0a.jpg",
  programMenStress: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352924/reclaim/site/xrwu99yfpucvxmuh7sas.jpg",
  programMenTestosterone: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352925/reclaim/site/vlpurbttcta0rgtit3lf.jpg",
  programMenWeight: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352927/reclaim/site/qkgb9ktwtxgonaqo14bh.jpg",
  programMenopause: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352928/reclaim/site/sw67b1pczhzkpqf3sef0.jpg",
  programPcos: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352929/reclaim/site/enwjzbgckpzbrwjcpfmj.jpg",
  programThyroid: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352930/reclaim/site/y5fvowbmvf8ksfaxhl1b.jpg",
  programWeight: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352931/reclaim/site/a3yffjlqw9j4rto7niaa.jpg",
  programsHero: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352932/reclaim/site/sbbpl7pnjgtpznbxhu7k.jpg",
  whyChoosePlant: "https://res.cloudinary.com/pumhgsff/image/upload/v1788352933/reclaim/site/ehifxqf4pqwcfoq94qyy.jpg",
} as const;

/* --------------------------------- helpers -------------------------------- */

type Plain = Record<string, unknown>;

/** Deep-merges a Firestore document over the defaults (arrays are replaced). */
export function mergeContent<T>(defaults: T, override: unknown): T {
  if (override === undefined || override === null) return defaults;
  if (Array.isArray(defaults) || Array.isArray(override)) return (override as T) ?? defaults;
  if (typeof defaults !== "object" || typeof override !== "object") return (override as T) ?? defaults;
  const out: Plain = { ...(defaults as Plain) };
  for (const [k, v] of Object.entries(override as Plain)) {
    if (v === undefined) continue;
    out[k] = k in (defaults as Plain) ? mergeContent((defaults as Plain)[k], v) : v;
  }
  return out as T;
}

/* ------------------------------- shared shapes ---------------------------- */

export type IconItem = { icon: string; title: string; sub: string };
export type NumberedItem = { n: string; icon: string; title: string; sub: string };
export type Slide = { img: string; alt: string; caption: string; position: string };

/* ------------------------------- navigation ------------------------------- */

export type NavItem = { label: string; to: string };

export type NavigationContent = {
  logo: string;
  logoAlt: string;
  items: NavItem[];
  buttonLabel: string;
  buttonTo: string;
  menuEyebrow: string;
  menuHeading: string;
  menuHeadingAccent: string;
  menuFooterText: string;
  menuFollowLabel: string;
};

export const NAVIGATION_DEFAULT: NavigationContent = {
  logo: IMG.logo,
  logoAlt: "Reclaim Hormones — nourishing hormones, restoring you",
  items: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Programs", to: "/programs" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ],
  buttonLabel: "Book Consultation",
  buttonTo: "/contact",
  menuEyebrow: "Welcome to",
  menuHeading: "Reclaim Your",
  menuHeadingAccent: "Balance",
  menuFooterText:
    "Your wellness is our priority. We're here to support you every step of the way.",
  menuFollowLabel: "Follow us",
};

/* --------------------------------- footer --------------------------------- */

export type FooterContent = {
  logo: string;
  tagline: string;
  blurb: string;
  quickLinksHeading: string;
  quickLinks: NavItem[];
  programsHeading: string;
  programLinks: string[];
  contactHeading: string;
  copyright: string;
};

export const FOOTER_DEFAULT: FooterContent = {
  logo: IMG.logo,
  tagline: "Nourishing Hormones. Restoring You.",
  blurb:
    "Personalized nutrition & lifestyle care for hormone balance, metabolic health & overall well-being.",
  quickLinksHeading: "Quick Links",
  quickLinks: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Programs", to: "/programs" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
    { label: "Take Assessment", to: "/assessment" },
  ],
  programsHeading: "Programs",
  programLinks: [
    "Women's Health",
    "Men's Health",
    "Weight & Metabolic Health",
    "Fertility Support",
    "Thyroid Care",
  ],
  contactHeading: "Contact Us",
  copyright: "© 2025 Reclaim Hormones. All Rights Reserved.",
};

/* -------------------------------- home page ------------------------------- */

export type HomeContent = {
  hero: {
    mobileTitle: string;
    mobileTitleAccent: string;
    mobileSubtitle: string;
    mobilePrimaryLabel: string;
    mobileSecondaryLabel: string;
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    scrollLabel: string;
    mobileSlides: Slide[];
    desktopSlides: Slide[];
  };
  stats: { icon: string; title: string; sub: string }[];
  philosophy: { eyebrow: string; heading: string; sub: string; items: IconItem[] };
  /**
   * Headings only — the cards themselves are read live from the `programs`
   * collection so the home page always matches Admin → Programs.
   */
  programs: {
    eyebrow: string;
    heading: string;
    sub: string;
    ctaLabel: string;
    emptyLabel: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    image: string;
    imageAlt: string;
    name: string;
    role: string;
    degree: string;
    ctaLabel: string;
    pillars: IconItem[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    items: { quote: string; name: string; program: string }[];
  };
  journey: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    steps: NumberedItem[];
    ctaLabel: string;
  };
  gallery: { eyebrow: string; images: { img: string; alt: string }[]; ctaLabel: string };
  cta: {
    heading: string;
    sub: string;
    primaryLabel: string;
    orLabel: string;
    whatsappLabel: string;
  };
  mobileContact: {
    callLabel: string;
    emailLabel: string;
    locationLabel: string;
    timingsLabel: string;
    socialHeading: string;
    quickLinksHeading: string;
  };
};

export const HOME_DEFAULT: HomeContent = {
  hero: {
    mobileTitle: "Reclaim Your",
    mobileTitleAccent: "Balance.",
    mobileSubtitle: "Personalized hormone & metabolic nutrition care.",
    mobilePrimaryLabel: "Book Consultation",
    mobileSecondaryLabel: "Take the free assessment",
    badge: "Evidence-Based · Personalized · Holistic",
    title: "Reclaim Your Balance.",
    titleAccent: "Reclaim Your Life.",
    subtitle:
      "Personalized nutrition and lifestyle care for PCOS, Thyroid, Diabetes, Infertility & Metabolic Health — guided by Dt. Kruthi Goud, MSc Clinical Nutrition.",
    primaryLabel: "Book Consultation",
    secondaryLabel: "Take Assessment",
    scrollLabel: "Scroll",
    mobileSlides: [
      {
        img: IMG.heroSlide1,
        alt: "Clinical nutritionist in a warm consultation with a client",
        caption: "1:1 clinical consultations",
        position: "object-[50%_12%]",
      },
      {
        img: IMG.heroSlide2,
        alt: "Hormone-balancing whole foods: greens, seeds, berries, turmeric and lentils",
        caption: "Hormone-balancing nutrition",
        position: "object-[50%_12%]",
      },
      {
        img: IMG.heroSlide3,
        alt: "A woman breathing calmly in morning light, feeling balanced again",
        caption: "Energy, cycles & calm restored",
        position: "object-[50%_12%]",
      },
      {
        img: IMG.heroSlide4,
        alt: "A personalized nutrition plan notebook beside a cup of herbal tea",
        caption: "Plans built around your life",
        position: "object-[50%_12%]",
      },
    ],
    desktopSlides: [
      {
        img: IMG.heroDesktop1,
        alt: "Clinical nutritionist in a warm consultation with a client",
        caption: "1:1 clinical consultations",
        position: "object-[72%_50%]",
      },
      {
        img: IMG.heroDesktop2,
        alt: "Hormone-balancing whole foods on a light linen table",
        caption: "Hormone-balancing nutrition",
        position: "object-[72%_50%]",
      },
      {
        img: IMG.heroDesktop3,
        alt: "A woman breathing calmly on a sunlit balcony, feeling balanced again",
        caption: "Energy, cycles & calm restored",
        position: "object-[72%_50%]",
      },
      {
        img: IMG.heroDesktop4,
        alt: "A personalized nutrition plan notebook beside herbal tea and fresh fruit",
        caption: "Plans built around your life",
        position: "object-[72%_50%]",
      },
    ],
  },
  stats: [
    { icon: "Users", title: "1000+", sub: "Happy Clients" },
    { icon: "Award", title: "Expert", sub: "Nutrition Care" },
    { icon: "BadgeCheck", title: "Evidence", sub: "Based Approach" },
    { icon: "Leaf", title: "Holistic", sub: "& Sustainable" },
  ],
  philosophy: {
    eyebrow: "Our Philosophy",
    heading: "Balance is the Key",
    sub: "At Reclaim, we go beyond symptom management to restore real balance through the power of nutrition, lifestyle and mindful living.",
    items: [
      { icon: "Apple", title: "Nutrition", sub: "Fuel your body right" },
      { icon: "Moon", title: "Sleep", sub: "Restore & recharge naturally" },
      { icon: "Dumbbell", title: "Movement", sub: "Build lasting metabolic health" },
      { icon: "Heart", title: "Hormones", sub: "Bring your body back to balance" },
    ],
  },
  programs: {
    eyebrow: "Our Programs",
    heading: "Personalized Care for Every Hormone Journey",
    sub: "Evidence-based nutrition programs designed for real, sustainable results.",
    ctaLabel: "View All Programs",
    emptyLabel: "Our programs are being updated — talk to us and we'll guide you to the right one.",
  },
  about: {
    eyebrow: "About Reclaim Hormones",
    heading: "Where Science Meets",
    headingAccent: "Compassionate Care",
    body: "At Reclaim Hormones, we believe true healing begins when we address the root cause — not just the symptoms. Our personalized nutrition plans, lifestyle strategies, and continuous support help you restore balance and transform your health naturally.",
    image: IMG.aboutDoctor,
    imageAlt: "Dt. Kruthi Goud in her clinic",
    name: "Dt. Kruthi Goud",
    role: "Clinical Nutritionist",
    degree: "MSc Clinical Nutrition",
    ctaLabel: "Know More About Me",
    pillars: [
      {
        icon: "Leaf",
        title: "Root-Cause Approach",
        sub: "We treat the cause, not just the symptoms.",
      },
      {
        icon: "FileHeart",
        title: "Personalized Plans",
        sub: "Every plan is customized for your body & lifestyle.",
      },
      {
        icon: "Users",
        title: "Ongoing Support",
        sub: "We are with you at every step of your journey.",
      },
      {
        icon: "BadgeCheck",
        title: "Holistic & Sustainable",
        sub: "Nutrition, lifestyle, mindset and habits — all in balance.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Patient Transformations",
    heading: "Real People.",
    headingAccent: "Real Transformations.",
    items: [
      {
        quote:
          "After years of irregular cycles and fatigue, Dt. Kruthi's personalized plan helped me restore my hormones naturally. I feel like a new me!",
        name: "— Anusha R.",
        program: "PCOS Program",
      },
      {
        quote:
          "My thyroid levels are now stable and I have more energy than ever. The guidance and support made all the difference.",
        name: "— Divya S.",
        program: "Thyroid Balance Program",
      },
      {
        quote:
          "We tried for years to conceive. With the right nutrition and support, we are now expecting our baby. Forever grateful!",
        name: "— Priya & Kiran",
        program: "Fertility Support Program",
      },
    ],
  },
  journey: {
    eyebrow: "How It Works",
    heading: "Your Journey to Balance",
    headingAccent: "in 3 Simple Steps",
    steps: [
      {
        n: "1",
        icon: "ClipboardList",
        title: "Take Assessment",
        sub: "Fill in the detailed assessment form so we understand your health better.",
      },
      {
        n: "2",
        icon: "CalendarCheck",
        /* This step describes the paid assessment, so it must not reuse the
           "Book Consultation" label, which is the free enquiry elsewhere. */
        title: "Confirm & Pay",
        sub: "Complete your assessment payment and lock in your 1:1 with Dt. Kruthi.",
      },
      {
        n: "3",
        icon: "FileHeart",
        title: "Personalized Care",
        sub: "Get your customized nutrition & lifestyle plan and ongoing support.",
      },
    ],
    ctaLabel: "Start Your Journey Today",
  },
  gallery: {
    eyebrow: "Glimpses of Healing & Impact",
    ctaLabel: "View Full Gallery",
    images: [
      { img: IMG.gallery1, alt: "Reclaim Hormones community session 1" },
      { img: IMG.gallery2, alt: "Reclaim Hormones community session 2" },
      { img: IMG.gallery3, alt: "Reclaim Hormones community session 3" },
      { img: IMG.gallery4, alt: "Reclaim Hormones community session 4" },
      { img: IMG.gallery5, alt: "Reclaim Hormones community session 5" },
    ],
  },
  cta: {
    heading: "It's Time to Reclaim Your Balance",
    sub: "Take the first step towards a healthier, happier and hormonally balanced you.",
    primaryLabel: "Book Your Consultation Now",
    orLabel: "or",
    whatsappLabel: "Chat with us on WhatsApp",
  },
  mobileContact: {
    callLabel: "Call Us",
    emailLabel: "Email Us",
    locationLabel: "Location",
    timingsLabel: "Timings",
    socialHeading: "Stay Connected",
    quickLinksHeading: "Quick Links",
  },
};

/* ------------------------------- about page ------------------------------- */

export type AboutContent = {
  mobileHero: {
    img: string;
    alt: string;
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    position: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    ctaLabel: string;
    image: string;
    imageAlt: string;
    name: string;
    degree: string;
    role: string;
    points: IconItem[];
  };
  mission: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    headingEnd: string;
    paragraphs: string[];
    specialityHeading: string;
    specialities: IconItem[];
  };
  story: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    image: string;
    imageAlt: string;
    timeline: { icon: string; year: string; title: string; sub: string }[];
    missionTitle: string;
    missionSub: string;
    missionIcon: string;
    visionTitle: string;
    visionSub: string;
    visionIcon: string;
  };
  philosophy: { eyebrow: string; items: IconItem[] };
  experts: {
    eyebrow: string;
    items: { img: string; name: string; degree: string; role: string }[];
  };
  process: { eyebrow: string; items: NumberedItem[] };
  trust: { heading: string; items: IconItem[] };
  clinic: { eyebrow: string; items: { img: string; caption: string }[] };
  values: { eyebrow: string; items: IconItem[] };
  whyUs: {
    eyebrow: string;
    heading: string;
    image: string;
    points: string[];
    credentialsEyebrow: string;
    credentials: IconItem[];
  };
  approach: { eyebrow: string; items: NumberedItem[] };
  testimonials: { eyebrow: string; items: { quote: string; name: string }[] };
  cta: {
    mobileHeading: string;
    heading: string;
    sub: string;
    primaryLabel: string;
    orLabel: string;
    whatsappLabel: string;
  };
};

export const ABOUT_DEFAULT: AboutContent = {
  mobileHero: {
    img: IMG.mHeroAbout,
    alt: "Dt. Kruthi Goud, clinical nutritionist, at the Reclaim Hormones clinic",
    eyebrow: "About Reclaim Hormones",
    title: "Helping People",
    titleAccent: "Heal Naturally.",
    subtitle: "Clinical science and personalized nutrition, working together on the root cause.",
    primaryLabel: "Meet Our Experts",
    secondaryLabel: "Book a consultation",
    position: "object-[50%_18%]",
  },
  hero: {
    eyebrow: "About Reclaim Hormones",
    title: "Science. Compassion.",
    titleAccent: "Real Results.",
    body: "At Reclaim Hormones, we blend advanced clinical science with personalized nutrition to address the root cause of hormonal imbalance and help you reclaim your balance, energy and best version of yourself.",
    ctaLabel: "Our Story",
    image: IMG.aboutHeroDesk,
    imageAlt: "Dt. Kruthi Goud consulting at her clinic desk",
    name: "Dt. Kruthi Goud",
    degree: "MSc Clinical Nutrition",
    role: "Clinical Nutritionist",
    points: [
      {
        icon: "Search",
        title: "Root-Cause Focused",
        sub: "We go beyond symptoms to find and treat the real cause.",
      },
      {
        icon: "Utensils",
        title: "Personalized Nutrition",
        sub: "Every plan is customized for your body, lifestyle and goals.",
      },
      {
        icon: "HeartHandshake",
        title: "Compassionate Care",
        sub: "We're with you at every step of your healing journey.",
      },
    ],
  },
  mission: {
    eyebrow: "Our Mission & Story",
    heading: "A Personal",
    headingAccent: "Mission",
    headingEnd: "Born from Experience",
    paragraphs: [
      "Reclaim Hormones was born from a simple yet powerful belief — that every individual deserves to feel their best.",
      "Having witnessed the struggles of hormonal imbalances firsthand, our founder, Dt. Kruthi Goud, dedicated her life to helping others heal naturally through the power of nutrition and mindful living.",
      "Today, we are proud to have helped thousands of individuals reclaim their health, restore balance, and rediscover their best selves.",
    ],
    specialityHeading: "We Specialize In",
    specialities: [
      {
        icon: "Stethoscope",
        title: "PCOS / PCOD",
        sub: "Cycle regulation, hormonal balance & weight management.",
      },
      {
        icon: "Droplets",
        title: "Diabetes Care",
        sub: "Blood sugar management through nutrition & lifestyle.",
      },
      {
        icon: "Activity",
        title: "Thyroid Imbalance",
        sub: "Restore thyroid function and boost energy naturally.",
      },
      {
        icon: "Scale",
        title: "Weight & Metabolic Health",
        sub: "Sustainable weight management and metabolic balance.",
      },
      {
        icon: "Baby",
        title: "Fertility & Reproductive Health",
        sub: "Nutrition-led support to enhance fertility and reproductive wellness.",
      },
      {
        icon: "Leaf",
        title: "Gut & Digestive Health",
        sub: "Improve digestion and gut health for overall well-being.",
      },
    ],
  },
  story: {
    eyebrow: "Our Story",
    heading: "A Journey Built on Purpose",
    headingAccent: "Driven by Compassion",
    image: IMG.clinicReception,
    imageAlt: "Reclaim Hormones clinic reception",
    timeline: [
      {
        icon: "Sparkles",
        year: "2018",
        title: "Founded",
        sub: "Reclaim Hormones was founded with a vision to transform women's health.",
      },
      {
        icon: "Target",
        year: "",
        title: "Our Mission",
        sub: "To make evidence-backed nutrition accessible, practical & sustainable.",
      },
      {
        icon: "UserCheck",
        year: "",
        title: "Personalized Care",
        sub: "Every individual is unique. We create plans tailored to your body, lifestyle & goals.",
      },
      {
        icon: "BookOpen",
        year: "",
        title: "Evidence-Based Nutrition",
        sub: "We use science and proven methods to deliver real, lasting results.",
      },
    ],
    missionIcon: "Target",
    missionTitle: "Our Mission",
    missionSub:
      "To empower individuals to reclaim their health through nutrition, sustainable habits, and compassionate care.",
    visionIcon: "Eye",
    visionTitle: "Our Vision",
    visionSub:
      "A world where everyone achieves hormonal balance, optimal health, and a life full of energy and confidence.",
  },
  philosophy: {
    eyebrow: "Our Philosophy",
    items: [
      {
        icon: "Search",
        title: "Root Cause First",
        sub: "We identify and address the root cause, not just the symptoms.",
      },
      {
        icon: "Leaf",
        title: "Sustainable Habits",
        sub: "Real change comes from simple habits you can maintain for life.",
      },
      {
        icon: "ShieldCheck",
        title: "Science + Nature",
        sub: "The best results come from the perfect blend of science and natural nutrition.",
      },
      {
        icon: "HeartHandshake",
        title: "Whole Body Wellness",
        sub: "We treat your body, mind & emotions as one connected system.",
      },
    ],
  },
  experts: {
    eyebrow: "Meet Our Experts",
    items: [
      {
        img: IMG.aboutDoctor,
        name: "Dr. Kruthi Goud",
        degree: "MSc Clinical Nutrition",
        role: "Founder & Lead Nutritionist",
      },
      { img: IMG.expert2, name: "Sneha R.", degree: "MSc Dietetics", role: "Clinical Dietitian" },
      {
        img: IMG.expert3,
        name: "Priya Sharma",
        degree: "Wellness Coach",
        role: "Lifestyle & Wellness Expert",
      },
    ],
  },
  process: {
    eyebrow: "Our Treatment Process",
    items: [
      {
        n: "01",
        icon: "MessageCircle",
        title: "Consultation",
        sub: "We listen to your concerns and understand your health history.",
      },
      {
        n: "02",
        icon: "ClipboardList",
        title: "Assessment",
        sub: "In-depth analysis of your body, lifestyle, nutrition & lab reports.",
      },
      {
        n: "03",
        icon: "Utensils",
        title: "Nutrition Plan",
        sub: "A personalized nutrition plan designed around your body & goals.",
      },
      {
        n: "04",
        icon: "CalendarCheck",
        title: "Weekly Guidance",
        sub: "Regular follow-ups, adjustments & ongoing motivation.",
      },
      {
        n: "05",
        icon: "Award",
        title: "Long-Term Results",
        sub: "Sustainable results that help you feel healthier, stronger & balanced.",
      },
    ],
  },
  trust: {
    heading: "Why Families Trust Us",
    items: [
      {
        icon: "ShieldCheck",
        title: "Personalized Programs",
        sub: "Plans tailored to your body, lifestyle & health goals.",
      },
      {
        icon: "UserCheck",
        title: "Certified Experts",
        sub: "Experienced professionals you can trust.",
      },
      {
        icon: "Users",
        title: "Online & Offline Support",
        sub: "Support available in-clinic and online for your convenience.",
      },
      {
        icon: "LineChart",
        title: "Progress Tracking",
        sub: "We track your progress & celebrate every win.",
      },
      {
        icon: "HeartHandshake",
        title: "Holistic Approach",
        sub: "We treat you as a whole, not just a condition.",
      },
      {
        icon: "Lock",
        title: "Privacy & Care",
        sub: "Your health information is always safe & confidential.",
      },
    ],
  },
  clinic: {
    eyebrow: "Clinic Experience",
    items: [
      { img: IMG.clinicReception, caption: "Welcoming Reception" },
      { img: IMG.clinicConsultation, caption: "Consultation Room" },
      { img: IMG.clinicNutritionSession, caption: "Nutrition Sessions" },
      { img: IMG.clinicHealing, caption: "Healing Environment" },
    ],
  },
  values: {
    eyebrow: "Our Core Values",
    items: [
      {
        icon: "HeartHandshake",
        title: "Compassion",
        sub: "We care deeply about your health & well-being.",
      },
      {
        icon: "ShieldCheck",
        title: "Integrity",
        sub: "Honesty & transparency in everything we do.",
      },
      { icon: "Lightbulb", title: "Innovation", sub: "We embrace new ideas for better outcomes." },
      {
        icon: "Award",
        title: "Excellence",
        sub: "Committed to delivering the highest standard of care.",
      },
      {
        icon: "Users",
        title: "Empowered Together",
        sub: "We educate, support and empower you to take charge of your health.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why Choose Us?",
    heading: "Because You Deserve Expert Care",
    image: IMG.whyChoosePlant,
    points: [
      "Personalized, one-on-one nutrition plans",
      "Evidence-based approach with visible results",
      "Continuous support and guidance",
      "Safe, natural, and sustainable solutions",
      "Trusted by thousands of happy clients",
    ],
    credentialsEyebrow: "Our Credentials",
    credentials: [
      {
        icon: "GraduationCap",
        title: "MSc Clinical Nutrition",
        sub: "Specialized in Clinical Nutrition & Dietetics",
      },
      {
        icon: "ClipboardList",
        title: "Certified Nutritionist",
        sub: "Evidence-Based Nutrition Expert",
      },
      {
        icon: "BookOpen",
        title: "Continuous Learning",
        sub: "Regularly Updated with Global Research",
      },
      {
        icon: "ShieldCheck",
        title: "Safe & Ethical Care",
        sub: "Effective, Sustainable & Compassionate",
      },
    ],
  },
  approach: {
    eyebrow: "Our Approach",
    items: [
      {
        n: "01",
        icon: "ClipboardList",
        title: "Assess",
        sub: "We understand your health inside out.",
      },
      { n: "02", icon: "UserCheck", title: "Personalize", sub: "Custom plans tailored just for you." },
      { n: "03", icon: "Users", title: "Transform", sub: "Balance, heal, and thrive naturally." },
      {
        n: "04",
        icon: "Leaf",
        title: "Sustain",
        sub: "Ongoing support to maintain lasting results.",
      },
    ],
  },
  testimonials: {
    eyebrow: "What Our Clients Say",
    items: [
      {
        quote:
          "Dt. Kruthi's personalized plan helped me regulate my cycles and lose weight naturally. I finally feel like myself again!",
        name: "— Sneha R.",
      },
      {
        quote:
          "Finally found a nutritionist who truly listens and understands. Her guidance has been a life-changing experience.",
        name: "— Divya S.",
      },
      {
        quote:
          "My energy, skin, and digestion have improved dramatically. Highly recommend Reclaim Hormones to everyone!",
        name: "— Priya & Kiran",
      },
    ],
  },
  cta: {
    mobileHeading: "Begin Your Wellness Journey",
    heading: "Ready to Reclaim Your Balance?",
    sub: "We're here to help you heal, balance and thrive — inside and out.",
    primaryLabel: "Book Your Consultation",
    orLabel: "or",
    whatsappLabel: "Chat on WhatsApp",
  },
};

/* ------------------------------ programs page ----------------------------- */

export type ProgramsPageContent = {
  mobileHero: {
    img: string;
    alt: string;
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    position: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    subtitleAccent: string;
    body: string;
    image: string;
    imageAlt: string;
    cardTitle: string;
    cardSub: string;
    points: IconItem[];
  };
  sections: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    sub: string;
    womenHeading: string;
    womenAccent: string;
    menHeading: string;
    menAccent: string;
    learnMoreLabel: string;
    /** Filter chips above the catalogue. */
    allLabel: string;
    womenLabel: string;
    menLabel: string;
    /** Shown when no program is published yet. */
    emptyHeading: string;
    emptyBody: string;
    emptyCtaLabel: string;
  };
  approach: {
    eyebrow: string;
    heading: string;
    body: string;
    image: string;
    imageAlt: string;
    badge: string;
    items: IconItem[];
  };
  glimpses: { eyebrow: string; ctaLabel: string; items: { img: string; alt: string }[] };
  cta: {
    heading: string;
    sub: string;
    primaryLabel: string;
    secondaryLabel: string;
    whatsappLabel: string;
  };
};

export const PROGRAMS_PAGE_DEFAULT: ProgramsPageContent = {
  mobileHero: {
    img: IMG.mHeroPrograms,
    alt: "A happy couple after a hormone health consultation",
    eyebrow: "Our Programs",
    title: "Care for Every",
    titleAccent: "Hormone Journey.",
    subtitle: "Root-cause programs for women and men, built around your body and lifestyle.",
    primaryLabel: "Explore Programs",
    secondaryLabel: "Talk to our team",
    position: "object-[50%_20%]",
  },
  hero: {
    badge: "Evidence-Based · Personalized · Holistic",
    title: "Our Programs",
    subtitle: "Personalized Care for Every",
    subtitleAccent: "Hormone",
    body: "At Reclaim Hormones, our evidence-based programs are designed to restore balance, boost energy, improve well-being, and help you feel like your best self.",
    image: IMG.programsHero,
    imageAlt: "A happy couple in a bright consultation room",
    cardTitle: "Personalized. Compassionate. Effective.",
    cardSub: "Care that understands you, inside and out.",
    points: [
      { icon: "Users", title: "For Women & Men", sub: "Specialized care for every stage of life." },
      {
        icon: "ClipboardCheck",
        title: "Evidence-Based",
        sub: "Root-cause approach for lasting results.",
      },
    ],
  },
  sections: {
    eyebrow: "Our Specialized Programs",
    heading: "Find the program built for",
    headingAccent: "your body",
    sub: "Every plan is personalized after a consultation — these are the journeys we guide most often.",
    womenHeading: "Programs for",
    womenAccent: "Women",
    menHeading: "Programs for",
    menAccent: "Men",
    learnMoreLabel: "Learn More",
    allLabel: "All Programs",
    womenLabel: "For Women",
    menLabel: "For Men",
    emptyHeading: "New programs are on the way",
    emptyBody:
      "We're updating our program library right now. Tell us what you're struggling with and we'll guide you to the right plan personally.",
    emptyCtaLabel: "Talk to our team",
  },
  approach: {
    eyebrow: "Our Approach",
    heading: "Personalized. Holistic. Transformative.",
    body: "We go beyond symptom management to find the root cause of your hormone imbalance and create a plan that fits your body, lifestyle, and goals.",
    image: IMG.clinicNutritionSession,
    imageAlt: "Clinical nutritionist guiding a client through a personalized nutrition plan",
    badge: "Root-Cause Focused Care",
    items: [
      {
        icon: "Search",
        title: "In-Depth Assessment",
        sub: "We listen, evaluate, and understand you completely.",
      },
      {
        icon: "ClipboardList",
        title: "Personalized Plans",
        sub: "Custom nutrition, lifestyle, and supplement strategies.",
      },
      {
        icon: "HeartHandshake",
        title: "Ongoing Support",
        sub: "We're with you at every step of your journey.",
      },
      { icon: "Sparkles", title: "Proven Results", sub: "Real transformations, lasting for life." },
    ],
  },
  glimpses: {
    eyebrow: "Glimpses of Healing & Impact",
    ctaLabel: "View Full Gallery",
    items: [
      { img: IMG.gallery1, alt: "Dt. Kruthi Goud speaking at a health and wellness seminar" },
      { img: IMG.gallery2, alt: "Nutrition workshop with participants sharing a healthy meal" },
      { img: IMG.gallery3, alt: "Group photo from a women's health awareness event" },
      { img: IMG.gallery4, alt: "Wellness and nutrition conference session" },
    ],
  },
  cta: {
    heading: "Ready to Start Your Transformation?",
    sub: "Take the first step towards balanced hormones, better health, and a happier you.",
    primaryLabel: "Book Your Consultation",
    secondaryLabel: "Take Assessment",
    whatsappLabel: "Chat with us on WhatsApp",
  },
};

/* ------------------------- default program catalogue ---------------------- */

export const PROGRAM_SEED = [
  {
    title: "PCOS / PCOD Care",
    description:
      "Balance hormones, regulate cycles, improve ovulation, and manage symptoms naturally.",
    image: IMG.programPcos,
    icon: "Stethoscope",
    category: "women" as const,
    points: ["Cycle Regulation", "Weight Management", "Hormonal Balance"],
    order: 1,
    active: true,
  },
  {
    title: "Thyroid Balance",
    description: "Support healthy thyroid function, boost energy, and improve metabolism.",
    image: IMG.programThyroid,
    icon: "Activity",
    category: "women" as const,
    points: ["Hypothyroidism", "Hyperthyroidism", "Hashimoto's Support"],
    order: 2,
    active: true,
  },
  {
    title: "Fertility & Reproductive Health",
    description:
      "Enhance fertility, regulate hormones, and support a healthy reproductive system.",
    image: IMG.programInfertility,
    icon: "Baby",
    category: "women" as const,
    points: ["Ovulation Support", "PCOS Fertility", "Reproductive Wellness"],
    order: 3,
    active: true,
  },
  {
    title: "Weight & Metabolic Health",
    description: "Sustainable weight loss and metabolism support with hormonal balance.",
    image: IMG.programWeight,
    icon: "Scale",
    category: "women" as const,
    points: ["Weight Management", "Insulin Resistance", "Metabolic Balance"],
    order: 4,
    active: true,
  },
  {
    title: "Menopause Care",
    description:
      "Navigate menopause smoothly and restore energy, mood, and hormonal balance.",
    image: IMG.programMenopause,
    icon: "Flower2",
    category: "women" as const,
    points: ["Hot Flushes", "Mood & Sleep Support", "Bone & Heart Health"],
    order: 5,
    active: true,
  },
  {
    title: "Low Testosterone Support",
    description: "Boost vitality, energy, strength, and overall well-being.",
    image: IMG.programMenTestosterone,
    icon: "ShieldCheck",
    category: "men" as const,
    points: ["Testosterone Balance", "Muscle & Strength", "Energy & Stamina"],
    order: 6,
    active: true,
  },
  {
    title: "Male Fertility Support",
    description: "Improve sperm health, motility, and reproductive function.",
    image: IMG.programMenFertility,
    icon: "HeartHandshake",
    category: "men" as const,
    points: ["Sperm Health", "Hormonal Balance", "Reproductive Wellness"],
    order: 7,
    active: true,
  },
  {
    title: "Weight & Metabolic Health (Men)",
    description: "Lose weight, build muscle, and improve metabolic health naturally.",
    image: IMG.programMenWeight,
    icon: "Scale",
    category: "men" as const,
    points: ["Fat Loss", "Muscle Building", "Metabolism Boost"],
    order: 8,
    active: true,
  },
  {
    title: "Stress & Performance Optimization",
    description: "Manage stress, improve focus, sleep, and physical performance.",
    image: IMG.programMenStress,
    icon: "Brain",
    category: "men" as const,
    points: ["Stress Management", "Better Sleep", "Peak Performance"],
    order: 9,
    active: true,
  },
  {
    title: "Prostate & Hormonal Health",
    description: "Support prostate health and maintain hormonal balance as you age.",
    image: IMG.programMenProstate,
    icon: "Droplets",
    category: "men" as const,
    points: ["Prostate Support", "Hormonal Balance", "Healthy Aging"],
    order: 10,
    active: true,
  },
];

/* ------------------------------- gallery page ----------------------------- */

export type GalleryPageContent = {
  mobileHero: {
    img: string;
    alt: string;
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    position: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
    image: string;
    imageAlt: string;
  };
  grid: { eyebrow: string; heading: string; headingAccent: string };
  stats: { icon: string; value: string; label: string }[];
  statsHeading: string;
  stories: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    sub: string;
    items: { name: string; tag: string; result: string; quote: string; img: string }[];
  };
  cta: { heading: string; sub: string; primaryLabel: string; secondaryLabel: string };
};

export const GALLERY_PAGE_DEFAULT: GalleryPageContent = {
  mobileHero: {
    img: IMG.mHeroGallery,
    alt: "Women laughing together at a Reclaim Hormones wellness seminar",
    eyebrow: "Our Gallery",
    title: "Moments of",
    titleAccent: "Healing & Hope.",
    subtitle: "Our clinic, our community events and the people who reclaimed their balance.",
    primaryLabel: "Browse Photos",
    secondaryLabel: "Transformation stories",
    position: "object-[50%_16%]",
  },
  hero: {
    eyebrow: "Our Gallery",
    title: "Moments of",
    titleAccent: "Healing & Hope",
    body: "A glimpse into our clinic, our community work and the real people whose hormone health we've helped restore — one personalized plan at a time.",
    primaryLabel: "Browse Photos",
    secondaryLabel: "Transformation Stories",
    image: IMG.galleryHero,
    imageAlt: "Clinical nutritionist Dt. Kruthi Goud at the Reclaim Hormones clinic",
  },
  grid: { eyebrow: "Photo Gallery", heading: "Inside Our", headingAccent: "World of Care" },
  statsHeading: "Our Community Impact",
  stats: [
    { icon: "Users", value: "5000+", label: "Lives Transformed" },
    { icon: "Camera", value: "50+", label: "Events & Camps" },
    { icon: "Star", value: "4.9/5", label: "Client Rating" },
    { icon: "Heart", value: "7+", label: "Years of Care" },
  ],
  stories: {
    eyebrow: "Transformation Stories",
    heading: "Real People.",
    headingAccent: "Real Results.",
    sub: "Every story here began with one consultation and a plan built around one person.",
    items: [
      {
        name: "Sravani, 29",
        tag: "PCOS Reversal",
        result: "Regular cycles in 4 months · 11 kg down",
        quote:
          "My cycles were missing for months and nothing worked. The plan was simple, food-first and completely doable. I feel like myself again.",
        img: IMG.gallery2,
      },
      {
        name: "Meghana, 34",
        tag: "Thyroid & Weight",
        result: "TSH normalized · 9 kg down",
        quote:
          "The fatigue and hair fall were the worst part. Six months in, my reports are normal and my energy is back all day.",
        img: IMG.gallery3,
      },
      {
        name: "Rahul, 38",
        tag: "Metabolic Health",
        result: "HbA1c 8.1 → 5.7 · 14 kg down",
        quote:
          "No crash diets, no starvation. Just clear guidance and constant support. My doctor reduced my medication.",
        img: IMG.gallery4,
      },
    ],
  },
  cta: {
    heading: "Your Story Could Be Next",
    sub: "Book a consultation and let's build the plan that finally works for your body.",
    primaryLabel: "Book Consultation",
    secondaryLabel: "Explore Programs",
  },
};

/** Seed photos for the `gallery` collection. */
export const GALLERY_SEED = [
  {
    url: IMG.clinicReception,
    caption: "Our welcoming clinic space",
    category: "Clinic" as const,
    order: 1,
  },
  {
    url: IMG.clinicConsultation,
    caption: "1:1 clinical consultations",
    category: "Consultations" as const,
    order: 2,
  },
  {
    url: IMG.gallery1,
    caption: "Hormone health awareness seminar",
    category: "Events & Seminars" as const,
    order: 3,
  },
  {
    url: IMG.clinicNutritionSession,
    caption: "Personalized nutrition planning",
    category: "Consultations" as const,
    order: 4,
  },
  {
    url: IMG.gallery2,
    caption: "Community nutrition workshop",
    category: "Community" as const,
    order: 5,
  },
  {
    url: IMG.clinicHealing,
    caption: "Designed for calm and healing",
    category: "Clinic" as const,
    order: 6,
  },
  {
    url: IMG.gallery3,
    caption: "Women's health awareness drive",
    category: "Community" as const,
    order: 7,
  },
  {
    url: IMG.gallery4,
    caption: "Speaking at wellness conferences",
    category: "Events & Seminars" as const,
    order: 8,
  },
  {
    url: IMG.gallery5,
    caption: "Free community health camps",
    category: "Events & Seminars" as const,
    order: 9,
  },
];

/** Seed reviews for the `testimonials` collection. */
export const TESTIMONIAL_SEED = [
  {
    name: "Anusha R.",
    program: "PCOS Program",
    rating: 5,
    review:
      "After years of irregular cycles and fatigue, Dt. Kruthi's personalized plan helped me restore my hormones naturally. I feel like a new me!",
    photo: "",
    order: 1,
  },
  {
    name: "Divya S.",
    program: "Thyroid Balance Program",
    rating: 5,
    review:
      "My thyroid levels are now stable and I have more energy than ever. The guidance and support made all the difference.",
    photo: "",
    order: 2,
  },
  {
    name: "Priya & Kiran",
    program: "Fertility Support Program",
    rating: 5,
    review:
      "We tried for years to conceive. With the right nutrition and support, we are now expecting our baby. Forever grateful!",
    photo: "",
    order: 3,
  },
];

/* ------------------------------- contact page ----------------------------- */

export type ContactPageContent = {
  mobileHero: {
    img: string;
    alt: string;
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
    position: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    whatsappLabel: string;
    image: string;
    imageAlt: string;
    assurances: IconItem[];
  };
  cards: {
    callTitle: string;
    callActionLabel: string;
    whatsappTitle: string;
    whatsappLine: string;
    whatsappActionLabel: string;
    emailTitle: string;
    emailActionLabel: string;
    visitTitle: string;
    visitActionLabel: string;
  };
  form: {
    eyebrow: string;
    heading: string;
    sub: string;
    concerns: string[];
    modes: string[];
    submitLabel: string;
    disclaimer: string;
    successTitle: string;
    successSub: string;
    successAgainLabel: string;
  };
  side: {
    image: string;
    imageAlt: string;
    hoursHeading: string;
    hours: { day: string; time: string }[];
    hoursNote: string;
    instagramTitle: string;
    instagramSub: string;
    mapEmbedUrl: string;
    mapTitle: string;
  };
  faqs: { eyebrow: string; heading: string; headingAccent: string; items: { q: string; a: string }[] };
  cta: { heading: string; sub: string; primaryLabel: string; secondaryLabel: string };
};

export const CONTACT_PAGE_DEFAULT: ContactPageContent = {
  mobileHero: {
    img: IMG.mHeroContact,
    alt: "Welcoming reception desk at the Reclaim Hormones clinic",
    eyebrow: "Contact Us",
    title: "Let's Start Your",
    titleAccent: "Healing Journey.",
    subtitle: "Call, WhatsApp or visit us in Hyderabad — we'll guide you to the right program.",
    primaryLabel: "Call us",
    secondaryLabel: "Chat on WhatsApp",
    position: "object-[50%_20%]",
  },
  hero: {
    eyebrow: "Contact Us",
    title: "Let's Start Your",
    titleAccent: "Healing Journey",
    body: "Have a question or ready to begin? Reach out and our team will guide you to the right program — online or at our Hyderabad clinic.",
    whatsappLabel: "WhatsApp",
    image: IMG.contactHero,
    imageAlt: "Woman booking a hormone health consultation on her laptop",
    assurances: [
      { icon: "Video", title: "Online & In-Clinic", sub: "Consult from anywhere in India." },
      {
        icon: "ShieldCheck",
        title: "Fully Confidential",
        sub: "Your reports stay private, always.",
      },
      { icon: "Sparkles", title: "Reply Within 24 Hours", sub: "A real human, not a bot." },
    ],
  },
  cards: {
    callTitle: "Call Us",
    callActionLabel: "Call now",
    whatsappTitle: "WhatsApp",
    whatsappLine: "Quick replies, Mon–Sat",
    whatsappActionLabel: "Chat on WhatsApp",
    emailTitle: "Email Us",
    emailActionLabel: "Send an email",
    visitTitle: "Visit Us",
    visitActionLabel: "Get directions",
  },
  form: {
    eyebrow: "Get in Touch",
    heading: "Send Us a Message",
    sub: "Tell us a little about your health concern and we'll get back within 24 hours.",
    concerns: [
      "PCOS / PCOD",
      "Thyroid",
      "Diabetes / Insulin Resistance",
      "Fertility Support",
      "Weight & Metabolic Health",
      "Menopause",
      "Men's Hormonal Health",
      "Something else",
    ],
    modes: ["Online video call", "In-clinic (Hyderabad)"],
    submitLabel: "Send Message",
    disclaimer:
      "By submitting, you agree to be contacted about your enquiry. We never share your details.",
    successTitle: "Thank you for reaching out!",
    successSub: "Your enquiry has been noted. For anything urgent, WhatsApp us.",
    successAgainLabel: "Send another message",
  },
  side: {
    image: IMG.clinicReception,
    imageAlt: "Reception area of the Reclaim Hormones clinic in Hyderabad",
    hoursHeading: "Clinic Hours",
    hours: [
      { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
      { day: "Saturday", time: "9:00 AM – 4:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    hoursNote: "Online consultations available on request outside clinic hours.",
    instagramTitle: "Follow our daily tips",
    instagramSub: "Recipes, myth-busting and client wins.",
    mapEmbedUrl: "https://www.google.com/maps?q=Hyderabad,Telangana,India&output=embed",
    mapTitle: "Reclaim Hormones clinic location in Hyderabad",
  },
  faqs: {
    eyebrow: "Before You Book",
    heading: "Frequently Asked",
    headingAccent: "Questions",
    items: [
      {
        q: "Do you offer online consultations?",
        a: "Yes. Most of our clients consult online over video call, with reports shared securely before the session.",
      },
      {
        q: "How long is the first consultation?",
        a: "Your first session runs 45–60 minutes so we can review your history, reports, lifestyle and goals in depth.",
      },
      {
        q: "What should I keep ready?",
        a: "Any recent blood work (thyroid profile, HbA1c, hormone panel), current medications or supplements, and a rough note of your daily routine.",
      },
      {
        q: "Will I have to follow a restrictive diet?",
        a: "No. Every plan is built around your regional food, family meals and preferences — it should feel sustainable, not punishing.",
      },
    ],
  },
  cta: {
    heading: "Ready to feel like yourself again?",
    sub: "Book a consultation today and get a plan built entirely around your body.",
    primaryLabel: "Book Consultation",
    secondaryLabel: "Explore Programs",
  },
};
