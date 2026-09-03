import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

import { getFirebaseConfig } from "./firebase-config.functions";

type Fb = { app: FirebaseApp; auth: Auth; db: Firestore };

let fbPromise: Promise<Fb> | null = null;

/**
 * Lazily boots the Firebase client in the browser. The config (including the
 * web API key) is fetched once from the server and cached for the session.
 */
export function getFb(): Promise<Fb> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Firebase client is browser-only"));
  }
  if (!fbPromise) {
    fbPromise = (async () => {
      const config = await getFirebaseConfig();
      if (!config.apiKey) throw new Error("Firebase API key is not configured");
      const app = getApps()[0] ?? initializeApp(config);
      return { app, auth: getAuth(app), db: getFirestore(app) };
    })().catch((error) => {
      fbPromise = null;
      throw error;
    });
  }
  return fbPromise;
}

export async function getDb(): Promise<Firestore> {
  return (await getFb()).db;
}

export async function getFbAuth(): Promise<Auth> {
  return (await getFb()).auth;
}

export const ADMIN_EMAIL = "reclaimhormones@gmail.com";
