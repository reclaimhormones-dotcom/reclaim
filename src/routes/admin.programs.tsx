import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  Field,
  ImageUploadField,
  SectionTitle,
  Spinner,
  StatusBadge,
  inputClass,
} from "@/components/admin/AdminUI";
import { useCollectionData } from "@/hooks/useFirestore";
import { createItem, deleteItem, swapOrder, updateItem } from "@/lib/admin-crud";
import { cldOptimize } from "@/lib/cloudinary";
import { programSlug, type ProgramDoc } from "@/lib/content-types";

export const Route = createFileRoute("/admin/programs")({
  component: AdminPrograms,
});

type Draft = Omit<ProgramDoc, "id">;

const emptyDraft = (order: number): Draft => ({
  title: "",
  description: "",
  image: "",
  category: "women",
  points: [],
  order,
  active: true,
  duration: "",
  price: 0,
  showPrice: true,
  longDescription: "",
  whoFor: [],
  process: [],
});

function AdminPrograms() {
  const { data, loading, error } = useCollectionData<ProgramDoc>("programs");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [pointsText, setPointsText] = useState("");
  const [whoForText, setWhoForText] = useState("");
  const [processText, setProcessText] = useState("");

  function startNew() {
    setEditingId("new");
    setDraft(emptyDraft(data.length + 1));
    setPointsText("");
    setWhoForText("");
    setProcessText("");
  }

  function startEdit(p: ProgramDoc) {
    setEditingId(p.id);
    setDraft({
      title: p.title,
      description: p.description,
      image: p.image,
      category: p.category,
      points: p.points ?? [],
      order: p.order ?? 0,
      active: p.active !== false,
      duration: p.duration ?? "",
      price: p.price ?? 0,
      showPrice: p.showPrice !== false,
      longDescription: p.longDescription ?? "",
      whoFor: p.whoFor ?? [],
      process: p.process ?? [],
    });
    setPointsText((p.points ?? []).join(", "));
    setWhoForText((p.whoFor ?? []).join("\n"));
    setProcessText((p.process ?? []).join("\n"));
  }

  async function save() {
    if (!draft) return;
    if (draft.title.trim().length < 2) {
      toast.error("Please enter a program title.");
      return;
    }
    setSaving(true);
    const payload: Draft = {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      points: pointsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      whoFor: whoForText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      process: processText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      slug: programSlug({ ...draft, id: "" }),
    };
    try {
      if (editingId === "new") await createItem("programs", payload);
      else if (editingId) await updateItem("programs", editingId, payload);
      toast.success("Program saved");
      setEditingId(null);
      setDraft(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save program");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    try {
      await deleteItem("programs", id);
      toast.success("Program deleted");
    } catch {
      toast.error("Could not delete program");
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const a = data[index];
    const b = data[index + dir];
    if (!a || !b) return;
    try {
      await swapOrder("programs", { id: a.id, order: a.order ?? index }, { id: b.id, order: b.order ?? index + dir });
    } catch {
      toast.error("Could not reorder");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle
          title="Programs"
          sub="These replace the default programs on the Programs page when present."
        />
        <Button onClick={startNew}>
          <Plus className="size-4" /> Add program
        </Button>
      </div>

      {error ? <ErrorState message={error} /> : null}

      {editingId && draft ? (
        <Card className="mb-6">
          <h3 className="font-serif text-xl text-brand-deep">
            {editingId === "new" ? "New program" : "Edit program"}
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Field label="Title">
              <input
                className={inputClass}
                value={draft.title}
                maxLength={80}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </Field>
            <Field label="Category">
              <select
                className={inputClass}
                value={draft.category}
                onChange={(e) =>
                  setDraft({ ...draft, category: e.target.value as ProgramDoc["category"] })
                }
              >
                <option value="women">Women&apos;s Health</option>
                <option value="men">Men&apos;s Health</option>
              </select>
            </Field>
            <div className="lg:col-span-2">
              <Field label="Description">
                <textarea
                  className={`${inputClass} min-h-24`}
                  value={draft.description}
                  maxLength={500}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Highlights" hint="Comma separated, e.g. Cycle Regulation, Weight Management">
              <input
                className={inputClass}
                value={pointsText}
                maxLength={200}
                onChange={(e) => setPointsText(e.target.value)}
              />
            </Field>
            <Field label="Display order" hint="Smaller numbers show first.">
              <input
                className={inputClass}
                inputMode="numeric"
                value={String(draft.order)}
                onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) || 0 })}
              />
            </Field>
            <Field label="Duration" hint="e.g. 3 months, 12 weeks">
              <input
                className={inputClass}
                value={draft.duration ?? ""}
                maxLength={40}
                onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
              />
            </Field>
            <Field label="Price (₹)">
              <input
                className={inputClass}
                inputMode="numeric"
                value={String(draft.price ?? 0)}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) || 0 })}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
              <label className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <span className="text-sm">
                  Show price on the website
                  <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">
                    Turn off to hide the price from visitors.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="size-5 accent-[oklch(0.44_0.052_140)]"
                  checked={draft.showPrice !== false}
                  onChange={(e) => setDraft({ ...draft, showPrice: e.target.checked })}
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <span className="text-sm">
                  Program is active
                  <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">
                    Inactive programs are hidden from the website.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="size-5 accent-[oklch(0.44_0.052_140)]"
                  checked={draft.active !== false}
                  onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
                />
              </label>
            </div>
            <div className="lg:col-span-2">
              <Field label="Detail page introduction" hint="Shown on the program's own page.">
                <textarea
                  className={`${inputClass} min-h-24`}
                  value={draft.longDescription ?? ""}
                  maxLength={1200}
                  onChange={(e) => setDraft({ ...draft, longDescription: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Who is it for" hint="One point per line.">
              <textarea
                className={`${inputClass} min-h-24`}
                value={whoForText}
                onChange={(e) => setWhoForText(e.target.value)}
              />
            </Field>
            <Field label="How it works" hint="One step per line.">
              <textarea
                className={`${inputClass} min-h-24`}
                value={processText}
                onChange={(e) => setProcessText(e.target.value)}
              />
            </Field>
            <div className="lg:col-span-2">
              <ImageUploadField
                label="Program image"
                value={draft.image}
                folder="reclaim/programs"
                onChange={(url) => setDraft({ ...draft, image: url })}
              />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button loading={saving} onClick={() => void save()}>
              Save program
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setEditingId(null);
                setDraft(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      ) : null}

      {loading ? (
        <Spinner />
      ) : data.length === 0 ? (
        <EmptyState
          title="No programs yet"
          sub="Add your first program — until then the website shows the built-in program cards."
          action={
            <Button onClick={startNew}>
              <Plus className="size-4" /> Add program
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {data.map((p, i) => (
            <Card key={p.id} className="flex flex-wrap items-center gap-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted/40">
                {p.image ? (
                  <img
                    src={cldOptimize(p.image, 160)}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{p.title}</p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <StatusBadge label={p.category === "men" ? "Men" : "Women"} tone="success" />
                  {p.active === false ? <StatusBadge label="Hidden" tone="danger" /> : null}
                  {p.duration ? <StatusBadge label={p.duration} tone="neutral" /> : null}
                  {p.price ? (
                    <StatusBadge
                      label={p.showPrice === false ? `₹${p.price} (hidden)` : `₹${p.price}`}
                      tone={p.showPrice === false ? "warning" : "info"}
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" onClick={() => void move(i, -1)} disabled={i === 0}>
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => void move(i, 1)}
                  disabled={i === data.length - 1}
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Button variant="ghost" onClick={() => startEdit(p)}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="danger" onClick={() => void remove(p.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
