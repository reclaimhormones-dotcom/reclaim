import { MessageCircle } from "lucide-react";

import { useSettings, whatsappLink } from "@/hooks/useSiteContent";

/** Floating WhatsApp CTA shown on every public page. */
export function WhatsAppButton() {
  const { settings } = useSettings();
  if (!settings.whatsapp) return null;

  return (
    <a
      href={whatsappLink(settings.whatsapp)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_oklch(0.44_0.052_140/0.85)] transition-transform hover:scale-[1.03] lg:bottom-7 lg:right-7"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
