//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-Cg5MT_Ht.js
function line(label, value) {
	const v = (value ?? "").trim();
	return v ? `*${label}:* ${v}` : null;
}
function buildLeadMessage(lead) {
	return [
		"Hello *Reclaim Hormones*,",
		"",
		"I have submitted an enquiry on your website and would like to book a consultation.",
		"",
		...[
			line("Name", lead.name),
			line("Gender", lead.gender),
			line("Phone", lead.phone),
			line("Email", lead.email),
			line("Program", lead.program),
			line("Main concern", lead.concern),
			line("Preferred mode", lead.mode),
			line("Message", lead.message)
		].filter(Boolean),
		"",
		`*Source:* Website — ${lead.source}`,
		"",
		"Please guide me on the next steps. Thank you."
	].join("\n");
}
function buildPaymentMessage(input) {
	return [
		"Hello *Reclaim Hormones*,",
		"",
		"I have completed the payment for my assessment.",
		"",
		`*Name:* ${input.name}`,
		`*Phone:* ${input.phone}`,
		`*Program:* ${input.program}`,
		`*Amount paid:* ₹${input.amount.toLocaleString("en-IN")}`,
		...input.screenshotUrl ? [`*Payment screenshot:* ${input.screenshotUrl}`] : [],
		"",
		"*Source:* Website — Assessment payment",
		"",
		"Kindly verify my payment so I can continue with the health assessment."
	].join("\n");
}
/** Builds a wa.me link for a raw phone value (spaces/dashes tolerated). */
function waLink(phone, message) {
	return `https://wa.me/${(phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
/** Opens WhatsApp in a new tab; safe to call from a submit handler. */
function openWhatsApp(phone, message) {
	if (!phone) return;
	if (typeof window === "undefined") return;
	window.open(waLink(phone, message), "_blank", "noopener,noreferrer");
}
//#endregion
export { waLink as i, buildPaymentMessage as n, openWhatsApp as r, buildLeadMessage as t };
