import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { W as Images, j as MessageSquareQuote, o as Users, r as Wallet, ut as ClipboardCheck } from "../_libs/lucide-react.mjs";
import { d as Spinner, n as Card, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-B5d71NPi.js
var import_jsx_runtime = require_jsx_runtime();
function Stat({ icon: Icon, label, value, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "transition-shadow hover:shadow-[0_22px_46px_-30px_oklch(0.44_0.052_140/0.6)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-3xl leading-none text-brand-deep",
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: label
				})] })]
			})
		})
	});
}
function AdminDashboard() {
	const assessments = useCollectionData("assessments", null);
	const gallery = useCollectionData("gallery");
	const testimonials = useCollectionData("testimonials");
	const loading = assessments.loading || gallery.loading || testimonials.loading;
	const pendingPayments = assessments.data.filter((a) => a.paymentStatus === "pending_verification").length;
	const completed = assessments.data.filter((a) => a.status === "completed").length;
	const recent = [...assessments.data].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
		title: "Dashboard",
		sub: "A live snapshot of your clinic."
	}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				icon: Users,
				label: "Total Clients",
				value: assessments.data.length,
				to: "/admin/assessments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				icon: Wallet,
				label: "Pending Payments",
				value: pendingPayments,
				to: "/admin/payments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				icon: ClipboardCheck,
				label: "Completed",
				value: completed,
				to: "/admin/assessments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				icon: Images,
				label: "Gallery Images",
				value: gallery.data.length,
				to: "/admin/gallery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				icon: MessageSquareQuote,
				label: "Testimonials",
				value: testimonials.data.length,
				to: "/admin/testimonials"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-serif text-xl text-brand-deep",
			children: "Recent activity"
		}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "No assessments yet. New submissions will appear here in real time."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border/70",
			children: recent.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-2 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium text-foreground",
						children: a.details?.name || "Unnamed client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: a.details?.phone || a.id
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-brand/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-brand",
					children: (a.status ?? "draft").replace(/_/g, " ")
				})]
			}, a.id))
		})]
	})] })] });
}
//#endregion
export { AdminDashboard as component };
