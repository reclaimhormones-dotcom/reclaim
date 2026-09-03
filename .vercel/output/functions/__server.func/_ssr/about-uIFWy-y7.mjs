import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as Leaf, H as Instagram, M as MessageCircle, T as Quote, Tt as ArrowRight, ht as Check, m as Star } from "../_libs/lucide-react.mjs";
import { f as icon } from "./site-content-DISUfIbL.mjs";
import { f as useSettings, h as whatsappLink, r as useAboutContent } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { t as MobilePageHero } from "./MobilePageHero-CAvf2GAp.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-uIFWy-y7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Eyebrow({ children, center = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary ${center ? "justify-center" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 shrink-0 text-gold" })]
	});
}
function IconBubble({ icon: Icon, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-soft ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
	});
}
function AboutHero({ hero }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "hidden lg:block bg-gradient-to-b from-cream-deep via-background to-background pt-16 lg:pt-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: hero.eyebrow }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-[2.15rem] leading-[1.12] tracking-[-0.01em] text-brand-deep lg:text-[2.9rem]",
					children: [
						hero.title,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: hero.titleAccent
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 hidden h-px w-16 bg-gold lg:block" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: hero.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-5 sm:grid-cols-2",
					children: hero.points.map((point) => {
						const Icon = icon(point.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft",
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/about",
					hash: "story",
					className: "mt-8 inline-flex items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep",
					children: [
						hero.ctaLabel,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-9 lg:mt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative hidden overflow-hidden rounded-[2rem] rounded-tl-[9rem] lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(hero.image, 1600),
						alt: hero.imageAlt,
						width: 1600,
						height: 1104,
						className: "h-[27rem] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 rounded-tr-2xl bg-brand-deep/95 px-6 py-4 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-primary-foreground",
								children: hero.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-primary-foreground/75",
								children: hero.degree
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-primary-foreground/75",
								children: hero.role
							})
						]
					})]
				})
			})]
		})
	});
}
function MissionStory({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "specialities",
		className: "scroll-mt-24 bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 text-[1.6rem] leading-snug text-foreground lg:text-[2rem]",
					children: [
						content.heading,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: content.headingAccent
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						content.headingEnd
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground",
					children: content.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border border-border bg-card p-6 lg:mt-0 lg:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-center font-serif text-lg text-brand",
					children: content.specialityHeading
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-6 sm:grid-cols-2",
					children: content.specialities.map((item) => {
						const Icon = icon(item.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft",
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
				})]
			})]
		})
	});
}
function Story({ content }) {
	const cards = [{
		icon: content.missionIcon,
		title: content.missionTitle,
		sub: content.missionSub
	}, {
		icon: content.visionIcon,
		title: content.visionTitle,
		sub: content.visionSub
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "story",
		className: "scroll-mt-24 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 max-w-xl text-[1.5rem] leading-snug text-foreground lg:text-[2rem]",
					children: [
						content.heading,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: content.headingAccent
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(content.image, 1200),
						alt: content.imageAlt,
						loading: "lazy",
						width: 1200,
						height: 900,
						className: "h-64 w-full rounded-2xl object-cover lg:h-[26rem]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "relative space-y-7 border-l border-border pl-8",
						children: content.timeline.map((item) => {
							const Icon = icon(item.icon);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-[2.55rem] top-0 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
									}),
									item.year && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-[0.16em] text-brand",
										children: item.year
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-semibold text-foreground",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 max-w-md text-xs leading-relaxed text-muted-foreground lg:text-sm",
										children: item.sub
									})
								]
							}, item.title);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-9 grid gap-4 sm:grid-cols-2",
					children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBubble, { icon: icon(card.icon) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand",
								children: card.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs leading-relaxed text-muted-foreground lg:text-sm",
								children: card.sub
							})
						]
					}, card.title))
				})
			]
		})
	});
}
function Philosophy({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 lg:grid-cols-2 lg:gap-4",
				children: content.items.map((item) => {
					const Icon = icon(item.icon);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 rounded-xl border border-border bg-card p-4 lg:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted-foreground lg:text-sm",
								children: item.sub
							})]
						})]
					}, item.title);
				})
			})]
		})
	});
}
function Experts({ content }) {
	const { settings } = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "experts",
		className: "scroll-mt-20 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-3 gap-3 lg:gap-6",
				children: content.items.map(({ img, name, degree, role }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center lg:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(img, 500),
							alt: name,
							loading: "lazy",
							width: 700,
							height: 700,
							className: "size-16 rounded-full object-cover object-top lg:size-24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs font-semibold text-foreground lg:text-base",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[0.65rem] text-muted-foreground lg:text-xs",
							children: degree
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[0.65rem] text-brand lg:text-xs",
							children: role
						}),
						settings.instagram ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: settings.instagram,
								target: "_blank",
								rel: "noreferrer noopener",
								"aria-label": `${name} on Instagram`,
								className: "flex size-6 items-center justify-center rounded-full bg-sage-soft text-primary transition-colors hover:bg-sage",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3" })
							})
						}) : null
					]
				}, name))
			})]
		})
	});
}
function Process({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative mt-8 space-y-7 border-l border-border pl-14 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:border-l-0 lg:pl-0",
				children: content.items.map((item) => {
					const Icon = icon(item.icon);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative lg:rounded-2xl lg:border lg:border-border lg:bg-card lg:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -left-[3.9rem] top-0 flex size-12 items-center justify-center rounded-full border border-border bg-card lg:static lg:mb-4 lg:flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.16em] text-brand/70",
								children: item.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-semibold text-foreground",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs leading-relaxed text-muted-foreground lg:text-sm",
								children: item.sub
							})
						]
					}, item.n);
				})
			})]
		})
	});
}
function Trust({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep pb-11 lg:pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-primary p-6 lg:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-center gap-2 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary-foreground",
					children: [
						content.heading,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3 text-gold" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid grid-cols-3 gap-y-8 lg:gap-y-10",
					children: content.items.map((item, i) => {
						const Icon = icon(item.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex flex-col items-center px-2 text-center lg:px-4 ${i % 3 !== 2 ? "border-r border-primary-foreground/20" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 items-center justify-center rounded-full bg-primary-foreground/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs font-semibold leading-snug text-primary-foreground lg:text-sm",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[0.7rem] leading-relaxed text-primary-foreground/75 lg:text-xs",
									children: item.sub
								})
							]
						}, item.title);
					})
				})]
			})
		})
	});
}
function ClinicExperience({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "clinic",
		className: "scroll-mt-24 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5",
				children: content.items.map(({ img, caption }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(img, 900),
						alt: caption,
						loading: "lazy",
						width: 1200,
						height: 900,
						className: "h-32 w-full object-cover lg:h-48"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "px-3 py-2.5 text-center text-[0.7rem] text-muted-foreground lg:text-xs",
						children: caption
					})]
				}, caption))
			})]
		})
	});
}
function Values({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
				center: true,
				children: content.eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0",
				children: content.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center lg:rounded-none lg:border-0 lg:bg-transparent lg:px-6 ${i !== content.items.length - 1 ? "lg:border-r lg:border-border" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBubble, { icon: icon(item.icon) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-semibold text-foreground",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[0.72rem] leading-relaxed text-muted-foreground lg:text-xs",
							children: item.sub
						})
					]
				}, item.title))
			})]
		})
	});
}
function WhyUs({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep pb-11 lg:pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-3xl border border-border lg:grid lg:grid-cols-[0.85fr_1.15fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative isolate bg-brand-deep p-6 lg:p-9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(content.image, 1e3),
							alt: "",
							"aria-hidden": "true",
							loading: "lazy",
							width: 1e3,
							height: 800,
							className: "absolute inset-0 -z-10 size-full object-cover opacity-35"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.68rem] font-medium uppercase tracking-[0.18em] text-primary-foreground/80",
							children: content.eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-[1.5rem] leading-snug text-primary-foreground lg:text-[1.85rem]",
							children: content.heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3",
							children: content.points.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2.5 text-xs text-primary-foreground/90 lg:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-3.5 shrink-0 text-gold" }), item]
							}, item))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center bg-card p-6 lg:p-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.credentialsEyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: content.credentials.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBubble, { icon: icon(item.icon) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm font-semibold leading-snug text-foreground",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[0.72rem] leading-relaxed text-muted-foreground",
									children: item.sub
								})
							]
						}, item.title))
					})]
				})]
			})
		})
	});
}
function Approach({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
				center: true,
				children: content.eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 top-6 hidden border-t border-dashed border-border lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8",
					children: content.items.map((item) => {
						const Icon = icon(item.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col items-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-12 items-center justify-center rounded-full border border-border bg-card",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs font-semibold tracking-[0.16em] text-brand/70",
									children: item.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-semibold text-foreground",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted-foreground",
									children: item.sub
								})
							]
						}, item.n);
					})
				})]
			})]
		})
	});
}
function Testimonials({ content }) {
	const [active, setActive] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-11 lg:px-8 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					center: true,
					children: content.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-4 lg:grid-cols-3 lg:gap-6",
					children: content.items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: `rounded-2xl border border-border bg-card p-5 lg:block ${i === active ? "block" : "hidden"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-5 fill-sage text-sage" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "mt-3 text-sm leading-relaxed text-foreground/85",
								children: t.quote
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "mt-4 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex items-center gap-0.5",
									children: Array.from({ length: 5 }).map((_, s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }, s))
								})]
							})
						]
					}, t.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex items-center justify-center gap-2",
					children: content.items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Show testimonial ${i + 1}`,
						onClick: () => setActive(i),
						className: `size-2 rounded-full transition-colors ${i === active ? "bg-primary" : "bg-border"}`
					}, t.name))
				})
			]
		})
	});
}
function CtaBand({ content }) {
	const { settings } = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep pb-11 lg:pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-9 text-center lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-12 lg:py-12 lg:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-[1.6rem] leading-snug text-primary-foreground lg:text-[2rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lg:hidden",
						children: content.mobileHeading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden lg:inline",
						children: content.heading
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-sm text-sm text-primary-foreground/80 lg:mx-0",
					children: content.sub
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3 lg:mt-0 lg:ml-auto lg:w-80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/assessment",
							className: "flex items-center justify-center gap-3 rounded-md bg-card px-5 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-cream",
							children: [
								content.primaryLabel,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs text-primary-foreground/70",
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
		})
	});
}
function AboutPage() {
	const about = useAboutContent();
	const m = about.mobileHero;
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
						to: "/about",
						hash: "experts"
					},
					secondary: {
						label: m.secondaryLabel,
						to: "/contact"
					},
					scrollTo: "about-start",
					position: m.position
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "about-start",
					className: "scroll-mt-16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutHero, { hero: about.hero }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionStory, { content: about.mission }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, { content: about.story }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Philosophy, { content: about.philosophy }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experts, { content: about.experts }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, { content: about.process }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trust, { content: about.trust }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClinicExperience, { content: about.clinic }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Values, { content: about.values }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyUs, { content: about.whyUs }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Approach, { content: about.approach }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, { content: about.testimonials }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { content: about.cta })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AboutPage as component };
