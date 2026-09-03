import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { G as ImagePlus, R as LoaderCircle, d as Trash2, ot as Copy, x as Search } from "../_libs/lucide-react.mjs";
import { n as uploadImage, t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminUI-DcDvqkFm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15";
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-[0.7rem] text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-2xl border border-border/70 bg-card p-5 shadow-[0_18px_40px_-32px_oklch(0.44_0.052_140/0.55)] ${className}`,
		children
	});
}
function SectionTitle({ title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl text-brand-deep",
			children: title
		}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: sub
		}) : null]
	});
}
function Button({ children, onClick, type = "button", variant = "primary", loading = false, disabled = false, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type,
		onClick,
		disabled: disabled || loading,
		className: `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variant === "primary" ? "bg-primary text-primary-foreground hover:bg-brand-deep" : variant === "danger" ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "border border-border bg-background text-foreground hover:bg-accent"} ${className}`,
		children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, children]
	});
}
function Spinner({ label = "Loading…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), label]
	});
}
function EmptyState({ title, sub, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-lg text-brand-deep",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-1 max-w-sm text-sm text-muted-foreground",
				children: sub
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-center",
				children: action
			}) : null
		]
	});
}
function ErrorState({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive",
		children: message
	});
}
function ImageUploadField({ label, value, onChange, folder = "reclaim", hint }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	async function handle(file) {
		if (!file) return;
		setBusy(true);
		try {
			onChange((await uploadImage(file, folder)).url);
			toast.success("Image uploaded to Cloudinary");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setBusy(false);
			if (ref.current) ref.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		hint: hint ?? "Stored on Cloudinary — only the URL is saved.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/40",
				children: value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cldOptimize(value, 200),
					alt: "",
					className: "size-full object-cover",
					loading: "lazy"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5 text-muted-foreground" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => void handle(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						loading: busy,
						onClick: () => ref.current?.click(),
						children: value ? "Replace image" : "Upload image"
					}),
					value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => {
							navigator.clipboard.writeText(value).then(() => toast.success("Image link copied")).catch(() => toast.error("Could not copy the link"));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " Copy link"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "danger",
						onClick: () => onChange(""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove"]
					})] }) : null
				]
			})]
		})
	});
}
function PageHeader({ title, sub, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-2xl text-brand-deep sm:text-[1.75rem]",
				children: title
			}), sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: sub
			}) : null]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: action
		}) : null]
	});
}
function SearchInput({ value, onChange, placeholder = "Search…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full sm:max-w-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: `${inputClass} pl-9`,
			value,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
var TONES = {
	neutral: "bg-muted text-muted-foreground",
	success: "bg-brand/12 text-brand-deep",
	warning: "bg-gold/20 text-[oklch(0.42_0.08_78)]",
	danger: "bg-destructive/12 text-destructive",
	info: "bg-sky-500/12 text-sky-700"
};
function StatusBadge({ label, tone = "neutral" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${TONES[tone]}`,
		children: label
	});
}
function FilterChips({ options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onChange(o.id),
			className: `rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${o.id === value ? "bg-brand text-primary-foreground" : "border border-border bg-background text-foreground/75 hover:bg-brand/10"}`,
			children: [o.label, typeof o.count === "number" ? ` (${o.count})` : ""]
		}, o.id))
	});
}
//#endregion
export { Field as a, PageHeader as c, Spinner as d, StatusBadge as f, ErrorState as i, SearchInput as l, Card as n, FilterChips as o, inputClass as p, EmptyState as r, ImageUploadField as s, Button as t, SectionTitle as u };
