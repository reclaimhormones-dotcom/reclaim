import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SmartImage-C5Bc8w7G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Neutral shimmer block used while content or images load. */
function Skeleton({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `animate-pulse rounded-xl bg-muted/60 ${className}`,
		"aria-hidden": "true"
	});
}
/**
* Progressive image: a tiny blurred Cloudinary placeholder is shown first and
* the full-quality image fades in once it has decoded.
*/
function SmartImage({ src, alt, width = 1200, className = "", imgClassName = "", sizes, eager = false }) {
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const full = cldOptimize(src, width);
	const tiny = src.includes("/upload/") ? src.replace("/upload/", "/upload/f_auto,q_10,w_40,e_blur:400/") : src;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative overflow-hidden bg-muted/40 ${className}`,
		children: [!loaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: tiny,
			alt: "",
			"aria-hidden": "true",
			className: `absolute inset-0 size-full scale-105 object-cover blur-md ${imgClassName}`
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: full,
			alt,
			...sizes ? { sizes } : {},
			loading: eager ? "eager" : "lazy",
			decoding: "async",
			onLoad: () => setLoaded(true),
			className: `size-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`
		})]
	});
}
//#endregion
export { SmartImage as n, Skeleton as t };
