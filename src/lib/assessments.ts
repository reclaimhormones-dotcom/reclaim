import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
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

/**
 * Human-readable reference the patient can quote to the clinic. Derived from
 * the submission time and the assessment key so it is stable per submission
 * and needs no extra round trip to allocate.
 */
export function paymentReference(key: string, submittedAt: number): string {
  const tail = key.slice(-4).padStart(4, "0");
  return `RH-${new Date(submittedAt).toISOString().slice(2, 10).replace(/-/g, "")}-${tail}`;
}

/**
 * Records a payment screenshot and moves the assessment to pending
 * verification. The patient stays locked on step 2 until an admin approves;
 * see `reviewPayment` for the other half of the workflow.
 */
export async function submitPaymentProof(
  key: string,
  screenshotUrl: string,
  amount: number,
  note: string,
): Promise<{ reference: string; submittedAt: number }> {
  const db = await getDb();
  const submittedAt = Date.now();
  const reference = paymentReference(key, submittedAt);

  await updateDoc(doc(db, "assessments", key), {
    paymentScreenshot: screenshotUrl,
    paymentStatus: "pending_verification",
    paymentAmount: amount,
    paymentNote: note,
    paymentReference: reference,
    paymentSubmittedAt: submittedAt,
    /* Step stays at 2: approval is what advances the patient, not upload. */
    step: 2,
    status: "awaiting_payment",
    updatedAt: submittedAt,
  });

  await addDoc(collection(db, "payments"), {
    assessmentId: key,
    screenshot: screenshotUrl,
    amount,
    note,
    reference,
    status: "pending_verification",
    createdAt: submittedAt,
  });

  return { reference, submittedAt };
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

/**
 * Approve or reject a submitted payment. Approving is the only thing that
 * unlocks step 3 — the patient's open page picks the change up live through
 * `watchAssessment`, so no refresh or re-entry is needed.
 */
export async function reviewPayment(key: string, approve: boolean, reason = ""): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, "assessments", key), {
    paymentStatus: approve ? "approved" : "rejected",
    status: approve ? "payment_completed" : "awaiting_payment",
    step: approve ? 3 : 2,
    paymentReviewNote: reason,
    paymentReviewedAt: Date.now(),
    updatedAt: Date.now(),
  });
}

/**
 * Live subscription to one assessment, so an admin approval unlocks step 3 on
 * the patient's screen the moment it happens. Returns an unsubscribe function.
 */
export function watchAssessment(
  key: string,
  onChange: (doc: AssessmentDoc | null) => void,
): () => void {
  let unsub: (() => void) | undefined;
  let cancelled = false;

  void (async () => {
    try {
      const db = await getDb();
      if (cancelled) return;
      unsub = onSnapshot(doc(db, "assessments", key), (snap) => {
        onChange(
          snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<AssessmentDoc, "id">) }) : null,
        );
      });
    } catch {
      /* Offline or blocked: the page keeps whatever it last fetched. */
    }
  })();

  return () => {
    cancelled = true;
    unsub?.();
  };
}

export async function deleteAssessment(key: string): Promise<void> {
  const db = await getDb();
  await deleteDoc(doc(db, "assessments", key));
}
