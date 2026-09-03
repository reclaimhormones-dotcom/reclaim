import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Trash2 } from "lucide-react";
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
import { createItem, deleteItem, swapOrder, updateItem } from "@/lib/admin-crud";
import { cldOptimize, uploadImage } from "@/lib/cloudinary";
import { GALLERY_CATEGORIES, type GalleryCategory, type GalleryDoc } from "@/lib/content-types";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const { data, loading, error } = useCollectionData<GalleryDoc>("gallery");
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState<GalleryCategory>("Clinic");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    let uploaded = 0;
    try {
      for (const [i, file] of Array.from(files).entries()) {
        const { url } = await uploadImage(file, "reclaim/gallery");
        await createItem<Omit<GalleryDoc, "id">>("gallery", {
          url,
          caption: "",
          category,
          order: data.length + i + 1,
        });
        uploaded += 1;
      }
      toast.success(`${uploaded} image${uploaded === 1 ? "" : "s"} uploaded`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function patch(id: string, changes: Partial<GalleryDoc>) {
    try {
      await updateItem("gallery", id, changes);
    } catch {
      toast.error("Could not save change");
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const a = data[index];
    const b = data[index + dir];
    if (!a || !b) return;
    try {
      await swapOrder(
        "gallery",
        { id: a.id, order: a.order ?? index },
        { id: b.id, order: b.order ?? index + dir },
      );
    } catch {
      toast.error("Could not reorder");
    }
  }

  return (
    <div>
      <SectionTitle
        title="Gallery"
        sub="Images are uploaded to Cloudinary; only the URL is stored in the database."
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.1em] text-muted-foreground">
              Category for new uploads
            </span>
            <select
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void handleFiles(e.target.files)}
          />
          <Button loading={uploading} onClick={() => fileRef.current?.click()}>
            <ImagePlus className="size-4" /> Upload images
          </Button>
          {uploading ? (
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" /> Uploading…
            </span>
          ) : null}
        </div>
      </Card>

      {error ? <ErrorState message={error} /> : null}

      {loading ? (
        <Spinner />
      ) : data.length === 0 ? (
        <EmptyState
          title="No gallery images yet"
          sub="Upload photos of your clinic, consultations, events and community sessions."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((g, i) => (
            <Card key={g.id} className="space-y-3">
              <img
                src={cldOptimize(g.url, 600)}
                alt={g.caption || "Gallery image"}
                className="aspect-[4/3] w-full rounded-xl object-cover"
                loading="lazy"
              />
              <input
                className={inputClass}
                defaultValue={g.caption}
                maxLength={120}
                placeholder="Caption"
                onBlur={(e) => void patch(g.id, { caption: e.target.value })}
              />
              <select
                className={inputClass}
                value={g.category}
                onChange={(e) => void patch(g.id, { category: e.target.value as GalleryCategory })}
              >
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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
                  variant="danger"
                  className="ml-auto"
                  onClick={() => {
                    void deleteItem("gallery", g.id)
                      .then(() => toast.success("Image removed"))
                      .catch(() => toast.error("Could not delete image"));
                  }}
                >
                  <Trash2 className="size-4" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
