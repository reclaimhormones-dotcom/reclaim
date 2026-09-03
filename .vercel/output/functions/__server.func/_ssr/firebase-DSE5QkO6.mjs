import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DFOEdBfy.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { f as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { t as getAuth } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-DSE5QkO6.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Firebase web config. The web API key is a publishable identifier (it is
* visible in every Firebase web app), but it is kept in the secret store and
* handed to the browser at runtime so it never lives in the repository.
*/
var getFirebaseConfig = createServerFn({ method: "GET" }).handler(createSsrRpc("9cc6bf9eb674cf9080df7d4d3d3071d8080d8571164a79b90da7a6282380595e"));
var fbPromise = null;
/**
* Lazily boots the Firebase client in the browser. The config (including the
* web API key) is fetched once from the server and cached for the session.
*/
function getFb() {
	if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("Firebase client is browser-only"));
	if (!fbPromise) fbPromise = (async () => {
		const config = await getFirebaseConfig();
		if (!config.apiKey) throw new Error("Firebase API key is not configured");
		const app = getApps()[0] ?? initializeApp(config);
		return {
			app,
			auth: getAuth(app),
			db: getFirestore(app)
		};
	})().catch((error) => {
		fbPromise = null;
		throw error;
	});
	return fbPromise;
}
async function getDb() {
	return (await getFb()).db;
}
async function getFbAuth() {
	return (await getFb()).auth;
}
var ADMIN_EMAIL = "reclaimhormones@gmail.com";
//#endregion
export { getDb as n, getFbAuth as r, ADMIN_EMAIL as t };
