import { createServerFn } from "@tanstack/react-start";

import { slugify } from "./content-types";

/**
 * Server-side read of one program, purely so a shared link previews correctly.
 *
 * Programs live in Firestore and the client SDK is browser-only, so the page's
 * server-rendered <head> had no title, description or image to give a crawler —
 * every shared program link previewed as the generic site card. WhatsApp,
 * Facebook, X and LinkedIn all read that HTML and never run JavaScript, so the
 * data has to be fetched here.
 *
 * This uses the Firestore REST API rather than the Admin SDK: the programs
 * collection is already world-readable (the website reads it unauthenticated),
 * so the same publishable web key is enough and no service account is needed.
 */

const PROJECT_ID = "reclaim-2e2c7";

export type ProgramShareMeta = {
  title: string;
  description: string;
  image: string;
} | null;

/** Firestore REST wraps every value in a type tag; unwrap the ones we use. */
type RestValue = { stringValue?: string; integerValue?: string; booleanValue?: boolean };
type RestDoc = { fields?: Record<string, RestValue> };

function str(fields: Record<string, RestValue> | undefined, key: string): string {
  return fields?.[key]?.stringValue ?? "";
}

export const getProgramShareMeta = createServerFn({ method: "GET" })
  .validator((slug: unknown) => (typeof slug === "string" ? slug.slice(0, 120) : ""))
  .handler(async ({ data: slug }): Promise<ProgramShareMeta> => {
    const key = process.env["FIREBASE_API_KEY"];
    if (!key || !slug) return null;

    try {
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/programs?pageSize=100&key=${key}`,
        { signal: AbortSignal.timeout(4000) },
      );
      if (!res.ok) return null;

      const body = (await res.json()) as { documents?: RestDoc[] };
      const match = (body.documents ?? []).find((doc) => {
        const f = doc.fields;
        if (f?.["active"]?.booleanValue === false) return false;
        const explicit = str(f, "slug").trim();
        return (explicit || slugify(str(f, "title"))) === slug;
      });
      if (!match) return null;

      return {
        title: str(match.fields, "title"),
        description: str(match.fields, "description"),
        image: str(match.fields, "image"),
      };
    } catch {
      /* Preview metadata is a nicety — never let it break the page. */
      return null;
    }
  });
