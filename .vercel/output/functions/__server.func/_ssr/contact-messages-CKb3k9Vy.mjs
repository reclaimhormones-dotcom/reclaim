import { d as doc, l as updateDoc, t as addDoc, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as getDb } from "./firebase-DSE5QkO6.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-messages-CKb3k9Vy.js
var enquirySchema = objectType({
	name: stringType().trim().min(2, "Please enter your name").max(80),
	phone: stringType().trim().min(8, "Please enter a valid phone number").max(20).regex(/^[+\d][\d\s-]*$/, "Phone can only contain digits, spaces, + and -"),
	email: stringType().trim().max(120).email("Please enter a valid email").or(literalType("")),
	gender: stringType().trim().max(20).optional(),
	program: stringType().trim().max(120).optional(),
	source: stringType().trim().max(60).optional(),
	concern: stringType().trim().max(80),
	mode: stringType().trim().max(60),
	message: stringType().trim().max(1500)
});
async function submitEnquiry(input) {
	const data = enquirySchema.parse(input);
	const db = await getDb();
	await addDoc(collection(db, "messages"), {
		...data,
		source: data.source ?? "Contact page",
		status: "new",
		handled: false,
		createdAt: Date.now()
	});
}
async function markMessageHandled(id, handled) {
	const db = await getDb();
	await updateDoc(doc(db, "messages", id), {
		handled,
		updatedAt: Date.now()
	});
}
//#endregion
export { submitEnquiry as n, markMessageHandled as t };
