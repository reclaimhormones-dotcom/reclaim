import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

export const NAV: {
  label: string;
  to: "/" | "/about" | "/programs" | "/gallery" | "/contact";
  hash?: string;
}[] = [
  { label: "Home", to: "/" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Programs", to: "/programs" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "Contact", to: "/contact" as const },
];

export const CONTACT = [
  { icon: Phone, title: "Call Us", value: "+91 86887 23142" },
  { icon: Mail, title: "Email Us", value: "reclaimhormones@gmail.com" },
  { icon: MapPin, title: "Location", value: "Hyderabad, Telangana" },
  { icon: Clock, title: "Timings", value: "Mon - Sat : 9AM - 7PM" },
];

export const SOCIALS = [Instagram, Facebook, MessageCircle, Youtube];

export const PROGRAM_LINKS = [
  "Women's Health",
  "Men's Health",
  "Weight & Metabolic Health",
  "Fertility Support",
  "Thyroid Care",
];
