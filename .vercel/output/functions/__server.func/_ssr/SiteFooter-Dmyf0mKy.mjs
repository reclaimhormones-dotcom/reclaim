import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as Leaf, F as Mail, J as HeartHandshake, K as House, M as MessageCircle, N as Menu, O as Phone, P as MapPin, U as Image, ct as Clock, ft as ChevronRight, h as Sprout, n as X, q as Heart, s as User, vt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { a as useFooterContent, f as useSettings, h as whatsappLink, l as useNavigationContent, p as useSocialLinks } from "./useSiteContent-Dc7FEbQb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-Dmyf0mKy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Link wrapper for admin-managed destinations. Internal paths use the client
* router; anything external (http, tel, mailto, #hash) renders a plain anchor.
*/
function SiteLink({ to, hash, className, ariaLabel, onClick, children }) {
	if (to.startsWith("/")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		...hash ? { hash } : {},
		className,
		"aria-label": ariaLabel,
		onClick,
		children
	});
	const external = to.startsWith("http");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: to,
		...external ? {
			target: "_blank",
			rel: "noreferrer noopener"
		} : {},
		className,
		"aria-label": ariaLabel,
		onClick,
		children
	});
}
var NAV_ICONS = {
	Home: House,
	"About Us": User,
	Programs: Sprout,
	Gallery: Image,
	Contact: Phone
};
/** Soft botanical sprig used as decorative corner art in the mobile menu. */
function Sprig({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 200 200",
		"aria-hidden": true,
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 180C60 140 100 100 170 40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M60 140c-6-22 4-42 24-50 4 22-6 42-24 50Z",
					fill: "currentColor",
					fillOpacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M74 126c22-2 38 10 42 30-22 4-40-8-42-30Z",
					fill: "currentColor",
					fillOpacity: "0.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M100 100c-6-22 4-42 24-50 4 22-6 42-24 50Z",
					fill: "currentColor",
					fillOpacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M114 86c22-2 38 10 42 30-22 4-40-8-42-30Z",
					fill: "currentColor",
					fillOpacity: "0.35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M142 58c-4-20 6-36 24-42 2 20-8 36-24 42Z",
					fill: "currentColor",
					fillOpacity: "0.45"
				})
			]
		})
	});
}
/**
* Shared site header. All labels, links and the logo come from the
* `navigation/main` document in the CMS.
*
* `overlay` = the page starts with a full-screen hero, so the bar floats
* transparently until the user scrolls. Otherwise it is solid from the start.
*/
function SiteHeader({ overlay = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const socials = useSocialLinks();
	const nav = useNavigationContent();
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-0 z-50 w-full border-b transition-all duration-300 ${overlay && !scrolled ? "border-transparent bg-gradient-to-b from-cream/90 via-cream/60 to-transparent" : "border-border/70 bg-background/95 backdrop-blur"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between lg:px-8 lg:py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: nav.logo,
						alt: nav.logoAlt,
						className: "h-8 w-auto lg:h-10"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-9 lg:flex",
					children: nav.items.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLink, {
							to: item.to,
							className: `text-sm transition-colors hover:text-brand ${active ? "border-b-2 border-brand pb-0.5 font-medium text-brand" : "text-foreground/80"}`,
							children: item.label
						}, item.label);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLink, {
					to: nav.buttonTo,
					className: "hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep lg:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" }), nav.buttonLabel]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Open navigation menu",
					"aria-expanded": open,
					onClick: () => setOpen(true),
					className: "justify-self-end text-primary lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-6" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Site menu",
			className: "fixed inset-0 z-[60] flex h-[100svh] flex-col overflow-hidden bg-cream lg:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprig, { className: "pointer-events-none absolute -left-10 -top-8 size-52 rotate-[18deg] text-brand/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprig, { className: "pointer-events-none absolute -right-14 top-1/3 size-56 -scale-x-100 text-brand/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-[1.5vh] pt-[1.5vh]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close navigation menu",
								onClick: () => setOpen(false),
								className: "flex size-10 items-center justify-center rounded-full border border-brand/30 bg-cream/70 text-brand-deep backdrop-blur transition-colors active:bg-brand/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: nav.logo,
							alt: nav.logoAlt,
							className: "mx-auto h-[8vh] max-h-14 min-h-9 w-auto max-w-[70%] shrink-0 object-contain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-[2vh] shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-brand",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3.5 text-brand/70" }),
										nav.menuEyebrow,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3.5 text-brand/70" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-[1vh] font-serif text-[clamp(1.5rem,5.6vw,2rem)] leading-tight text-brand-deep",
									children: [
										nav.menuHeading,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-brand",
											children: nav.menuHeadingAccent
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "ml-2 inline size-5 text-brand/70" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-[1.2vh] h-px w-20 bg-brand/40" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-[1.5vh] flex min-h-0 flex-1 flex-col justify-between",
							children: nav.items.map((item, i) => {
								const Icon = NAV_ICONS[item.label] ?? Leaf;
								const active = pathname === item.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-h-0 flex-1 flex-col justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLink, {
										to: item.to,
										onClick: () => setOpen(false),
										className: `flex items-center gap-4 rounded-2xl px-3 py-[0.9vh] transition-colors ${active ? "bg-brand/10" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `flex size-[clamp(2.4rem,6.2vh,3rem)] shrink-0 items-center justify-center rounded-2xl ${active ? "bg-brand text-primary-foreground shadow-[0_10px_24px_-14px_oklch(0.44_0.052_140/0.9)]" : "bg-brand/10 text-brand-deep"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `flex-1 text-[clamp(1rem,4.4vw,1.125rem)] ${active ? "font-medium text-brand" : "text-brand-deep"}`,
												children: item.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `size-5 ${active ? "text-brand" : "text-brand-deep/60"}` })
										]
									}), i < nav.items.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-3 mt-[0.6vh] h-px bg-brand-deep/10" })]
								}, item.label);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 390 90",
						preserveAspectRatio: "none",
						"aria-hidden": true,
						className: "block h-[6vh] max-h-16 min-h-8 w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0 60C90 20 150 70 250 34c60-22 100-24 140-14v70H0Z",
								className: "fill-brand/25"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0 72C80 42 160 84 250 52c60-21 100-18 140-8v46H0Z",
								className: "fill-brand/45"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0 84C90 60 150 90 250 68c60-13 100-12 140-6v28H0Z",
								className: "fill-brand"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative -mt-px bg-brand px-6 pb-[max(1.6vh,env(safe-area-inset-bottom))] pt-1.5 text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprig, { className: "pointer-events-none absolute -right-4 bottom-2 size-32 -scale-x-100 text-primary-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-[clamp(2.25rem,5.5vh,3rem)] shrink-0 items-center justify-center rounded-full bg-primary-foreground/90 text-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "flex-1 text-[0.74rem] leading-snug text-primary-foreground/90",
									children: nav.menuFooterText
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[6vh] max-h-14 w-px bg-primary-foreground/25" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground/80",
										children: nav.menuFollowLabel
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 flex items-center gap-2",
										children: socials.map(({ Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href,
											target: "_blank",
											rel: "noreferrer noopener",
											"aria-label": label,
											className: "flex size-8 items-center justify-center rounded-full border border-primary-foreground/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
										}, label))
									})]
								})
							]
						})]
					})]
				})
			]
		})]
	});
}
/** Floating WhatsApp CTA shown on every public page. */
function WhatsAppButton() {
	const { settings } = useSettings();
	if (!settings.whatsapp) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: whatsappLink(settings.whatsapp),
		target: "_blank",
		rel: "noreferrer noopener",
		"aria-label": "Chat with us on WhatsApp",
		className: "fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-18px_oklch(0.44_0.052_140/0.85)] transition-transform hover:scale-[1.03] lg:bottom-7 lg:right-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: "Chat on WhatsApp"
		})]
	});
}
function SiteFooter() {
	const { settings } = useSettings();
	const copy = useFooterContent();
	const contact = [
		{
			icon: Phone,
			value: settings.phone,
			href: `tel:${settings.phone.replace(/\s/g, "")}`
		},
		{
			icon: Mail,
			value: settings.email,
			href: `mailto:${settings.email}`
		},
		{
			icon: MapPin,
			value: settings.address
		},
		{
			icon: Clock,
			value: settings.hours
		}
	];
	const socials = useSocialLinks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-brand-deep text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto gap-8 px-4 py-10 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:px-8 lg:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex rounded-xl bg-primary-foreground/95 px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: copy.logo,
							alt: "Reclaim Hormones — Nourishing Hormones. Restoring You.",
							loading: "lazy",
							className: "h-9 w-auto"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs uppercase tracking-[0.14em] text-primary-foreground/70",
						children: copy.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-xs leading-relaxed text-primary-foreground/70",
						children: copy.blurb
					}),
					socials.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex items-center gap-2",
						children: socials.map(({ Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href,
							target: "_blank",
							rel: "noreferrer noopener",
							"aria-label": label,
							className: "flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
						}, href))
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 lg:mt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-primary-foreground",
						children: copy.quickLinksHeading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-xs text-primary-foreground/75",
						children: copy.quickLinks.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLink, {
							to: item.to,
							className: "transition-colors hover:text-primary-foreground",
							children: item.label
						}) }, item.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 lg:mt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-primary-foreground",
						children: copy.programsHeading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-xs text-primary-foreground/75",
						children: copy.programLinks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLink, {
							to: "/programs",
							className: "transition-colors hover:text-primary-foreground",
							children: p
						}) }, p))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 lg:mt-0",
					id: "contact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-primary-foreground",
						children: copy.contactHeading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-xs text-primary-foreground/75",
						children: contact.map(({ icon: Icon, value, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 shrink-0 text-gold" }), href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href,
								className: "min-w-0 break-words hover:text-primary-foreground",
								children: value
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 break-words",
								children: value
							})]
						}, value))
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-primary-foreground/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[0.7rem] text-primary-foreground/70 lg:flex-row lg:items-center lg:justify-between lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.copyright }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 fill-destructive text-destructive" }),
							" ",
							copy.credit
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Designed & Developed by",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://thedreamteamservices.com/",
							target: "_blank",
							rel: "noreferrer noopener",
							className: "font-medium text-gold transition-opacity hover:opacity-80",
							children: "Dream Team Services"
						})
					] })
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {})] });
}
//#endregion
export { WhatsAppButton as i, SiteHeader as n, SiteLink as r, SiteFooter as t };
