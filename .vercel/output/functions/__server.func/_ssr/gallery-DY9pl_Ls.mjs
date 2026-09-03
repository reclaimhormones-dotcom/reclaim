import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as GALLERY_CATEGORIES } from "./content-types-COMB5Vxh.mjs";
import { B as Leaf, T as Quote, Tt as ArrowRight, W as Images, ft as ChevronRight, g as Sparkles, n as X, pt as ChevronLeft, vt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { a as GALLERY_SEED, f as icon } from "./site-content-DISUfIbL.mjs";
import { o as useGallery, s as useGalleryPageContent } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { t as MobilePageHero } from "./MobilePageHero-CAvf2GAp.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as SmartImage, t as Skeleton } from "./SmartImage-C5Bc8w7G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-DY9pl_Ls.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = ["All", ...GALLERY_CATEGORIES];
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
function GalleryHero({ hero, stats }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "hidden lg:block relative overflow-hidden bg-gradient-to-b from-cream-deep via-background to-background pt-16 lg:pt-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-8 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: hero.eyebrow }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-[2.1rem] leading-[1.15] tracking-[-0.01em] text-brand-deep lg:text-[3rem]",
					children: [
						hero.title,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: hero.titleAccent
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: hero.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#photos",
						className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-4" }),
							" ",
							hero.primaryLabel
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#stories",
						className: "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-sage-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }),
							" ",
							hero.secondaryLabel
						]
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 lg:mt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[1.75rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(hero.image, 1400),
						alt: hero.imageAlt,
						width: 1400,
						height: 1e3,
						className: "h-[17rem] w-full object-cover object-[65%_30%] sm:h-[21rem] lg:h-[25rem]"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 lg:absolute lg:-bottom-6 lg:left-4 lg:mt-0 lg:w-64",
					children: stats.slice(0, 2).map((stat) => {
						const Icon = icon(stat.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-background/95 p-4 text-center backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto size-4 text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 font-serif text-xl text-brand-deep",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[0.68rem] leading-tight text-muted-foreground",
									children: stat.label
								})
							]
						}, stat.label);
					})
				})]
			})]
		})
	});
}
function Lightbox({ photos, index, onClose, onMove }) {
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") onMove(1);
			if (e.key === "ArrowLeft") onMove(-1);
		}
		window.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [onClose, onMove]);
	const photo = photos[index];
	if (!photo) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": photo.caption || "Gallery photo",
		className: "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-brand-deep/90 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close gallery",
				onClick: onClose,
				className: "absolute right-4 top-4 rounded-full border border-primary-foreground/30 p-2 text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "max-h-[82vh] w-full max-w-4xl",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cldOptimize(photo.img, 1600),
					alt: photo.alt,
					className: "mx-auto max-h-[72vh] w-auto rounded-2xl object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mt-3 text-center text-sm text-primary-foreground/85",
					children: [
						photo.caption,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-xs uppercase tracking-[0.12em] text-primary-foreground/60",
							children: photo.cat
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-xs text-primary-foreground/50",
							children: [
								index + 1,
								" / ",
								photos.length
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Previous photo",
					onClick: () => onMove(-1),
					className: "flex size-11 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Next photo",
					onClick: () => onMove(1),
					className: "flex size-11 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				})]
			})
		]
	});
}
function PhotoGrid({ content }) {
	const [active, setActive] = (0, import_react.useState)("All");
	const [open, setOpen] = (0, import_react.useState)(null);
	const { data: live, loading } = useGallery();
	const photos = (0, import_react.useMemo)(() => {
		return (live.length > 0 ? live : GALLERY_SEED.map((g, i) => ({
			id: String(i),
			...g
		}))).map((g) => ({
			img: g.url,
			alt: g.caption || "Reclaim Hormones gallery photo",
			cat: g.category,
			caption: g.caption
		}));
	}, [live]);
	const shown = (0, import_react.useMemo)(() => active === "All" ? photos : photos.filter((p) => p.cat === active), [active, photos]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "photos",
		className: "scroll-mt-20 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					center: true,
					children: content.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 text-center text-[1.6rem] leading-snug text-foreground lg:text-[2rem]",
					children: [
						content.heading,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: content.headingAccent
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-4 mt-7 overflow-x-auto px-4 pb-1 lg:mx-0 lg:overflow-visible lg:px-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-max justify-start gap-2 lg:min-w-0 lg:justify-center",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActive(c),
							"aria-pressed": active === c,
							className: `shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${active === c ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:bg-sage-soft hover:text-brand-deep"}`,
							children: c
						}, c))
					})
				}),
				loading && photos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 columns-2 gap-4 lg:columns-3",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-4 h-52 w-full" }, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 columns-2 gap-4 [column-fill:_balance] lg:columns-3",
					children: shown.map((photo, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen(i),
							"aria-label": `Open ${photo.caption || "gallery photo"}`,
							className: "block w-full text-left",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: photo.img,
								alt: photo.alt,
								width: 900,
								className: i % 3 === 0 ? "h-64 lg:h-80" : "h-48 lg:h-56",
								imgClassName: "transition-transform duration-500 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "flex items-center justify-between gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 text-xs font-medium text-foreground",
								children: photo.caption
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full bg-sage-soft px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-brand-deep",
								children: photo.cat
							})]
						})]
					}, `${photo.img}-${i}`))
				})
			]
		}), open !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
			photos: shown,
			index: open,
			onClose: () => setOpen(null),
			onMove: (dir) => setOpen((cur) => cur === null ? cur : (cur + dir + shown.length) % shown.length)
		}) : null]
	});
}
function ImpactStats({ heading, stats }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-brand-deep",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "pointer-events-none absolute -right-6 top-6 size-44 text-primary-foreground/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center text-[1.5rem] leading-snug text-primary-foreground lg:text-[1.9rem]",
				children: heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6",
				children: stats.map((stat) => {
					const Icon = icon(stat.icon);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto size-5 text-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-serif text-2xl text-primary-foreground lg:text-3xl",
								children: stat.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[0.7rem] leading-tight text-primary-foreground/75",
								children: stat.label
							})
						]
					}, stat.label);
				})
			})]
		})]
	});
}
function Stories({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "stories",
		className: "scroll-mt-20 bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					center: true,
					children: content.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 text-center text-[1.6rem] leading-snug text-foreground lg:text-[2rem]",
					children: [
						content.heading,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: content.headingAccent
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground",
					children: content.sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-5 lg:grid-cols-3",
					children: content.items.map(({ name, tag, result, quote, img }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(img, 1e3),
							alt: `${name} — ${tag} transformation`,
							loading: "lazy",
							width: 1e3,
							height: 750,
							className: "h-44 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex w-fit rounded-full bg-sage-soft px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-brand-deep",
									children: tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "mt-3 size-5 text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
									children: quote
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-primary",
										children: result
									})]
								})
							]
						})]
					}, name))
				})
			]
		})
	});
}
function GalleryCta({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-sage-soft px-6 py-9 text-center lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "mx-auto size-5 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-[1.5rem] leading-snug text-brand-deep lg:text-[1.9rem]",
						children: content.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground",
						children: content.sub
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" }),
								" ",
								content.primaryLabel
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/programs",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-background",
							children: [
								content.secondaryLabel,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						})]
					})
				]
			})
		})
	});
}
function GalleryPage() {
	const page = useGalleryPageContent();
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
						href: "#photos"
					},
					secondary: {
						label: m.secondaryLabel,
						href: "#stories"
					},
					scrollTo: "photos",
					position: m.position
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryHero, {
					hero: page.hero,
					stats: page.stats
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoGrid, { content: page.grid }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactStats, {
					heading: page.statsHeading,
					stats: page.stats
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stories, { content: page.stories }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryCta, { content: page.cta })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { GalleryPage as component };
