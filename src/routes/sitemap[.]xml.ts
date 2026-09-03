import { createFileRoute } from "@tanstack/react-router";

import { PUBLIC_PATHS, canonical } from "@/lib/seo";

/** Static sitemap for the public pages of the website. */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = PUBLIC_PATHS.map(
          (p) =>
            `  <url><loc>${canonical(p)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${
              p === "/" ? "1.0" : "0.8"
            }</priority></url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
