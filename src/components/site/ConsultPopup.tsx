import { useEffect, useState } from "react";
import { Leaf, X } from "lucide-react";
import { toast } from "sonner";

import { useSettings } from "@/hooks/useSiteContent";
import { submitEnquiry } from "@/lib/contact-messages";
import { buildLeadMessage, openWhatsApp } from "@/lib/whatsapp";

const STORAGE_KEY = "rh_consult_popup_v1";
const DELAY_MS = 120_000; // ~2 minutes of browsing

/**
 * Premium, once-per-session free consultation invitation.
 * Appears after ~2 minutes, never re-appears once dismissed or submitted.
 */
export function ConsultPopup() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY)) return;
    if (window.location.pathname.startsWith("/admin")) return;
    const t = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSending(true);
    try {
      const lead = {
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? ""),
        gender: String(fd.get("gender") ?? ""),
        concern: "",
        mode: "",
        message: "Requested a free consultation call.",
        source: "Free Consultation Popup",
      };
      await submitEnquiry(lead);
      setDone(true);
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, "1");
      openWhatsApp(settings.whatsapp, buildLeadMessage(lead));
    } catch (err) {
      const message =
        err && typeof err === "object" && "issues" in err
          ? ((err as { issues: { message: string }[] }).issues[0]?.message ??
            "Please check your details")
          : err instanceof Error
            ? err.message
            : "Could not send your request";
      toast.error(message);
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  const field =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-brand-deep/35 backdrop-blur-[2px] animate-in fade-in duration-300"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-popup-title"
        className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.35_0.048_142/45%)] animate-in slide-in-from-bottom-4 fade-in duration-400"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close popup"
          className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="bg-gradient-to-b from-sage-soft to-card px-6 pb-5 pt-8 text-center">
          <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-background">
            <Leaf className="size-5 text-gold" />
          </span>
          <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Complimentary
          </p>
          <h2 id="consult-popup-title" className="mt-1.5 text-[1.45rem] leading-snug text-foreground">
            Your free hormone <span className="text-brand">consultation call</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Thousands have reversed PCOS, thyroid and metabolic issues naturally. Leave your details
            and our team will call you personally — no cost, no obligation.
          </p>
        </div>

        {done ? (
          <div className="px-6 pb-8 pt-2 text-center">
            <p className="font-serif text-lg text-brand-deep">Thank you — you&apos;re on the list.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our care team will reach out shortly to schedule your free call.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => void handleSubmit(e)} className="grid gap-3 px-6 pb-7 pt-4">
            <input name="name" required placeholder="Full name" className={field} />
            <div className="flex gap-4 px-1 text-xs text-muted-foreground">
              {(["female", "male"] as const).map((g, i) => (
                <label key={g} className="inline-flex items-center gap-2 capitalize">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    defaultChecked={i === 0}
                    className="size-3.5 accent-[var(--primary)]"
                  />
                  {g}
                </label>
              ))}
            </div>
            <input name="email" type="email" placeholder="Email (optional)" className={field} />
            <input name="phone" type="tel" required placeholder="Phone / WhatsApp" className={field} />
            <button
              type="submit"
              disabled={sending}
              className="mt-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
            >
              {sending ? "Sending…" : "Claim my free consultation"}
            </button>
            <button
              type="button"
              onClick={close}
              className="text-[0.7rem] text-muted-foreground underline-offset-4 hover:underline"
            >
              Maybe later
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
