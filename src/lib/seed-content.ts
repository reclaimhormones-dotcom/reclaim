import { collection, getDocs } from "firebase/firestore";

import { createItem, saveDocument } from "./admin-crud";
import { getDb } from "./firebase";
import { DEFAULT_SETTINGS } from "./content-types";
import {
  ABOUT_DEFAULT,
  CONTACT_PAGE_DEFAULT,
  FOOTER_DEFAULT,
  GALLERY_PAGE_DEFAULT,
  GALLERY_SEED,
  HOME_DEFAULT,
  NAVIGATION_DEFAULT,
  PROGRAMS_PAGE_DEFAULT,
  PROGRAM_SEED,
  TESTIMONIAL_SEED,
} from "./site-content";

async function isEmpty(path: string): Promise<boolean> {
  const db = await getDb();
  const snap = await getDocs(collection(db, path));
  return snap.empty;
}

/**
 * Writes the shipped website content into Firestore so every text block and
 * image URL becomes editable in the dashboard. Page documents are overwritten
 * with the defaults; collections are only seeded when still empty.
 */
export async function publishSiteContent(): Promise<string> {
  await Promise.all([
    saveDocument("navigation", "main", NAVIGATION_DEFAULT),
    saveDocument("pages", "homepage", HOME_DEFAULT),
    saveDocument("pages", "aboutpage", ABOUT_DEFAULT),
    saveDocument("pages", "programspage", PROGRAMS_PAGE_DEFAULT),
    saveDocument("pages", "gallerypage", GALLERY_PAGE_DEFAULT),
    saveDocument("pages", "contactpage", CONTACT_PAGE_DEFAULT),
    saveDocument("pages", "footer", FOOTER_DEFAULT),
    saveDocument("settings", "site", DEFAULT_SETTINGS),
  ]);

  const notes: string[] = ["Page content published"];

  if (await isEmpty("programs")) {
    for (const p of PROGRAM_SEED) await createItem("programs", p);
    notes.push(`${PROGRAM_SEED.length} programs`);
  }
  if (await isEmpty("gallery")) {
    for (const g of GALLERY_SEED) await createItem("gallery", g);
    notes.push(`${GALLERY_SEED.length} gallery photos`);
  }
  if (await isEmpty("testimonials")) {
    for (const t of TESTIMONIAL_SEED) await createItem("testimonials", t);
    notes.push(`${TESTIMONIAL_SEED.length} testimonials`);
  }

  return notes.join(" · ");
}
