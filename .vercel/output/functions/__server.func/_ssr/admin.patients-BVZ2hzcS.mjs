import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { a as MEAL_SLOTS } from "./content-types-COMB5Vxh.mjs";
import { M as MessageCircle, O as Phone, n as X } from "../_libs/lucide-react.mjs";
import { f as useSettings } from "./useSiteContent-Dc7FEbQb.mjs";
import { c as PageHeader, d as Spinner, f as StatusBadge, i as ErrorState, l as SearchInput, n as Card, o as FilterChips, r as EmptyState } from "./AdminUI-DcDvqkFm.mjs";
import { i as waLink, t as buildLeadMessage } from "./whatsapp-Cg5MT_Ht.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.patients-BVZ2hzcS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All patients"
	},
	{
		id: "assessment",
		label: "With assessment"
	},
	{
		id: "paid",
		label: "Payment approved"
	},
	{
		id: "enquiry",
		label: "Enquiry only"
	}
];
function digits(v) {
	const d = (v || "").replace(/\D/g, "");
	return d.length > 10 ? d.slice(-10) : d;
}
function Detail({ p, whatsapp, onClose }) {
	const a = p.assessment;
	const d = a?.details;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-deep/40 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-3xl rounded-2xl bg-background p-5 shadow-xl lg:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl text-brand-deep",
							children: p.name || "Patient"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: [p.phone, p.email].filter(Boolean).join(" · ")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close",
						onClick: onClose,
						className: "rounded-full border border-border p-2 hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						p.gender ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
							label: p.gender,
							tone: "info"
						}) : null,
						p.age ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { label: `${p.age} yrs` }) : null,
						a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
							label: (a.status ?? "draft").replace(/_/g, " "),
							tone: "success"
						}) : null,
						a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
							label: (a.paymentStatus ?? "not_started").replace(/_/g, " "),
							tone: a.paymentStatus === "approved" ? "success" : "warning"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Program of interest",
							value: p.program
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Address",
							value: p.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Health goal",
							value: d?.healthGoal ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Symptoms",
							value: d?.symptoms ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Medical history",
							value: d?.medicalHistory ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Lifestyle",
							value: d?.lifestyle ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Menstrual cycle",
							value: d?.menstrualCycle ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Looking to start",
							value: d?.lookingToStart ?? ""
						})
					]
				}),
				a?.nutritionLog ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-serif text-lg text-brand-deep",
						children: "Nutrition log"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 overflow-x-auto rounded-xl border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
							className: "w-full text-left text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: MEAL_SLOTS.map((slot) => {
								const m = a.nutritionLog?.[slot];
								if (!m?.food) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-xs uppercase tracking-[0.1em] text-muted-foreground",
											children: slot
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: m.time
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: m.food
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-muted-foreground",
											children: m.portion
										})
									]
								}, slot);
							}) })
						})
					})]
				}) : null,
				p.enquiries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-serif text-lg text-brand-deep",
						children: [
							"Enquiries (",
							p.enquiries.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: p.enquiries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									e.createdAt ? new Date(e.createdAt).toLocaleString("en-IN") : "",
									" · ",
									e.concern
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 whitespace-pre-wrap",
								children: e.message
							})]
						}, e.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						p.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${p.phone.replace(/[^\d+]/g, "")}`,
							className: "inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Call"]
						}) : null,
						p.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waLink(p.phone.replace(/\D/g, "").length > 10 ? p.phone : `91${digits(p.phone)}`, buildLeadMessage({
								name: p.name,
								phone: p.phone,
								email: p.email,
								gender: p.gender,
								program: p.program,
								source: "Patient follow-up"
							})),
							target: "_blank",
							rel: "noreferrer noopener",
							className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-brand-deep",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " WhatsApp"]
						}) : null,
						whatsapp ? null : null
					]
				})
			]
		})
	});
}
function Info({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-0.5 whitespace-pre-wrap text-sm text-foreground",
		children: value
	})] });
}
function AdminPatients() {
	const assessments = useCollectionData("assessments", null);
	const messages = useCollectionData("messages", null);
	const { settings } = useSettings();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(null);
	const patients = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const a of assessments.data) {
			const d = a.details ?? {};
			const key = digits(d?.phone ?? a.id) || a.id;
			map.set(key, {
				key,
				name: d?.name ?? "",
				phone: d?.phone ?? "",
				email: d?.email ?? "",
				gender: d?.gender ?? "",
				age: d?.age ?? "",
				address: d?.address ?? "",
				program: d?.program ?? "",
				assessment: a,
				enquiries: [],
				updatedAt: a.updatedAt ?? a.createdAt ?? 0
			});
		}
		for (const m of messages.data) {
			const key = digits(m.phone) || m.id;
			const existing = map.get(key);
			if (existing) {
				existing.enquiries.push(m);
				existing.program = existing.program || (m.program ?? "");
				existing.updatedAt = Math.max(existing.updatedAt, m.createdAt ?? 0);
			} else map.set(key, {
				key,
				name: m.name,
				phone: m.phone,
				email: m.email,
				gender: m.gender ?? "",
				age: "",
				address: "",
				program: m.program ?? "",
				assessment: null,
				enquiries: [m],
				updatedAt: m.createdAt ?? 0
			});
		}
		return Array.from(map.values()).sort((a, b) => b.updatedAt - a.updatedAt);
	}, [assessments.data, messages.data]);
	const shown = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return patients.filter((p) => {
			if (filter === "assessment" && !p.assessment) return false;
			if (filter === "paid" && p.assessment?.paymentStatus !== "approved") return false;
			if (filter === "enquiry" && p.assessment) return false;
			if (!needle) return true;
			return [
				p.name,
				p.phone,
				p.email,
				p.program
			].join(" ").toLowerCase().includes(needle);
		});
	}, [
		patients,
		filter,
		q
	]);
	const loading = assessments.loading || messages.loading;
	const error = assessments.error ?? messages.error;
	const active = shown.find((p) => p.key === open) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Patients",
			sub: "One profile per person, combining their enquiries, assessment answers and payment status.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
				value: q,
				onChange: setQ,
				placeholder: "Search name or phone"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				options: FILTERS.map((f) => ({
					id: f.id,
					label: f.label,
					count: f.id === "all" ? patients.length : patients.filter((p) => f.id === "assessment" ? Boolean(p.assessment) : f.id === "paid" ? p.assessment?.paymentStatus === "approved" : !p.assessment).length
				})),
				value: filter,
				onChange: setFilter
			})
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No patients yet",
			sub: "Profiles appear here automatically when someone submits an enquiry or an assessment."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: p.name || "Unnamed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								p.phone,
								p.email,
								p.program
							].filter(Boolean).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [
								p.gender ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
									label: p.gender,
									tone: "info"
								}) : null,
								p.assessment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
									label: (p.assessment.status ?? "draft").replace(/_/g, " "),
									tone: "success"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { label: "Enquiry" }),
								p.assessment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
									label: `payment: ${(p.assessment.paymentStatus ?? "not started").replace(/_/g, " ")}`,
									tone: p.assessment.paymentStatus === "approved" ? "success" : "warning"
								}) : null,
								p.enquiries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { label: `${p.enquiries.length} enquiry` }) : null
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(p.key),
					className: "rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent",
					children: "View profile"
				})]
			}, p.key))
		}),
		active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
			p: active,
			whatsapp: settings.whatsapp,
			onClose: () => setOpen(null)
		}) : null
	] });
}
//#endregion
export { AdminPatients as component };
