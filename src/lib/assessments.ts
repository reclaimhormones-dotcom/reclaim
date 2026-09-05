import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getDb } from "./firebase";
import {
  EMPTY_NUTRITION_LOG,
  phoneKey,
  type AssessmentDoc,
  type BasicDetails,
  type NutritionLog,
} from "./content-types";

/** Saves step 1 as a draft, keyed by phone number so it can be resumed. */
export async function saveBasicDetails(details: BasicDetails): Promise<string> {
  const key = phoneKey(details.phone);
  if (key.length < 10) throw new Error("Please enter a valid 10-digit phone number.");
  const db = await getDb();

  await setDoc(
    doc(db, "users", key),
    {
      name: details.name,
      email: details.email,
      phone: details.phone,
      age: details.age,
      address: details.address,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  const ref = doc(db, "assessments", key);
  const existing = await getDoc(ref);
  await setDoc(
    ref,
    {
      details,
      nutritionLog: existing.exists()
        ? ((existing.data() as AssessmentDoc).nutritionLog ?? EMPTY_NUTRITION_LOG)
        : EMPTY_NUTRITION_LOG,
      status: existing.exists()
        ? ((existing.data() as AssessmentDoc).status ?? "awaiting_payment")
        : "awaiting_payment",
      paymentStatus: existing.exists()
        ? ((existing.data() as AssessmentDoc).paymentStatus ?? "not_started")
        : "not_started",
      step: Math.max(2, existing.exists() ? ((existing.data() as AssessmentDoc).step ?? 2) : 2),
      createdAt: existing.exists() ? (existing.data() as AssessmentDoc).createdAt : Date.now(),
      updatedAt: Date.now(),
    },
    { merge: true },
  );

  return key;
}

export async function fetchAssessmentByPhone(phone: string): Promise<AssessmentDoc | null> {
  const key = phoneKey(phone);
  if (key.length < 10) throw new Error("Please enter a valid 10-digit phone number.");
  const db = await getDb();
  const snap = await getDoc(doc(db, "assessments", key));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<AssessmentDoc, "id">) };
}

/** Records a payment screenshot and moves the assessment to pending verification. */
export async function submitPaymentProof(
  key: string,
  screenshotUrl: string,
  amount: number,
  note: string,
): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, "assessments", key), {
    paymentScreenshot: screenshotUrl,
    paymentStatus: "pending_verification",
    paymentAmount: amount,
    paymentNote: note,
    status: "awaiting_payment",
    updatedAt: Date.now(),
  });
  await addDoc(collection(db, "payments"), {
    assessmentId: key,
    screenshot: screenshotUrl,
    amount,
    note,
    status: "pending_verification",
    createdAt: Date.now(),
  });
}

export async function saveNutritionLog(
  key: string,
  nutritionLog: NutritionLog,
  details: BasicDetails,
  submit: boolean,
): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, "assessments", key), {
    nutritionLog,
    details,
    ...(submit ? { status: "completed", step: 4 } : { step: 3 }),
    updatedAt: Date.now(),
  });
  if (submit) {
    await setDoc(
      doc(db, "users", key),
      {
        name: details.name,
        email: details.email,
        phone: details.phone,
        age: details.age,
        address: details.address,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
}

/* ------------------------------ admin actions ----------------------------- */

export async function reviewPayment(key: string, approve: boolean, reason = ""): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, "assessments", key), {
    paymentStatus: approve ? "approved" : "rejected",
    status: approve ? "payment_completed" : "awaiting_payment",
    paymentReviewNote: reason,
    updatedAt: Date.now(),
  });
}

export async function deleteAssessment(key: string): Promise<void> {
  const db = await getDb();
  await deleteDoc(doc(db, "assessments", key));
}
