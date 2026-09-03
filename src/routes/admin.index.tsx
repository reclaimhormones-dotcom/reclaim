import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ClipboardCheck,
  Images,
  MessageSquareQuote,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Card, SectionTitle, Spinner } from "@/components/admin/AdminUI";
import { useCollectionData } from "@/hooks/useFirestore";
import type { AssessmentDoc, GalleryDoc, TestimonialDoc } from "@/lib/content-types";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function Stat({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  to: "/admin/assessments" | "/admin/payments" | "/admin/gallery" | "/admin/testimonials";
}) {
  return (
    <Link to={to} className="block">
      <Card className="transition-shadow hover:shadow-[0_22px_46px_-30px_oklch(0.44_0.052_140/0.6)]">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-serif text-3xl leading-none text-brand-deep">{value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function AdminDashboard() {
  const assessments = useCollectionData<AssessmentDoc>("assessments", null);
  const gallery = useCollectionData<GalleryDoc>("gallery");
  const testimonials = useCollectionData<TestimonialDoc>("testimonials");

  const loading = assessments.loading || gallery.loading || testimonials.loading;

  const pendingPayments = assessments.data.filter(
    (a) => a.paymentStatus === "pending_verification",
  ).length;
  const completed = assessments.data.filter((a) => a.status === "completed").length;

  const recent = [...assessments.data]
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
    .slice(0, 6);

  return (
    <div>
      <SectionTitle title="Dashboard" sub="A live snapshot of your clinic." />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Stat
              icon={Users}
              label="Total Clients"
              value={assessments.data.length}
              to="/admin/assessments"
            />
            <Stat
              icon={Wallet}
              label="Pending Payments"
              value={pendingPayments}
              to="/admin/payments"
            />
            <Stat
              icon={ClipboardCheck}
              label="Completed"
              value={completed}
              to="/admin/assessments"
            />
            <Stat icon={Images} label="Gallery Images" value={gallery.data.length} to="/admin/gallery" />
            <Stat
              icon={MessageSquareQuote}
              label="Testimonials"
              value={testimonials.data.length}
              to="/admin/testimonials"
            />
          </div>

          <Card className="mt-6">
            <h3 className="font-serif text-xl text-brand-deep">Recent activity</h3>
            {recent.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                No assessments yet. New submissions will appear here in real time.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border/70">
                {recent.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {a.details?.name || "Unnamed client"}
                      </p>
                      <p className="text-xs text-muted-foreground">{a.details?.phone || a.id}</p>
                    </div>
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-brand">
                      {(a.status ?? "draft").replace(/_/g, " ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
