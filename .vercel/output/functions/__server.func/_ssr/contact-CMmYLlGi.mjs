import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as Leaf, F as Mail, H as Instagram, M as MessageCircle, O as Phone, P as MapPin, b as Send, ct as Clock, dt as CircleCheck, vt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { f as icon } from "./site-content-DISUfIbL.mjs";
import { f as useSettings, h as whatsappLink, i as useContactPageContent, n as telLink, t as mapsLink, u as usePrograms } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as SiteHeader, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { t as MobilePageHero } from "./MobilePageHero-CAvf2GAp.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as submitEnquiry } from "./contact-messages-CKb3k9Vy.mjs";
import { r as openWhatsApp, t as buildLeadMessage } from "./whatsapp-Cg5MT_Ht.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CMmYLlGi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
var fieldClass = "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20";
function ContactHero({ hero }) {
	const { settings } = useSettings();
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
						href: telLink(settings.phone),
						className: "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }),
							" ",
							settings.phone
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: whatsappLink(settings.whatsapp),
						target: "_blank",
						rel: "noreferrer noopener",
						className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-brand-deep transition-colors hover:bg-sage-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }),
							" ",
							hero.whatsappLabel
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-4 sm:grid-cols-3",
					children: hero.assurances.map((item) => {
						const Icon = icon(item.icon);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 sm:flex-col sm:gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-foreground",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[0.7rem] leading-relaxed text-muted-foreground",
									children: item.sub
								})]
							})]
						}, item.title);
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-hidden rounded-[1.75rem] lg:mt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cldOptimize(hero.image, 1400),
					alt: hero.imageAlt,
					width: 1400,
					height: 1e3,
					className: "h-[16rem] w-full object-cover object-[62%_35%] sm:h-[20rem] lg:h-[24rem]"
				})
			})]
		})
	});
}
function ContactCards({ content }) {
	const { settings } = useSettings();
	const cards = [
		{
			icon: Phone,
			title: content.callTitle,
			lines: [settings.phone],
			action: {
				label: content.callActionLabel,
				href: telLink(settings.phone)
			}
		},
		{
			icon: MessageCircle,
			title: content.whatsappTitle,
			lines: [content.whatsappLine],
			action: {
				label: content.whatsappActionLabel,
				href: whatsappLink(settings.whatsapp)
			}
		},
		{
			icon: Mail,
			title: content.emailTitle,
			lines: [settings.email],
			action: {
				label: content.emailActionLabel,
				href: `mailto:${settings.email}`
			}
		},
		{
			icon: MapPin,
			title: content.visitTitle,
			lines: [settings.address],
			action: {
				label: content.visitActionLabel,
				href: mapsLink(settings.address)
			}
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 pb-2 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: cards.map(({ icon: Icon, title, lines, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_oklch(0.35_0.048_142/4%),0_10px_28px_-22px_oklch(0.35_0.048_142/22%)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-sage-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-sm font-semibold text-foreground",
							children: title
						}),
						lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 break-words text-xs leading-relaxed text-muted-foreground",
							children: l
						}, l)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: action.href,
							...action.href.startsWith("http") ? {
								target: "_blank",
								rel: "noreferrer noopener"
							} : {},
							className: "mt-3 inline-block text-xs font-semibold text-primary transition-colors hover:text-brand-deep",
							children: action.label
						})
					]
				}, title))
			})
		})
	});
}
function EnquiryForm({ content, side }) {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [gender, setGender] = (0, import_react.useState)("female");
	const { settings } = useSettings();
	const { data: livePrograms } = usePrograms();
	const programOptions = livePrograms.filter((p) => p.active !== false && p.category === (gender === "male" ? "men" : "women")).map((p) => p.title);
	async function handleSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		setSending(true);
		try {
			const lead = {
				name: String(fd.get("name") ?? ""),
				phone: String(fd.get("phone") ?? ""),
				email: String(fd.get("email") ?? ""),
				gender: String(fd.get("gender") ?? gender),
				program: String(fd.get("program") ?? ""),
				concern: String(fd.get("concern") ?? ""),
				mode: String(fd.get("mode") ?? ""),
				message: String(fd.get("message") ?? ""),
				source: "Book Consultation"
			};
			await submitEnquiry(lead);
			form.reset();
			setSent(true);
			toast.success("Enquiry received — opening WhatsApp so our team can reply faster.");
			openWhatsApp(settings.whatsapp, buildLeadMessage(lead));
		} catch (err) {
			const message = err && typeof err === "object" && "issues" in err ? err.issues[0]?.message ?? "Please check your details" : err instanceof Error ? err.message : "Could not send your message";
			toast.error(message);
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:px-8 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: content.eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-[1.5rem] leading-snug text-foreground lg:text-[1.85rem]",
						children: content.heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: content.sub
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl border border-border bg-sage-soft p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-7 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-serif text-lg text-brand-deep",
								children: content.successTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: content.successSub
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSent(false),
								className: "mt-4 text-xs font-semibold text-primary underline-offset-4 hover:underline",
								children: content.successAgainLabel
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 grid gap-4",
						onSubmit: (e) => void handleSubmit(e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "name",
									className: "text-xs font-medium text-foreground",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "name",
									name: "name",
									required: true,
									placeholder: "Your name",
									className: `mt-1.5 ${fieldClass}`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "phone",
									className: "text-xs font-medium text-foreground",
									children: "Phone / WhatsApp *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "phone",
									name: "phone",
									type: "tel",
									required: true,
									placeholder: "+91 00000 00000",
									className: `mt-1.5 ${fieldClass}`
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-foreground",
								children: "Gender *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground",
								children: ["female", "male"].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "inline-flex items-center gap-2 capitalize",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "gender",
										value: g,
										checked: gender === g,
										onChange: () => setGender(g),
										className: "size-3.5 accent-[var(--primary)]"
									}), g]
								}, g))
							})] }),
							programOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "program",
								className: "text-xs font-medium text-foreground",
								children: "Program you are interested in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "program",
								name: "program",
								defaultValue: "",
								className: `mt-1.5 ${fieldClass}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Not sure yet — please advise"
								}), programOptions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: t
								}, t))]
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "email",
									className: "text-xs font-medium text-foreground",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "email",
									name: "email",
									type: "email",
									placeholder: "you@example.com",
									className: `mt-1.5 ${fieldClass}`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "concern",
									className: "text-xs font-medium text-foreground",
									children: "Primary Concern"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "concern",
									name: "concern",
									defaultValue: "",
									className: `mt-1.5 ${fieldClass}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Select a concern"
									}), content.concerns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "mode",
								className: "text-xs font-medium text-foreground",
								children: "Preferred Consultation Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground",
								children: content.modes.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "mode",
										value: m,
										defaultChecked: i === 0,
										className: "size-3.5 accent-[var(--primary)]"
									}), m]
								}, m))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "message",
								className: "text-xs font-medium text-foreground",
								children: "Your Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "message",
								name: "message",
								rows: 4,
								placeholder: "Share your symptoms, reports or questions…",
								className: `mt-1.5 resize-none ${fieldClass}`
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: sending,
								className: "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }),
									" ",
									sending ? "Sending…" : content.submitLabel
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.68rem] leading-relaxed text-muted-foreground",
								children: content.disclaimer
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 lg:mt-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-2xl border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(side.image, 1200),
							alt: side.imageAlt,
							loading: "lazy",
							width: 1200,
							height: 900,
							className: "h-44 w-full object-cover lg:h-52"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground",
									children: side.hoursHeading
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-2 text-xs text-muted-foreground",
									children: side.hours.map(({ day, time }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0 last:pb-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0",
											children: day
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 font-medium text-foreground",
											children: time
										})]
									}, day))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 flex items-start gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-3.5 shrink-0 text-gold" }), side.hoursNote]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-hidden rounded-2xl border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: side.mapTitle,
							src: side.mapEmbedUrl,
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade",
							className: "h-56 w-full border-0 lg:h-64"
						})
					}),
					settings.instagram ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: settings.instagram,
						target: "_blank",
						rel: "noreferrer noopener",
						className: "mt-5 flex items-center justify-between gap-3 rounded-2xl border border-border bg-sage-soft px-5 py-4 transition-colors hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-semibold text-brand-deep",
								children: side.instagramTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-xs text-muted-foreground",
								children: side.instagramSub
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-5 shrink-0 text-primary" })]
					}) : null
				]
			})]
		})
	});
}
function Faqs({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					center: true,
					children: content.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 text-center text-[1.55rem] leading-snug text-foreground lg:text-[1.9rem]",
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
					className: "mt-7 space-y-3",
					children: content.items.map(({ q, a }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group rounded-xl border border-border bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0",
								children: q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-lg leading-none text-primary transition-transform group-open:rotate-45",
								children: "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs leading-relaxed text-muted-foreground",
							children: a
						})]
					}, q))
				})
			]
		})
	});
}
function ContactCta({ content }) {
	const { settings } = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-2xl bg-brand-deep px-6 py-9 text-center lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "pointer-events-none absolute -right-4 -top-4 size-36 text-primary-foreground/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[1.5rem] leading-snug text-primary-foreground lg:text-[1.9rem]",
							children: content.heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/80",
							children: content.sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: telLink(settings.phone),
								className: "inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-brand-deep transition-opacity hover:opacity-90",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "size-4" }),
									" ",
									content.primaryLabel
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/programs",
								className: "inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10",
								children: content.secondaryLabel
							})]
						})
					]
				})]
			})
		})
	});
}
function ContactPage() {
	const page = useContactPageContent();
	const { settings } = useSettings();
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
						href: telLink(settings.phone)
					},
					secondary: {
						label: m.secondaryLabel,
						href: whatsappLink(settings.whatsapp)
					},
					scrollTo: "contact-start",
					position: m.position
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "contact-start",
					className: "scroll-mt-16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactHero, { hero: page.hero }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCards, { content: page.cards }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiryForm, {
					content: page.form,
					side: page.side
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faqs, { content: page.faqs }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCta, { content: page.cta })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ContactPage as component };
