import { t as supabase } from "./client-D32iUAov.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as formatMoney } from "./money-Z5jeyd6e.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-g0Hpz_85.js
var import_jsx_runtime = require_jsx_runtime();
function TxPage() {
	const qc = useQueryClient();
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => (await supabase.from("profiles").select("currency").maybeSingle()).data ?? { currency: "USD" }
	});
	const currency = profile?.currency ?? "USD";
	const { data: txs = [], isLoading } = useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			const { data, error } = await supabase.from("transactions").select("id,amount,note,occurred_on,categories(name,emoji,color)").order("occurred_on", { ascending: false }).order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("transactions").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["transactions"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			qc.invalidateQueries({ queryKey: ["budgets"] });
		}
	});
	const groups = /* @__PURE__ */ new Map();
	for (const t of txs) {
		const k = t.occurred_on;
		if (!groups.has(k)) groups.set(k, []);
		groups.get(k).push(t);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-5 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-5 text-2xl font-bold tracking-tight",
				children: "Transactions"
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading..."
			}),
			!isLoading && txs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground",
				children: "No transactions yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: Array.from(groups.entries()).map(([day, items]) => {
					const total = items.reduce((s, t) => s + Number(t.amount), 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between px-1 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium uppercase tracking-wider text-muted-foreground",
							children: new Date(day).toLocaleDateString(void 0, {
								weekday: "short",
								month: "short",
								day: "numeric"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-muted-foreground",
							children: formatMoney(total, currency)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "group flex items-center gap-3 rounded-2xl border border-border bg-card p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-full text-lg",
									style: { background: (t.categories?.color ?? "#64748b") + "26" },
									children: t.categories?.emoji ?? "💸"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: t.note || t.categories?.name || "Expense"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: t.categories?.name ?? "Uncategorized"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular text-sm font-semibold",
									children: ["−", formatMoney(Number(t.amount), currency)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => del.mutate(t.id),
									"aria-label": "Delete",
									className: "rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						}, t.id))
					})] }, day);
				})
			})
		]
	});
}
//#endregion
export { TxPage as component };
