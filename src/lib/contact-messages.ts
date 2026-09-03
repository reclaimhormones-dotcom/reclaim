import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { z } from "zod";

import { getDb } from "./firebase";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(20)
    .regex(/^[+\d][\d\s-]*$/, "Phone can only contain digits, spaces, + and -"),
  email: z.string().trim().max(120).email("Please enter a valid email").or(z.literal("")),
  gender: z.string().trim().max(20).optional(),
  program: z.string().trim().max(120).optional(),
  source: z.string().trim().max(60).optional(),
  concern: z.string().trim().max(80),
  mode: z.string().trim().max(60),
  message: z.string().trim().max(1500),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export async function submitEnquiry(input: EnquiryInput): Promise<void> {
  const data = enquirySchema.parse(input);
  const db = await getDb();
  await addDoc(collection(db, "messages"), {
    ...data,
    source: data.source ?? "Contact page",
    status: "new",
    handled: false,
    createdAt: Date.now(),
  });
}

export async function markMessageHandled(id: string, handled: boolean): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, "messages", id), { handled, updatedAt: Date.now() });
}
