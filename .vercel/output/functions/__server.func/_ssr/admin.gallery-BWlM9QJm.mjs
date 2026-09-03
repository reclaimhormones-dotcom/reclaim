import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useCollectionData } from "./useFirestore-BbHoQv-f.mjs";
import { i as GALLERY_CATEGORIES } from "./content-types-COMB5Vxh.mjs";
import { Dt as ArrowDown, G as ImagePlus, R as LoaderCircle, d as Trash2, wt as ArrowUp } from "../_libs/lucide-react.mjs";
import { n as uploadImage, t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Spinner, i as ErrorState, n as Card, p as inputClass, r as EmptyState, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { a as updateItem, i as swapOrder, n as deleteItem, t as createItem } from "./admin-crud-HHokrQ4X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.gallery-BWlM9QJm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminGallery() {
	const { data, loading, error } = useCollectionData("gallery");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("Clinic");
	const fileRef = (0, import_react.useRef)(null);
	async function handleFiles(files) {
		if (!files || files.length === 0) return;
		setUploading(true);
		let uploaded = 0;
		try {
			for (const [i, file] of Array.from(files).entries()) {
				const { url } = await uploadImage(file, "reclaim/gallery");
				await createItem("gallery", {
					url,
					caption: "",
					category,
					order: data.length + i + 1
				});
				uploaded += 1;
			}
			toast.success(`${uploaded} image${uploaded === 1 ? "" : "s"} uploaded`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	async function patch(id, changes) {
		try {
			await updateItem("gallery", id, changes);
		} catch {
			toast.error("Could not save change");
		}
	}
	async function move(index, dir) {
		const a = data[index];
		const b = data[index + dir];
		if (!a || !b) return;
		try {
			await swapOrder("gallery", {
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Gallery",
			sub: "Images are uploaded to Cloudinary; only the URL is stored in the database."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-xs uppercase tracking-[0.1em] text-muted-foreground",
							children: "Category for new uploads"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: GALLERY_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						multiple: true,
						className: "hidden",
						onChange: (e) => void handleFiles(e.target.files)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						loading: uploading,
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), " Upload images"]
					}),
					uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Uploading…"]
					}) : null
				]
			})
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error }) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No gallery images yet",
			sub: "Upload photos of your clinic, consultations, events and community sessions."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: data.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(g.url, 600),
						alt: g.caption || "Gallery image",
						className: "aspect-[4/3] w-full rounded-xl object-cover",
						loading: "lazy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						defaultValue: g.caption,
						maxLength: 120,
						placeholder: "Caption",
						onBlur: (e) => void patch(g.id, { caption: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: inputClass,
						value: g.category,
						onChange: (e) => void patch(g.id, { category: e.target.value }),
						children: GALLERY_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "danger",
								className: "ml-auto",
								onClick: () => {
									deleteItem("gallery", g.id).then(() => toast.success("Image removed")).catch(() => toast.error("Could not delete image"));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
							})
						]
					})
				]
			}, g.id))
		})
	] });
}
//#endregion
export { AdminGallery as component };
