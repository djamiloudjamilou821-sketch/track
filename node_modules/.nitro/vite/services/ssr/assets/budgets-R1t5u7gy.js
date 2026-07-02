import { t as supabase } from "./client-D32iUAov.js";
import { n as monthKey, r as monthLabel, t as formatMoney } from "./money-Z5jeyd6e.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
//#region src/routes/_authenticated/budgets.tsx?tsr-split=component
function BudgetsPage() {
	const qc = useQueryClient();
	const month = monthKey();
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => (await supabase.from("profiles").select("currency").maybeSingle()).data ?? { currency: "USD" }
	});
	const currency = profile?.currency ?? "USD";
	const { data: categories = [] } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("id,name,emoji,color").order("sort_order");
			if (error) throw error;
			return data;
		}
	});
	const { data: budgets = [] } = useQuery({
		queryKey: ["budgets", month],
		queryFn: async () => {
			const { data, error } = await supabase.from("budgets").select("id,category_id,amount_limit").eq("month", month);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: spent = {} } = useQuery({
		queryKey: ["budgets-spent", month],
		queryFn: async () => {
			const { data, error } = await supabase.from("transactions").select("category_id,amount").gte("occurred_on", month);
			if (error) throw error;
			const map = {};
			for (const r of data ?? []) {
				const k = r.category_id ?? "none";
				map[k] = (map[k] ?? 0) + Number(r.amount);
			}
			return map;
		}
	});
	const upsert = useMutation({
		mutationFn: async ({ category_id, amount }) => {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) throw new Error("Not signed in");
			if (amount <= 0) {
				await supabase.from("budgets").delete().eq("category_id", category_id).eq("month", month);
				return;
			}
			const { error } = await supabase.from("budgets").upsert({
				user_id: u.user.id,
				category_id,
				month,
				amount_limit: amount
			}, { onConflict: "user_id,category_id,month" });
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["budgets", month] }),
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-md px-5 pt-8",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "mb-5",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: monthLabel()
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-1 text-2xl font-bold tracking-tight",
					children: "Budgets"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Set a monthly limit per category."
				})
			]
		}), /* @__PURE__ */ jsx("ul", {
			className: "space-y-3",
			children: categories.map((c) => {
				const b = budgets.find((x) => x.category_id === c.id);
				const limit = b ? Number(b.amount_limit) : 0;
				const used = spent[c.id] ?? 0;
				const pct = limit > 0 ? Math.min(100, Math.round(used / limit * 100)) : 0;
				const over = limit > 0 && used > limit;
				return /* @__PURE__ */ jsxs("li", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-full text-lg",
								style: { background: c.color + "26" },
								children: c.emoji
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium",
									children: c.name
								}), /* @__PURE__ */ jsxs("p", {
									className: "tabular text-xs text-muted-foreground",
									children: [
										formatMoney(used, currency),
										" ",
										limit > 0 ? `of ${formatMoney(limit, currency)}` : "no limit"
									]
								})]
							}),
							/* @__PURE__ */ jsx(BudgetInput, {
								initial: limit,
								onSave: (v) => upsert.mutate({
									category_id: c.id,
									amount: v
								})
							})
						]
					}), limit > 0 && /* @__PURE__ */ jsx("div", {
						className: "mt-3 h-2 overflow-hidden rounded-full bg-secondary",
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full rounded-full transition-all",
							style: {
								width: `${pct}%`,
								background: over ? "var(--destructive)" : c.color
							}
						})
					})]
				}, c.id);
			})
		})]
	});
}
function BudgetInput({ initial, onSave }) {
	const [val, setVal] = useState(initial > 0 ? String(initial) : "");
	return /* @__PURE__ */ jsx(Input, {
		type: "number",
		inputMode: "decimal",
		step: "0.01",
		min: "0",
		placeholder: "0",
		value: val,
		onChange: (e) => setVal(e.target.value),
		onBlur: () => {
			const n = parseFloat(val) || 0;
			if (n !== initial) onSave(n);
		},
		className: "tabular h-9 w-24 text-right"
	});
}
//#endregion
export { BudgetsPage as component };
