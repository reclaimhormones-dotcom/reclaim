import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

import { getDb } from "./firebase";

export async function createItem<T extends object>(path: string, data: T): Promise<string> {
  const db = await getDb();
  const ref = await addDoc(collection(db, path), { ...data, createdAt: Date.now() });
  return ref.id;
}

export async function updateItem<T extends object>(
  path: string,
  id: string,
  data: T,
): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, path, id), { ...data, updatedAt: Date.now() });
}

export async function deleteItem(path: string, id: string): Promise<void> {
  const db = await getDb();
  await deleteDoc(doc(db, path, id));
}

/** Upsert for singleton documents such as `settings/site` or `pages/homepage`. */
export async function saveDocument<T extends object>(
  path: string,
  id: string,
  data: T,
): Promise<void> {
  const db = await getDb();
  await setDoc(doc(db, path, id), { ...data, updatedAt: Date.now() }, { merge: true });
}

/** Swaps the `order` field of two items to move one up or down. */
export async function swapOrder(
  path: string,
  a: { id: string; order: number },
  b: { id: string; order: number },
): Promise<void> {
  const db = await getDb();
  await Promise.all([
    updateDoc(doc(db, path, a.id), { order: b.order }),
    updateDoc(doc(db, path, b.id), { order: a.order }),
  ]);
}
