import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { ht as Check, n as X } from "../_libs/lucide-react.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Spinner, i as ErrorState, n as Card, p as inputClass, r as EmptyState, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { r as reviewPayment } from "./assessments-6qBgVo-s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.payments-0pTB1bwQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		key: "pending_verification",
		label: "Pending verification"
	},
	{
		key: "approved",
		label: "Approved"
	},
	{
		key: "rejected",
		label: "Rejected"
	},
	{
		key: "all",
		label: "All"
	}
];
function AdminPayments() {
	const { data, loading, error } = useCollectionData("assessments", null);
	const [tab, setTab] = (0, import_react.useState)("pending_verification");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [reasons, setReasons] = (0, import_react.useState)({});
	const rows = (0, import_react.useMemo)(() => data.filter((a) => a.paymentStatus && a.paymentStatus !== "not_started").filter((a) => tab === "all" ? true : a.paymentStatus === tab).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)), [data, tab]);
	async function review(a, approve) {
		setBusy(a.id);
		try {
			await reviewPayment(a.id, approve, reasons[a.id] ?? "");
			toast.success(approve ? "Payment approved" : "Payment rejected");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not update payment");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Payment Verification",
			sub: "Review payment screenshots and unlock the nutrition log step for the client."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t.key),
					className: `rounded-full px-4 py-2 text-xs font-medium transition-colors ${tab === t.key ? "bg-brand text-primary-foreground" : "border border-border text-foreground/80 hover:bg-accent"}`,
					children: t.label
				}, t.key))
			})
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Nothing to review",
			sub: "Payment submissions from clients will appear here in real time."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]",
				children: [a.paymentScreenshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: a.paymentScreenshot,
					target: "_blank",
					rel: "noreferrer noopener",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(a.paymentScreenshot, 400),
						alt: "Payment screenshot",
						className: "h-48 w-full rounded-xl border border-border object-cover lg:h-full",
						loading: "lazy"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-48 items-center justify-center rounded-xl bg-muted/40 text-xs text-muted-foreground",
					children: "No screenshot"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: a.details?.name || "Client"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								a.details?.phone,
								" · ",
								a.details?.email
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-brand-deep",
							children: [
								"Amount: ₹",
								a.paymentAmount ?? 0,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 rounded-full bg-muted px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground",
									children: (a.paymentStatus ?? "").replace(/_/g, " ")
								})
							]
						}),
						a.paymentNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: ["Note: ", a.paymentNote]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: `${inputClass} mt-3`,
							placeholder: "Optional note for your records (e.g. rejection reason)",
							value: reasons[a.id] ?? "",
							maxLength: 200,
							onChange: (e) => setReasons({
								...reasons,
								[a.id]: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								loading: busy === a.id,
								disabled: a.paymentStatus === "approved",
								onClick: () => void review(a, true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Approve"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "danger",
								disabled: busy === a.id || a.paymentStatus === "rejected",
								onClick: () => void review(a, false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Reject"]
							})]
						})
					]
				})]
			}, a.id))
		})
	] });
}
//#endregion
export { AdminPayments as component };
