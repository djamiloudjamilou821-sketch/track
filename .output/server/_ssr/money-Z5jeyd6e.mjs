//#region node_modules/.nitro/vite/services/ssr/assets/money-Z5jeyd6e.js
function formatMoney(amount, currency = "USD") {
	try {
		return new Intl.NumberFormat(void 0, {
			style: "currency",
			currency,
			maximumFractionDigits: 2
		}).format(amount);
	} catch {
		return `${currency} ${amount.toFixed(2)}`;
	}
}
function monthKey(d = /* @__PURE__ */ new Date()) {
	const date = typeof d === "string" ? new Date(d) : d;
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
}
function monthLabel(d = /* @__PURE__ */ new Date()) {
	return d.toLocaleDateString(void 0, {
		month: "long",
		year: "numeric"
	});
}
//#endregion
export { monthKey as n, monthLabel as r, formatMoney as t };
