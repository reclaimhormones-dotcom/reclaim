import { createServerFn } from "@tanstack/react-start";

/**
 * Server-side read of the brand logo, so the intro loader can paint it on the
 * very first frame.
 *
 * The loader is by definition the screen that runs *before* the Firebase
 * client has booted, so it can never wait for the browser Firestore SDK —
 * asking it to would leave the mark blank until the progress bar was nearly
 * finished. Fetching the navigation document here puts the real URL in the
 * server-rendered HTML instead, which keeps the logo admin-controlled (no
 * bundled fallback) while still being available immediately.
 *
 * Uses the Firestore REST API for the same reason as the program share meta:
 * the navigation document is world-readable, so the publishable web key is
 * enough and no service account is involved.
 */

const PROJECT_ID = "reclaim-2e2c7";

export type SiteLogo = { url: string; alt: string };

export const getSiteLogo = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteLogo> => {
    const key = process.env["FIREBASE_API_KEY"];
    if (!key) return { url: "", alt: "" };

    try {
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/navigation/main?key=${key}`,
        { signal: AbortSignal.timeout(3000) },
      );
      if (!res.ok) return { url: "", alt: "" };

      const body = (await res.json()) as {
        fields?: Record<string, { stringValue?: string }>;
      };
      return {
        url: body.fields?.["logo"]?.stringValue ?? "",
        alt: body.fields?.["logoAlt"]?.stringValue ?? "",
      };
    } catch {
      /* Never let the splash screen block the page. */
      return { url: "", alt: "" };
    }
  },
);
