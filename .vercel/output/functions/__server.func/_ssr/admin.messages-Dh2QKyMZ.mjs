import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { F as Mail, O as Phone, d as Trash2, ht as Check, u as Undo2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Spinner, i as ErrorState, n as Card, r as EmptyState, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { n as deleteItem } from "./admin-crud-HHokrQ4X.mjs";
import { t as markMessageHandled } from "./contact-messages-CKb3k9Vy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.messages-Dh2QKyMZ.js
var import_jsx_runtime = require_jsx_runtime();
function AdminMessages() {
	const { data, loading, error } = useCollectionData("messages", null);
	const rows = [...data].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Enquiries",
			sub: "Messages sent through the contact page form."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No enquiries yet",
			sub: "New contact form submissions appear here live."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: m.handled ? "opacity-70" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium text-foreground",
							children: [m.name, m.concern ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 rounded-full bg-sage-soft px-2.5 py-1 text-[0.68rem] text-brand-deep",
								children: m.concern
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:${m.phone}`,
									className: "flex items-center gap-1 hover:text-brand",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }),
										" ",
										m.phone
									]
								}),
								m.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `mailto:${m.email}`,
									className: "flex items-center gap-1 hover:text-brand",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }),
										" ",
										m.email
									]
								}) : null,
								m.mode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.mode }) : null,
								m.createdAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(m.createdAt).toLocaleString("en-IN") }) : null
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								markMessageHandled(m.id, !m.handled).then(() => toast.success(m.handled ? "Marked as open" : "Marked as handled")).catch(() => toast.error("Could not update"));
							},
							children: m.handled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => {
								deleteItem("messages", m.id).then(() => toast.success("Enquiry deleted")).catch(() => toast.error("Could not delete"));
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})]
				}), m.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 whitespace-pre-wrap text-sm text-muted-foreground",
					children: m.message
				}) : null]
			}, m.id))
		})
	] });
}
//#endregion
export { AdminMessages as component };
