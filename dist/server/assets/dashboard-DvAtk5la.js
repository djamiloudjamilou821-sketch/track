import { t as supabase } from "./client-D32iUAov.js";
import { n as monthKey, r as monthLabel, t as formatMoney } from "./money-Z5jeyd6e.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";
//#region src/routes/_authenticated/dashboard.tsx?tsr-split=component
function Dashboard() {
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("currency").maybeSingle();
			return data ?? { currency: "USD" };
		}
	});
	const currency = profile?.currency ?? "USD";
	const monthStart = monthKey();
	const sixMonthsAgo = /* @__PURE__ */ new Date();
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
	sixMonthsAgo.setDate(1);
	const { data: txs = [], isLoading } = useQuery({
		queryKey: ["dashboard", "tx"],
		queryFn: async () => {
			const { data, error } = await supabase.from("transactions").select("id,amount,note,occurred_on,category_id,categories(name,emoji,color)").gte("occurred_on", sixMonthsAgo.toISOString().slice(0, 10)).order("occurred_on", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const monthTx = txs.filter((t) => t.occurred_on >= monthStart);
	const monthTotal = monthTx.reduce((s, t) => s + Number(t.amount), 0);
	const byCat = /* @__PURE__ */ new Map();
	for (const t of monthTx) {
		const key = t.category_id ?? "none";
		const name = t.categories?.name ?? "Uncategorized";
		const color = t.categories?.color ?? "#64748b";
		const emoji = t.categories?.emoji ?? "💸";
		const cur = byCat.get(key) ?? {
			name,
			color,
			emoji,
			value: 0
		};
		cur.value += Number(t.amount);
		byCat.set(key, cur);
	}
	const donut = Array.from(byCat.values()).sort((a, b) => b.value - a.value);
	const months = [];
	for (let i = 5; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(1);
		d.setMonth(d.getMonth() - i);
		const key = monthKey(d);
		months.push({
			key,
			label: d.toLocaleDateString(void 0, { month: "short" }),
			total: 0
		});
	}
	for (const t of txs) {
		const k = t.occurred_on.slice(0, 7) + "-01";
		const m = months.find((x) => x.key === k);
		if (m) m.total += Number(t.amount);
	}
	const recent = txs.slice(0, 5);
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-md px-5 pt-8",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: monthLabel()
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Spent this month"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "tabular mt-1 text-5xl font-bold tracking-tight",
						children: formatMoney(monthTotal, currency)
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "rounded-3xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold",
						children: "By category"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs text-muted-foreground",
						children: [monthTx.length, " expenses"]
					})]
				}), donut.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: isLoading ? "Loading..." : "No expenses yet this month. Tap + to add one."
				}) : /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-36 w-36 shrink-0",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, {
							data: donut,
							dataKey: "value",
							innerRadius: 42,
							outerRadius: 64,
							paddingAngle: 2,
							stroke: "none",
							children: donut.map((d, i) => /* @__PURE__ */ jsx(Cell, { fill: d.color }, i))
						}) }) })
					}), /* @__PURE__ */ jsx("ul", {
						className: "flex-1 space-y-2",
						children: donut.slice(0, 5).map((d) => {
							const pct = monthTotal > 0 ? Math.round(d.value / monthTotal * 100) : 0;
							return /* @__PURE__ */ jsxs("li", {
								className: "flex items-center justify-between gap-2 text-sm",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1.5 truncate",
									children: [/* @__PURE__ */ jsx("span", {
										className: "h-2 w-2 shrink-0 rounded-full",
										style: { background: d.color }
									}), /* @__PURE__ */ jsx("span", {
										className: "truncate text-foreground",
										children: d.name
									})]
								}), /* @__PURE__ */ jsxs("span", {
									className: "tabular text-xs text-muted-foreground",
									children: [pct, "%"]
								})]
							}, d.name);
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-4 rounded-3xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "mb-3 text-sm font-semibold",
					children: "6-month trend"
				}), /* @__PURE__ */ jsx("div", {
					className: "h-32",
					children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(LineChart, {
						data: months,
						margin: {
							top: 4,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "label",
								tick: {
									fontSize: 11,
									fill: "var(--muted-foreground)"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, {
								cursor: { stroke: "var(--border)" },
								contentStyle: {
									background: "var(--popover)",
									border: "1px solid var(--border)",
									borderRadius: 12,
									fontSize: 12
								},
								formatter: (v) => formatMoney(v, currency),
								labelStyle: { color: "var(--muted-foreground)" }
							}),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "total",
								stroke: "var(--primary)",
								strokeWidth: 2.5,
								dot: {
									fill: "var(--primary)",
									r: 3
								}
							})
						]
					}) })
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex items-center justify-between px-1",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold",
						children: "Recent"
					}), /* @__PURE__ */ jsxs(Link, {
						to: "/transactions",
						className: "flex items-center gap-0.5 text-xs font-medium text-primary",
						children: ["See all ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3 w-3" })]
					})]
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-2",
					children: [recent.length === 0 && /* @__PURE__ */ jsx("li", {
						className: "rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground",
						children: "No transactions yet."
					}), recent.map((t) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-full text-lg",
								style: { background: (t.categories?.color ?? "#64748b") + "26" },
								children: t.categories?.emoji ?? "💸"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "truncate text-sm font-medium text-foreground",
									children: t.note || t.categories?.name || "Expense"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: new Date(t.occurred_on).toLocaleDateString(void 0, {
										month: "short",
										day: "numeric"
									})
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "tabular text-sm font-semibold text-foreground",
								children: ["−", formatMoney(Number(t.amount), currency)]
							})
						]
					}, t.id))]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
