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

/**
 * The single message every WhatsApp entry point on the website sends.
 *
 * Details the site already knows are filled in; anything it does not know is
 * left as a labelled blank so the visitor completes it in WhatsApp before
 * sending, rather than the clinic receiving a message with "undefined" in it.
 */
export function buildWebsiteEnquiryMessage(lead: Partial<WhatsAppLead> = {}): string {
  const detail = (label: string, value?: string) => `• ${label}: ${(value ?? "").trim()}`;

  return [
    "Hello *Reclaim Hormones Team* 🌿",
    "",
    "I visited your website and I'm interested in your hormone health programs.",
    "",
    "*My Details*",
    detail("Name", lead.name),
    detail("Gender", lead.gender),
    detail("Phone Number", lead.phone),
    detail("Program of Interest", lead.program),
    ...(lead.concern?.trim() ? [detail("Main Health Concern", lead.concern)] : []),
    "",
    "I would like to book a consultation. Please guide me with the next steps.",
    "",
    "Thank you.",
  ].join("\n");
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
    line("Website Source", lead.source),
  ].filter(Boolean) as string[];

  return [
    "Hello *Reclaim Hormones*,",
    "",
    "You have a new *Website Enquiry* for a consultation.",
    "",
    ...rows,
    "",
    "Please review and contact the patient.",
  ].join("\n");
}

/**
 * Sent by the patient the moment a payment screenshot is uploaded. It carries
 * every detail the clinic needs to verify the transfer, and closes by asking
 * the patient to attach the same screenshot — WhatsApp cannot be handed an
 * image through a deep link, so that step is theirs.
 */
export function buildPaymentMessage(input: {
  name: string;
  phone: string;
  gender?: string;
  program: string;
  amount: number;
  reference?: string;
  screenshotUrl?: string;
}): string {
  return [
    "Hello *Reclaim Hormones Team* 🌿",
    "",
    "I have completed the payment for my health assessment.",
    "",
    "*Payment Details*",
    `• Name: ${input.name}`,
    ...(input.gender?.trim() ? [`• Gender: ${input.gender}`] : []),
    `• Phone Number: ${input.phone}`,
    `• Program: ${input.program}`,
    `• Amount Paid: ₹${input.amount.toLocaleString("en-IN")}`,
    ...(input.reference ? [`• Payment Reference: ${input.reference}`] : []),
    "• Website Source: Assessment — Step 2 Payment",
    ...(input.screenshotUrl ? ["", `*Screenshot:* ${input.screenshotUrl}`] : []),
    "",
    "📎 I am attaching the payment screenshot with this message.",
    "",
    "Kindly verify my payment so Step 3 unlocks. Thank you.",
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
