import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { D as Plus, Dt as ArrowDown, d as Trash2, et as Eye, i as Video, k as Pencil, m as Star, tt as EyeOff, wt as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Field, d as Spinner, f as StatusBadge, i as ErrorState, n as Card, p as inputClass, r as EmptyState, s as ImageUploadField, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { a as updateItem, i as swapOrder, n as deleteItem, t as createItem } from "./admin-crud-HHokrQ4X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.testimonials-Ds4TzIQR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = (order) => ({
	name: "",
	program: "",
	rating: 5,
	review: "",
	photo: "",
	order,
	mediaType: "text",
	videoUrl: "",
	approved: true,
	featured: false
});
function AdminTestimonials() {
	const { data, loading, error } = useCollectionData("testimonials");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function save() {
		if (!draft) return;
		if (draft.name.trim().length < 2 || draft.review.trim().length < 10) {
			toast.error("Please add a name and a review of at least 10 characters.");
			return;
		}
		setSaving(true);
		try {
			if (editingId === "new") await createItem("testimonials", draft);
			else if (editingId) await updateItem("testimonials", editingId, draft);
			toast.success("Testimonial saved");
			setEditingId(null);
			setDraft(null);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save testimonial");
		} finally {
			setSaving(false);
		}
	}
	async function move(index, dir) {
		const a = data[index];
		const b = data[index + dir];
		if (!a || !b) return;
		try {
			await swapOrder("testimonials", {
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
				title: "Testimonials",
				sub: "Shown on the home page testimonial slider."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => {
					setEditingId("new");
					setDraft(empty(data.length + 1));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add testimonial"]
			})]
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		editingId && draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-xl text-brand-deep",
					children: editingId === "new" ? "New testimonial" : "Edit testimonial"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 lg:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Client name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: draft.name,
								maxLength: 60,
								onChange: (e) => setDraft({
									...draft,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Program",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: draft.program,
								maxLength: 80,
								onChange: (e) => setDraft({
									...draft,
									program: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Rating",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass,
								value: String(draft.rating),
								onChange: (e) => setDraft({
									...draft,
									rating: Number(e.target.value)
								}),
								children: [
									5,
									4,
									3,
									2,
									1
								].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: r,
									children: [
										r,
										" star",
										r === 1 ? "" : "s"
									]
								}, r))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Display order",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Review",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: `${inputClass} min-h-28`,
									value: draft.review,
									maxLength: 700,
									onChange: (e) => setDraft({
										...draft,
										review: e.target.value
									})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Story type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								value: draft.mediaType ?? "text",
								onChange: (e) => setDraft({
									...draft,
									mediaType: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "text",
										children: "Text only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "image",
										children: "Text + photo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "video",
										children: "Text + video"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Video link (YouTube, Vimeo or MP4)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: draft.videoUrl ?? "",
								placeholder: "https://youtu.be/…",
								onChange: (e) => setDraft({
									...draft,
									videoUrl: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Show on website",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								value: draft.approved === false ? "no" : "yes",
								onChange: (e) => setDraft({
									...draft,
									approved: e.target.value === "yes"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "yes",
									children: "Approved — visible"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "no",
									children: "Hidden"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Featured story",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								value: draft.featured ? "yes" : "no",
								onChange: (e) => setDraft({
									...draft,
									featured: e.target.value === "yes"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "no",
									children: "Normal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "yes",
									children: "Featured first"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadField, {
								label: "Client photo (optional)",
								value: draft.photo,
								folder: "reclaim/testimonials",
								onChange: (url) => setDraft({
									...draft,
									photo: url
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
						children: "Save testimonial"
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
			title: "No testimonials yet",
			sub: "Add client stories to build trust. The site shows built-in examples until you do."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: data.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-start gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-14 shrink-0 overflow-hidden rounded-full bg-muted/40",
						children: t.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(t.photo, 120),
							alt: "",
							className: "size-full object-cover",
							loading: "lazy"
						}) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: t.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t.program
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 flex gap-0.5 text-gold",
								children: Array.from({ length: t.rating || 5 }).map((_, s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-current" }, s))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-muted-foreground",
								children: t.review
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: t.approved === false ? "Hidden" : "Approved",
										tone: t.approved === false ? "danger" : "success"
									}),
									t.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: "Featured",
										tone: "warning"
									}) : null,
									t.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										label: "Video",
										tone: "info"
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
								onClick: () => {
									updateItem("testimonials", t.id, { approved: t.approved === false }).then(() => toast.success(t.approved === false ? "Now visible" : "Hidden from website")).catch(() => toast.error("Could not update"));
								},
								children: t.approved === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => {
									updateItem("testimonials", t.id, { featured: !t.featured }).then(() => toast.success(t.featured ? "Unfeatured" : "Featured")).catch(() => toast.error("Could not update"));
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => {
									setEditingId(t.id);
									setDraft({
										name: t.name,
										program: t.program,
										rating: t.rating ?? 5,
										review: t.review,
										photo: t.photo ?? "",
										order: t.order ?? 0,
										mediaType: t.mediaType ?? (t.videoUrl ? "video" : t.photo ? "image" : "text"),
										videoUrl: t.videoUrl ?? "",
										approved: t.approved !== false,
										featured: Boolean(t.featured)
									});
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => {
									deleteItem("testimonials", t.id).then(() => toast.success("Testimonial deleted")).catch(() => toast.error("Could not delete"));
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					})
				]
			}, t.id))
		})
	] });
}
//#endregion
export { AdminTestimonials as component };
