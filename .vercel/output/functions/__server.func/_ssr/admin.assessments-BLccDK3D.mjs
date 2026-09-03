import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { a as MEAL_SLOTS } from "./content-types-COMB5Vxh.mjs";
import { d as Trash2, n as X, x as Search } from "../_libs/lucide-react.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Spinner, i as ErrorState, n as Card, p as inputClass, r as EmptyState, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { t as deleteAssessment } from "./assessments-6qBgVo-s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.assessments-BLccDK3D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		key: "all",
		label: "All"
	},
	{
		key: "pending",
		label: "Pending Payment"
	},
	{
		key: "paid",
		label: "Paid"
	},
	{
		key: "completed",
		label: "Completed"
	}
];
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.1em] ${status === "completed" ? "bg-brand/15 text-brand" : status === "payment_completed" ? "bg-gold/20 text-brand-deep" : "bg-muted text-muted-foreground"}`,
		children: status.replace(/_/g, " ")
	});
}
function Row({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 whitespace-pre-wrap text-sm text-foreground",
			children: value
		})]
	});
}
function Detail({ a, onClose }) {
	const d = a.details ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-deep/40 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-3xl rounded-2xl bg-background p-5 shadow-xl lg:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-2xl text-brand-deep",
						children: d.name || "Client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							d.phone,
							" · ",
							d.email
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close",
						onClick: onClose,
						className: "rounded-full border border-border p-2 hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.status ?? "draft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.paymentStatus ?? "not_started" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-x-8 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Age",
							value: d.age ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Address",
							value: d.address ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Main health goal",
							value: d.healthGoal ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Looking to start",
							value: d.lookingToStart ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Menstrual cycle",
							value: d.menstrualCycle ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Past medical history",
							value: d.medicalHistory ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Daily symptoms",
							value: d.symptoms ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Lifestyle / routine",
							value: d.lifestyle ?? ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Previous programs",
							value: d.previousPrograms ?? ""
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mt-6 font-serif text-xl text-brand-deep",
					children: "Nutrition log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[30rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Meal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3",
									children: "Food"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2",
									children: "Portion"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: MEAL_SLOTS.map((slot) => {
								const entry = a.nutritionLog?.[slot];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3 font-medium text-brand-deep",
										children: slot
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3 text-muted-foreground",
										children: entry?.time || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3",
										children: entry?.food || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 text-muted-foreground",
										children: entry?.portion || "—"
									})
								] }, slot);
							})
						})]
					})
				}),
				a.paymentScreenshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mt-6 font-serif text-xl text-brand-deep",
					children: "Payment screenshot"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: a.paymentScreenshot,
					target: "_blank",
					rel: "noreferrer noopener",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(a.paymentScreenshot, 600),
						alt: "Payment screenshot",
						className: "mt-2 max-h-72 w-auto rounded-xl border border-border",
						loading: "lazy"
					})
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: onClose,
						children: "Close"
					})
				})
			]
		})
	});
}
function AdminAssessments() {
	const { data, loading, error } = useCollectionData("assessments", null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [term, setTerm] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		const q = term.trim().toLowerCase();
		return data.filter((a) => {
			if (filter === "pending") return a.paymentStatus !== "approved" && a.status !== "completed";
			if (filter === "paid") return a.paymentStatus === "approved";
			if (filter === "completed") return a.status === "completed";
			return true;
		}).filter((a) => {
			if (!q) return true;
			const d = a.details ?? {};
			return [
				d.name,
				d.phone,
				d.email,
				a.id
			].some((v) => (v ?? "").toLowerCase().includes(q));
		}).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
	}, [
		data,
		filter,
		term
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Assessment Manager",
			sub: "Every client submission, updated live."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f.key),
					className: `rounded-full px-4 py-2 text-xs font-medium transition-colors ${filter === f.key ? "bg-brand text-primary-foreground" : "border border-border text-foreground/80 hover:bg-accent"}`,
					children: f.label
				}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative ml-auto w-full sm:w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: `${inputClass} pl-9`,
						value: term,
						onChange: (e) => setTerm(e.target.value),
						placeholder: "Search name, phone, email"
					})]
				})]
			})
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No assessments found",
			sub: "Try a different filter or search term."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium text-foreground",
							children: a.details?.name || "Unnamed client"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								a.details?.phone || a.id,
								" · ",
								a.details?.email
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
							children: a.details?.healthGoal
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.status ?? "draft" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.paymentStatus ?? "not_started" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setOpen(a),
							children: "View"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => {
								deleteAssessment(a.id).then(() => toast.success("Assessment deleted")).catch(() => toast.error("Could not delete"));
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				})]
			}, a.id))
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
			a: open,
			onClose: () => setOpen(null)
		}) : null
	] });
}
//#endregion
export { AdminAssessments as component };
