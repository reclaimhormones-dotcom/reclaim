export const CLOUDINARY_CLOUD_NAME = "pumhgsff";
export const CLOUDINARY_UPLOAD_PRESET = "reclaim";

const ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export type UploadResult = { url: string; publicId: string; width: number; height: number };

/**
 * Unsigned upload straight from the browser to Cloudinary.
 * Only the resulting secure URL is ever persisted in Firestore.
 */
export async function uploadImage(file: File, folder = "reclaim"): Promise<UploadResult> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error("Please choose a JPG, PNG, WEBP, GIF or AVIF image.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is larger than 10MB. Please choose a smaller file.");
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  body.append("folder", folder);

  const res = await fetch(ENDPOINT, { method: "POST", body });
  if (!res.ok) {
    let message = "Image upload failed. Please try again.";
    try {
      const payload = (await res.json()) as { error?: { message?: string } };
      if (payload.error?.message) message = payload.error.message;
    } catch {
      /* keep default message */
    }
    throw new Error(message);
  }

  const data = (await res.json()) as {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  };
  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  };
}

/** Adds Cloudinary transformations for responsive, optimized delivery. */
export function cldOptimize(url: string, width = 1200): string {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

/**
 * 1x1 transparent GIF.
 *
 * Used as the `src` of a full-bleed hero image while the admin's photo is
 * still loading. An empty `src` makes browsers re-request the page URL and
 * paint a broken-image icon, so the element needs *something* — and this is
 * the only thing that shows nothing at all. The skeleton behind it provides
 * the visible loading state.
 */
export const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
