import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Star, Trash2, Video } from "lucide-react";
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
import type { TestimonialDoc } from "@/lib/content-types";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

type Draft = Omit<TestimonialDoc, "id">;

const empty = (order: number): Draft => ({
  name: "",
  program: "",
  rating: 5,
  review: "",
  photo: "",
  order,
  mediaType: "text",
  videoUrl: "",
  approved: true,
  featured: false,
});

function AdminTestimonials() {
  const { data, loading, error } = useCollectionData<TestimonialDoc>("testimonials");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft) return;
    if (draft.name.trim().length < 2 || draft.review.trim().length < 10) {
      toast.error("Please add a name and a review of at least 10 characters.");
      return;
    }

    /* Each story type has its own required media. */
    const type = draft.mediaType ?? "text";
    if (type === "video" && !draft.videoUrl?.trim()) {
      toast.error("Add a video link, or change the story type.");
      return;
    }
    if (type === "image" && !draft.photo?.trim()) {
      toast.error("Upload a client photo, or change the story type.");
      return;
    }

    /* Clear whatever the chosen type does not use, so the website never has to
       guess which of a stale photo/video pair to trust. */
    const cleaned: Draft = {
      ...draft,
      photo: type === "text" ? "" : (draft.photo ?? ""),
      videoUrl: type === "video" ? (draft.videoUrl ?? "") : "",
    };

    setSaving(true);
    try {
      if (editingId === "new") await createItem("testimonials", cleaned);
      else if (editingId) await updateItem("testimonials", editingId, cleaned);
      toast.success("Testimonial saved");
      setEditingId(null);
      setDraft(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const a = data[index];
    const b = data[index + dir];
    if (!a || !b) return;
    try {
      await swapOrder(
        "testimonials",
        { id: a.id, order: a.order ?? index },
        { id: b.id, order: b.order ?? index + dir },
      );
    } catch {
      toast.error("Could not reorder");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle title="Testimonials" sub="Shown on the home page testimonial slider." />
        <Button
          onClick={() => {
            setEditingId("new");
            setDraft(empty(data.length + 1));
          }}
        >
          <Plus className="size-4" /> Add testimonial
        </Button>
      </div>

      {error ? <ErrorState message={error} /> : null}

      {editingId && draft ? (
        <Card className="mb-6">
          <h3 className="font-serif text-xl text-brand-deep">
            {editingId === "new" ? "New testimonial" : "Edit testimonial"}
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Field label="Client name">
              <input
                className={inputClass}
                value={draft.name}
                maxLength={60}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>
            <Field label="Program">
              <input
                className={inputClass}
                value={draft.program}
                maxLength={80}
                onChange={(e) => setDraft({ ...draft, program: e.target.value })}
              />
            </Field>
            <Field label="Rating">
              <select
                className={inputClass}
                value={String(draft.rating)}
                onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} star{r === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Display order">
              <input
                className={inputClass}
                inputMode="numeric"
                value={String(draft.order)}
                onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) || 0 })}
              />
            </Field>
            <div className="lg:col-span-2">
              <Field label="Review">
                <textarea
                  className={`${inputClass} min-h-28`}
                  value={draft.review}
                  maxLength={700}
                  onChange={(e) => setDraft({ ...draft, review: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Story type">
              <select
                className={inputClass}
                value={draft.mediaType ?? "text"}
                onChange={(e) =>
                  setDraft({ ...draft, mediaType: e.target.value as NonNullable<Draft["mediaType"]> })
                }
              >
                <option value="text">Text only</option>
                <option value="image">Text + photo</option>
                <option value="video">Text + video</option>
              </select>
            </Field>
            {(draft.mediaType ?? "text") === "video" ? (
              <Field
                label="Video link (YouTube, Vimeo or MP4) *"
                hint="Required for a video story. The website shows a clean thumbnail until the visitor presses play."
              >
                <input
                  className={inputClass}
                  value={draft.videoUrl ?? ""}
                  placeholder="https://youtu.be/…"
                  onChange={(e) => setDraft({ ...draft, videoUrl: e.target.value })}
                />
              </Field>
            ) : null}
            <Field label="Show on website">
              <select
                className={inputClass}
                value={draft.approved === false ? "no" : "yes"}
                onChange={(e) => setDraft({ ...draft, approved: e.target.value === "yes" })}
              >
                <option value="yes">Approved — visible</option>
                <option value="no">Hidden</option>
              </select>
            </Field>
            <Field label="Featured story">
              <select
                className={inputClass}
                value={draft.featured ? "yes" : "no"}
                onChange={(e) => setDraft({ ...draft, featured: e.target.value === "yes" })}
              >
                <option value="no">Normal</option>
                <option value="yes">Featured first</option>
              </select>
            </Field>
            {(draft.mediaType ?? "text") !== "text" ? (
              <div className="lg:col-span-2">
                <ImageUploadField
                  label={
                    (draft.mediaType ?? "text") === "image"
                      ? "Client photo *"
                      : "Client photo (optional)"
                  }
                  value={draft.photo}
                  folder="reclaim/testimonials"
                  onChange={(url) => setDraft({ ...draft, photo: url })}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Shown as the round avatar at the top of the card — never as a banner image.
                </p>
              </div>
            ) : null}
          </div>
          <div className="mt-5 flex gap-2">
            <Button loading={saving} onClick={() => void save()}>
              Save testimonial
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
          title="No testimonials yet"
          sub="Add client stories to build trust. The site shows built-in examples until you do."
        />
      ) : (
        <div className="space-y-3">
          {data.map((t, i) => (
            <Card key={t.id} className="flex flex-wrap items-start gap-4">
              <div className="size-14 shrink-0 overflow-hidden rounded-full bg-muted/40">
                {t.photo ? (
                  <img
                    src={cldOptimize(t.photo, 120)}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.program}</p>
                <div className="mt-1 flex gap-0.5 text-gold">
                  {Array.from({ length: t.rating || 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t.review}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <StatusBadge
                    label={t.approved === false ? "Hidden" : "Approved"}
                    tone={t.approved === false ? "danger" : "success"}
                  />
                  {t.featured ? <StatusBadge label="Featured" tone="warning" /> : null}
                  {t.videoUrl ? <StatusBadge label="Video" tone="info" /> : null}
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
                <Button
                  variant="ghost"
                  onClick={() => {
                    void updateItem("testimonials", t.id, { approved: t.approved === false })
                      .then(() =>
                        toast.success(t.approved === false ? "Now visible" : "Hidden from website"),
                      )
                      .catch(() => toast.error("Could not update"));
                  }}
                >
                  {t.approved === false ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    void updateItem("testimonials", t.id, { featured: !t.featured })
                      .then(() => toast.success(t.featured ? "Unfeatured" : "Featured"))
                      .catch(() => toast.error("Could not update"));
                  }}
                >
                  <Video className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingId(t.id);
                    setDraft({
                      name: t.name,
                      program: t.program,
                      rating: t.rating ?? 5,
                      review: t.review,
                      photo: t.photo ?? "",
                      order: t.order ?? 0,
                      mediaType: (t.mediaType ?? (t.videoUrl ? "video" : t.photo ? "image" : "text")) as NonNullable<Draft["mediaType"]>,
                      videoUrl: t.videoUrl ?? "",
                      approved: t.approved !== false,
                      featured: Boolean(t.featured),
                    });
                  }}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    void deleteItem("testimonials", t.id)
                      .then(() => toast.success("Testimonial deleted"))
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
    </div>
  );
}
