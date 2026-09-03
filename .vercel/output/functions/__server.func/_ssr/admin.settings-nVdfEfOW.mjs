import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as DEFAULT_SETTINGS } from "./content-types-COMB5Vxh.mjs";
import { f as useSettings } from "./useSiteContent-Dc7FEbQb.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Field, d as Spinner, n as Card, p as inputClass, s as ImageUploadField, t as Button, u as SectionTitle } from "./AdminUI-DcDvqkFm.mjs";
import { r as saveDocument } from "./admin-crud-HHokrQ4X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-nVdfEfOW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettings() {
	const { settings, loading } = useSettings();
	const [form, setForm] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && !ready) {
			setForm(settings);
			setReady(true);
		}
	}, [
		loading,
		ready,
		settings
	]);
	function set(key, value) {
		setForm((f) => ({
			...f,
			[key]: value
		}));
	}
	async function save() {
		if (form.consultationPrice <= 0) {
			toast.error("Consultation price must be greater than zero.");
			return;
		}
		setSaving(true);
		try {
			await saveDocument("settings", "site", form);
			toast.success("Settings saved");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save settings");
		} finally {
			setSaving(false);
		}
	}
	if (loading && !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Settings",
			sub: "Payment details, clinic contact information and social links used across the site."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 xl:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-xl text-brand-deep",
					children: "Payment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Consultation price (₹)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								inputMode: "numeric",
								value: String(form.consultationPrice),
								onChange: (e) => set("consultationPrice", Number(e.target.value) || 0)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "UPI ID",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: form.upiId,
								placeholder: "name@bank",
								onChange: (e) => set("upiId", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadField, {
							label: "Payment QR code",
							value: form.qrImage,
							folder: "reclaim/settings",
							onChange: (url) => set("qrImage", url)
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-xl text-brand-deep",
					children: "Clinic contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: form.phone,
								onChange: (e) => set("phone", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "WhatsApp number (digits with country code)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								inputMode: "numeric",
								value: form.whatsapp,
								placeholder: "918688723142",
								onChange: (e) => set("whatsapp", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "email",
								value: form.email,
								onChange: (e) => set("email", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: form.address,
								onChange: (e) => set("address", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Working hours",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: form.hours,
								onChange: (e) => set("hours", e.target.value)
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "xl:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-xl text-brand-deep",
						children: "Social links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Instagram URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									value: form.instagram,
									onChange: (e) => set("instagram", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Facebook URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									value: form.facebook,
									onChange: (e) => set("facebook", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "YouTube URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									value: form.youtube,
									onChange: (e) => set("youtube", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "LinkedIn URL",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									value: form.linkedin ?? "",
									onChange: (e) => set("linkedin", e.target.value)
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "SEO & sharing",
					sub: "Used for Google results and link previews on WhatsApp, Facebook and X."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Website address (https://…)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: form.siteUrl ?? "",
								onChange: (e) => set("siteUrl", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Search title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								maxLength: 70,
								value: form.metaTitle ?? "",
								onChange: (e) => set("metaTitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Search description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${inputClass} min-h-24`,
								maxLength: 170,
								value: form.metaDescription ?? "",
								onChange: (e) => set("metaDescription", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Keywords (comma separated)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								value: form.keywords ?? "",
								onChange: (e) => set("keywords", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadField, {
							label: "Share preview image",
							value: form.shareImage ?? "",
							folder: "reclaim/site",
							onChange: (url) => set("shareImage", url)
						})
					]
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				loading: saving,
				onClick: () => void save(),
				children: "Save settings"
			})
		})
	] });
}
//#endregion
export { AdminSettings as component };
