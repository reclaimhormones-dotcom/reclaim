import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, Leaf, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { WhatsAppIcon } from "@/components/site/BrandIcons";
import { useSettings } from "@/hooks/useSiteContent";
import { ConsultModalContext, type ConsultModalApi } from "@/hooks/useConsultModal";
import { useScrollLock } from "@/hooks/useScrollLock";
import { submitEnquiry } from "@/lib/contact-messages";
import { buildWebsiteEnquiryMessage, openWhatsApp } from "@/lib/whatsapp";

/** Draft of an in-progress booking, so a reload never loses typed details. */
const DRAFT_KEY = "rh_consult_draft_v1";

type Draft = {
  name: string;
  gender: string;
  phone: string;
  email: string;
  concern: string;
};

const EMPTY: Draft = { name: "", gender: "Female", phone: "", email: "", concern: "" };

function readDraft(): Draft {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function ConsultModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState("");

  const api = useMemo<ConsultModalApi>(
    () => ({
      open: (p?: string) => {
        setProgram(p ?? "");
        setOpen(true);
      },
    }),
    [],
  );

  return (
    <ConsultModalContext.Provider value={api}>
      {children}
      {open ? <ConsultModal program={program} onClose={() => setOpen(false)} /> : null}
    </ConsultModalContext.Provider>
  );
}

/* Deliberately compact: the whole form has to fit one screen without the
   modal growing its own scrollbar. */
const fieldClass =
  "w-full min-h-11 rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20";

function ConsultModal({ program, onClose }: { program: string; onClose: () => void }) {
  const { settings } = useSettings();
  const [draft, setDraft] = useState<Draft>(readDraft);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  /* Nothing behind the modal may move while it is open. */
  useScrollLock(true);

  /* Persist while typing so a refresh, or an accidental close, loses nothing. */
  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* Private mode or blocked storage — the form still works in memory. */
    }
  }, [draft]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    const restoreFocus = document.activeElement as HTMLElement | null;
    /* Land on the first field on desktop; on touch let the sheet settle first. */
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      restoreFocus?.focus?.();
    };
  }, [onClose]);

  const set = useCallback(
    <K extends keyof Draft>(key: K, value: Draft[K]) =>
      setDraft((d) => ({ ...d, [key]: value })),
    [],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    try {
      const lead = {
        name: draft.name,
        phone: draft.phone,
        email: draft.email,
        gender: draft.gender,
        program,
        concern: draft.concern,
        mode: "",
        message: "Requested a free consultation from the website.",
        source: "Book Consultation Modal",
      };

      /* Firestore first: the enquiry must exist for the admin even if the
         visitor never actually sends the WhatsApp draft. */
      await submitEnquiry(lead);
      setDone(true);
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      openWhatsApp(settings.whatsapp, buildWebsiteEnquiryMessage(lead));
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

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-modal-title"
    >
      <button
        type="button"
        aria-label="Close booking form"
        onClick={onClose}
        className="absolute inset-0 bg-brand-deep/45 backdrop-blur-[3px] animate-in fade-in duration-300"
      />

      {/* Full-screen sheet on mobile, centred card from sm up. */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-card shadow-[0_30px_80px_-30px_oklch(0.35_0.048_142/45%)] animate-in slide-in-from-bottom-6 fade-in duration-300 sm:max-w-2xl sm:rounded-[1.75rem] sm:zoom-in-95 sm:slide-in-from-bottom-0">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
          className="absolute right-3.5 top-3.5 z-10 flex size-9 items-center justify-center rounded-full bg-background/85 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="shrink-0 bg-gradient-to-b from-sage-soft to-card px-6 pb-4 pt-6 text-center">
          <span className="icon-pod mx-auto size-10 rounded-full">
            <Leaf className="size-[1.15rem] text-gold" />
          </span>
          <p className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Complimentary
          </p>
          <h2
            id="consult-modal-title"
            className="mt-1 text-balance-heading text-[1.3rem] leading-snug text-foreground"
          >
            Book your free <span className="text-brand">consultation</span>
          </h2>
          {program ? (
            <p className="mt-2 inline-flex rounded-full bg-background/80 px-3 py-1 text-[0.7rem] font-semibold text-brand-deep">
              {program}
            </p>
          ) : null}
        </div>

        {done ? (
          <div className="px-6 pb-9 pt-4 text-center">
            <span className="icon-pod mx-auto size-14 rounded-full">
              <CheckCircle2 className="btn-check size-7" aria-hidden="true" />
            </span>
            <p className="mt-4 font-serif text-xl text-brand-deep">Request received</p>
            <p className="mx-auto mt-2 max-w-xs text-pretty-body text-sm text-muted-foreground">
              Our care team will call you shortly. We&apos;ve also opened WhatsApp so you can send
              your details straight to us.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="tactile touch-lg fill-primary mt-6 inline-flex items-center justify-center text-sm"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="grid gap-3 px-6 pb-6 pt-4 sm:grid-cols-2 sm:gap-x-4"
          >
            <label className="grid gap-1">
              <span className="text-xs font-medium text-muted-foreground">Name</span>
              <input
                ref={firstFieldRef}
                required
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your full name"
                className={fieldClass}
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-medium text-muted-foreground">Phone number</span>
              <input
                required
                type="tel"
                inputMode="tel"
                value={draft.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="WhatsApp number"
                className={fieldClass}
              />
            </label>

            <fieldset className="grid gap-1">
              <legend className="text-xs font-medium text-muted-foreground">Gender</legend>
              <div className="grid grid-cols-3 gap-2">
                {(["Female", "Male", "Other"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={draft.gender === g}
                    onClick={() => set("gender", g)}
                    className={`tactile min-h-11 rounded-xl text-[0.8rem] font-medium ${
                      draft.gender === g ? "fill-primary" : "fill-surface"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-1">
              <span className="text-xs font-medium text-muted-foreground">Email</span>
              <input
                type="email"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com (optional)"
                className={fieldClass}
              />
            </label>

            {/* Hidden when the visitor already picked a program — the page
                they came from has already answered this. */}
            {program ? null : (
              <label className="grid gap-1 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Main health concern
                </span>
                <textarea
                  rows={2}
                  maxLength={80}
                  value={draft.concern}
                  onChange={(e) => set("concern", e.target.value)}
                  placeholder="e.g. PCOS, thyroid, weight, fertility"
                  className={`${fieldClass} resize-none`}
                />
              </label>
            )}

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className={`tactile magnetic touch-lg fill-primary mt-1 inline-flex items-center justify-center gap-2 text-sm disabled:opacity-60 sm:col-span-2 ${
                sending ? "btn-busy" : ""
              }`}
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  <WhatsAppIcon className="size-4" aria-hidden="true" /> Book My Free Consultation
                </>
              )}
            </button>
            <p className="text-center text-[0.68rem] leading-relaxed text-muted-foreground sm:col-span-2">
              We&apos;ll save your request and open WhatsApp so our team can reply faster.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
