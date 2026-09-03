import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button, Card, SectionTitle } from "@/components/admin/AdminUI";
import { DocEditor, type DocSpec } from "@/components/admin/DocEditor";
import {
  ABOUT_SPEC,
  CONTACT_PAGE_SPEC,
  FOOTER_SPEC,
  GALLERY_PAGE_SPEC,
  HOME_SPEC,
  NAVIGATION_SPEC,
  PROGRAMS_PAGE_SPEC,
} from "@/lib/admin-schema";
import { publishSiteContent } from "@/lib/seed-content";
import {
  ABOUT_DEFAULT,
  CONTACT_PAGE_DEFAULT,
  FOOTER_DEFAULT,
  GALLERY_PAGE_DEFAULT,
  HOME_DEFAULT,
  NAVIGATION_DEFAULT,
  PROGRAMS_PAGE_DEFAULT,
} from "@/lib/site-content";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

const TABS: { id: string; label: string; spec: DocSpec; defaults: object }[] = [
  { id: "navigation", label: "Navigation", spec: NAVIGATION_SPEC, defaults: NAVIGATION_DEFAULT },
  { id: "homepage", label: "Home page", spec: HOME_SPEC, defaults: HOME_DEFAULT },
  { id: "aboutpage", label: "About page", spec: ABOUT_SPEC, defaults: ABOUT_DEFAULT },
  {
    id: "programspage",
    label: "Programs page",
    spec: PROGRAMS_PAGE_SPEC,
    defaults: PROGRAMS_PAGE_DEFAULT,
  },
  {
    id: "gallerypage",
    label: "Gallery page",
    spec: GALLERY_PAGE_SPEC,
    defaults: GALLERY_PAGE_DEFAULT,
  },
  {
    id: "contactpage",
    label: "Contact page",
    spec: CONTACT_PAGE_SPEC,
    defaults: CONTACT_PAGE_DEFAULT,
  },
  { id: "footer", label: "Footer", spec: FOOTER_SPEC, defaults: FOOTER_DEFAULT },
];

function PublishCard() {
  const [busy, setBusy] = useState(false);

  async function publish() {
    setBusy(true);
    try {
      const note = await publishSiteContent();
      toast.success(note);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not publish content");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="mb-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-serif text-lg text-brand-deep">Initialise content library</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Writes the current website text and image URLs into the database so every block becomes
            editable here. Programs, gallery and testimonials are only seeded when still empty.
          </p>
        </div>
        <Button loading={busy} onClick={() => void publish()}>
          <UploadCloud className="size-4" /> Publish defaults
        </Button>
      </div>
    </Card>
  );
}

function AdminContent() {
  const [active, setActive] = useState(TABS[0]!.id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0]!;

  return (
    <div>
      <SectionTitle
        title="Website content"
        sub="Every heading, paragraph, button label and image on the public website — edit and save to update it live."
      />

      <PublishCard />

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              t.id === active
                ? "bg-brand text-primary-foreground"
                : "border border-border bg-background text-foreground/75 hover:bg-brand/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <DocEditor key={tab.id} spec={tab.spec} defaults={tab.defaults} />
    </div>
  );
}
