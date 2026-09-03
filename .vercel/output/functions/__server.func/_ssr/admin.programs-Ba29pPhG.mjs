import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { l as programSlug } from "./content-types-COMB5Vxh.mjs";
import { D as Plus, Dt as ArrowDown, d as Trash2, k as Pencil, wt as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Field, d as Spinner, f as StatusBadge, i as ErrorState, n as Card, p as inputClass, r as EmptyState, s as ImageUploadField, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { a as updateItem, i as swapOrder, n as deleteItem, t as createItem } from "./admin-crud-HHokrQ4X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.programs-Ba29pPhG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyDraft = (order) => ({
	title: "",
	description: "",
	image: "",
	category: "women",
	points: [],
	order,
	active: true,
	duration: "",
	price: 0,
	showPrice: true,
	longDescription: "",
	whoFor: [],
	process: []
});
function AdminPrograms() {
	const { data, loading, error } = useCollectionData("programs");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [pointsText, setPointsText] = (0, import_react.useState)("");
	const [whoForText, setWhoForText] = (0, import_react.useState)("");
	const [processText, setProcessText] = (0, import_react.useState)("");
	function startNew() {
		setEditingId("new");
		setDraft(emptyDraft(data.length + 1));
		setPointsText("");
		setWhoForText("");
		setProcessText("");
	}
	function startEdit(p) {
		setEditingId(p.id);
		setDraft({
			title: p.title,
			description: p.description,
			image: p.image,
			category: p.category,
			points: p.points ?? [],
			order: p.order ?? 0,
			active: p.active !== false,
			duration: p.duration ?? "",
			price: p.price ?? 0,
			showPrice: p.showPrice !== false,
			longDescription: p.longDescription ?? "",
			whoFor: p.whoFor ?? [],
			process: p.process ?? []
		});
		setPointsText((p.points ?? []).join(", "));
		setWhoForText((p.whoFor ?? []).join("\n"));
		setProcessText((p.process ?? []).join("\n"));
	}
	async function save() {
		if (!draft) return;
		if (draft.title.trim().length < 2) {
			toast.error("Please enter a program title.");
			return;
		}
		setSaving(true);
		const payload = {
			...draft,
			title: draft.title.trim(),
			description: draft.description.trim(),
			points: pointsText.split(",").map((s) => s.trim()).filter(Boolean),
			whoFor: whoForText.split("\n").map((s) => s.trim()).filter(Boolean),
			process: processText.split("\n").map((s) => s.trim()).filter(Boolean),
			slug: programSlug({
				...draft,
				id: ""
			})
		};
		try {
			if (editingId === "new") await createItem("programs", payload);
			else if (editingId) await updateItem("programs", editingId, payload);
			toast.success("Program saved");
			setEditingId(null);
			setDraft(null);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save program");
		} finally {
			setSaving(false);
		}
	}
	async function remove(id) {
		try {
			await deleteItem("programs", id);
			toast.success("Program deleted");
		} catch {
			toast.error("Could not delete program");
		}
	}
	async function move(index, dir) {
		const a = data[index];
		const b = data[index + dir];
		if (!a || !b) return;
		try {
			await swapOrder("programs", {
				id: a.id,
				order: a.order ?? index
			}, {
				id: b.id,
				order: b.order ?? index + dir
			});
		} catch {
			toast.error("Could not reorder");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Programs",
				sub: "These replace the default programs on the Programs page when present."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: startNew,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add program"]
			})]
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		editingId && draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-xl text-brand-deep",
					children: editingId === "new" ? "New program" : "Edit program"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 lg:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: draft.title,
								maxLength: 80,
								onChange: (e) => setDraft({
									...draft,
									title: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								value: draft.category,
								onChange: (e) => setDraft({
									...draft,
									category: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "women",
									children: "Women's Health"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "men",
									children: "Men's Health"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: `${inputClass} min-h-24`,
									value: draft.description,
									maxLength: 500,
									onChange: (e) => setDraft({
										...draft,
										description: e.target.value
									})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Highlights",
							hint: "Comma separated, e.g. Cycle Regulation, Weight Management",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: pointsText,
								maxLength: 200,
								onChange: (e) => setPointsText(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Display order",
							hint: "Smaller numbers show first.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								inputMode: "numeric",
								value: String(draft.order),
								onChange: (e) => setDraft({
									...draft,
									order: Number(e.target.value) || 0
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Duration",
							hint: "e.g. 3 months, 12 weeks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: draft.duration ?? "",
								maxLength: 40,
								onChange: (e) => setDraft({
									...draft,
									duration: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Price (₹)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								inputMode: "numeric",
								value: String(draft.price ?? 0),
								onChange: (e) => setDraft({
									...draft,
									price: Number(e.target.value) || 0
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: ["Show price on the website", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-[0.7rem] text-muted-foreground",
										children: "Turn off to hide the price from visitors."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "size-5 accent-[oklch(0.44_0.052_140)]",
									checked: draft.showPrice !== false,
									onChange: (e) => setDraft({
										...draft,
										showPrice: e.target.checked
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: ["Program is active", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-[0.7rem] text-muted-foreground",
										children: "Inactive programs are hidden from the website."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "size-5 accent-[oklch(0.44_0.052_140)]",
									checked: draft.active !== false,
									onChange: (e) => setDraft({
										...draft,
										active: e.target.checked
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Detail page introduction",
								hint: "Shown on the program's own page.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: `${inputClass} min-h-24`,
									value: draft.longDescription ?? "",
									maxLength: 1200,
									onChange: (e) => setDraft({
										...draft,
										longDescription: e.target.value
									})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Who is it for",
							hint: "One point per line.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${inputClass} min-h-24`,
								value: whoForText,
								onChange: (e) => setWhoForText(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "How it works",
							hint: "One step per line.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${inputClass} min-h-24`,
								value: processText,
								onChange: (e) => setProcessText(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadField, {
								label: "Program image",
								value: draft.image,
								folder: "reclaim/programs",
								onChange: (url) => setDraft({
									...draft,
									image: url
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						loading: saving,
						onClick: () => void save(),
						children: "Save program"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							setEditingId(null);
							setDraft(null);
						},
						children: "Cancel"
					})]
				})
			]
		}) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No programs yet",
			sub: "Add your first program — until then the website shows the built-in program cards.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: startNew,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add program"]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: data.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-16 shrink-0 overflow-hidden rounded-xl bg-muted/40",
						children: p.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(p.image, 160),
							alt: "",
							className: "size-full object-cover",
							loading: "lazy"
						}) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium text-foreground",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-2 text-xs text-muted-foreground",
								children: p.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: p.category === "men" ? "Men" : "Women",
										tone: "success"
									}),
									p.active === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: "Hidden",
										tone: "danger"
									}) : null,
									p.duration ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: p.duration,
										tone: "neutral"
									}) : null,
									p.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: p.showPrice === false ? `₹${p.price} (hidden)` : `₹${p.price}`,
										tone: p.showPrice === false ? "warning" : "info"
									}) : null
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => void move(i, -1),
								disabled: i === 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => void move(i, 1),
								disabled: i === data.length - 1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => startEdit(p),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => void remove(p.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					})
				]
			}, p.id))
		})
	] });
}
//#endregion
export { AdminPrograms as component };
