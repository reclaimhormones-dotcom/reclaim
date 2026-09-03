import { useCallback, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";

import { ADMIN_EMAIL, getFbAuth } from "@/lib/firebase";

export type AdminAuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
};

function friendly(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/invalid-email":
      return "That email address looks invalid.";
    default:
      return "Sign in failed. Please try again.";
  }
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const auth = await getFbAuth();
        if (cancelled) return;
        unsub = onAuthStateChanged(auth, (user) => {
          setState({
            user,
            isAdmin: (user?.email ?? "").toLowerCase() === ADMIN_EMAIL,
            loading: false,
            error: null,
          });
        });
      } catch (err) {
        if (!cancelled) {
          setState({
            user: null,
            isAdmin: false,
            loading: false,
            error: err instanceof Error ? err.message : "Authentication unavailable",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = await getFbAuth();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      throw new Error(friendly(code));
    }
  }, []);

  const signOut = useCallback(async () => {
    const auth = await getFbAuth();
    await fbSignOut(auth);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const auth = await getFbAuth();
    await sendPasswordResetEmail(auth, email.trim());
  }, []);

  return { ...state, signIn, signOut, resetPassword };
}
