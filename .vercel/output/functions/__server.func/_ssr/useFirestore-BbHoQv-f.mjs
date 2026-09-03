import { s as __toESM } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { a as onSnapshot, d as doc, o as orderBy, s as query, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as getDb } from "./firebase-DSE5QkO6.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useFirestore-BbHoQv-f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Real-time collection subscription. Returns `loading: true` during SSR and
* until the first snapshot arrives, so callers can fall back to defaults.
*/
function useCollectionData(path, orderField = "order") {
	const [state, setState] = (0, import_react.useState)({
		data: [],
		loading: true,
		error: null
	});
	(0, import_react.useEffect)(() => {
		let unsub;
		let cancelled = false;
		(async () => {
			try {
				const db = await getDb();
				if (cancelled) return;
				const constraints = orderField ? [orderBy(orderField)] : [];
				unsub = onSnapshot(query(collection(db, path), ...constraints), (snap) => {
					setState({
						data: snap.docs.map((d) => ({
							id: d.id,
							...d.data()
						})),
						loading: false,
						error: null
					});
				}, (err) => setState({
					data: [],
					loading: false,
					error: err.message
				}));
			} catch (err) {
				if (!cancelled) setState({
					data: [],
					loading: false,
					error: err instanceof Error ? err.message : "Failed to load data"
				});
			}
		})();
		return () => {
			cancelled = true;
			unsub?.();
		};
	}, [path, orderField]);
	return state;
}
/** Real-time single-document subscription. */
function useDocData(path, id) {
	const [state, setState] = (0, import_react.useState)({
		data: null,
		loading: true,
		error: null
	});
	(0, import_react.useEffect)(() => {
		let unsub;
		let cancelled = false;
		(async () => {
			try {
				const db = await getDb();
				if (cancelled) return;
				unsub = onSnapshot(doc(db, path, id), (snap) => {
					setState({
						data: snap.exists() ? {
							id: snap.id,
							...snap.data()
						} : null,
						loading: false,
						error: null
					});
				}, (err) => setState({
					data: null,
					loading: false,
					error: err.message
				}));
			} catch (err) {
				if (!cancelled) setState({
					data: null,
					loading: false,
					error: err instanceof Error ? err.message : "Failed to load data"
				});
			}
		})();
		return () => {
			cancelled = true;
			unsub?.();
		};
	}, [path, id]);
	return state;
}
//#endregion
export { useDocData as n, useCollectionData as t };
