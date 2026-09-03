import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-config.functions-Dqsa0L3y.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getFirebaseConfig_createServerFn_handler = createServerRpc({
	id: "9cc6bf9eb674cf9080df7d4d3d3071d8080d8571164a79b90da7a6282380595e",
	name: "getFirebaseConfig",
	filename: "src/lib/firebase-config.functions.ts"
}, (opts) => getFirebaseConfig.__executeServer(opts));
var getFirebaseConfig = createServerFn({ method: "GET" }).handler(getFirebaseConfig_createServerFn_handler, async () => {
	return {
		apiKey: process.env["GOOGLE_API_KEY"] ?? "",
		authDomain: "reclaim-2e2c7.firebaseapp.com",
		projectId: "reclaim-2e2c7",
		storageBucket: "reclaim-2e2c7.firebasestorage.app",
		messagingSenderId: "169876059717",
		appId: "1:169876059717:web:359e249bd57f48fdf2552c",
		measurementId: "G-BNFRCXH5KM"
	};
});
//#endregion
export { getFirebaseConfig_createServerFn_handler };
