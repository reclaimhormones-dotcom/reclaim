import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { Check, Facebook, Linkedin, Link2, Send, Share2, Twitter } from "lucide-react";
import { toast } from "sonner";

import { WhatsAppIcon, InstagramIcon } from "@/components/site/BrandIcons";

export type SharePayload = {
  /** Absolute URL of the thing being shared. */
  url: string;
  title: string;
  /** Short, SEO-friendly summary used as the share text. */
  description: string;
};

/** The message body reused by every text-based share target. */
function shareText(p: SharePayload): string {
  return `${p.title}\n\n${p.description}\n\n${p.url}`;
}

type Target = {
  id: string;
  label: string;
  /* Lucide icons and our own brand marks are both plain SVG components. */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: (p: SharePayload) => string;
  /** Targets with no link intent (Instagram) fall back to copying. */
  copyOnly?: boolean;
};

/*
 * Instagram has no public web intent for sharing an arbitrary link, so it
 * copies instead of pretending to open a composer that would drop the URL.
 */
const TARGETS: Target[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    Icon: WhatsAppIcon,
    href: (p) => `https://wa.me/?text=${encodeURIComponent(shareText(p))}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    Icon: Facebook,
    href: (p) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(p.url)}`,
  },
  {
    id: "x",
    label: "X",
    Icon: Twitter,
    href: (p) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(p.url)}&text=${encodeURIComponent(
        `${p.title} — ${p.description}`,
      )}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    Icon: Linkedin,
    href: (p) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(p.url)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    Icon: Send,
    href: (p) =>
      `https://t.me/share/url?url=${encodeURIComponent(p.url)}&text=${encodeURIComponent(
        `${p.title} — ${p.description}`,
      )}`,
  },
  { id: "instagram", label: "Instagram", Icon: InstagramIcon, copyOnly: true },
];

/**
 * Share control for a program.
 *
 * On a device with the native share sheet (most phones) the button hands off
 * to the OS directly, which is both faster and the only way to reach apps the
 * web has no intent URL for. Everywhere else it opens a small menu of
 * per-network links.
 */
export function ShareMenu({
  payload,
  className = "",
  label = "Share",
}: {
  payload: SharePayload;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(payload.url);
      setCopied(true);
      toast.success("Link copied — paste it anywhere.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link.");
    }
    setOpen(false);
  }

  async function handleClick() {
    /* Native sheet first: it reaches Instagram, Messages and everything else
       the browser has no intent for. */
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.description,
          url: payload.url,
        });
        return;
      } catch {
        /* Dismissed, or the sheet refused — fall through to the menu. */
      }
    }
    setOpen((o) => !o);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => void handleClick()}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label || "Share"}
        title={label || "Share"}
        /* No label renders as a compact icon-only control, for card footers. */
        className={`tactile inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-accent ${
          label ? "px-4 py-2.5" : "size-10"
        }`}
      >
        <Share2 className="size-4 text-brand" aria-hidden="true" />
        {label}
      </button>

      {open ? (
        <div
          role="menu"
          className="surface absolute right-0 z-30 mt-2 w-56 overflow-hidden p-1.5 shadow-[var(--shadow-e3)] animate-in fade-in zoom-in-95 duration-200"
        >
          {TARGETS.map((t) => {
            const common =
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-brand/10";
            if (t.copyOnly || !t.href) {
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitem"
                  onClick={() => void copyLink()}
                  className={common}
                >
                  <t.Icon className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {t.label}
                  <span className="ml-auto text-[0.65rem] text-muted-foreground">copy link</span>
                </button>
              );
            }
            return (
              <a
                key={t.id}
                role="menuitem"
                href={t.href(payload)}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className={common}
              >
                <t.Icon className="size-4 shrink-0 text-brand" aria-hidden="true" />
                {t.label}
              </a>
            );
          })}

          <div className="my-1 h-px bg-border/70" />
          <button
            type="button"
            role="menuitem"
            onClick={() => void copyLink()}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-brand/10"
          >
            {copied ? (
              <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
            ) : (
              <Link2 className="size-4 shrink-0 text-brand" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
