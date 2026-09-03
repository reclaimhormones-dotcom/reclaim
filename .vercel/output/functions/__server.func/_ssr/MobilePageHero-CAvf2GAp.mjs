import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Tt as ArrowRight, mt as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MobilePageHero-CAvf2GAp.js
var import_jsx_runtime = require_jsx_runtime();
function ActionLink({ action, className, children }) {
	if (action.to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: action.to,
		...action.hash ? { hash: action.hash } : {},
		className,
		children
	});
	const external = action.href?.startsWith("http");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: action.href,
		...external ? {
			target: "_blank",
			rel: "noreferrer"
		} : {},
		className,
		children
	});
}
/**
* Full-screen (single viewport) cinematic hero used on mobile for the inner
* pages. Mirrors the home page hero language: bright photography, airy cream
* scrims for legibility, one promise and one clear action.
*/
function MobilePageHero({ img, alt, eyebrow, title, titleAccent, subtitle, primary, secondary, scrollTo, position = "object-[50%_22%]" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate h-[100svh] overflow-hidden bg-cream lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img,
				alt,
				width: 896,
				height: 1344,
				className: `absolute inset-0 size-full object-cover ${position} motion-safe:animate-[hero-kenburns_14s_ease-out_forwards]`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.24)_0%,oklch(0.983_0.008_95/0.06)_30%,oklch(0.983_0.008_95/0.5)_52%,oklch(0.983_0.008_95/0.93)_68%,oklch(0.983_0.008_95/1)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_16%,oklch(1_0_0/0.34)_0%,transparent_60%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-full flex-col justify-end px-6 pb-9 pt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.66rem] font-medium uppercase tracking-[0.22em] text-brand",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 text-[2.35rem] leading-[1.06] tracking-[-0.015em] text-brand-deep",
						children: [
							title,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-brand",
								children: titleAccent
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3.5 max-w-[20rem] text-[0.875rem] leading-relaxed text-foreground/70",
						children: subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionLink, {
						action: primary,
						className: "mt-6 inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_14px_34px_-16px_oklch(0.44_0.052_140/0.85)] transition-transform active:scale-[0.98]",
						children: [
							primary.label,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					}),
					secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionLink, {
						action: secondary,
						className: "mt-3 inline-flex items-center justify-center gap-2 text-[0.78rem] font-medium tracking-wide text-brand-deep/70 underline decoration-brand/30 underline-offset-4",
						children: secondary.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${scrollTo}`,
						"aria-label": "Scroll to content",
						className: "mx-auto mt-6 flex size-9 items-center justify-center rounded-full border border-brand/25 text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 motion-safe:animate-bounce" })
					})
				]
			})
		]
	});
}
//#endregion
export { MobilePageHero as t };
