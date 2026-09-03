import { N as notFound, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as programSlug } from "./content-types-COMB5Vxh.mjs";
import { B as Leaf, M as MessageCircle, ct as Clock, dt as CircleCheck, lt as ClipboardList, m as Star, vt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { f as icon, u as PROGRAM_SEED } from "./site-content-DISUfIbL.mjs";
import { f as useSettings, h as whatsappLink, m as useTestimonials, u as usePrograms } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { t as MobilePageHero } from "./MobilePageHero-CAvf2GAp.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { r as Route } from "./programs._slug-CLE_AV9h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs._slug-CTw0LL_e.js
var import_jsx_runtime = require_jsx_runtime();
function useProgram(slug) {
	const { data, loading } = usePrograms();
	if (data.length > 0) {
		const found = data.find((p) => programSlug(p) === slug);
		return {
			program: found ? found : null,
			loading
		};
	}
	const seed = PROGRAM_SEED.find((p) => programSlug({
		...p,
		id: p.title
	}) === slug);
	return {
		program: seed ? {
			...seed,
			id: seed.title
		} : null,
		loading
	};
}
function Chip({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3.5 py-1.5 text-[0.7rem] font-semibold text-brand-deep",
		children
	});
}
function ProgramDetailPage() {
	const { slug } = Route.useParams();
	const { program, loading } = useProgram(slug);
	const { settings } = useSettings();
	const { data: reviews } = useTestimonials();
	if (loading && !program) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl animate-pulse px-4 py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-2/3 rounded-full bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-4 w-full rounded-full bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-4 w-5/6 rounded-full bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-64 w-full rounded-3xl bg-muted" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
	if (!program) throw notFound();
	const Icon = icon(program.icon ?? "Leaf");
	const points = program.points ?? [];
	const whoFor = program.whoFor && program.whoFor.length > 0 ? program.whoFor : [
		"You have been told your reports are 'normal' but you still don't feel well.",
		"You want a root-cause plan instead of another temporary fix.",
		"You prefer food, lifestyle and habit changes you can sustain."
	];
	const process = program.process && program.process.length > 0 ? program.process : [
		"Detailed consultation and history review",
		"Personalized nutrition & lifestyle plan",
		"Weekly guidance and course correction",
		"Progress review and long-term maintenance"
	];
	const faqs = program.faqs && program.faqs.length > 0 ? program.faqs : [
		{
			question: "How soon will I see results?",
			answer: "Most clients notice better energy, digestion and sleep within 3–4 weeks, with hormonal markers improving over 2–3 months of consistent follow-through."
		},
		{
			question: "Do I need to stop my medication?",
			answer: "Never without your doctor. Our plans work alongside your prescribed treatment and your physician can reduce dosage when your reports improve."
		},
		{
			question: "Is the plan Indian-food friendly?",
			answer: "Completely. Every plan is built around your regional cuisine, family meals, work schedule and budget."
		}
	];
	const stories = reviews.slice(0, 3);
	const showPrice = program.showPrice !== false && Boolean(program.price);
	const waMessage = `Hello Reclaim Hormones,\n\nI would like to know more about the *${program.title}* program.\n\nSource: Website — Program page`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobilePageHero, {
				img: program.image,
				alt: program.title,
				eyebrow: program.category === "men" ? "Men's Program" : "Women's Program",
				title: program.title,
				titleAccent: program.duration ?? "",
				subtitle: program.description,
				primary: {
					label: "Book Consultation",
					to: "/contact"
				},
				secondary: {
					label: "Start Assessment",
					to: "/assessment"
				},
				scrollTo: "program-details",
				position: "object-top"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "hidden bg-gradient-to-b from-cream-deep via-background to-background pt-20 lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_1fr] lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 text-gold" }), program.category === "men" ? "Men's Health Program" : "Women's Health Program"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 text-[2.6rem] leading-[1.05] text-foreground",
							children: program.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground",
							children: program.longDescription || program.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [
								program.duration ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-gold" }),
									" ",
									program.duration
								] }) : null,
								showPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["₹", program.price?.toLocaleString("en-IN")] }) : null,
								points.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: p }, p))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" }), " Book Consultation"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/assessment",
									className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }), " Start Assessment"]
								}),
								settings.whatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink(settings.whatsapp, waMessage),
									target: "_blank",
									rel: "noreferrer noopener",
									className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-brand" }), " WhatsApp"]
								}) : null
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-[2rem]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(program.image, 1200),
							alt: program.title,
							width: 1200,
							height: 900,
							className: "h-[26rem] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-5 top-5 flex size-12 items-center justify-center rounded-full bg-background/90 backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
						})]
					})]
				})
			}),
			points.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "program-details",
				className: "bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-center text-[1.6rem] text-foreground lg:text-[2rem]",
						children: ["What this program ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "improves"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold text-foreground",
								children: p
							})]
						}, p))
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream-deep",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[1.75rem] bg-background p-6 lg:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-[1.4rem] text-foreground lg:text-[1.75rem]",
							children: ["Who is it ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: "for?"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-3",
							children: whoFor.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm leading-relaxed text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" }), w]
							}, w))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[1.75rem] bg-background p-6 lg:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-[1.4rem] text-foreground lg:text-[1.75rem]",
							children: ["How it ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: "works"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-5 space-y-4",
							children: process.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/12 text-xs font-bold text-brand-deep",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pt-1 text-sm leading-relaxed text-muted-foreground",
									children: step
								})]
							}, step))
						})]
					})]
				})
			}),
			stories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-center text-[1.6rem] text-foreground lg:text-[2rem]",
						children: ["Success ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "stories"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: stories.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "rounded-2xl border border-border bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5",
									children: Array.from({ length: Math.max(1, Math.min(5, t.rating || 5)) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: [
										"“",
										t.review,
										"”"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "mt-3 text-xs font-semibold text-brand-deep",
									children: [t.name, t.program ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-normal text-muted-foreground",
										children: [" · ", t.program]
									}) : null]
								})
							]
						}, t.id))
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream-deep",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-center text-[1.6rem] text-foreground lg:text-[2rem]",
						children: ["Frequently asked ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: "questions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "group rounded-2xl border border-border bg-background px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer list-none text-sm font-semibold text-foreground",
								children: f.question
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 text-sm leading-relaxed text-muted-foreground",
								children: f.answer
							})]
						}, f.question))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-brand-deep text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-4 py-12 text-center lg:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-[1.6rem] leading-snug lg:text-[2rem]",
							children: [
								"Ready to start ",
								program.title,
								"?"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80",
							children: "Book a consultation or complete your assessment — we will build the plan around your body, your reports and your routine."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap justify-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-brand-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" }), " Book Consultation"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/assessment",
									className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }), " Start Assessment"]
								}),
								settings.whatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink(settings.whatsapp, waMessage),
									target: "_blank",
									rel: "noreferrer noopener",
									className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " WhatsApp"]
								}) : null
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ProgramDetailPage as component };
