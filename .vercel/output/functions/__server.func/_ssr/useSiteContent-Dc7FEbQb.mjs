import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useDocData, t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { s as isApproved, t as DEFAULT_SETTINGS } from "./content-types-COMB5Vxh.mjs";
import { c as NAVIGATION_DEFAULT, i as GALLERY_PAGE_DEFAULT, l as PROGRAMS_PAGE_DEFAULT, n as CONTACT_PAGE_DEFAULT, o as HOME_DEFAULT, p as mergeContent, r as FOOTER_DEFAULT, t as ABOUT_DEFAULT } from "./site-content-DISUfIbL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSiteContent-Dc7FEbQb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Svg({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		...props,
		children
	});
}
function WhatsAppIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.13-.13.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.1 1.1 0 0 0-.792.372c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" })
	});
}
function InstagramIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0m0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.9.423.421.682.819.9 1.381.163.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.8 3.8 0 0 1-.899 1.382 3.7 3.7 0 0 1-1.38.899c-.42.163-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07s-3.585-.015-4.859-.074c-1.171-.061-1.816-.256-2.236-.421a3.7 3.7 0 0 1-1.379-.899 3.6 3.6 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844s.016-3.585.061-4.861c.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.382.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0" })
	});
}
function FacebookIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.7 8.7 0 0 1 1.141.195v3.325a8.6 8.6 0 0 0-.653-.036 26 26 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647" })
	});
}
function YoutubeIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z" })
	});
}
function LinkedinIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Svg, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" })
	});
}
/** Live site settings with sensible defaults until an admin saves them. */
function useSettings() {
	const { data, loading } = useDocData("settings", "site");
	return {
		settings: {
			...DEFAULT_SETTINGS,
			...data ?? {}
		},
		loading
	};
}
function usePrograms() {
	return useCollectionData("programs");
}
function useGallery() {
	return useCollectionData("gallery");
}
/**
* Public testimonials: hidden stories are filtered out and featured stories
* are shown first.
*/
function useTestimonials() {
	const state = useCollectionData("testimonials");
	const data = (0, import_react.useMemo)(() => state.data.filter((t) => isApproved(t)).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (a.order ?? 0) - (b.order ?? 0)), [state.data]);
	return {
		...state,
		data
	};
}
function useMergedDoc(collection, id, defaults) {
	const { data } = useDocData(collection, id);
	return (0, import_react.useMemo)(() => mergeContent(defaults, data), [data, defaults]);
}
function useNavigationContent() {
	return useMergedDoc("navigation", "main", NAVIGATION_DEFAULT);
}
function useFooterContent() {
	return useMergedDoc("pages", "footer", FOOTER_DEFAULT);
}
function useHomeContent() {
	return useMergedDoc("pages", "homepage", HOME_DEFAULT);
}
function useAboutContent() {
	return useMergedDoc("pages", "aboutpage", ABOUT_DEFAULT);
}
function useProgramsPageContent() {
	return useMergedDoc("pages", "programspage", PROGRAMS_PAGE_DEFAULT);
}
function useGalleryPageContent() {
	return useMergedDoc("pages", "gallerypage", GALLERY_PAGE_DEFAULT);
}
function useContactPageContent() {
	return useMergedDoc("pages", "contactpage", CONTACT_PAGE_DEFAULT);
}
function whatsappLink(whatsapp, message) {
	return `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message ?? "Hi! I would like to know more about your hormone care programs.")}`;
}
function telLink(phone) {
	return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
function mapsLink(address) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
/** Social profile links that are configured in admin settings. */
function useSocialLinks() {
	const { settings } = useSettings();
	return [
		{
			Icon: InstagramIcon,
			href: settings.instagram,
			label: "Instagram"
		},
		{
			Icon: FacebookIcon,
			href: settings.facebook,
			label: "Facebook"
		},
		{
			Icon: WhatsAppIcon,
			href: settings.whatsapp ? whatsappLink(settings.whatsapp) : "",
			label: "WhatsApp"
		},
		{
			Icon: YoutubeIcon,
			href: settings.youtube,
			label: "YouTube"
		},
		{
			Icon: LinkedinIcon,
			href: settings.linkedin,
			label: "LinkedIn"
		}
	].filter((s) => s.href);
}
//#endregion
export { useFooterContent as a, useHomeContent as c, useProgramsPageContent as d, useSettings as f, whatsappLink as h, useContactPageContent as i, useNavigationContent as l, useTestimonials as m, telLink as n, useGallery as o, useSocialLinks as p, useAboutContent as r, useGalleryPageContent as s, mapsLink as t, usePrograms as u };
