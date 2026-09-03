import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";

import { getDb } from "@/lib/firebase";

export type CollectionState<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
};

/**
 * Real-time collection subscription. Returns `loading: true` during SSR and
 * until the first snapshot arrives, so callers can fall back to defaults.
 */
export function useCollectionData<T extends { id: string }>(
  path: string,
  orderField: string | null = "order",
): CollectionState<T> {
  const [state, setState] = useState<CollectionState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const db = await getDb();
        if (cancelled) return;
        const constraints: QueryConstraint[] = orderField ? [orderBy(orderField)] : [];
        unsub = onSnapshot(
          query(collection(db, path), ...constraints),
          (snap) => {
            setState({
              data: snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as T[],
              loading: false,
              error: null,
            });
          },
          (err) => setState({ data: [], loading: false, error: err.message }),
        );
      } catch (err) {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : "Failed to load data",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [path, orderField]);

  return state;
}

export type DocState<T> = { data: T | null; loading: boolean; error: string | null };

/** Real-time single-document subscription. */
export function useDocData<T>(path: string, id: string): DocState<T> {
  const [state, setState] = useState<DocState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const db = await getDb();
        if (cancelled) return;
        unsub = onSnapshot(
          doc(db, path, id),
          (snap) => {
            setState({
              data: snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null,
              loading: false,
              error: null,
            });
          },
          (err) => setState({ data: null, loading: false, error: err.message }),
        );
      } catch (err) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : "Failed to load data",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [path, id]);

  return state;
}
