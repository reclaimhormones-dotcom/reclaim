import { createFileRoute } from "@tanstack/react-router";
import { Check, Mail, Phone, Trash2, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { Button, Card, EmptyState, ErrorState, SectionTitle, Spinner } from "@/components/admin/AdminUI";
import { useCollectionData } from "@/hooks/useFirestore";
import { deleteItem } from "@/lib/admin-crud";
import { markMessageHandled } from "@/lib/contact-messages";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

type MessageDoc = {
  id: string;
  name: string;
  phone: string;
  email: string;
  concern: string;
  mode: string;
  message: string;
  handled?: boolean;
  createdAt?: number;
};

function AdminMessages() {
  const { data, loading, error } = useCollectionData<MessageDoc>("messages", null);
  const rows = [...data].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  return (
    <div>
      <SectionTitle title="Enquiries" sub="Messages sent through the contact page form." />

      {error ? <ErrorState message={error} /> : null}

      {loading ? (
        <Spinner />
      ) : rows.length === 0 ? (
        <EmptyState title="No enquiries yet" sub="New contact form submissions appear here live." />
      ) : (
        <div className="space-y-3">
          {rows.map((m) => (
            <Card key={m.id} className={m.handled ? "opacity-70" : ""}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">
                    {m.name}
                    {m.concern ? (
                      <span className="ml-2 rounded-full bg-sage-soft px-2.5 py-1 text-[0.68rem] text-brand-deep">
                        {m.concern}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <a href={`tel:${m.phone}`} className="flex items-center gap-1 hover:text-brand">
                      <Phone className="size-3.5" /> {m.phone}
                    </a>
                    {m.email ? (
                      <a
                        href={`mailto:${m.email}`}
                        className="flex items-center gap-1 hover:text-brand"
                      >
                        <Mail className="size-3.5" /> {m.email}
                      </a>
                    ) : null}
                    {m.mode ? <span>{m.mode}</span> : null}
                    {m.createdAt ? (
                      <span>{new Date(m.createdAt).toLocaleString("en-IN")}</span>
                    ) : null}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      void markMessageHandled(m.id, !m.handled)
                        .then(() => toast.success(m.handled ? "Marked as open" : "Marked as handled"))
                        .catch(() => toast.error("Could not update"));
                    }}
                  >
                    {m.handled ? <Undo2 className="size-4" /> : <Check className="size-4" />}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      void deleteItem("messages", m.id)
                        .then(() => toast.success("Enquiry deleted"))
                        .catch(() => toast.error("Could not delete"));
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              {m.message ? (
                <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
