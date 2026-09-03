import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as programSlug } from "./content-types-COMB5Vxh.mjs";
import { u as PROGRAM_SEED } from "./site-content-DISUfIbL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs._slug-CLE_AV9h.js
/** Shared SEO helpers: canonical URLs, share image and structured data. */
var SITE_URL = "https://reclaimhormones.com";
var SHARE_IMAGE = "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png";
var PUBLIC_PATHS = [
	"/",
	"/about",
	"/programs",
	"/gallery",
	"/contact",
	"/assessment"
];
function canonical(path) {
	const clean = path.startsWith("/") ? path : `/${path}`;
	return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/$/, "")}`;
}
/** Canonical link entry for a route `head()`. */
function canonicalLink(path) {
	return [{
		rel: "canonical",
		href: canonical(path)
	}];
}
var ORGANIZATION_JSONLD = {
	"@context": "https://schema.org",
	"@type": "HealthAndBeautyBusiness",
	name: "Reclaim Hormones",
	url: SITE_URL,
	logo: SHARE_IMAGE,
	image: SHARE_IMAGE,
	description: "Personalized hormone health and nutrition programs for PCOS, thyroid, fertility and metabolic balance.",
	email: "reclaimhormones@gmail.com",
	telephone: "+91 86887 23142",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Hyderabad",
		addressRegion: "Telangana",
		addressCountry: "IN"
	},
	openingHours: "Mo-Sa 09:00-19:00",
	founder: {
		"@type": "Person",
		name: "Dt. Kruthi Goud"
	}
};
function breadcrumbJsonLd(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: canonical(item.path)
		}))
	};
}
var $$splitNotFoundComponentImporter = () => import("./programs2._slug-8xNPrXVE.mjs");
var $$splitComponentImporter = () => import("./programs._slug-CTw0LL_e.mjs");
var Route = createFileRoute("/programs/$slug")({
	head: ({ params }) => {
		const seed = PROGRAM_SEED.find((p) => programSlug({
			...p,
			id: p.title
		}) === params.slug);
		const name = seed?.title ?? "Program";
		const description = seed?.description ?? "Personalized, root-cause hormone care with expert nutrition guidance at Reclaim Hormones.";
		const image = seed?.image ?? "";
		return {
			meta: [
				{ title: `${name} — Reclaim Hormones` },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: `${name} — Reclaim Hormones`
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				...image ? [{
					property: "og:image",
					content: image
				}, {
					name: "twitter:image",
					content: image
				}] : []
			],
			links: [{
				rel: "canonical",
				href: canonical(`/programs/${params.slug}`)
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Service",
					name,
					description,
					provider: {
						"@type": "MedicalBusiness",
						name: "Reclaim Hormones"
					},
					...image ? { image } : {}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { breadcrumbJsonLd as a, SITE_URL as i, PUBLIC_PATHS as n, canonical as o, Route as r, canonicalLink as s, ORGANIZATION_JSONLD as t };
