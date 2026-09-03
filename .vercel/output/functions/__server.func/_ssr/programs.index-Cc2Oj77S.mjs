import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as programSlug } from "./content-types-COMB5Vxh.mjs";
import { B as Leaf, M as MessageCircle, Tt as ArrowRight, lt as ClipboardList, vt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { f as icon, u as PROGRAM_SEED } from "./site-content-DISUfIbL.mjs";
import { d as useProgramsPageContent, f as useSettings, h as whatsappLink, u as usePrograms } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { t as MobilePageHero } from "./MobilePageHero-CAvf2GAp.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as SmartImage, t as Skeleton } from "./SmartImage-C5Bc8w7G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs.index-Cc2Oj77S.js
var import_jsx_runtime = require_jsx_runtime();
function Eyebrow({ children, center = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary ${center ? "justify-center" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 shrink-0 text-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 shrink-0 text-gold" })
		]
	});
}
function ProgramCard({ program, learnMoreLabel }) {
	const Icon = icon(program.icon);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "tilt-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_oklch(0.35_0.048_142/4%),0_10px_28px_-20px_oklch(0.35_0.048_142/25%)] transition-shadow hover:shadow-[0_2px_4px_oklch(0.35_0.048_142/6%),0_16px_34px_-18px_oklch(0.35_0.048_142/28%)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
				src: program.img,
				alt: program.title,
				width: 900,
				className: "h-40 sm:h-44",
				imgClassName: "object-top"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-background/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4.5 text-primary" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold leading-snug text-foreground",
					children: program.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted-foreground",
					children: program.sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1.5 text-xs text-muted-foreground",
					children: program.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0",
							children: p
						})]
					}, p))
				}),
				program.duration || program.showPrice !== false && program.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs font-semibold text-brand-deep",
					children: [
						program.duration ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: program.duration }) : null,
						program.duration && program.showPrice !== false && program.price ? " · " : "",
						program.showPrice !== false && program.price ? `₹${program.price.toLocaleString("en-IN")}` : ""
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/programs/$slug",
					params: { slug: program.slug },
					className: "mt-4 inline-flex items-center gap-2 pt-1 text-xs font-semibold text-primary transition-colors hover:text-brand-deep",
					children: [
						learnMoreLabel,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
					]
				})
			]
		})]
	});
}
function ProgramsHero({ hero }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "hidden lg:block relative overflow-hidden bg-gradient-to-b from-cream-deep via-background to-background pt-16 lg:pt-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-8 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded-full bg-sage-soft px-3.5 py-1.5 text-[0.68rem] font-medium tracking-[0.06em] text-brand-deep",
					children: hero.badge
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-[2.1rem] leading-[1.14] tracking-[-0.01em] text-brand-deep lg:text-[3rem]",
					children: [hero.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-2 block text-[1.9rem] leading-snug text-foreground",
						children: [
							hero.subtitle,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand",
								children: hero.subtitleAccent
							}),
							" Journey"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: hero.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-5 sm:grid-cols-2",
					children: hero.points.map((point) => {
						const Icon = icon(point.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: point.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: point.sub
								})]
							})]
						}, point.title);
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 lg:mt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[1.75rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(hero.image, 1600),
						alt: hero.imageAlt,
						width: 1600,
						height: 1e3,
						className: "h-[17rem] w-full object-cover object-[62%_35%] sm:h-[21rem] lg:h-[24rem]"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-2xl border border-border bg-sage-soft/80 p-5 text-center backdrop-blur lg:absolute lg:-bottom-6 lg:right-4 lg:mt-0 lg:w-56 lg:bg-sage-soft/95",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "mx-auto size-5 text-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-lg leading-snug text-brand-deep",
							children: hero.cardTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: hero.cardSub
						})
					]
				})]
			})]
		})
	});
}
function ProgramGrid({ title, accent, items, id, learnMoreLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id,
		className: "scroll-mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "text-center text-[1.6rem] leading-snug text-foreground lg:text-[2rem]",
			children: [
				title,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-brand",
					children: accent
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramCard, {
				program: p,
				learnMoreLabel
			}, p.title))
		})]
	});
}
function ProgramsSections({ content }) {
	const { data: live, loading } = usePrograms();
	const mapped = (live.length > 0 ? live.filter((p) => p.active !== false) : PROGRAM_SEED.map((p, i) => ({
		...p,
		id: String(i)
	}))).map((p) => ({
		icon: p.icon ?? "Leaf",
		img: p.image,
		title: p.title,
		sub: p.description,
		points: p.points ?? [],
		category: p.category,
		slug: programSlug({
			...p,
			id: p.id
		}),
		price: p.price,
		showPrice: p.showPrice,
		duration: p.duration
	}));
	const women = mapped.filter((p) => p.category === "women");
	const men = mapped.filter((p) => p.category === "men");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					center: true,
					children: content.eyebrow
				}),
				loading && live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
					children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 w-full rounded-2xl" }, i))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramGrid, {
						id: "women",
						title: content.womenHeading,
						accent: content.womenAccent,
						items: women,
						learnMoreLabel: content.learnMoreLabel
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramGrid, {
						id: "men",
						title: content.menHeading,
						accent: content.menAccent,
						items: men,
						learnMoreLabel: content.learnMoreLabel
					})
				})
			]
		})
	});
}
function Approach({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-cream-deep",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "pointer-events-none absolute -right-6 top-10 size-40 text-sage opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[1.75rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cldOptimize(content.image, 1400),
					alt: content.imageAlt,
					loading: "lazy",
					width: 1400,
					height: 1e3,
					className: "h-[16rem] w-full object-cover lg:h-[22rem]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-4 right-4 flex size-24 flex-col items-center justify-center rounded-full border border-border bg-background/95 text-center backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3.5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 px-2 text-[0.62rem] font-semibold leading-tight text-brand-deep",
						children: content.badge
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 lg:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-[1.6rem] leading-snug text-foreground lg:text-[2rem]",
						children: content.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground",
						children: content.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 grid gap-6 sm:grid-cols-2",
						children: content.items.map((item) => {
							const Icon = icon(item.icon);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-relaxed text-muted-foreground",
										children: item.sub
									})]
								})]
							}, item.title);
						})
					})
				]
			})]
		})]
	});
}
function Glimpses({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					center: true,
					children: content.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5",
					children: content.items.map(({ img, alt }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(img, 1e3),
							alt,
							loading: "lazy",
							width: 1e3,
							height: 750,
							className: "h-28 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-36 lg:h-44"
						})
					}, img))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/gallery",
						className: "inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-brand-deep",
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
		className: "bg-background pb-12 lg:pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-2xl bg-brand-deep px-6 py-8 lg:px-10 lg:py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "pointer-events-none absolute -right-4 -top-4 size-36 text-primary-foreground/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative lg:flex lg:items-center lg:justify-between lg:gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[1.45rem] leading-snug text-primary-foreground lg:text-[1.75rem]",
						children: content.heading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80",
						children: content.sub
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 lg:mt-0 lg:w-72 lg:shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "inline-flex items-center justify-between gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-brand-deep transition-opacity hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										content.primaryLabel,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/assessment",
								className: "inline-flex items-center justify-between gap-2 rounded-lg border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										content.secondaryLabel,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: whatsappLink(settings.whatsapp),
								target: "_blank",
								rel: "noreferrer noopener",
								className: "inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 lg:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
									" ",
									content.whatsappLabel
								]
							})
						]
					})]
				})]
			})
		})
	});
}
function ProgramsPage() {
	const page = useProgramsPageContent();
	const m = page.mobileHero;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobilePageHero, {
					img: cldOptimize(m.img, 1024),
					alt: m.alt,
					eyebrow: m.eyebrow,
					title: m.title,
					titleAccent: m.titleAccent,
					subtitle: m.subtitle,
					primary: {
						label: m.primaryLabel,
						href: "#programs-start"
					},
					secondary: {
						label: m.secondaryLabel,
						to: "/contact"
					},
					scrollTo: "programs-start",
					position: m.position
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "programs-start",
					className: "scroll-mt-16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramsHero, { hero: page.hero }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramsSections, { content: page.sections }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Approach, { content: page.approach }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glimpses, { content: page.glimpses }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { content: page.cta })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ProgramsPage as component };
