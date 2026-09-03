/**
 * Professional WhatsApp message templates used across every form and CTA.
 * Every message identifies the website as the source and formats details
 * clearly so the clinic team can act on them immediately.
 */

export type WhatsAppLead = {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  program?: string;
  concern?: string;
  mode?: string;
  message?: string;
  source: string;
};

function line(label: string, value?: string): string | null {
  const v = (value ?? "").trim();
  return v ? `*${label}:* ${v}` : null;
}

export function buildLeadMessage(lead: WhatsAppLead): string {
  const rows = [
    line("Name", lead.name),
    line("Gender", lead.gender),
    line("Phone", lead.phone),
    line("Email", lead.email),
    line("Program", lead.program),
    line("Main concern", lead.concern),
    line("Preferred mode", lead.mode),
    line("Message", lead.message),
  ].filter(Boolean) as string[];

  return [
    "Hello *Reclaim Hormones*,",
    "",
    "I have submitted an enquiry on your website and would like to book a consultation.",
    "",
    ...rows,
    "",
    `*Source:* Website — ${lead.source}`,
    "",
    "Please guide me on the next steps. Thank you.",
  ].join("\n");
}

export function buildPaymentMessage(input: {
  name: string;
  phone: string;
  program: string;
  amount: number;
  screenshotUrl?: string;
}): string {
  return [
    "Hello *Reclaim Hormones*,",
    "",
    "I have completed the payment for my assessment.",
    "",
    `*Name:* ${input.name}`,
    `*Phone:* ${input.phone}`,
    `*Program:* ${input.program}`,
    `*Amount paid:* ₹${input.amount.toLocaleString("en-IN")}`,
    ...(input.screenshotUrl ? [`*Payment screenshot:* ${input.screenshotUrl}`] : []),
    "",
    "*Source:* Website — Assessment payment",
    "",
    "Kindly verify my payment so I can continue with the health assessment.",
  ].join("\n");
}

/** Builds a wa.me link for a raw phone value (spaces/dashes tolerated). */
export function waLink(phone: string, message: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp in a new tab; safe to call from a submit handler. */
export function openWhatsApp(phone: string, message: string): void {
  if (!phone) return;
  if (typeof window === "undefined") return;
  window.open(waLink(phone, message), "_blank", "noopener,noreferrer");
}
