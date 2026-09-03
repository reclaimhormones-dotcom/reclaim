import { c as setDoc, d as doc, l as updateDoc, n as deleteDoc, p as serverTimestamp, r as getDoc, t as addDoc, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as getDb } from "./firebase-DSE5QkO6.mjs";
import { c as phoneKey, r as EMPTY_NUTRITION_LOG } from "./content-types-COMB5Vxh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assessments-6qBgVo-s.js
/** Saves step 1 as a draft, keyed by phone number so it can be resumed. */
async function saveBasicDetails(details) {
	const key = phoneKey(details.phone);
	if (key.length < 10) throw new Error("Please enter a valid 10-digit phone number.");
	const db = await getDb();
	await setDoc(doc(db, "users", key), {
		name: details.name,
		email: details.email,
		phone: details.phone,
		age: details.age,
		address: details.address,
		updatedAt: serverTimestamp()
	}, { merge: true });
	const ref = doc(db, "assessments", key);
	const existing = await getDoc(ref);
	await setDoc(ref, {
		details,
		nutritionLog: existing.exists() ? existing.data().nutritionLog ?? EMPTY_NUTRITION_LOG : EMPTY_NUTRITION_LOG,
		status: existing.exists() ? existing.data().status ?? "awaiting_payment" : "awaiting_payment",
		paymentStatus: existing.exists() ? existing.data().paymentStatus ?? "not_started" : "not_started",
		step: Math.max(2, existing.exists() ? existing.data().step ?? 2 : 2),
		createdAt: existing.exists() ? existing.data().createdAt : Date.now(),
		updatedAt: Date.now()
	}, { merge: true });
	return key;
}
async function fetchAssessmentByPhone(phone) {
	const key = phoneKey(phone);
	if (key.length < 10) throw new Error("Please enter a valid 10-digit phone number.");
	const db = await getDb();
	const snap = await getDoc(doc(db, "assessments", key));
	if (!snap.exists()) return null;
	return {
		id: snap.id,
		...snap.data()
	};
}
/** Records a payment screenshot and moves the assessment to pending verification. */
async function submitPaymentProof(key, screenshotUrl, amount, note) {
	const db = await getDb();
	await updateDoc(doc(db, "assessments", key), {
		paymentScreenshot: screenshotUrl,
		paymentStatus: "pending_verification",
		paymentAmount: amount,
		paymentNote: note,
		status: "awaiting_payment",
		updatedAt: Date.now()
	});
	await addDoc(collection(db, "payments"), {
		assessmentId: key,
		screenshot: screenshotUrl,
		amount,
		note,
		status: "pending_verification",
		createdAt: Date.now()
	});
}
async function saveNutritionLog(key, nutritionLog, submit) {
	const db = await getDb();
	await updateDoc(doc(db, "assessments", key), {
		nutritionLog,
		...submit ? {
			status: "completed",
			step: 4
		} : { step: 3 },
		updatedAt: Date.now()
	});
}
async function reviewPayment(key, approve, reason = "") {
	const db = await getDb();
	await updateDoc(doc(db, "assessments", key), {
		paymentStatus: approve ? "approved" : "rejected",
		status: approve ? "payment_completed" : "awaiting_payment",
		paymentReviewNote: reason,
		updatedAt: Date.now()
	});
}
async function deleteAssessment(key) {
	const db = await getDb();
	await deleteDoc(doc(db, "assessments", key));
}
//#endregion
export { saveNutritionLog as a, saveBasicDetails as i, fetchAssessmentByPhone as n, submitPaymentProof as o, reviewPayment as r, deleteAssessment as t };
