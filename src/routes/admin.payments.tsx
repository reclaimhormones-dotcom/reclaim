import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
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
import { reviewPayment } from "@/lib/assessments";
import type { AssessmentDoc, PaymentStatus } from "@/lib/content-types";

export const Route = createFileRoute("/admin/payments")({
  component: AdminPayments,
});

const TABS: { key: PaymentStatus | "all"; label: string }[] = [
  { key: "pending_verification", label: "Pending verification" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

function AdminPayments() {
  const { data, loading, error } = useCollectionData<AssessmentDoc>("assessments", null);
  const [tab, setTab] = useState<PaymentStatus | "all">("pending_verification");
  const [busy, setBusy] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const rows = useMemo(
    () =>
      data
        .filter((a) => a.paymentStatus && a.paymentStatus !== "not_started")
        .filter((a) => (tab === "all" ? true : a.paymentStatus === tab))
        .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)),
    [data, tab],
  );

  async function review(a: AssessmentDoc, approve: boolean) {
    setBusy(a.id);
    try {
      await reviewPayment(a.id, approve, reasons[a.id] ?? "");
      toast.success(approve ? "Payment approved" : "Payment rejected");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update payment");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <SectionTitle
        title="Payment Verification"
        sub="Review payment screenshots and unlock the nutrition log step for the client."
      />

      <Card className="mb-5">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "bg-brand text-primary-foreground"
                  : "border border-border text-foreground/80 hover:bg-accent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {error ? <ErrorState message={error} /> : null}

      {loading ? (
        <Spinner />
      ) : rows.length === 0 ? (
        <EmptyState
          title="Nothing to review"
          sub="Payment submissions from clients will appear here in real time."
        />
      ) : (
        <div className="space-y-4">
          {rows.map((a) => (
            <Card key={a.id} className="grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
              {a.paymentScreenshot ? (
                <a href={a.paymentScreenshot} target="_blank" rel="noreferrer noopener">
                  <img
                    src={cldOptimize(a.paymentScreenshot, 400)}
                    alt="Payment screenshot"
                    className="h-48 w-full rounded-xl border border-border object-cover lg:h-full"
                    loading="lazy"
                  />
                </a>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-xl bg-muted/40 text-xs text-muted-foreground">
                  No screenshot
                </div>
              )}

              <div className="min-w-0">
                <p className="font-medium text-foreground">{a.details?.name || "Client"}</p>
                <p className="text-xs text-muted-foreground">
                  {a.details?.phone} · {a.details?.email}
                </p>
                <p className="mt-2 text-sm text-brand-deep">
                  Amount: ₹{a.paymentAmount ?? 0}{" "}
                  <span className="ml-2 rounded-full bg-muted px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                    {(a.paymentStatus ?? "").replace(/_/g, " ")}
                  </span>
                </p>
                {a.paymentNote ? (
                  <p className="mt-1 text-xs text-muted-foreground">Note: {a.paymentNote}</p>
                ) : null}

                <input
                  className={`${inputClass} mt-3`}
                  placeholder="Optional note for your records (e.g. rejection reason)"
                  value={reasons[a.id] ?? ""}
                  maxLength={200}
                  onChange={(e) => setReasons({ ...reasons, [a.id]: e.target.value })}
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    loading={busy === a.id}
                    disabled={a.paymentStatus === "approved"}
                    onClick={() => void review(a, true)}
                  >
                    <Check className="size-4" /> Approve
                  </Button>
                  <Button
                    variant="danger"
                    disabled={busy === a.id || a.paymentStatus === "rejected"}
                    onClick={() => void review(a, false)}
                  >
                    <X className="size-4" /> Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
