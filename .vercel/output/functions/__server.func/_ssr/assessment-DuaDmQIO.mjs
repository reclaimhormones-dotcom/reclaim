import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as MEAL_SLOTS, c as phoneKey, n as EMPTY_BASIC_DETAILS, r as EMPTY_NUTRITION_LOG } from "./content-types-COMB5Vxh.mjs";
import { E as QrCode, Et as ArrowLeft, R as LoaderCircle, Tt as ArrowRight, a as Utensils, at as CreditCard, dt as CircleCheck, l as Upload, lt as ClipboardList, x as Search, xt as BadgeCheck } from "../_libs/lucide-react.mjs";
import { f as useSettings, u as usePrograms } from "./useSiteContent-Dc7FEbQb.mjs";
import { i as WhatsAppButton, n as SiteHeader, t as SiteFooter } from "./SiteFooter-Dmyf0mKy.mjs";
import { n as uploadImage, t as cldOptimize } from "./cloudinary-D3uBvfTU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as saveNutritionLog, i as saveBasicDetails, n as fetchAssessmentByPhone, o as submitPaymentProof } from "./assessments-6qBgVo-s.mjs";
import { n as buildPaymentMessage, r as openWhatsApp } from "./whatsapp-Cg5MT_Ht.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assessment-DuaDmQIO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15";
var STEP_META = [
	{
		n: 1,
		label: "Your Details",
		icon: ClipboardList
	},
	{
		n: 2,
		label: "Consultation Payment",
		icon: CreditCard
	},
	{
		n: 3,
		label: "Nutrition Log",
		icon: Utensils
	}
];
function Stepper({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mx-auto flex max-w-2xl items-center gap-2",
		children: STEP_META.map((s, i) => {
			const done = step > s.n;
			const active = step === s.n;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors ${done ? "border-brand bg-brand text-primary-foreground" : active ? "border-brand bg-brand/10 text-brand" : "border-border bg-background text-muted-foreground"}`,
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `mt-2 text-[0.68rem] uppercase tracking-[0.12em] ${active || done ? "text-brand" : "text-muted-foreground"}`,
						children: s.label
					})]
				}), i < STEP_META.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-px flex-1 ${step > s.n ? "bg-brand" : "bg-border"}` })]
			}, s.n);
		})
	});
}
function BasicDetailsStep({ value, onChange, onNext }) {
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const { data: programs } = usePrograms();
	const audience = value.gender === "Male" ? "men" : "women";
	const options = programs.filter((p) => p.active !== false).filter((p) => value.gender ? p.category === audience : true);
	const isFemale = value.gender === "Female" || value.gender === "Other" || value.gender === "";
	function set(key, v) {
		onChange({
			...value,
			[key]: v
		});
	}
	function validate() {
		const e = {};
		if (value.name.trim().length < 2) e["name"] = "Please enter your full name.";
		const age = Number(value.age);
		if (!value.age || Number.isNaN(age) || age < 5 || age > 100) e["age"] = "Enter an age from 5–100.";
		if (!/^\S+@\S+\.\S+$/.test(value.email.trim())) e["email"] = "Enter a valid email address.";
		if (phoneKey(value.phone).length !== 10) e["phone"] = "Enter a valid 10-digit phone number.";
		if (value.address.trim().length < 4) e["address"] = "Please enter your address.";
		if (value.healthGoal.trim().length < 3) e["healthGoal"] = "Tell us your main health goal.";
		if (!value.gender) e["gender"] = "Please select your gender.";
		if (!value.lookingToStart) e["lookingToStart"] = "Please choose when you want to start.";
		setErrors(e);
		return Object.keys(e).length === 0;
	}
	async function submit() {
		if (!validate()) {
			toast.error("Please fix the highlighted fields.");
			return;
		}
		setSaving(true);
		try {
			await saveBasicDetails(value);
			toast.success("Details saved. You can resume anytime with your phone number.");
			onNext();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save your details.");
		} finally {
			setSaving(false);
		}
	}
	const err = (k) => errors[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-destructive",
		children: errors[k]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: "Full Name *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: value.name,
							maxLength: 80,
							onChange: (e) => set("name", e.target.value),
							placeholder: "Your name"
						}),
						err("name")
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: "Age *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: value.age,
							inputMode: "numeric",
							maxLength: 3,
							onChange: (e) => set("age", e.target.value.replace(/\D/g, "")),
							placeholder: "28"
						}),
						err("age")
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: "Email *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: value.email,
							maxLength: 120,
							onChange: (e) => set("email", e.target.value),
							placeholder: "you@email.com"
						}),
						err("email")
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: "Phone Number *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: value.phone,
							maxLength: 15,
							onChange: (e) => set("phone", e.target.value),
							placeholder: "+91 98765 43210"
						}),
						err("phone")
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Gender *"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: field,
						value: value.gender,
						onChange: (e) => {
							const gender = e.target.value;
							onChange({
								...value,
								gender,
								program: "",
								...gender === "Male" ? { menstrualCycle: "NA" } : {}
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Female",
								children: "Female"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Male",
								children: "Male"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Other",
								children: "Prefer not to say"
							})
						]
					}),
					err("gender")
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: "Program you are interested in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: field,
					value: value.program,
					onChange: (e) => set("program", e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: value.gender ? "Recommended for you" : "Select your gender first"
						}),
						options.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.title,
							children: p.title
						}, p.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Not sure yet",
							children: "Not sure yet — please guide me"
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: "Address *"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: field,
					value: value.address,
					maxLength: 200,
					onChange: (e) => set("address", e.target.value),
					placeholder: "City, State"
				}),
				err("address")
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: "Main Health Goal *"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${field} min-h-20`,
					value: value.healthGoal,
					maxLength: 600,
					onChange: (e) => set("healthGoal", e.target.value),
					placeholder: "e.g. Regulate my cycles and manage PCOS naturally"
				}),
				err("healthGoal")
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Past Medical History"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${field} min-h-20`,
						value: value.medicalHistory,
						maxLength: 800,
						onChange: (e) => set("medicalHistory", e.target.value),
						placeholder: "Diagnoses, surgeries, medication, reports"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Daily Symptoms"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${field} min-h-20`,
						value: value.symptoms,
						maxLength: 800,
						onChange: (e) => set("symptoms", e.target.value),
						placeholder: "Fatigue, bloating, hair loss, cravings…"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Lifestyle / Daily Routine"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${field} min-h-20`,
						value: value.lifestyle,
						maxLength: 800,
						onChange: (e) => set("lifestyle", e.target.value),
						placeholder: "Work hours, sleep, activity, stress levels"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Previous Nutrition Programs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${field} min-h-20`,
						value: value.previousPrograms,
						maxLength: 600,
						onChange: (e) => set("previousPrograms", e.target.value),
						placeholder: "Diets or programs you have tried before"
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [isFemale ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
					children: "Menstrual Cycle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: field,
					value: value.menstrualCycle,
					onChange: (e) => set("menstrualCycle", e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Regular",
							children: "Regular"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Irregular",
							children: "Irregular"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "NA",
							children: "Not applicable"
						})
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Energy, Sleep & Stress Pattern"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: field,
						value: value.menstrualCycle === "NA" ? "NA" : value.menstrualCycle,
						onChange: (e) => set("menstrualCycle", e.target.value),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "NA",
							children: "Not applicable"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Share your energy, sleep and stress details in the lifestyle field above."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
						children: "Looking To Start *"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: field,
						value: value.lookingToStart,
						onChange: (e) => set("lookingToStart", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Immediately",
								children: "Immediately"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Within a week",
								children: "Within a week"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Within a month",
								children: "Within a month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Just exploring",
								children: "Just exploring"
							})
						]
					}),
					err("lookingToStart")
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void submit(),
				disabled: saving,
				className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60 sm:w-auto",
				children: [
					saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null,
					"Save & Continue to Payment",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
				]
			})
		]
	});
}
function PaymentStep({ assessmentKey, assessment, details, onNext, onBack, onRefresh }) {
	const { settings } = useSettings();
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const price = settings.consultationPrice;
	const status = assessment?.paymentStatus ?? "not_started";
	const upiUrl = settings.upiId ? `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent("Reclaim Hormones")}&am=${price}&cu=INR&tn=${encodeURIComponent("Consultation")}` : "";
	async function handleFile(file) {
		if (!file) return;
		setUploading(true);
		try {
			const { url } = await uploadImage(file, "reclaim/payments");
			await submitPaymentProof(assessmentKey, url, price, note);
			toast.success("Screenshot uploaded. Your payment is pending verification.");
			openWhatsApp(settings.whatsapp, buildPaymentMessage({
				name: details.name,
				phone: details.phone,
				program: details.program || "Health assessment",
				amount: price,
				screenshotUrl: url
			}));
			onRefresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/70 bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted-foreground",
							children: "Consultation Fee"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-serif text-4xl text-brand-deep",
							children: ["₹", price.toLocaleString("en-IN")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Includes your detailed 1:1 consultation with Dt. Kruthi Goud and your personalized nutrition plan."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-3 text-sm",
							children: [settings.upiId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-muted/40 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
									children: "UPI ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-medium text-brand-deep",
									children: settings.upiId
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl bg-muted/40 px-4 py-3 text-muted-foreground",
								children: "Payment details are being updated. Please reach us on WhatsApp to complete your payment."
							}), upiUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: upiUrl,
								className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }),
									"Pay ₹",
									price.toLocaleString("en-IN"),
									" via UPI"
								]
							}) : null]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/70 bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4" }), " Scan to pay"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-4",
						children: settings.qrImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cldOptimize(settings.qrImage, 500),
							alt: "UPI QR code for consultation payment",
							className: "max-h-64 w-auto rounded-xl"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: "QR code will appear here once added by the clinic."
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/70 bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-xl text-brand-deep",
						children: "Upload payment screenshot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "After paying, upload the screenshot so our team can verify it."
					}),
					status === "pending_verification" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-brand-deep",
						children: [
							"Status: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pending Verification" }),
							" — our team is reviewing your payment."
						]
					}) : null,
					status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand-deep",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" }),
							" Status: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Payment Completed" })
						]
					}) : null,
					status === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive",
						children: "Your payment could not be verified. Please upload a clearer screenshot or contact us."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: "Transaction reference (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: note,
							maxLength: 80,
							onChange: (e) => setNote(e.target.value),
							placeholder: "UPI reference / UTR number"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => void handleFile(e.target.files?.[0])
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => inputRef.current?.click(),
							disabled: uploading,
							className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60",
							children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), assessment?.paymentScreenshot ? "Replace screenshot" : "Upload screenshot"]
						})] })]
					}),
					assessment?.paymentScreenshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cldOptimize(assessment.paymentScreenshot, 400),
						alt: "Uploaded payment screenshot",
						className: "mt-4 max-h-48 w-auto rounded-xl border border-border",
						loading: "lazy"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onBack,
					className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onNext,
					className: "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep",
					children: ["Continue to Nutrition Log ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "You can continue filling your nutrition log while your payment is being verified."
			})
		]
	});
}
function NutritionStep({ assessmentKey, value, onChange, onBack, onDone }) {
	const [saving, setSaving] = (0, import_react.useState)(null);
	function set(slot, key, v) {
		onChange({
			...value,
			[slot]: {
				...value[slot] ?? {
					time: "",
					food: "",
					portion: ""
				},
				[key]: v
			}
		});
	}
	async function persist(submit) {
		if (submit) {
			if (MEAL_SLOTS.filter((s) => (value[s]?.food ?? "").trim().length > 0).length < 3) {
				toast.error("Please fill at least breakfast, lunch and dinner before submitting.");
				return;
			}
		}
		setSaving(submit ? "submit" : "draft");
		try {
			await saveNutritionLog(assessmentKey, value, submit);
			toast.success(submit ? "Assessment submitted. Thank you!" : "Nutrition log saved.");
			if (submit) onDone();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save your nutrition log.");
		} finally {
			setSaving(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Share a typical day of eating — timings, foods and rough portions. This helps us build a plan around your real routine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: MEAL_SLOTS.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/70 bg-card p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-lg text-brand-deep",
						children: slot
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.6fr)_minmax(0,0.9fr)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								type: "time",
								value: value[slot]?.time ?? "",
								onChange: (e) => set(slot, "time", e.target.value),
								"aria-label": `${slot} time`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: value[slot]?.food ?? "",
								maxLength: 200,
								onChange: (e) => set(slot, "food", e.target.value),
								placeholder: "What do you usually eat?",
								"aria-label": `${slot} food`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: value[slot]?.portion ?? "",
								maxLength: 80,
								onChange: (e) => set(slot, "portion", e.target.value),
								placeholder: "Portion (e.g. 2 idli)",
								"aria-label": `${slot} portion`
							})
						]
					})]
				}, slot))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onBack,
						className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void persist(false),
						disabled: saving !== null,
						className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60",
						children: [saving === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Save draft"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void persist(true),
						disabled: saving !== null,
						className: "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60",
						children: [saving === "submit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Submit Assessment"]
					})
				]
			})
		]
	});
}
function AssessmentPage() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [details, setDetails] = (0, import_react.useState)(EMPTY_BASIC_DETAILS);
	const [log, setLog] = (0, import_react.useState)(EMPTY_NUTRITION_LOG);
	const [assessment, setAssessment] = (0, import_react.useState)(null);
	const [resumePhone, setResumePhone] = (0, import_react.useState)("");
	const [resuming, setResuming] = (0, import_react.useState)(false);
	const [completed, setCompleted] = (0, import_react.useState)(false);
	const key = assessment?.id ?? phoneKey(details.phone);
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [step, completed]);
	async function refresh() {
		if (!key) return;
		try {
			const fresh = await fetchAssessmentByPhone(key);
			if (fresh) setAssessment(fresh);
		} catch {}
	}
	async function handleResume() {
		setResuming(true);
		try {
			const found = await fetchAssessmentByPhone(resumePhone);
			if (!found) {
				toast.error("No assessment found for that phone number.");
				return;
			}
			setAssessment(found);
			setDetails({
				...EMPTY_BASIC_DETAILS,
				...found.details
			});
			setLog({
				...EMPTY_NUTRITION_LOG,
				...found.nutritionLog ?? {}
			});
			if (found.status === "completed") setCompleted(true);
			else setStep(Math.min(3, Math.max(1, found.step ?? 1)));
			toast.success("Welcome back! We picked up where you left off.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not resume your assessment.");
		} finally {
			setResuming(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-5xl px-4 pb-20 pt-24 lg:px-8 lg:pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary",
							children: "Health Assessment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-serif text-3xl text-brand-deep lg:text-5xl",
							children: "Start Your Healing Journey"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground",
							children: "Three simple steps — your health story, your consultation, and your food diary. Everything is saved as you go."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto mt-6 max-w-2xl rounded-2xl border border-border bg-sage-soft/50 px-5 py-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-brand-deep",
								children: "Paid assessment — different from a free consultation enquiry"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
								children: [
									"This is our detailed, paid health assessment: your full history, a booked consultation slot and a reviewed food diary. If you only want to talk to us first, use the free",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										className: "font-medium text-brand underline",
										children: "consultation enquiry form"
									}),
									" ",
									"instead — no payment needed."
								]
							})]
						})
					]
				}), completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-10 max-w-xl rounded-3xl border border-brand/25 bg-brand/5 px-6 py-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-12 text-brand" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-serif text-2xl text-brand-deep",
							children: "Assessment Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Thank you, ",
								details.name || "friend",
								". Our team will review everything and reach out to schedule your consultation."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs uppercase tracking-[0.12em] text-brand",
							children: [
								"Payment status:",
								" ",
								assessment?.paymentStatus === "approved" ? "Completed" : "Pending verification"
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { step })
					}),
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-8 max-w-xl rounded-2xl border border-border/70 bg-muted/30 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), " Already started?"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: resumePhone,
								maxLength: 15,
								onChange: (e) => setResumePhone(e.target.value),
								placeholder: "Enter your phone number",
								"aria-label": "Phone number to resume assessment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void handleResume(),
								disabled: resuming,
								className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-brand/40 bg-background px-5 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand/10 disabled:opacity-60",
								children: [resuming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Resume"]
							})]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicDetailsStep, {
								value: details,
								onChange: setDetails,
								onNext: () => {
									refresh();
									setStep(2);
								}
							}) : null,
							step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentStep, {
								assessmentKey: key,
								assessment,
								details,
								onBack: () => setStep(1),
								onNext: () => setStep(3),
								onRefresh: () => void refresh()
							}) : null,
							step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutritionStep, {
								assessmentKey: key,
								value: log,
								onChange: setLog,
								onBack: () => setStep(2),
								onDone: () => setCompleted(true)
							}) : null
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AssessmentPage as component };
