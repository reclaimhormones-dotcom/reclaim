import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { i as GALLERY_CATEGORIES } from "./content-types-COMB5Vxh.mjs";
import { B as Leaf, n as X } from "../_libs/lucide-react.mjs";
import { c as NAVIGATION_DEFAULT } from "./site-content-DISUfIbL.mjs";
import { f as useSettings } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as submitEnquiry } from "./contact-messages-CKb3k9Vy.mjs";
import { r as openWhatsApp, t as buildLeadMessage } from "./whatsapp-Cg5MT_Ht.mjs";
import { a as breadcrumbJsonLd, i as SITE_URL, n as PUBLIC_PATHS, o as canonical, r as Route$20, s as canonicalLink, t as ORGANIZATION_JSONLD } from "./programs._slug-CLE_AV9h.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Be8V8zl_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var STORAGE_KEY = "rh_consult_popup_v1";
var DELAY_MS = 12e4;
/**
* Premium, once-per-session free consultation invitation.
* Appears after ~2 minutes, never re-appears once dismissed or submitted.
*/
function ConsultPopup() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const { settings } = useSettings();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.localStorage.getItem(STORAGE_KEY)) return;
		if (window.location.pathname.startsWith("/admin")) return;
		const t = window.setTimeout(() => setOpen(true), DELAY_MS);
		return () => window.clearTimeout(t);
	}, []);
	function close() {
		setOpen(false);
		if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, "1");
	}
	async function handleSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		setSending(true);
		try {
			const lead = {
				name: String(fd.get("name") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				email: String(fd.get("email") ?? ""),
				gender: String(fd.get("gender") ?? ""),
				concern: "",
				mode: "",
				message: "Requested a free consultation call.",
				source: "Free Consultation Popup"
			};
			await submitEnquiry(lead);
			setDone(true);
			if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, "1");
			openWhatsApp(settings.whatsapp, buildLeadMessage(lead));
		} catch (err) {
			const message = err && typeof err === "object" && "issues" in err ? err.issues[0]?.message ?? "Please check your details" : err instanceof Error ? err.message : "Could not send your request";
			toast.error(message);
		} finally {
			setSending(false);
		}
	}
	if (!open) return null;
	const field = "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			onClick: close,
			className: "absolute inset-0 bg-brand-deep/35 backdrop-blur-[2px] animate-in fade-in duration-300"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "consult-popup-title",
			className: "relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.35_0.048_142/45%)] animate-in slide-in-from-bottom-4 fade-in duration-400",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: close,
					"aria-label": "Close popup",
					className: "absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-b from-sage-soft to-card px-6 pb-5 pt-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-auto flex size-11 items-center justify-center rounded-full bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-5 text-gold" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary",
							children: "Complimentary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "consult-popup-title",
							className: "mt-1.5 text-[1.45rem] leading-snug text-foreground",
							children: ["Your free hormone ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: "consultation call"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground",
							children: "Thousands have reversed PCOS, thyroid and metabolic issues naturally. Leave your details and our team will call you personally — no cost, no obligation."
						})
					]
				}),
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-6 pb-8 pt-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-lg text-brand-deep",
							children: "Thank you — you're on the list."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "Our care team will reach out shortly to schedule your free call."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: close,
							className: "mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground",
							children: "Continue browsing"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void handleSubmit(e),
					className: "grid gap-3 px-6 pb-7 pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "name",
							required: true,
							placeholder: "Full name",
							className: field
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-4 px-1 text-xs text-muted-foreground",
							children: ["female", "male"].map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex items-center gap-2 capitalize",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "gender",
									value: g,
									defaultChecked: i === 0,
									className: "size-3.5 accent-[var(--primary)]"
								}), g]
							}, g))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "email",
							type: "email",
							placeholder: "Email (optional)",
							className: field
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "phone",
							type: "tel",
							required: true,
							placeholder: "Phone / WhatsApp",
							className: field
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: sending,
							className: "mt-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60",
							children: sending ? "Sending…" : "Claim my free consultation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: close,
							className: "text-[0.7rem] text-muted-foreground underline-offset-4 hover:underline",
							children: "Maybe later"
						})
					]
				})
			]
		})]
	});
}
/**
* Premium full-screen intro loader.
* - Ivory canvas, centred brand mark with a soft reveal
* - Drifting botanical particles (transform/opacity only, 60fps safe)
* - Sage progress line that completes once assets are ready (1.8s min, 2.5s max)
* - Fades away without layout shift; fully skipped for reduced-motion users
*/
var MIN_MS = 1800;
var MAX_MS = 2500;
var LEAVES = [
	{
		left: "8%",
		delay: "0s",
		duration: "13s",
		size: 34,
		drift: "26px",
		opacity: .5
	},
	{
		left: "22%",
		delay: "-4s",
		duration: "16s",
		size: 22,
		drift: "-18px",
		opacity: .38
	},
	{
		left: "38%",
		delay: "-8s",
		duration: "14s",
		size: 44,
		drift: "34px",
		opacity: .3
	},
	{
		left: "54%",
		delay: "-2s",
		duration: "18s",
		size: 26,
		drift: "-28px",
		opacity: .45
	},
	{
		left: "68%",
		delay: "-6s",
		duration: "15s",
		size: 38,
		drift: "22px",
		opacity: .34
	},
	{
		left: "82%",
		delay: "-10s",
		duration: "17s",
		size: 28,
		drift: "-24px",
		opacity: .42
	},
	{
		left: "92%",
		delay: "-3s",
		duration: "14s",
		size: 20,
		drift: "18px",
		opacity: .36
	}
];
function Leaf$1({ size }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: size,
		height: size,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M21 3c-7.5.4-12.2 3-14.7 6.6C4 12.9 4.3 16.8 6.8 19.3 9.3 21.8 13.2 22 16.4 19.7 20 17.2 20.6 10.5 21 3Z",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 4C15 8 10.5 12.6 6.4 19.6",
			stroke: "oklch(1 0 0 / 0.55)",
			strokeWidth: "0.9",
			fill: "none"
		})]
	});
}
function SiteLoader() {
	const [progress, setProgress] = (0, import_react.useState)(6);
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const [gone, setGone] = (0, import_react.useState)(false);
	const startRef = (0, import_react.useRef)(Date.now());
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setGone(true);
			return;
		}
		document.documentElement.dataset["loading"] = "true";
		let assetsReady = document.readyState === "complete";
		const onLoad = () => {
			assetsReady = true;
		};
		window.addEventListener("load", onLoad);
		let frame = 0;
		let fadeTimer;
		let goneTimer;
		let finished = false;
		const finish = () => {
			if (finished) return;
			finished = true;
			cancelAnimationFrame(frame);
			setProgress(100);
			fadeTimer = setTimeout(() => setLeaving(true), 200);
			goneTimer = setTimeout(() => setGone(true), 800);
		};
		const tick = () => {
			const elapsed = Date.now() - startRef.current;
			setProgress(Math.min(96, 6 + elapsed / MAX_MS * 90));
			if (elapsed >= MAX_MS || assetsReady && elapsed >= MIN_MS) {
				finish();
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		const hardStop = setTimeout(finish, 2620);
		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(hardStop);
			if (fadeTimer) clearTimeout(fadeTimer);
			if (goneTimer) clearTimeout(goneTimer);
			window.removeEventListener("load", onLoad);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!gone) return;
		delete document.documentElement.dataset["loading"];
	}, [gone]);
	if (gone) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": "true",
		className: `site-loader fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${leaving ? "site-loader--leaving" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "site-loader__glow pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0",
				children: LEAVES.map((leaf, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "site-loader__leaf absolute text-brand",
					style: {
						left: leaf.left,
						opacity: leaf.opacity,
						animationDelay: leaf.delay,
						animationDuration: leaf.duration,
						["--leaf-drift"]: leaf.drift
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf$1, { size: leaf.size })
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-loader__mark relative flex flex-col items-center px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: NAVIGATION_DEFAULT.logo,
					alt: "",
					width: 640,
					height: 168,
					className: "h-auto w-[min(74vw,26rem)] select-none",
					fetchPriority: "high"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "site-loader__tag mt-5 text-center text-[0.62rem] uppercase tracking-[0.34em] text-brand-deep/70 sm:text-[0.7rem]",
					children: "Nourishing Hormones · Restoring You"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-[max(1.75rem,env(safe-area-inset-bottom))] left-1/2 w-[min(78vw,20rem)] -translate-x-1/2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "site-loader__track h-[3px] w-full overflow-hidden rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "site-loader__bar h-full rounded-full",
						style: { width: `${progress}%` }
					})
				})
			})
		]
	});
}
var styles_default = "/assets/styles-XZEAgAnL.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Reclaim Hormones — Nourishing Hormones. Restoring You." },
			{
				name: "description",
				content: "Personalized nutrition and lifestyle care for PCOS, Thyroid, Diabetes, Infertility and Metabolic Health with Dt. Kruthi Goud."
			},
			{
				name: "author",
				content: "Reclaim Hormones"
			},
			{
				property: "og:title",
				content: "Reclaim Hormones — Nourishing Hormones. Restoring You."
			},
			{
				property: "og:description",
				content: "Evidence-based, personalized and holistic hormone care for PCOS, Thyroid, Diabetes, Infertility and Metabolic Health."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLoader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultPopup, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		]
	});
}
var $$splitComponentImporter$16 = () => import("./routes-DWVeC_CG.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Reclaim Hormones — Personalized Hormone & Metabolic Nutrition Care" },
			{
				name: "description",
				content: "Personalized nutrition and lifestyle care for PCOS, thyroid, diabetes, fertility and metabolic health, guided by Dt. Kruthi Goud, MSc Clinical Nutrition."
			},
			{
				property: "og:title",
				content: "Reclaim Hormones — Reclaim Your Balance"
			},
			{
				property: "og:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				name: "twitter:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				property: "og:description",
				content: "Evidence-based, root-cause hormone care with personalized nutrition plans and continuous support."
			},
			{
				property: "og:url",
				content: canonical("/")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: canonicalLink("/"),
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(ORGANIZATION_JSONLD)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./about-uIFWy-y7.mjs");
var Route$17 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About Reclaim Hormones — Science, Compassion, Real Results" },
			{
				name: "description",
				content: "Meet Dt. Kruthi Goud and the Reclaim Hormones team. Clinical science with personalized nutrition for PCOS, thyroid, diabetes, fertility and metabolic health."
			},
			{
				property: "og:title",
				content: "About Reclaim Hormones — Science. Compassion. Real Results."
			},
			{
				property: "og:description",
				content: "Our story, philosophy, experts, treatment process and clinic experience — built to help you reclaim hormonal balance naturally."
			},
			{
				property: "og:url",
				content: canonical("/about")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				name: "twitter:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			}
		],
		links: canonicalLink("/about"),
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "About",
				path: "/about"
			}]))
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin-DbYgPYXd.mjs");
var Route$16 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — Reclaim Hormones" },
		{
			name: "description",
			content: "Private content and assessment management dashboard."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		},
		{
			property: "og:title",
			content: "Admin Dashboard — Reclaim Hormones"
		},
		{
			property: "og:description",
			content: "Private clinic management dashboard."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./assessment-DuaDmQIO.mjs");
var Route$15 = createFileRoute("/assessment")({
	head: () => ({
		meta: [
			{ title: "Health Assessment — Reclaim Hormones" },
			{
				name: "description",
				content: "Start your personalized hormone care journey: share your health details, confirm your consultation and complete your nutrition log."
			},
			{
				property: "og:title",
				content: "Health Assessment — Reclaim Hormones"
			},
			{
				property: "og:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				name: "twitter:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				property: "og:description",
				content: "A guided 3-step assessment so Dt. Kruthi Goud can build your personalized nutrition plan."
			},
			{
				property: "og:url",
				content: canonical("/assessment")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: canonicalLink("/assessment")
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./contact-CMmYLlGi.mjs");
var Route$14 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact Reclaim Hormones — Book Your Consultation" },
			{
				name: "description",
				content: "Book an online or in-clinic hormone health consultation in Hyderabad. Call, WhatsApp us, or send your enquiry to reclaimhormones@gmail.com."
			},
			{
				property: "og:title",
				content: "Contact Reclaim Hormones"
			},
			{
				property: "og:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				name: "twitter:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				property: "og:description",
				content: "Reach out for personalized hormone, thyroid, PCOS and metabolic health care — online or at our Hyderabad clinic."
			},
			{
				property: "og:url",
				content: canonical("/contact")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: canonicalLink("/contact"),
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Contact",
				path: "/contact"
			}]))
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./gallery-DY9pl_Ls.mjs");
var Route$13 = createFileRoute("/gallery")({
	head: () => ({
		meta: [
			{ title: "Gallery — Moments of Healing at Reclaim Hormones" },
			{
				name: "description",
				content: "Explore our clinic, seminars, awareness camps and real client transformation stories from the Reclaim Hormones hormone-health community."
			},
			{
				property: "og:title",
				content: "Gallery — Reclaim Hormones"
			},
			{
				property: "og:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				name: "twitter:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				property: "og:description",
				content: "A visual journey through our clinic, community events and real transformation stories."
			},
			{
				property: "og:url",
				content: canonical("/gallery")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: canonicalLink("/gallery"),
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Gallery",
				path: "/gallery"
			}]))
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
[...GALLERY_CATEGORIES];
var Route$12 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => {
	const body = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /admin",
		"",
		`Sitemap: ${SITE_URL}/sitemap.xml`,
		""
	].join("\n");
	return new Response(body, { headers: {
		"content-type": "text/plain; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
} } } });
/** Static sitemap for the public pages of the website. */
var Route$11 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: () => {
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PUBLIC_PATHS.map((p) => `  <url><loc>${canonical(p)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"content-type": "application/xml; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$10 = () => import("./admin.index-B5d71NPi.mjs");
var Route$10 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.assessments-BLccDK3D.mjs");
var Route$9 = createFileRoute("/admin/assessments")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin.content-D7TNr4rO.mjs");
var Route$8 = createFileRoute("/admin/content")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin.gallery-BWlM9QJm.mjs");
var Route$7 = createFileRoute("/admin/gallery")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.messages-Dh2QKyMZ.mjs");
var Route$6 = createFileRoute("/admin/messages")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.patients-BVZ2hzcS.mjs");
var Route$5 = createFileRoute("/admin/patients")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.payments-0pTB1bwQ.mjs");
var Route$4 = createFileRoute("/admin/payments")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.programs-Ba29pPhG.mjs");
var Route$3 = createFileRoute("/admin/programs")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.settings-nVdfEfOW.mjs");
var Route$2 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.testimonials-Ds4TzIQR.mjs");
var Route$1 = createFileRoute("/admin/testimonials")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./programs.index-Cc2Oj77S.mjs");
var Route = createFileRoute("/programs/")({
	head: () => ({
		meta: [
			{ title: "Our Programs — Personalized Hormone Care for Women & Men" },
			{
				name: "description",
				content: "Evidence-based programs for PCOS, thyroid, fertility, weight & metabolic health, menopause, low testosterone and men's hormonal health at Reclaim Hormones."
			},
			{
				property: "og:title",
				content: "Our Programs — Reclaim Hormones"
			},
			{
				property: "og:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				name: "twitter:image",
				content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png"
			},
			{
				property: "og:description",
				content: "Personalized care for every hormone journey — root-cause programs for women and men, designed for lasting results."
			},
			{
				property: "og:url",
				content: canonical("/programs")
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: canonicalLink("/programs"),
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(breadcrumbJsonLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Programs",
				path: "/programs"
			}]))
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$17.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var AdminRoute = Route$16.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$19
});
var AssessmentRoute = Route$15.update({
	id: "/assessment",
	path: "/assessment",
	getParentRoute: () => Route$19
});
var ContactRoute = Route$14.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$19
});
var GalleryRoute = Route$13.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$19
});
var RobotsDottxtRoute = Route$12.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$19
});
var SitemapDotxmlRoute = Route$11.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminAssessmentsRoute = Route$9.update({
	id: "/assessments",
	path: "/assessments",
	getParentRoute: () => AdminRoute
});
var AdminContentRoute = Route$8.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => AdminRoute
});
var AdminGalleryRoute = Route$7.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => AdminRoute
});
var AdminMessagesRoute = Route$6.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminRoute
});
var AdminPatientsRoute = Route$5.update({
	id: "/patients",
	path: "/patients",
	getParentRoute: () => AdminRoute
});
var AdminPaymentsRoute = Route$4.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AdminRoute
});
var AdminProgramsRoute = Route$3.update({
	id: "/programs",
	path: "/programs",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminTestimonialsRoute = Route$1.update({
	id: "/testimonials",
	path: "/testimonials",
	getParentRoute: () => AdminRoute
});
var ProgramsIndexRoute = Route.update({
	id: "/programs/",
	path: "/programs/",
	getParentRoute: () => Route$19
});
var ProgramsSlugRoute = Route$20.update({
	id: "/programs/$slug",
	path: "/programs/$slug",
	getParentRoute: () => Route$19
});
var AdminRouteChildren = {
	AdminAssessmentsRoute,
	AdminContentRoute,
	AdminGalleryRoute,
	AdminMessagesRoute,
	AdminPatientsRoute,
	AdminPaymentsRoute,
	AdminProgramsRoute,
	AdminSettingsRoute,
	AdminTestimonialsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	AssessmentRoute,
	ContactRoute,
	GalleryRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	ProgramsSlugRoute,
	ProgramsIndexRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
