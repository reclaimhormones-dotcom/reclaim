import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { i as getDocs, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as getDb } from "./firebase-DSE5QkO6.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useDocData } from "./useFirestore-BbHoQv-f.mjs";
import { t as DEFAULT_SETTINGS } from "./content-types-COMB5Vxh.mjs";
import { C as Save, D as Plus, Dt as ArrowDown, d as Trash2, st as CloudUpload, w as RotateCcw, wt as ArrowUp } from "../_libs/lucide-react.mjs";
import { a as GALLERY_SEED, c as NAVIGATION_DEFAULT, d as TESTIMONIAL_SEED, i as GALLERY_PAGE_DEFAULT, l as PROGRAMS_PAGE_DEFAULT, n as CONTACT_PAGE_DEFAULT, o as HOME_DEFAULT, p as mergeContent, r as FOOTER_DEFAULT, s as ICON_NAMES, t as ABOUT_DEFAULT, u as PROGRAM_SEED } from "./site-content-DISUfIbL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Field, n as Card, p as inputClass, s as ImageUploadField, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { r as saveDocument, t as createItem } from "./admin-crud-HHokrQ4X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.content-D7TNr4rO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function blankFor(fields) {
	const out = {};
	for (const f of fields) if (f.type === "list") out[f.key] = [];
	else if (f.type === "group") out[f.key] = blankFor(f.fields);
	else if (f.type === "strings") out[f.key] = [];
	else out[f.key] = "";
	return out;
}
function TextControl({ spec, value, onChange }) {
	const str = typeof value === "string" ? value : "";
	if (spec.type === "image") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadField, {
			label: spec.label,
			value: str,
			folder: "reclaim/site",
			onChange: (url) => onChange(url)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: inputClass,
			value: str,
			placeholder: "Cloudinary image URL",
			onChange: (e) => onChange(e.target.value)
		})]
	});
	if (spec.type === "icon") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: spec.label,
		hint: spec.hint ?? "Icon shown next to this item.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: inputClass,
			value: str,
			onChange: (e) => onChange(e.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Default (Leaf)"
			}), ICON_NAMES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: n,
				children: n
			}, n))]
		})
	});
	if (spec.type === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: spec.label,
		hint: spec.hint,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: `${inputClass} min-h-24`,
			value: str,
			onChange: (e) => onChange(e.target.value)
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: spec.label,
		hint: spec.hint ?? (spec.type === "link" ? "Internal path (/contact) or full URL." : void 0),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: inputClass,
			value: str,
			onChange: (e) => onChange(e.target.value)
		})
	});
}
function StringsControl({ spec, value, onChange }) {
	const list = Array.isArray(value) ? value : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/70 bg-muted/20 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground",
				children: spec.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: list.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: item,
						onChange: (e) => {
							const next = [...list];
							next[i] = e.target.value;
							onChange(next);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => onChange(list.filter((_, j) => j !== i)),
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				className: "mt-3",
				onClick: () => onChange([...list, ""]),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add line"]
			})
		]
	});
}
function FieldsRenderer({ fields, value, onChange }) {
	function set(key, v) {
		onChange({
			...value,
			[key]: v
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: fields.map((f) => {
			if (f.type === "group") {
				const inner = value[f.key] ?? {};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/70 bg-muted/10 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-3 font-serif text-lg text-brand-deep",
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsRenderer, {
							fields: f.fields,
							value: inner,
							onChange: (next) => set(f.key, next)
						})]
					})
				}, f.key);
			}
			if (f.type === "list") {
				const list = Array.isArray(value[f.key]) ? value[f.key] : [];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/70 bg-muted/10 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-serif text-lg text-brand-deep",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								onClick: () => set(f.key, [...list, blankFor(f.fields)]),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
									" Add ",
									f.itemLabel ?? "item"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-4",
							children: [list.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground",
										children: [
											f.itemLabel ?? "Item",
											" ",
											i + 1
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												disabled: i === 0,
												onClick: () => {
													const next = [...list];
													const prev = next[i - 1];
													next[i - 1] = next[i];
													next[i] = prev;
													set(f.key, next);
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												disabled: i === list.length - 1,
												onClick: () => {
													const next = [...list];
													const after = next[i + 1];
													next[i + 1] = next[i];
													next[i] = after;
													set(f.key, next);
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "danger",
												onClick: () => set(f.key, list.filter((_, j) => j !== i)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsRenderer, {
									fields: f.fields,
									value: item,
									onChange: (next) => {
										const arr = [...list];
										arr[i] = next;
										set(f.key, arr);
									}
								})]
							}, i)), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Nothing added yet."
							}) : null]
						})]
					})
				}, f.key);
			}
			if (f.type === "strings") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringsControl, {
					spec: f,
					value: value[f.key],
					onChange: (v) => set(f.key, v)
				})
			}, f.key);
			const wide = f.type === "textarea" || f.type === "image";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: wide ? "lg:col-span-2" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextControl, {
					spec: f,
					value: value[f.key],
					onChange: (v) => set(f.key, v)
				})
			}, f.key);
		})
	});
}
/**
* Schema-driven editor for a single Firestore content document. Live values are
* merged over the shipped defaults, so nothing ever appears blank.
*/
function DocEditor({ spec, defaults }) {
	const { data, loading } = useDocData(spec.collection, spec.id);
	const merged = (0, import_react.useMemo)(() => mergeContent(defaults, data), [data, defaults]);
	const [form, setForm] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && form === null) setForm(merged);
	}, [
		loading,
		merged,
		form
	]);
	async function save() {
		if (!form) return;
		setSaving(true);
		try {
			await saveDocument(spec.collection, spec.id, form);
			toast.success("Saved — the website updates instantly");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: spec.title,
				sub: spec.sub
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => setForm(merged),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Revert"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					loading: saving,
					onClick: () => void save(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save changes"]
				})]
			})]
		}),
		form ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldsRenderer, {
			fields: spec.fields,
			value: form,
			onChange: setForm
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Loading content…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				loading: saving,
				onClick: () => void save(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save changes"]
			})
		})
	] });
}
var iconItemFields = [
	{
		key: "icon",
		label: "Icon",
		type: "icon"
	},
	{
		key: "title",
		label: "Title",
		type: "text"
	},
	{
		key: "sub",
		label: "Description",
		type: "textarea"
	}
];
var numberedItemFields = [{
	key: "n",
	label: "Step number",
	type: "text"
}, ...iconItemFields];
var slideFields = [
	{
		key: "img",
		label: "Image",
		type: "image"
	},
	{
		key: "alt",
		label: "Alt text",
		type: "text"
	},
	{
		key: "caption",
		label: "Caption",
		type: "text"
	},
	{
		key: "position",
		label: "Focal point",
		type: "text",
		hint: "Tailwind object-position, e.g. object-[50%_12%]"
	}
];
var mobileHeroFields = [
	{
		key: "img",
		label: "Background image",
		type: "image"
	},
	{
		key: "alt",
		label: "Alt text",
		type: "text"
	},
	{
		key: "eyebrow",
		label: "Eyebrow",
		type: "text"
	},
	{
		key: "title",
		label: "Title",
		type: "text"
	},
	{
		key: "titleAccent",
		label: "Title accent",
		type: "text"
	},
	{
		key: "subtitle",
		label: "Subtitle",
		type: "textarea"
	},
	{
		key: "primaryLabel",
		label: "Primary button",
		type: "text"
	},
	{
		key: "secondaryLabel",
		label: "Secondary link",
		type: "text"
	},
	{
		key: "position",
		label: "Focal point",
		type: "text"
	}
];
var NAVIGATION_SPEC = {
	collection: "navigation",
	id: "main",
	title: "Navigation",
	sub: "Logo, menu labels, links and the header button.",
	fields: [
		{
			key: "logo",
			label: "Logo",
			type: "image"
		},
		{
			key: "logoAlt",
			label: "Logo alt text",
			type: "text"
		},
		{
			key: "items",
			label: "Menu items",
			type: "list",
			itemLabel: "menu item",
			fields: [{
				key: "label",
				label: "Label",
				type: "text"
			}, {
				key: "to",
				label: "Link",
				type: "link"
			}]
		},
		{
			key: "buttonLabel",
			label: "Header button label",
			type: "text"
		},
		{
			key: "buttonTo",
			label: "Header button link",
			type: "link"
		},
		{
			key: "menuEyebrow",
			label: "Mobile menu eyebrow",
			type: "text"
		},
		{
			key: "menuHeading",
			label: "Mobile menu heading",
			type: "text"
		},
		{
			key: "menuHeadingAccent",
			label: "Mobile menu heading accent",
			type: "text"
		},
		{
			key: "menuFooterText",
			label: "Mobile menu footer text",
			type: "textarea"
		},
		{
			key: "menuFollowLabel",
			label: "\"Follow us\" label",
			type: "text"
		}
	]
};
var FOOTER_SPEC = {
	collection: "pages",
	id: "footer",
	title: "Footer",
	sub: "Logo, description, quick links, program links and copyright.",
	fields: [
		{
			key: "logo",
			label: "Logo",
			type: "image"
		},
		{
			key: "tagline",
			label: "Tagline",
			type: "text"
		},
		{
			key: "blurb",
			label: "Description",
			type: "textarea"
		},
		{
			key: "quickLinksHeading",
			label: "Quick links heading",
			type: "text"
		},
		{
			key: "quickLinks",
			label: "Quick links",
			type: "list",
			itemLabel: "link",
			fields: [{
				key: "label",
				label: "Label",
				type: "text"
			}, {
				key: "to",
				label: "Link",
				type: "link"
			}]
		},
		{
			key: "programsHeading",
			label: "Programs heading",
			type: "text"
		},
		{
			key: "programLinks",
			label: "Program links",
			type: "strings"
		},
		{
			key: "contactHeading",
			label: "Contact heading",
			type: "text"
		},
		{
			key: "copyright",
			label: "Copyright",
			type: "text"
		},
		{
			key: "credit",
			label: "Credit line",
			type: "text"
		}
	]
};
var HOME_SPEC = {
	collection: "pages",
	id: "homepage",
	title: "Home Page",
	sub: "Hero slideshow, statistics, philosophy, previews, journey steps and CTAs.",
	fields: [
		{
			key: "hero",
			label: "Hero",
			type: "group",
			fields: [
				{
					key: "mobileTitle",
					label: "Mobile title",
					type: "text"
				},
				{
					key: "mobileTitleAccent",
					label: "Mobile title accent",
					type: "text"
				},
				{
					key: "mobileSubtitle",
					label: "Mobile subtitle",
					type: "textarea"
				},
				{
					key: "mobilePrimaryLabel",
					label: "Mobile primary button",
					type: "text"
				},
				{
					key: "mobileSecondaryLabel",
					label: "Mobile secondary link",
					type: "text"
				},
				{
					key: "badge",
					label: "Desktop badge",
					type: "text"
				},
				{
					key: "title",
					label: "Desktop title",
					type: "text"
				},
				{
					key: "titleAccent",
					label: "Desktop title accent",
					type: "text"
				},
				{
					key: "subtitle",
					label: "Desktop subtitle",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Desktop primary button",
					type: "text"
				},
				{
					key: "secondaryLabel",
					label: "Desktop secondary button",
					type: "text"
				},
				{
					key: "scrollLabel",
					label: "Scroll cue label",
					type: "text"
				},
				{
					key: "mobileSlides",
					label: "Mobile slideshow",
					type: "list",
					itemLabel: "slide",
					fields: slideFields
				},
				{
					key: "desktopSlides",
					label: "Desktop slideshow",
					type: "list",
					itemLabel: "slide",
					fields: slideFields
				}
			]
		},
		{
			key: "stats",
			label: "Statistics",
			type: "list",
			itemLabel: "stat",
			fields: [
				{
					key: "icon",
					label: "Icon",
					type: "icon"
				},
				{
					key: "title",
					label: "Value",
					type: "text"
				},
				{
					key: "sub",
					label: "Label",
					type: "text"
				}
			]
		},
		{
			key: "philosophy",
			label: "Philosophy",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "items",
					label: "Pillars",
					type: "list",
					itemLabel: "pillar",
					fields: iconItemFields
				}
			]
		},
		{
			key: "programs",
			label: "Programs preview",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "ctaLabel",
					label: "Button label",
					type: "text"
				},
				{
					key: "items",
					label: "Program cards",
					type: "list",
					itemLabel: "program",
					fields: [
						{
							key: "img",
							label: "Image",
							type: "image"
						},
						{
							key: "icon",
							label: "Icon",
							type: "icon"
						},
						{
							key: "title",
							label: "Title",
							type: "text"
						},
						{
							key: "sub",
							label: "Description",
							type: "textarea"
						}
					]
				}
			]
		},
		{
			key: "about",
			label: "About preview",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "body",
					label: "Body",
					type: "textarea"
				},
				{
					key: "image",
					label: "Portrait",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Portrait alt text",
					type: "text"
				},
				{
					key: "name",
					label: "Name",
					type: "text"
				},
				{
					key: "role",
					label: "Role",
					type: "text"
				},
				{
					key: "degree",
					label: "Qualification",
					type: "text"
				},
				{
					key: "ctaLabel",
					label: "Button label",
					type: "text"
				},
				{
					key: "pillars",
					label: "Pillars",
					type: "list",
					itemLabel: "pillar",
					fields: iconItemFields
				}
			]
		},
		{
			key: "testimonials",
			label: "Testimonials preview",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "items",
					label: "Fallback testimonials",
					type: "list",
					itemLabel: "testimonial",
					fields: [
						{
							key: "quote",
							label: "Quote",
							type: "textarea"
						},
						{
							key: "name",
							label: "Name",
							type: "text"
						},
						{
							key: "program",
							label: "Program",
							type: "text"
						}
					]
				}
			]
		},
		{
			key: "journey",
			label: "Journey steps",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "steps",
					label: "Steps",
					type: "list",
					itemLabel: "step",
					fields: numberedItemFields
				},
				{
					key: "ctaLabel",
					label: "Button label",
					type: "text"
				}
			]
		},
		{
			key: "gallery",
			label: "Gallery preview",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "ctaLabel",
					label: "Button label",
					type: "text"
				},
				{
					key: "images",
					label: "Fallback images",
					type: "list",
					itemLabel: "image",
					fields: [{
						key: "img",
						label: "Image",
						type: "image"
					}, {
						key: "alt",
						label: "Alt text",
						type: "text"
					}]
				}
			]
		},
		{
			key: "cta",
			label: "Footer CTA",
			type: "group",
			fields: [
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Primary button",
					type: "text"
				},
				{
					key: "orLabel",
					label: "\"or\" label",
					type: "text"
				},
				{
					key: "whatsappLabel",
					label: "WhatsApp button",
					type: "text"
				}
			]
		},
		{
			key: "mobileContact",
			label: "Mobile contact block",
			type: "group",
			fields: [
				{
					key: "callLabel",
					label: "Call label",
					type: "text"
				},
				{
					key: "emailLabel",
					label: "Email label",
					type: "text"
				},
				{
					key: "locationLabel",
					label: "Location label",
					type: "text"
				},
				{
					key: "timingsLabel",
					label: "Timings label",
					type: "text"
				},
				{
					key: "socialHeading",
					label: "Social heading",
					type: "text"
				},
				{
					key: "quickLinksHeading",
					label: "Quick links heading",
					type: "text"
				}
			]
		}
	]
};
var ABOUT_SPEC = {
	collection: "pages",
	id: "aboutpage",
	title: "About Page",
	sub: "Story, mission, vision, doctor profile, timeline, values, credentials and images.",
	fields: [
		{
			key: "mobileHero",
			label: "Mobile hero",
			type: "group",
			fields: mobileHeroFields
		},
		{
			key: "hero",
			label: "Desktop hero",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "title",
					label: "Title",
					type: "text"
				},
				{
					key: "titleAccent",
					label: "Title accent",
					type: "text"
				},
				{
					key: "body",
					label: "Body",
					type: "textarea"
				},
				{
					key: "ctaLabel",
					label: "Button label",
					type: "text"
				},
				{
					key: "image",
					label: "Image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Image alt text",
					type: "text"
				},
				{
					key: "name",
					label: "Doctor name",
					type: "text"
				},
				{
					key: "degree",
					label: "Qualification",
					type: "text"
				},
				{
					key: "role",
					label: "Role",
					type: "text"
				},
				{
					key: "points",
					label: "Highlights",
					type: "list",
					itemLabel: "highlight",
					fields: iconItemFields
				}
			]
		},
		{
			key: "mission",
			label: "Mission & specialities",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "headingEnd",
					label: "Heading second line",
					type: "text"
				},
				{
					key: "paragraphs",
					label: "Paragraphs",
					type: "strings"
				},
				{
					key: "specialityHeading",
					label: "Specialities heading",
					type: "text"
				},
				{
					key: "specialities",
					label: "Specialities",
					type: "list",
					itemLabel: "speciality",
					fields: iconItemFields
				}
			]
		},
		{
			key: "story",
			label: "Story, timeline, mission & vision",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "image",
					label: "Image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Image alt text",
					type: "text"
				},
				{
					key: "timeline",
					label: "Timeline",
					type: "list",
					itemLabel: "milestone",
					fields: [
						{
							key: "icon",
							label: "Icon",
							type: "icon"
						},
						{
							key: "year",
							label: "Year (optional)",
							type: "text"
						},
						{
							key: "title",
							label: "Title",
							type: "text"
						},
						{
							key: "sub",
							label: "Description",
							type: "textarea"
						}
					]
				},
				{
					key: "missionIcon",
					label: "Mission icon",
					type: "icon"
				},
				{
					key: "missionTitle",
					label: "Mission title",
					type: "text"
				},
				{
					key: "missionSub",
					label: "Mission text",
					type: "textarea"
				},
				{
					key: "visionIcon",
					label: "Vision icon",
					type: "icon"
				},
				{
					key: "visionTitle",
					label: "Vision title",
					type: "text"
				},
				{
					key: "visionSub",
					label: "Vision text",
					type: "textarea"
				}
			]
		},
		{
			key: "philosophy",
			label: "Philosophy",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Items",
				type: "list",
				itemLabel: "item",
				fields: iconItemFields
			}]
		},
		{
			key: "experts",
			label: "Experts",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Team",
				type: "list",
				itemLabel: "expert",
				fields: [
					{
						key: "img",
						label: "Photo",
						type: "image"
					},
					{
						key: "name",
						label: "Name",
						type: "text"
					},
					{
						key: "degree",
						label: "Qualification",
						type: "text"
					},
					{
						key: "role",
						label: "Role",
						type: "text"
					}
				]
			}]
		},
		{
			key: "process",
			label: "Treatment process",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Steps",
				type: "list",
				itemLabel: "step",
				fields: numberedItemFields
			}]
		},
		{
			key: "trust",
			label: "Why families trust us",
			type: "group",
			fields: [{
				key: "heading",
				label: "Heading",
				type: "text"
			}, {
				key: "items",
				label: "Items",
				type: "list",
				itemLabel: "item",
				fields: iconItemFields
			}]
		},
		{
			key: "clinic",
			label: "Clinic experience",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Photos",
				type: "list",
				itemLabel: "photo",
				fields: [{
					key: "img",
					label: "Image",
					type: "image"
				}, {
					key: "caption",
					label: "Caption",
					type: "text"
				}]
			}]
		},
		{
			key: "values",
			label: "Core values",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Values",
				type: "list",
				itemLabel: "value",
				fields: iconItemFields
			}]
		},
		{
			key: "whyUs",
			label: "Why choose us & credentials",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "image",
					label: "Background image",
					type: "image"
				},
				{
					key: "points",
					label: "Reasons",
					type: "strings"
				},
				{
					key: "credentialsEyebrow",
					label: "Credentials eyebrow",
					type: "text"
				},
				{
					key: "credentials",
					label: "Credentials",
					type: "list",
					itemLabel: "credential",
					fields: iconItemFields
				}
			]
		},
		{
			key: "approach",
			label: "Our approach",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Steps",
				type: "list",
				itemLabel: "step",
				fields: numberedItemFields
			}]
		},
		{
			key: "testimonials",
			label: "Testimonials",
			type: "group",
			fields: [{
				key: "eyebrow",
				label: "Eyebrow",
				type: "text"
			}, {
				key: "items",
				label: "Quotes",
				type: "list",
				itemLabel: "quote",
				fields: [{
					key: "quote",
					label: "Quote",
					type: "textarea"
				}, {
					key: "name",
					label: "Name",
					type: "text"
				}]
			}]
		},
		{
			key: "cta",
			label: "Closing CTA",
			type: "group",
			fields: [
				{
					key: "mobileHeading",
					label: "Mobile heading",
					type: "text"
				},
				{
					key: "heading",
					label: "Desktop heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Primary button",
					type: "text"
				},
				{
					key: "orLabel",
					label: "\"or\" label",
					type: "text"
				},
				{
					key: "whatsappLabel",
					label: "WhatsApp button",
					type: "text"
				}
			]
		}
	]
};
var PROGRAMS_PAGE_SPEC = {
	collection: "pages",
	id: "programspage",
	title: "Programs Page",
	sub: "Hero, section headings, approach, glimpses and CTA. Program cards live under Programs.",
	fields: [
		{
			key: "mobileHero",
			label: "Mobile hero",
			type: "group",
			fields: mobileHeroFields
		},
		{
			key: "hero",
			label: "Desktop hero",
			type: "group",
			fields: [
				{
					key: "badge",
					label: "Badge",
					type: "text"
				},
				{
					key: "title",
					label: "Title",
					type: "text"
				},
				{
					key: "subtitle",
					label: "Subtitle",
					type: "text"
				},
				{
					key: "subtitleAccent",
					label: "Subtitle accent",
					type: "text"
				},
				{
					key: "body",
					label: "Body",
					type: "textarea"
				},
				{
					key: "image",
					label: "Image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Image alt text",
					type: "text"
				},
				{
					key: "cardTitle",
					label: "Floating card title",
					type: "textarea"
				},
				{
					key: "cardSub",
					label: "Floating card text",
					type: "textarea"
				},
				{
					key: "points",
					label: "Highlights",
					type: "list",
					itemLabel: "highlight",
					fields: iconItemFields
				}
			]
		},
		{
			key: "sections",
			label: "Program section headings",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "womenHeading",
					label: "Women heading",
					type: "text"
				},
				{
					key: "womenAccent",
					label: "Women accent",
					type: "text"
				},
				{
					key: "menHeading",
					label: "Men heading",
					type: "text"
				},
				{
					key: "menAccent",
					label: "Men accent",
					type: "text"
				},
				{
					key: "learnMoreLabel",
					label: "Card link label",
					type: "text"
				}
			]
		},
		{
			key: "approach",
			label: "Approach",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "body",
					label: "Body",
					type: "textarea"
				},
				{
					key: "image",
					label: "Image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Image alt text",
					type: "text"
				},
				{
					key: "badge",
					label: "Circle badge text",
					type: "text"
				},
				{
					key: "items",
					label: "Steps",
					type: "list",
					itemLabel: "step",
					fields: iconItemFields
				}
			]
		},
		{
			key: "glimpses",
			label: "Glimpses",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "ctaLabel",
					label: "Button label",
					type: "text"
				},
				{
					key: "items",
					label: "Photos",
					type: "list",
					itemLabel: "photo",
					fields: [{
						key: "img",
						label: "Image",
						type: "image"
					}, {
						key: "alt",
						label: "Alt text",
						type: "text"
					}]
				}
			]
		},
		{
			key: "cta",
			label: "CTA band",
			type: "group",
			fields: [
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Primary button",
					type: "text"
				},
				{
					key: "secondaryLabel",
					label: "Secondary button",
					type: "text"
				},
				{
					key: "whatsappLabel",
					label: "WhatsApp button",
					type: "text"
				}
			]
		}
	]
};
var GALLERY_PAGE_SPEC = {
	collection: "pages",
	id: "gallerypage",
	title: "Gallery Page",
	sub: "Hero, headings, impact stats, transformation stories and CTA. Photos live under Gallery.",
	fields: [
		{
			key: "mobileHero",
			label: "Mobile hero",
			type: "group",
			fields: mobileHeroFields
		},
		{
			key: "hero",
			label: "Desktop hero",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "title",
					label: "Title",
					type: "text"
				},
				{
					key: "titleAccent",
					label: "Title accent",
					type: "text"
				},
				{
					key: "body",
					label: "Body",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Primary button",
					type: "text"
				},
				{
					key: "secondaryLabel",
					label: "Secondary button",
					type: "text"
				},
				{
					key: "image",
					label: "Image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Image alt text",
					type: "text"
				}
			]
		},
		{
			key: "grid",
			label: "Photo grid headings",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				}
			]
		},
		{
			key: "statsHeading",
			label: "Impact heading",
			type: "text"
		},
		{
			key: "stats",
			label: "Impact stats",
			type: "list",
			itemLabel: "stat",
			fields: [
				{
					key: "icon",
					label: "Icon",
					type: "icon"
				},
				{
					key: "value",
					label: "Value",
					type: "text"
				},
				{
					key: "label",
					label: "Label",
					type: "text"
				}
			]
		},
		{
			key: "stories",
			label: "Transformation stories",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "items",
					label: "Stories",
					type: "list",
					itemLabel: "story",
					fields: [
						{
							key: "img",
							label: "Image",
							type: "image"
						},
						{
							key: "name",
							label: "Name",
							type: "text"
						},
						{
							key: "tag",
							label: "Tag",
							type: "text"
						},
						{
							key: "result",
							label: "Result",
							type: "text"
						},
						{
							key: "quote",
							label: "Quote",
							type: "textarea"
						}
					]
				}
			]
		},
		{
			key: "cta",
			label: "CTA",
			type: "group",
			fields: [
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Primary button",
					type: "text"
				},
				{
					key: "secondaryLabel",
					label: "Secondary button",
					type: "text"
				}
			]
		}
	]
};
var CONTACT_PAGE_SPEC = {
	collection: "pages",
	id: "contactpage",
	title: "Contact Page",
	sub: "Hero, contact cards, enquiry form, clinic hours, map and FAQs.",
	fields: [
		{
			key: "mobileHero",
			label: "Mobile hero",
			type: "group",
			fields: mobileHeroFields
		},
		{
			key: "hero",
			label: "Desktop hero",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "title",
					label: "Title",
					type: "text"
				},
				{
					key: "titleAccent",
					label: "Title accent",
					type: "text"
				},
				{
					key: "body",
					label: "Body",
					type: "textarea"
				},
				{
					key: "whatsappLabel",
					label: "WhatsApp button",
					type: "text"
				},
				{
					key: "image",
					label: "Image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Image alt text",
					type: "text"
				},
				{
					key: "assurances",
					label: "Assurances",
					type: "list",
					itemLabel: "assurance",
					fields: iconItemFields
				}
			]
		},
		{
			key: "cards",
			label: "Contact cards",
			type: "group",
			fields: [
				{
					key: "callTitle",
					label: "Call card title",
					type: "text"
				},
				{
					key: "callActionLabel",
					label: "Call action label",
					type: "text"
				},
				{
					key: "whatsappTitle",
					label: "WhatsApp card title",
					type: "text"
				},
				{
					key: "whatsappLine",
					label: "WhatsApp card line",
					type: "text"
				},
				{
					key: "whatsappActionLabel",
					label: "WhatsApp action label",
					type: "text"
				},
				{
					key: "emailTitle",
					label: "Email card title",
					type: "text"
				},
				{
					key: "emailActionLabel",
					label: "Email action label",
					type: "text"
				},
				{
					key: "visitTitle",
					label: "Visit card title",
					type: "text"
				},
				{
					key: "visitActionLabel",
					label: "Visit action label",
					type: "text"
				}
			]
		},
		{
			key: "form",
			label: "Enquiry form",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "concerns",
					label: "Concern options",
					type: "strings"
				},
				{
					key: "modes",
					label: "Consultation modes",
					type: "strings"
				},
				{
					key: "submitLabel",
					label: "Submit button",
					type: "text"
				},
				{
					key: "disclaimer",
					label: "Disclaimer",
					type: "textarea"
				},
				{
					key: "successTitle",
					label: "Success title",
					type: "text"
				},
				{
					key: "successSub",
					label: "Success text",
					type: "textarea"
				},
				{
					key: "successAgainLabel",
					label: "\"Send another\" label",
					type: "text"
				}
			]
		},
		{
			key: "side",
			label: "Clinic hours, map & Instagram",
			type: "group",
			fields: [
				{
					key: "image",
					label: "Clinic image",
					type: "image"
				},
				{
					key: "imageAlt",
					label: "Clinic image alt text",
					type: "text"
				},
				{
					key: "hoursHeading",
					label: "Hours heading",
					type: "text"
				},
				{
					key: "hours",
					label: "Working hours",
					type: "list",
					itemLabel: "row",
					fields: [{
						key: "day",
						label: "Days",
						type: "text"
					}, {
						key: "time",
						label: "Time",
						type: "text"
					}]
				},
				{
					key: "hoursNote",
					label: "Hours note",
					type: "textarea"
				},
				{
					key: "instagramTitle",
					label: "Instagram card title",
					type: "text"
				},
				{
					key: "instagramSub",
					label: "Instagram card text",
					type: "text"
				},
				{
					key: "mapEmbedUrl",
					label: "Google Map embed URL",
					type: "link"
				},
				{
					key: "mapTitle",
					label: "Map title",
					type: "text"
				}
			]
		},
		{
			key: "faqs",
			label: "FAQs",
			type: "group",
			fields: [
				{
					key: "eyebrow",
					label: "Eyebrow",
					type: "text"
				},
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "headingAccent",
					label: "Heading accent",
					type: "text"
				},
				{
					key: "items",
					label: "Questions",
					type: "list",
					itemLabel: "FAQ",
					fields: [{
						key: "q",
						label: "Question",
						type: "text"
					}, {
						key: "a",
						label: "Answer",
						type: "textarea"
					}]
				}
			]
		},
		{
			key: "cta",
			label: "CTA",
			type: "group",
			fields: [
				{
					key: "heading",
					label: "Heading",
					type: "text"
				},
				{
					key: "sub",
					label: "Description",
					type: "textarea"
				},
				{
					key: "primaryLabel",
					label: "Primary button",
					type: "text"
				},
				{
					key: "secondaryLabel",
					label: "Secondary button",
					type: "text"
				}
			]
		}
	]
};
async function isEmpty(path) {
	const db = await getDb();
	return (await getDocs(collection(db, path))).empty;
}
/**
* Writes the shipped website content into Firestore so every text block and
* image URL becomes editable in the dashboard. Page documents are overwritten
* with the defaults; collections are only seeded when still empty.
*/
async function publishSiteContent() {
	await Promise.all([
		saveDocument("navigation", "main", NAVIGATION_DEFAULT),
		saveDocument("pages", "homepage", HOME_DEFAULT),
		saveDocument("pages", "aboutpage", ABOUT_DEFAULT),
		saveDocument("pages", "programspage", PROGRAMS_PAGE_DEFAULT),
		saveDocument("pages", "gallerypage", GALLERY_PAGE_DEFAULT),
		saveDocument("pages", "contactpage", CONTACT_PAGE_DEFAULT),
		saveDocument("pages", "footer", FOOTER_DEFAULT),
		saveDocument("settings", "site", DEFAULT_SETTINGS)
	]);
	const notes = ["Page content published"];
	if (await isEmpty("programs")) {
		for (const p of PROGRAM_SEED) await createItem("programs", p);
		notes.push(`${PROGRAM_SEED.length} programs`);
	}
	if (await isEmpty("gallery")) {
		for (const g of GALLERY_SEED) await createItem("gallery", g);
		notes.push(`${GALLERY_SEED.length} gallery photos`);
	}
	if (await isEmpty("testimonials")) {
		for (const t of TESTIMONIAL_SEED) await createItem("testimonials", t);
		notes.push(`${TESTIMONIAL_SEED.length} testimonials`);
	}
	return notes.join(" · ");
}
var TABS = [
	{
		id: "navigation",
		label: "Navigation",
		spec: NAVIGATION_SPEC,
		defaults: NAVIGATION_DEFAULT
	},
	{
		id: "homepage",
		label: "Home page",
		spec: HOME_SPEC,
		defaults: HOME_DEFAULT
	},
	{
		id: "aboutpage",
		label: "About page",
		spec: ABOUT_SPEC,
		defaults: ABOUT_DEFAULT
	},
	{
		id: "programspage",
		label: "Programs page",
		spec: PROGRAMS_PAGE_SPEC,
		defaults: PROGRAMS_PAGE_DEFAULT
	},
	{
		id: "gallerypage",
		label: "Gallery page",
		spec: GALLERY_PAGE_SPEC,
		defaults: GALLERY_PAGE_DEFAULT
	},
	{
		id: "contactpage",
		label: "Contact page",
		spec: CONTACT_PAGE_SPEC,
		defaults: CONTACT_PAGE_DEFAULT
	},
	{
		id: "footer",
		label: "Footer",
		spec: FOOTER_SPEC,
		defaults: FOOTER_DEFAULT
	}
];
function PublishCard() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function publish() {
		setBusy(true);
		try {
			const note = await publishSiteContent();
			toast.success(note);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not publish content");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg text-brand-deep",
					children: "Initialise content library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted-foreground",
					children: "Writes the current website text and image URLs into the database so every block becomes editable here. Programs, gallery and testimonials are only seeded when still empty."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				loading: busy,
				onClick: () => void publish(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-4" }), " Publish defaults"]
			})]
		})
	});
}
function AdminContent() {
	const [active, setActive] = (0, import_react.useState)(TABS[0].id);
	const tab = TABS.find((t) => t.id === active) ?? TABS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Website content",
			sub: "Every heading, paragraph, button label and image on the public website — edit and save to update it live."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishCard, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setActive(t.id),
				className: `rounded-full px-4 py-2 text-xs font-medium transition-colors ${t.id === active ? "bg-brand text-primary-foreground" : "border border-border bg-background text-foreground/75 hover:bg-brand/10"}`,
				children: t.label
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocEditor, {
			spec: tab.spec,
			defaults: tab.defaults
		}, tab.id)
	] });
}
//#endregion
export { AdminContent as component };
