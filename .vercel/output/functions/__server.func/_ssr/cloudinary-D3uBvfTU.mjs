//#region node_modules/.nitro/vite/services/ssr/assets/cloudinary-D3uBvfTU.js
var CLOUDINARY_CLOUD_NAME = "pumhgsff";
var CLOUDINARY_UPLOAD_PRESET = "reclaim";
var ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
var MAX_BYTES = 10485760;
var ALLOWED = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/avif"
];
/**
* Unsigned upload straight from the browser to Cloudinary.
* Only the resulting secure URL is ever persisted in Firestore.
*/
async function uploadImage(file, folder = "reclaim") {
	if (!ALLOWED.includes(file.type)) throw new Error("Please choose a JPG, PNG, WEBP, GIF or AVIF image.");
	if (file.size > MAX_BYTES) throw new Error("Image is larger than 10MB. Please choose a smaller file.");
	const body = new FormData();
	body.append("file", file);
	body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
	body.append("folder", folder);
	const res = await fetch(ENDPOINT, {
		method: "POST",
		body
	});
	if (!res.ok) {
		let message = "Image upload failed. Please try again.";
		try {
			const payload = await res.json();
			if (payload.error?.message) message = payload.error.message;
		} catch {}
		throw new Error(message);
	}
	const data = await res.json();
	return {
		url: data.secure_url,
		publicId: data.public_id,
		width: data.width,
		height: data.height
	};
}
/** Adds Cloudinary transformations for responsive, optimized delivery. */
function cldOptimize(url, width = 1200) {
	if (!url.includes("/upload/")) return url;
	return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
//#endregion
export { uploadImage as n, cldOptimize as t };
