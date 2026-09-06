import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/BrandIcons";

import {
  Card,
  EmptyState,
  ErrorState,
  FilterChips,
  PageHeader,
  SearchInput,
  Spinner,
  StatusBadge,
} from "@/components/admin/AdminUI";
import { useCollectionData } from "@/hooks/useFirestore";
import { useSettings } from "@/hooks/useSiteContent";
import { MEAL_SLOTS, type AssessmentDoc, type ContactMessageDoc } from "@/lib/content-types";
import { buildLeadMessage, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/admin/patients")({
  component: AdminPatients,
});

type Patient = {
  key: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  age: string;
  address: string;
  program: string;
  assessment: AssessmentDoc | null;
  enquiries: ContactMessageDoc[];
  updatedAt: number;
};

const FILTERS = [
  { id: "all", label: "All patients" },
  { id: "assessment", label: "With assessment" },
  { id: "paid", label: "Payment approved" },
  { id: "enquiry", label: "Enquiry only" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

function digits(v: string): string {
  const d = (v || "").replace(/\D/g, "");
  return d.length > 10 ? d.slice(-10) : d;
}

function Detail({ p, whatsapp, onClose }: { p: Patient; whatsapp: string; onClose: () => void }) {
  const a = p.assessment;
  const d = a?.details;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-deep/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-background p-5 shadow-xl lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-2xl text-brand-deep">{p.name || "Patient"}</h3>
            <p className="text-sm text-muted-foreground">
              {[p.phone, p.email].filter(Boolean).join(" · ")}
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
          {p.gender ? <StatusBadge label={p.gender} tone="info" /> : null}
          {p.age ? <StatusBadge label={`${p.age} yrs`} /> : null}
          {a ? <StatusBadge label={(a.status ?? "draft").replace(/_/g, " ")} tone="success" /> : null}
          {a ? (
            <StatusBadge
              label={(a.paymentStatus ?? "not_started").replace(/_/g, " ")}
              tone={a.paymentStatus === "approved" ? "success" : "warning"}
            />
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Info label="Program of interest" value={p.program} />
          <Info label="Address" value={p.address} />
          <Info label="Health goal" value={d?.healthGoal ?? ""} />
          <Info label="Symptoms" value={d?.symptoms ?? ""} />
          <Info label="Medical history" value={d?.medicalHistory ?? ""} />
          <Info label="Lifestyle" value={d?.lifestyle ?? ""} />
          <Info label="Menstrual cycle" value={d?.menstrualCycle ?? ""} />
          <Info label="Looking to start" value={d?.lookingToStart ?? ""} />
        </div>

        {a?.nutritionLog ? (
          <div className="mt-6">
            <h4 className="font-serif text-lg text-brand-deep">Nutrition log</h4>
            <div className="mt-2 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <tbody>
                  {MEAL_SLOTS.map((slot) => {
                    const m = a.nutritionLog?.[slot];
                    if (!m?.food) return null;
                    return (
                      <tr key={slot} className="border-b border-border last:border-0">
                        <th className="px-3 py-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                          {slot}
                        </th>
                        <td className="px-3 py-2">{m.time}</td>
                        <td className="px-3 py-2">{m.food}</td>
                        <td className="px-3 py-2 text-muted-foreground">{m.portion}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {p.enquiries.length > 0 ? (
          <div className="mt-6">
            <h4 className="font-serif text-lg text-brand-deep">Enquiries ({p.enquiries.length})</h4>
            <div className="mt-2 space-y-2">
              {p.enquiries.map((e) => (
                <div key={e.id} className="rounded-xl border border-border p-3 text-sm">
                  <p className="text-xs text-muted-foreground">
                    {e.createdAt ? new Date(e.createdAt).toLocaleString("en-IN") : ""} · {e.concern}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap">{e.message}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {p.phone ? (
            <a
              href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <Phone className="size-4" /> Call
            </a>
          ) : null}
          {p.phone ? (
            <a
              href={waLink(
                p.phone.replace(/\D/g, "").length > 10 ? p.phone : `91${digits(p.phone)}`,
                buildLeadMessage({
                  name: p.name,
                  phone: p.phone,
                  email: p.email,
                  gender: p.gender,
                  program: p.program,
                  source: "Patient follow-up",
                }),
              )}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-brand-deep"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          ) : null}
          {whatsapp ? null : null}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap text-sm text-foreground">{value}</p>
    </div>
  );
}

function AdminPatients() {
  const assessments = useCollectionData<AssessmentDoc>("assessments", null);
  const messages = useCollectionData<ContactMessageDoc>("messages", null);
  const { settings } = useSettings();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [open, setOpen] = useState<string | null>(null);

  const patients = useMemo<Patient[]>(() => {
    const map = new Map<string, Patient>();

    for (const a of assessments.data) {
      const d = a.details ?? ({} as AssessmentDoc["details"]);
      const key = digits(d?.phone ?? a.id) || a.id;
      map.set(key, {
        key,
        name: d?.name ?? "",
        phone: d?.phone ?? "",
        email: d?.email ?? "",
        gender: d?.gender ?? "",
        age: d?.age ?? "",
        address: d?.address ?? "",
        program: d?.program ?? "",
        assessment: a,
        enquiries: [],
        updatedAt: a.updatedAt ?? a.createdAt ?? 0,
      });
    }

    for (const m of messages.data) {
      const key = digits(m.phone) || m.id;
      const existing = map.get(key);
      if (existing) {
        existing.enquiries.push(m);
        existing.program = existing.program || ((m as { program?: string }).program ?? "");
        existing.updatedAt = Math.max(existing.updatedAt, m.createdAt ?? 0);
      } else {
        map.set(key, {
          key,
          name: m.name,
          phone: m.phone,
          email: m.email,
          gender: (m as { gender?: string }).gender ?? "",
          age: "",
          address: "",
          program: (m as { program?: string }).program ?? "",
          assessment: null,
          enquiries: [m],
          updatedAt: m.createdAt ?? 0,
        });
      }
    }

    return Array.from(map.values()).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [assessments.data, messages.data]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return patients.filter((p) => {
      if (filter === "assessment" && !p.assessment) return false;
      if (filter === "paid" && p.assessment?.paymentStatus !== "approved") return false;
      if (filter === "enquiry" && p.assessment) return false;
      if (!needle) return true;
      return [p.name, p.phone, p.email, p.program].join(" ").toLowerCase().includes(needle);
    });
  }, [patients, filter, q]);

  const loading = assessments.loading || messages.loading;
  const error = assessments.error ?? messages.error;
  const active = shown.find((p) => p.key === open) ?? null;

  return (
    <div>
      <PageHeader
        title="Patients"
        sub="One profile per person, combining their enquiries, assessment answers and payment status."
        action={<SearchInput value={q} onChange={setQ} placeholder="Search name or phone" />}
      />

      <div className="mb-4">
        <FilterChips
          options={FILTERS.map((f) => ({
            id: f.id,
            label: f.label,
            count:
              f.id === "all"
                ? patients.length
                : patients.filter((p) =>
                    f.id === "assessment"
                      ? Boolean(p.assessment)
                      : f.id === "paid"
                        ? p.assessment?.paymentStatus === "approved"
                        : !p.assessment,
                  ).length,
          }))}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {error ? <ErrorState message={error} /> : null}

      {loading ? (
        <Spinner />
      ) : shown.length === 0 ? (
        <EmptyState
          title="No patients yet"
          sub="Profiles appear here automatically when someone submits an enquiry or an assessment."
        />
      ) : (
        <div className="space-y-3">
          {shown.map((p) => (
            <Card key={p.key} className="flex flex-wrap items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{p.name || "Unnamed"}</p>
                <p className="text-xs text-muted-foreground">
                  {[p.phone, p.email, p.program].filter(Boolean).join(" · ")}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.gender ? <StatusBadge label={p.gender} tone="info" /> : null}
                  {p.assessment ? (
                    <StatusBadge
                      label={(p.assessment.status ?? "draft").replace(/_/g, " ")}
                      tone="success"
                    />
                  ) : (
                    <StatusBadge label="Enquiry" />
                  )}
                  {p.assessment ? (
                    <StatusBadge
                      label={`payment: ${(p.assessment.paymentStatus ?? "not started").replace(
                        /_/g,
                        " ",
                      )}`}
                      tone={p.assessment.paymentStatus === "approved" ? "success" : "warning"}
                    />
                  ) : null}
                  {p.enquiries.length > 0 ? (
                    <StatusBadge label={`${p.enquiries.length} enquiry`} />
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(p.key)}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
              >
                View profile
              </button>
            </Card>
          ))}
        </div>
      )}

      {active ? (
        <Detail p={active} whatsapp={settings.whatsapp} onClose={() => setOpen(null)} />
      ) : null}
    </div>
  );
}
