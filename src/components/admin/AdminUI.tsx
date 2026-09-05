import { useRef, useState, type ReactNode } from "react";
import { Copy, ImagePlus, Loader2, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { cldOptimize, uploadImage } from "@/lib/cloudinary";

/* ------------------------------- primitives ------------------------------- */

export const inputClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function Field({
  label,
  hint,
  action,
  children,
}: {
  label: string;
  hint?: string | undefined;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="block text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </span>
        {action}
      </div>
      {children}
      {hint ? <span className="mt-1 block text-[0.7rem] text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border/70 bg-card p-5 shadow-[0_18px_40px_-32px_oklch(0.44_0.052_140/0.55)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-serif text-2xl text-brand-deep">{title}</h2>
      {sub ? <p className="mt-1 text-sm text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-brand-deep"
      : variant === "danger"
        ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
        : "border border-border bg-background text-foreground hover:bg-accent";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      {label}
    </div>
  );
}

export function EmptyState({
  title,
  sub,
  action,
}: {
  title: string;
  sub: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <p className="font-serif text-lg text-brand-deep">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{sub}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">
      {message}
    </div>
  );
}

/* ----------------------------- image uploader ----------------------------- */

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "reclaim",
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  hint?: string;
}) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function handle(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const result = await uploadImage(file, folder);
      onChange(result.url);
      toast.success("Image uploaded to Cloudinary");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <Field label={label} hint={hint ?? "Stored on Cloudinary — only the URL is saved."}>
      <div className="flex items-center gap-3">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/40">
          {value ? (
            <img
              src={cldOptimize(value, 200)}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <ImagePlus className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void handle(e.target.files?.[0])}
          />
          <Button variant="ghost" loading={busy} onClick={() => ref.current?.click()}>
            {value ? "Replace image" : "Upload image"}
          </Button>
          {value ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  void navigator.clipboard
                    .writeText(value)
                    .then(() => toast.success("Image link copied"))
                    .catch(() => toast.error("Could not copy the link"));
                }}
              >
                <Copy className="size-4" /> Copy link
              </Button>
              <Button variant="danger" onClick={() => onChange("")}>
                <Trash2 className="size-4" />
                Remove
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </Field>
  );
}


/* --------------------------- layout & list helpers ------------------------- */

export function PageHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="font-serif text-2xl text-brand-deep sm:text-[1.75rem]">{title}</h1>
        {sub ? <p className="mt-1 text-sm text-muted-foreground">{sub}</p> : null}
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        className={`${inputClass} pl-9`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-brand/12 text-brand-deep",
  warning: "bg-gold/20 text-[oklch(0.42_0.08_78)]",
  danger: "bg-destructive/12 text-destructive",
  info: "bg-sky-500/12 text-sky-700",
};

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: BadgeTone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${TONES[tone]}`}
    >
      {label}
    </span>
  );
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
            o.id === value
              ? "bg-brand text-primary-foreground"
              : "border border-border bg-background text-foreground/75 hover:bg-brand/10"
          }`}
        >
          {o.label}
          {typeof o.count === "number" ? ` (${o.count})` : ""}
        </button>
      ))}
    </div>
  );
}
