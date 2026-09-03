import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button, Card, Field, ImageUploadField, SectionTitle, inputClass } from "./AdminUI";
import { useDocData } from "@/hooks/useFirestore";
import { saveDocument } from "@/lib/admin-crud";
import { ICON_NAMES, mergeContent } from "@/lib/site-content";

/* --------------------------------- schema --------------------------------- */

export type FieldSpec =
  | { key: string; label: string; type: "text" | "textarea" | "image" | "icon" | "link"; hint?: string }
  | { key: string; label: string; type: "strings"; hint?: string }
  | { key: string; label: string; type: "group"; fields: FieldSpec[] }
  | { key: string; label: string; type: "list"; itemLabel?: string; fields: FieldSpec[] };

export type DocSpec = {
  collection: string;
  id: string;
  title: string;
  sub: string;
  fields: FieldSpec[];
};

/* -------------------------------- utilities ------------------------------- */

type Plain = Record<string, unknown>;

function blankFor(fields: FieldSpec[]): Plain {
  const out: Plain = {};
  for (const f of fields) {
    if (f.type === "list") out[f.key] = [];
    else if (f.type === "group") out[f.key] = blankFor(f.fields);
    else if (f.type === "strings") out[f.key] = [];
    else out[f.key] = "";
  }
  return out;
}

/* ------------------------------ field renderers --------------------------- */

function TextControl({
  spec,
  value,
  onChange,
}: {
  spec: Extract<FieldSpec, { type: "text" | "textarea" | "image" | "icon" | "link" }>;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const str = typeof value === "string" ? value : "";

  if (spec.type === "image") {
    return (
      <div className="space-y-2">
        <ImageUploadField
          label={spec.label}
          value={str}
          folder="reclaim/site"
          onChange={(url) => onChange(url)}
        />
        <input
          className={inputClass}
          value={str}
          placeholder="Cloudinary image URL"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (spec.type === "icon") {
    return (
      <Field label={spec.label} hint={spec.hint ?? "Icon shown next to this item."}>
        <select className={inputClass} value={str} onChange={(e) => onChange(e.target.value)}>
          <option value="">Default (Leaf)</option>
          {ICON_NAMES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </Field>
    );
  }

  if (spec.type === "textarea") {
    return (
      <Field label={spec.label} hint={spec.hint}>
        <textarea
          className={`${inputClass} min-h-24`}
          value={str}
          onChange={(e) => onChange(e.target.value)}
        />
      </Field>
    );
  }

  return (
    <Field
      label={spec.label}
      hint={spec.hint ?? (spec.type === "link" ? "Internal path (/contact) or full URL." : undefined)}
    >
      <input className={inputClass} value={str} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

function StringsControl({
  spec,
  value,
  onChange,
}: {
  spec: Extract<FieldSpec, { type: "strings" }>;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const list = Array.isArray(value) ? (value as string[]) : [];
  return (
    <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {spec.label}
      </p>
      <div className="mt-3 space-y-2">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={inputClass}
              value={item}
              onChange={(e) => {
                const next = [...list];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <Button
              variant="danger"
              onClick={() => onChange(list.filter((_, j) => j !== i))}
              className="shrink-0"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="ghost" className="mt-3" onClick={() => onChange([...list, ""])}>
        <Plus className="size-4" /> Add line
      </Button>
    </div>
  );
}

function FieldsRenderer({
  fields,
  value,
  onChange,
}: {
  fields: FieldSpec[];
  value: Plain;
  onChange: (next: Plain) => void;
}) {
  function set(key: string, v: unknown) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {fields.map((f) => {
        if (f.type === "group") {
          const inner = (value[f.key] as Plain) ?? {};
          return (
            <div key={f.key} className="lg:col-span-2">
              <div className="rounded-2xl border border-border/70 bg-muted/10 p-4">
                <h4 className="mb-3 font-serif text-lg text-brand-deep">{f.label}</h4>
                <FieldsRenderer
                  fields={f.fields}
                  value={inner}
                  onChange={(next) => set(f.key, next)}
                />
              </div>
            </div>
          );
        }

        if (f.type === "list") {
          const list = Array.isArray(value[f.key]) ? (value[f.key] as Plain[]) : [];
          return (
            <div key={f.key} className="lg:col-span-2">
              <div className="rounded-2xl border border-border/70 bg-muted/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif text-lg text-brand-deep">{f.label}</h4>
                  <Button
                    variant="ghost"
                    onClick={() => set(f.key, [...list, blankFor(f.fields)])}
                  >
                    <Plus className="size-4" /> Add {f.itemLabel ?? "item"}
                  </Button>
                </div>

                <div className="mt-4 space-y-4">
                  {list.map((item, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                          {f.itemLabel ?? "Item"} {i + 1}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="ghost"
                            disabled={i === 0}
                            onClick={() => {
                              const next = [...list];
                              const prev = next[i - 1]!;
                              next[i - 1] = next[i]!;
                              next[i] = prev;
                              set(f.key, next);
                            }}
                          >
                            <ArrowUp className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            disabled={i === list.length - 1}
                            onClick={() => {
                              const next = [...list];
                              const after = next[i + 1]!;
                              next[i + 1] = next[i]!;
                              next[i] = after;
                              set(f.key, next);
                            }}
                          >
                            <ArrowDown className="size-4" />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => set(f.key, list.filter((_, j) => j !== i))}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                      <FieldsRenderer
                        fields={f.fields}
                        value={item}
                        onChange={(next) => {
                          const arr = [...list];
                          arr[i] = next;
                          set(f.key, arr);
                        }}
                      />
                    </div>
                  ))}
                  {list.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nothing added yet.</p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        }

        if (f.type === "strings") {
          return (
            <div key={f.key} className="lg:col-span-2">
              <StringsControl spec={f} value={value[f.key]} onChange={(v) => set(f.key, v)} />
            </div>
          );
        }

        const wide = f.type === "textarea" || f.type === "image";
        return (
          <div key={f.key} className={wide ? "lg:col-span-2" : ""}>
            <TextControl spec={f} value={value[f.key]} onChange={(v) => set(f.key, v)} />
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------- the editor ------------------------------ */

/**
 * Schema-driven editor for a single Firestore content document. Live values are
 * merged over the shipped defaults, so nothing ever appears blank.
 */
export function DocEditor<T extends object>({
  spec,
  defaults,
}: {
  spec: DocSpec;
  defaults: T;
}) {
  const { data, loading } = useDocData<Record<string, unknown>>(spec.collection, spec.id);
  const merged = useMemo(() => mergeContent(defaults, data) as unknown as Plain, [data, defaults]);
  const [form, setForm] = useState<Plain | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && form === null) setForm(merged);
  }, [loading, merged, form]);

  async function save() {
    if (!form) return;
    setSaving(true);
    try {
      await saveDocument(spec.collection, spec.id, form);
      toast.success("Saved — the website updates instantly");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle title={spec.title} sub={spec.sub} />
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setForm(merged)}>
            <RotateCcw className="size-4" /> Revert
          </Button>
          <Button loading={saving} onClick={() => void save()}>
            <Save className="size-4" /> Save changes
          </Button>
        </div>
      </div>

      {form ? (
        <Card>
          <FieldsRenderer fields={spec.fields} value={form} onChange={setForm} />
        </Card>
      ) : (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading content…</p>
      )}

      <div className="mt-5 flex justify-end">
        <Button loading={saving} onClick={() => void save()}>
          <Save className="size-4" /> Save changes
        </Button>
      </div>
    </div>
  );
}
