import { c as setDoc, d as doc, l as updateDoc, n as deleteDoc, t as addDoc, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as getDb } from "./firebase-DSE5QkO6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-crud-HHokrQ4X.js
async function createItem(path, data) {
	const db = await getDb();
	return (await addDoc(collection(db, path), {
		...data,
		createdAt: Date.now()
	})).id;
}
async function updateItem(path, id, data) {
	const db = await getDb();
	await updateDoc(doc(db, path, id), {
		...data,
		updatedAt: Date.now()
	});
}
async function deleteItem(path, id) {
	const db = await getDb();
	await deleteDoc(doc(db, path, id));
}
/** Upsert for singleton documents such as `settings/site` or `pages/homepage`. */
async function saveDocument(path, id, data) {
	const db = await getDb();
	await setDoc(doc(db, path, id), {
		...data,
		updatedAt: Date.now()
	}, { merge: true });
}
/** Swaps the `order` field of two items to move one up or down. */
async function swapOrder(path, a, b) {
	const db = await getDb();
	await Promise.all([updateDoc(doc(db, path, a.id), { order: b.order }), updateDoc(doc(db, path, b.id), { order: a.order })]);
}
//#endregion
export { updateItem as a, swapOrder as i, deleteItem as n, saveDocument as r, createItem as t };
