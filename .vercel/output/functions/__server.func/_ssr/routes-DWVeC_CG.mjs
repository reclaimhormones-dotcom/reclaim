import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { o as embedUrl } from "./content-types-COMB5Vxh.mjs";
import { B as Leaf, Et as ArrowLeft, F as Mail, M as MessageCircle, O as Phone, P as MapPin, T as Quote, Tt as ArrowRight, ct as Clock, ft as ChevronRight, lt as ClipboardList, m as Star } from "../_libs/lucide-react.mjs";
import { f as icon } from "./site-content-DISUfIbL.mjs";
import { c as useHomeContent, f as useSettings, h as whatsappLink, l as useNavigationContent, m as useTestimonials, o as useGallery, p as useSocialLinks } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as SiteHeader, r as SiteLink, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as SmartImage } from "./SmartImage-C5Bc8w7G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DWVeC_CG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 text-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 text-gold" })
		]
	});
}
function MobileHero({ hero }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const slides = hero.mobileSlides;
	(0, import_react.useEffect)(() => {
		if (slides.length < 2) return;
		const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), 5600);
		return () => window.clearTimeout(id);
	}, [active, slides.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate h-[100svh] overflow-hidden bg-cream lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cldOptimize(s.img, 1024),
					alt: s.alt,
					width: 1024,
					height: 1536,
					loading: i === 0 ? "eager" : "lazy",
					"aria-hidden": i !== active,
					className: `absolute inset-0 size-full object-cover ${s.position} transition-opacity duration-[1600ms] ease-in-out ${i === active ? "opacity-100 motion-safe:animate-[hero-kenburns_9s_ease-out_forwards]" : "opacity-0"}`
				}, `${s.img}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.22)_0%,oklch(0.983_0.008_95/0.06)_32%,oklch(0.983_0.008_95/0.5)_54%,oklch(0.983_0.008_95/0.92)_70%,oklch(0.983_0.008_95/1)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_18%,oklch(1_0_0/0.35)_0%,transparent_60%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-full flex-col justify-end px-6 pb-10 pt-20 text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-[2.6rem] leading-[1.03] tracking-[-0.015em] text-brand-deep",
						children: [
							hero.mobileTitle,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-brand",
								children: hero.mobileTitleAccent
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-[19rem] text-[0.9rem] leading-relaxed text-foreground/70",
						children: hero.mobileSubtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#book",
						className: "mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_14px_34px_-16px_oklch(0.44_0.052_140/0.85)] transition-transform active:scale-[0.98]",
						children: [
							hero.mobilePrimaryLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assessment",
						className: "mt-3 inline-flex items-center justify-center gap-2 text-[0.78rem] font-medium tracking-wide text-brand-deep/70 underline decoration-brand/30 underline-offset-4",
						children: hero.mobileSecondaryLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex items-center gap-1.5",
						children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Show slide ${i + 1}: ${s.caption}`,
							onClick: () => setActive(i),
							className: `h-[3px] rounded-full transition-all duration-500 ${i === active ? "w-8 bg-brand" : "w-2.5 bg-brand/25"}`
						}, `${s.img}-dot-${i}`))
					})
				]
			})
		]
	});
}
function DesktopHero({ hero, stats }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const slides = hero.desktopSlides;
	(0, import_react.useEffect)(() => {
		if (slides.length < 2) return;
		const id = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), 6200);
		return () => window.clearTimeout(id);
	}, [active, slides.length]);
	const current = slides[Math.min(active, slides.length - 1)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate hidden h-screen overflow-hidden bg-cream lg:block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cldOptimize(s.img, 1920),
					alt: s.alt,
					width: 1920,
					height: 1080,
					loading: i === 0 ? "eager" : "lazy",
					"aria-hidden": i !== active,
					className: `absolute inset-0 size-full object-cover ${s.position} transition-opacity duration-[1800ms] ease-in-out ${i === active ? "opacity-100 motion-safe:animate-[hero-kenburns_12s_ease-out_forwards]" : "opacity-0"}`
				}, `${s.img}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,oklch(0.983_0.008_95/0.97)_0%,oklch(0.983_0.008_95/0.9)_34%,oklch(0.983_0.008_95/0.55)_54%,oklch(0.983_0.008_95/0.12)_76%,oklch(0.983_0.008_95/0)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,oklch(1_0_0/0.35)_0%,transparent_35%,transparent_70%,oklch(0.983_0.008_95/0.4)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex h-full max-w-7xl flex-col justify-center px-8 pb-12 pt-24 text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-cream/85 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3.5 text-brand" }), hero.badge]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 max-w-3xl text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-brand-deep xl:text-[4.4rem]",
						children: [
							hero.title,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-brand",
								children: hero.titleAccent
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base leading-relaxed text-foreground/75 xl:text-lg",
						children: hero.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#book",
							className: "inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_18px_44px_-18px_oklch(0.44_0.052_140/0.85)] transition-transform hover:scale-[1.02]",
							children: [
								hero.primaryLabel,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/assessment",
							className: "inline-flex items-center justify-center gap-2.5 rounded-full border border-brand/25 bg-cream/75 px-8 py-4 text-sm font-medium text-brand-deep backdrop-blur-md transition-transform hover:scale-[1.02]",
							children: [
								hero.secondaryLabel,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-9 flex max-w-3xl flex-col gap-6 border-t border-brand/12 pt-6 lg:flex-row lg:items-end lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-6",
							children: stats.map((s) => {
								const Icon = icon(s.icon);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 items-center justify-center rounded-full border border-brand/15 bg-cream-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-brand" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-brand-deep",
										children: s.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-foreground/60",
										children: s.sub
									})] })]
								}, s.title);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Show slide ${i + 1}: ${s.caption}`,
									onClick: () => setActive(i),
									className: `h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-brand" : "w-2.5 bg-brand/25"}`
								}, `${s.img}-dot-${i}`))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "animate-[hero-fade-up_700ms_ease-out] min-w-[10rem] text-xs font-medium uppercase tracking-[0.16em] text-foreground/60",
								children: current?.caption
							}, current?.caption)]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/50 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.65rem] uppercase tracking-[0.2em]",
					children: hero.scrollLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-gradient-to-b from-brand/50 to-transparent" })]
			})
		]
	});
}
function Philosophy({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-sage-soft p-6 lg:grid lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-10 lg:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-2xl text-foreground lg:text-[1.85rem]",
						children: content.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: content.sub
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4",
					children: content.items.map((item) => {
						const Icon = icon(item.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl bg-card p-4 lg:flex-col lg:items-center lg:gap-2 lg:py-6 lg:text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-sage",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-snug text-muted-foreground",
								children: item.sub
							})] })]
						}, item.title);
					})
				})]
			})
		})
	});
}
function Programs({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:flex lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-xl text-2xl leading-snug text-foreground lg:text-[2.1rem]",
						children: content.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-lg text-sm text-muted-foreground",
						children: content.sub
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/programs",
					className: "mt-6 inline-flex items-center justify-between gap-6 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary lg:mt-0 lg:gap-3",
					children: [
						content.ctaLabel,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-primary" })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
				children: content.items.map((p) => {
					const Icon = icon(p.icon);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md lg:flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-2/5 shrink-0 lg:w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: cldOptimize(p.img, 800),
								alt: p.title,
								loading: "lazy",
								width: 800,
								height: 700,
								className: "h-full w-full object-cover lg:h-40"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-2 top-2 flex size-8 items-center justify-center rounded-full bg-card/90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[0.95rem] font-semibold leading-snug text-foreground",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-0.5 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: p.sub
							})]
						})]
					}, p.title);
				})
			})]
		})
	});
}
function About({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 pb-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-2 lg:order-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(content.image, 1e3),
						alt: content.imageAlt,
						loading: "lazy",
						width: 912,
						height: 912,
						className: "mt-8 h-72 w-full rounded-xl object-cover lg:mt-0 lg:h-[24rem]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-script text-3xl text-primary/80",
						children: content.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: content.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: content.degree
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 lg:order-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 text-2xl leading-snug text-foreground lg:text-[2.1rem]",
						children: [
							content.heading,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-primary",
								children: content.headingAccent
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: content.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-5 sm:grid-cols-2",
						children: content.pillars.map((item) => {
							const Icon = icon(item.icon);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-sage",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: item.sub
								})] })]
							}, item.title);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "mt-7 inline-flex items-center justify-between gap-6 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep lg:gap-3",
						children: [
							content.ctaLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					})
				]
			})]
		})
	});
}
function Testimonials({ content }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const { data: live } = useTestimonials();
	const items = live.length > 0 ? live.map((t) => ({
		quote: t.review,
		name: `— ${t.name}`,
		program: t.program,
		rating: t.rating || 5,
		photo: t.mediaType === "video" ? "" : t.photo ?? "",
		video: t.mediaType === "video" ? embedUrl(t.videoUrl ?? "") : ""
	})) : content.items.map((t) => ({
		...t,
		rating: 5,
		photo: "",
		video: ""
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 text-2xl leading-snug text-foreground lg:text-[2rem]",
						children: [
							content.heading,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-primary",
								children: content.headingAccent
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-4 lg:grid-cols-3",
					children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: `rounded-xl border border-border bg-card p-5 ${i === active ? "block" : "hidden lg:block"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-5 fill-sage text-sage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden items-center gap-0.5 lg:flex",
									children: Array.from({ length: t.rating }).map((_, s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }, s))
								})]
							}),
							t.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 overflow-hidden rounded-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
									src: t.video,
									title: `${t.name} video story`,
									loading: "lazy",
									allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture",
									allowFullScreen: true,
									className: "aspect-video w-full"
								})
							}) : t.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: t.photo,
								alt: `${t.name} — client story`,
								width: 600,
								className: "mt-3 aspect-[4/3] rounded-lg"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "mt-3 text-sm leading-relaxed text-foreground/85",
								children: t.quote
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-primary",
										children: t.program
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex items-center gap-0.5 lg:hidden",
										children: Array.from({ length: t.rating }).map((_, s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }, s))
									})]
								})]
							})
						]
					}, t.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Previous testimonial",
							onClick: () => setActive((a) => a === 0 ? items.length - 1 : a - 1),
							className: "hidden size-9 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-secondary lg:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Show testimonial ${i + 1}`,
								onClick: () => setActive(i),
								className: `size-2 rounded-full transition-colors ${i === active ? "bg-primary" : "bg-border"}`
							}, t.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Next testimonial",
							onClick: () => setActive((a) => (a + 1) % items.length),
							className: "hidden size-9 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-secondary lg:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						})
					]
				})
			]
		})
	});
}
function Journey({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 pb-12 lg:px-8 lg:pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 text-2xl leading-snug text-foreground lg:text-[2rem]",
						children: [
							content.heading,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-primary",
								children: content.headingAccent
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-8 grid gap-5 lg:grid-cols-3",
					children: content.steps.map((step) => {
						const Icon = icon(step.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex gap-4 rounded-xl border border-border bg-card p-5 lg:flex-col lg:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-12 items-center justify-center rounded-full bg-sage-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground",
									children: step.n
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[0.95rem] font-semibold text-foreground",
								children: step.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: step.sub
							})] })]
						}, step.n + step.title);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/assessment",
						className: "inline-flex w-full items-center justify-between gap-6 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep sm:w-auto sm:gap-3",
						children: [
							content.ctaLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					})
				})
			]
		})
	});
}
function Gallery({ content }) {
	const { data: live } = useGallery();
	const images = live.length > 0 ? live.slice(0, 5).map((g) => ({
		src: cldOptimize(g.url, 800),
		alt: g.caption || ""
	})) : content.images.map((g) => ({
		src: cldOptimize(g.img, 800),
		alt: g.alt
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-center text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 lg:grid-cols-5",
					children: images.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.src,
						alt: g.alt || `Reclaim Hormones community session ${i + 1}`,
						loading: "lazy",
						width: 800,
						height: 600,
						className: "h-40 w-full rounded-xl object-cover lg:h-32"
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/gallery",
						className: "inline-flex w-full items-center justify-between gap-6 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep sm:w-auto sm:gap-3",
						children: [
							content.ctaLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					})
				})
			]
		})
	});
}
function CtaBand({ content }) {
	const { settings } = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "book",
		className: "bg-primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 text-center lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-12 lg:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl leading-snug text-primary-foreground lg:text-[2rem]",
				children: content.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-sm text-sm text-primary-foreground/80 lg:mx-0 lg:max-w-xl",
				children: content.sub
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 lg:mt-0 lg:w-80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/assessment",
						className: "flex items-center justify-between gap-4 rounded-md bg-card px-5 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-cream",
						children: [
							content.primaryLabel,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "my-3 text-center text-xs text-primary-foreground/70",
						children: content.orLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: whatsappLink(settings.whatsapp),
						target: "_blank",
						rel: "noreferrer noopener",
						className: "flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), content.whatsappLabel]
					})
				]
			})]
		})
	});
}
function MobileContact({ content }) {
	const { settings } = useSettings();
	const socials = useSocialLinks();
	const nav = useNavigationContent();
	const contact = [
		{
			icon: Phone,
			title: content.callLabel,
			value: settings.phone
		},
		{
			icon: Mail,
			title: content.emailLabel,
			value: settings.email
		},
		{
			icon: MapPin,
			title: content.locationLabel,
			value: settings.address
		},
		{
			icon: Clock,
			title: content.timingsLabel,
			value: settings.hours
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "bg-background px-4 py-10 lg:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: contact.map(({ icon: Icon, title, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-sage",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: value
					})] })]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 text-lg text-foreground",
				children: content.socialHeading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex items-center gap-3",
				children: socials.map(({ Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href,
					target: "_blank",
					rel: "noreferrer noopener",
					"aria-label": label,
					className: "flex size-10 items-center justify-center rounded-full bg-sage text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 text-lg text-foreground",
				children: content.quickLinksHeading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: nav.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLink, {
					to: item.to,
					className: "flex items-center justify-between border-b border-border/60 py-3 text-sm text-foreground/80",
					children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
				}, item.label))
			})
		]
	});
}
function Index() {
	const home = useHomeContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { overlay: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileHero, { hero: home.hero }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopHero, {
					hero: home.hero,
					stats: home.stats
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Philosophy, { content: home.philosophy }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Programs, { content: home.programs }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, { content: home.about }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, { content: home.testimonials }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, { content: home.journey }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, { content: home.gallery }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { content: home.cta }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileContact, { content: home.mobileContact })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
