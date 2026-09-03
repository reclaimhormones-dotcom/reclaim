import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  SectionTitle,
  Spinner,
  inputClass,
} from "@/components/admin/AdminUI";
import { useCollectionData } from "@/hooks/useFirestore";
import { cldOptimize } from "@/lib/cloudinary";
import { deleteAssessment } from "@/lib/assessments";
import { MEAL_SLOTS, type AssessmentDoc } from "@/lib/content-types";

export const Route = createFileRoute("/admin/assessments")({
  component: AdminAssessments,
});

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending Payment" },
  { key: "paid", label: "Paid" },
  { key: "completed", label: "Completed" },
] as const;
type FilterKey = (typeof FILTERS)[number]["key"];

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "completed"
      ? "bg-brand/15 text-brand"
      : status === "payment_completed"
        ? "bg-gold/20 text-brand-deep"
        : "bg-muted text-muted-foreground";
  return (
    <span className={`rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.1em] ${tone}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="py-2">
      <p className="text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap text-sm text-foreground">{value}</p>
    </div>
  );
}

function Detail({ a, onClose }: { a: AssessmentDoc; onClose: () => void }) {
  const d = a.details ?? {};
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-deep/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-background p-5 shadow-xl lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl text-brand-deep">{d.name || "Client"}</h3>
            <p className="text-sm text-muted-foreground">
              {d.phone} · {d.email}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-full border border-border p-2 hover:bg-accent"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusPill status={a.status ?? "draft"} />
          <StatusPill status={a.paymentStatus ?? "not_started"} />
        </div>

        <div className="mt-4 grid gap-x-8 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0">
          <Row label="Age" value={d.age ?? ""} />
          <Row label="Address" value={d.address ?? ""} />
          <Row label="Main health goal" value={d.healthGoal ?? ""} />
          <Row label="Looking to start" value={d.lookingToStart ?? ""} />
          <Row label="Menstrual cycle" value={d.menstrualCycle ?? ""} />
          <Row label="Past medical history" value={d.medicalHistory ?? ""} />
          <Row label="Daily symptoms" value={d.symptoms ?? ""} />
          <Row label="Lifestyle / routine" value={d.lifestyle ?? ""} />
          <Row label="Previous programs" value={d.previousPrograms ?? ""} />
        </div>

        <h4 className="mt-6 font-serif text-xl text-brand-deep">Nutrition log</h4>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead>
              <tr className="text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="py-2 pr-3">Meal</th>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Food</th>
                <th className="py-2">Portion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {MEAL_SLOTS.map((slot) => {
                const entry = a.nutritionLog?.[slot];
                return (
                  <tr key={slot}>
                    <td className="py-2 pr-3 font-medium text-brand-deep">{slot}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{entry?.time || "—"}</td>
                    <td className="py-2 pr-3">{entry?.food || "—"}</td>
                    <td className="py-2 text-muted-foreground">{entry?.portion || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {a.paymentScreenshot ? (
          <>
            <h4 className="mt-6 font-serif text-xl text-brand-deep">Payment screenshot</h4>
            <a href={a.paymentScreenshot} target="_blank" rel="noreferrer noopener">
              <img
                src={cldOptimize(a.paymentScreenshot, 600)}
                alt="Payment screenshot"
                className="mt-2 max-h-72 w-auto rounded-xl border border-border"
                loading="lazy"
              />
            </a>
          </>
        ) : null}

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdminAssessments() {
  const { data, loading, error } = useCollectionData<AssessmentDoc>("assessments", null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState<AssessmentDoc | null>(null);

  const rows = useMemo(() => {
    const q = term.trim().toLowerCase();
    return data
      .filter((a) => {
        if (filter === "pending") return a.paymentStatus !== "approved" && a.status !== "completed";
        if (filter === "paid") return a.paymentStatus === "approved";
        if (filter === "completed") return a.status === "completed";
        return true;
      })
      .filter((a) => {
        if (!q) return true;
        const d = a.details ?? {};
        return [d.name, d.phone, d.email, a.id].some((v) =>
          (v ?? "").toLowerCase().includes(q),
        );
      })
      .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  }, [data, filter, term]);

  return (
    <div>
      <SectionTitle title="Assessment Manager" sub="Every client submission, updated live." />

      <Card className="mb-5">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                filter === f.key
                  ? "bg-brand text-primary-foreground"
                  : "border border-border text-foreground/80 hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className={`${inputClass} pl-9`}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search name, phone, email"
            />
          </div>
        </div>
      </Card>

      {error ? <ErrorState message={error} /> : null}

      {loading ? (
        <Spinner />
      ) : rows.length === 0 ? (
        <EmptyState title="No assessments found" sub="Try a different filter or search term." />
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <Card key={a.id} className="flex flex-wrap items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">
                  {a.details?.name || "Unnamed client"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {a.details?.phone || a.id} · {a.details?.email}
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {a.details?.healthGoal}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={a.status ?? "draft"} />
                <StatusPill status={a.paymentStatus ?? "not_started"} />
                <Button variant="ghost" onClick={() => setOpen(a)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    void deleteAssessment(a.id)
                      .then(() => toast.success("Assessment deleted"))
                      .catch(() => toast.error("Could not delete"));
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {open ? <Detail a={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}
