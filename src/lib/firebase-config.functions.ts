import { createServerFn } from "@tanstack/react-start";

export type FirebasePublicConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

/**
 * Firebase web config. The web API key is a publishable identifier (it is
 * visible in every Firebase web app), but it is kept in the secret store and
 * handed to the browser at runtime so it never lives in the repository.
 */
export const getFirebaseConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<FirebasePublicConfig> => {
    return {
      apiKey: process.env["GOOGLE_API_KEY"] ?? "",
      authDomain: "reclaim-2e2c7.firebaseapp.com",
      projectId: "reclaim-2e2c7",
      storageBucket: "reclaim-2e2c7.firebasestorage.app",
      messagingSenderId: "169876059717",
      appId: "1:169876059717:web:359e249bd57f48fdf2552c",
      measurementId: "G-BNFRCXH5KM",
    };
  },
);
