//#region node_modules/.nitro/vite/services/ssr/assets/content-types-COMB5Vxh.js
/** URL-safe slug used by the program detail pages. */
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function programSlug(p) {
	return p.slug?.trim() ? p.slug.trim() : slugify(p.title || p.id);
}
var GALLERY_CATEGORIES = [
	"Clinic",
	"Consultations",
	"Events & Seminars",
	"Community"
];
/** True when a testimonial may appear on the public website. */
function isApproved(t) {
	return t.approved !== false;
}
/** Converts a YouTube/Vimeo/or direct URL into an embeddable player URL. */
function embedUrl(raw) {
	const url = (raw || "").trim();
	if (!url) return "";
	const yt = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/);
	if (yt && /youtu/.test(url)) return `https://www.youtube.com/embed/${yt[1]}`;
	const vimeo = url.match(/vimeo\.com\/(\d+)/);
	if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
	return url;
}
var DEFAULT_SETTINGS = {
	consultationPrice: 1500,
	upiId: "",
	qrImage: "",
	phone: "+91 86887 23142",
	whatsapp: "918688723142",
	email: "reclaimhormones@gmail.com",
	address: "Hyderabad, Telangana",
	hours: "Mon - Sat : 9AM - 7PM",
	instagram: "",
	facebook: "",
	youtube: "",
	linkedin: "",
	siteUrl: "https://reclaimhormones.com",
	metaTitle: "Reclaim Hormones — Hormone Health & Nutrition Care",
	metaDescription: "Personalized hormone health and nutrition programs for PCOS, thyroid, fertility and metabolic balance, guided by Dt. Kruthi Goud.",
	shareImage: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png",
	keywords: "hormone health, PCOS diet, thyroid nutrition, fertility nutrition, dietitian Hyderabad"
};
var EMPTY_BASIC_DETAILS = {
	name: "",
	gender: "",
	program: "",
	age: "",
	email: "",
	address: "",
	phone: "",
	healthGoal: "",
	medicalHistory: "",
	symptoms: "",
	lifestyle: "",
	previousPrograms: "",
	menstrualCycle: "",
	lookingToStart: ""
};
var MEAL_SLOTS = [
	"Breakfast",
	"Morning Snack",
	"Lunch",
	"Tea",
	"Dinner",
	"Bedtime Snack"
];
var EMPTY_NUTRITION_LOG = MEAL_SLOTS.reduce((acc, slot) => {
	acc[slot] = {
		time: "",
		food: "",
		portion: ""
	};
	return acc;
}, {});
/** Normalizes a phone number to digits so it can key a Firestore document. */
function phoneKey(phone) {
	const digits = phone.replace(/\D/g, "");
	return digits.length > 10 ? digits.slice(-10) : digits;
}
//#endregion
export { MEAL_SLOTS as a, phoneKey as c, GALLERY_CATEGORIES as i, programSlug as l, EMPTY_BASIC_DETAILS as n, embedUrl as o, EMPTY_NUTRITION_LOG as r, isApproved as s, DEFAULT_SETTINGS as t };
