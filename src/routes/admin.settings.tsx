import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Button,
  Card,
  Field,
  ImageUploadField,
  SectionTitle,
  Spinner,
  inputClass,
} from "@/components/admin/AdminUI";
import { useSettings } from "@/hooks/useSiteContent";
import { saveDocument } from "@/lib/admin-crud";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/content-types";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { settings, loading } = useSettings();
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !ready) {
      setForm(settings);
      setReady(true);
    }
  }, [loading, ready, settings]);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    if (form.consultationPrice <= 0) {
      toast.error("Consultation price must be greater than zero.");
      return;
    }
    setSaving(true);
    try {
      await saveDocument("settings", "site", form);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading && !ready) return <Spinner />;

  return (
    <div>
      <SectionTitle
        title="Settings"
        sub="Payment details, clinic contact information and social links used across the site."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <h3 className="font-serif text-xl text-brand-deep">Payment</h3>
          <div className="mt-4 space-y-4">
            <Field label="Consultation price (₹)">
              <input
                className={inputClass}
                inputMode="numeric"
                value={String(form.consultationPrice)}
                onChange={(e) => set("consultationPrice", Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="UPI ID">
              <input
                className={inputClass}
                value={form.upiId}
                placeholder="name@bank"
                onChange={(e) => set("upiId", e.target.value)}
              />
            </Field>
            <ImageUploadField
              label="Payment QR code"
              value={form.qrImage}
              folder="reclaim/settings"
              onChange={(url) => set("qrImage", url)}
            />
          </div>
        </Card>

        <Card>
          <h3 className="font-serif text-xl text-brand-deep">Clinic contact</h3>
          <div className="mt-4 space-y-4">
            <Field label="Phone">
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
            <Field label="WhatsApp number (digits with country code)">
              <input
                className={inputClass}
                inputMode="numeric"
                value={form.whatsapp}
                placeholder="918688723142"
                onChange={(e) => set("whatsapp", e.target.value)}
              />
            </Field>
            <Field label="Email">
              <input
                className={inputClass}
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
            <Field label="Address">
              <input
                className={inputClass}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>
            <Field label="Working hours">
              <input
                className={inputClass}
                value={form.hours}
                onChange={(e) => set("hours", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <h3 className="font-serif text-xl text-brand-deep">Social links</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Field label="Instagram URL">
              <input
                className={inputClass}
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
              />
            </Field>
            <Field label="Facebook URL">
              <input
                className={inputClass}
                value={form.facebook}
                onChange={(e) => set("facebook", e.target.value)}
              />
            </Field>
            <Field label="YouTube URL">
              <input
                className={inputClass}
                value={form.youtube}
                onChange={(e) => set("youtube", e.target.value)}
              />
            </Field>
            <Field label="LinkedIn URL">
              <input
                className={inputClass}
                value={form.linkedin ?? ""}
                onChange={(e) => set("linkedin", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="SEO & sharing"
            sub="Used for Google results and link previews on WhatsApp, Facebook and X."
          />
          <div className="mt-4 grid gap-4">
            <Field label="Website address (https://…)">
              <input
                className={inputClass}
                value={form.siteUrl ?? ""}
                onChange={(e) => set("siteUrl", e.target.value)}
              />
            </Field>
            <Field label="Search title">
              <input
                className={inputClass}
                maxLength={70}
                value={form.metaTitle ?? ""}
                onChange={(e) => set("metaTitle", e.target.value)}
              />
            </Field>
            <Field label="Search description">
              <textarea
                className={`${inputClass} min-h-24`}
                maxLength={170}
                value={form.metaDescription ?? ""}
                onChange={(e) => set("metaDescription", e.target.value)}
              />
            </Field>
            <Field label="Keywords (comma separated)">
              <input
                className={inputClass}
                value={form.keywords ?? ""}
                onChange={(e) => set("keywords", e.target.value)}
              />
            </Field>
            <ImageUploadField
              label="Share preview image"
              value={form.shareImage ?? ""}
              folder="reclaim/site"
              onChange={(url) => set("shareImage", url)}
            />
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <Button loading={saving} onClick={() => void save()}>
          Save settings
        </Button>
      </div>
    </div>
  );
}
