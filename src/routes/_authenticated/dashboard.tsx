import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatMoney, monthKey, monthLabel } from "@/lib/money";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — SpendTrack" }] }),
});

type Tx = {
  id: string;
  amount: number;
  note: string | null;
  occurred_on: string;
  category_id: string | null;
  categories: { name: string; emoji: string; color: string } | null;
};

function Dashboard() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("currency").maybeSingle();
      return data ?? { currency: "USD" };
    },
  });
  const currency = profile?.currency ?? "USD";

  const monthStart = monthKey();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const { data: txs = [], isLoading } = useQuery({
    queryKey: ["dashboard", "tx"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("id,amount,note,occurred_on,category_id,categories(name,emoji,color)")
        .gte("occurred_on", sixMonthsAgo.toISOString().slice(0, 10))
        .order("occurred_on", { ascending: false });
      if (error) throw error;
      return (data as unknown as Tx[]) ?? [];
    },
  });

  const monthTx = txs.filter((t) => t.occurred_on >= monthStart);
  const monthTotal = monthTx.reduce((s, t) => s + Number(t.amount), 0);

  // By category for donut
  const byCat = new Map<string, { name: string; color: string; value: number; emoji: string }>();
  for (const t of monthTx) {
    const key = t.category_id ?? "none";
    const name = t.categories?.name ?? "Uncategorized";
    const color = t.categories?.color ?? "#64748b";
    const emoji = t.categories?.emoji ?? "💸";
    const cur = byCat.get(key) ?? { name, color, emoji, value: 0 };
    cur.value += Number(t.amount);
    byCat.set(key, cur);
  }
  const donut = Array.from(byCat.values()).sort((a, b) => b.value - a.value);

  // 6-month trend
  const months: { key: string; label: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const key = monthKey(d);
    months.push({ key, label: d.toLocaleDateString(undefined, { month: "short" }), total: 0 });
  }
  for (const t of txs) {
    const k = t.occurred_on.slice(0, 7) + "-01";
    const m = months.find((x) => x.key === k);
    if (m) m.total += Number(t.amount);
  }

  const recent = txs.slice(0, 5);

  return (
    <div className="mx-auto max-w-md px-5 pt-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{monthLabel()}</p>
        <p className="mt-1 text-sm text-muted-foreground">Spent this month</p>
        <h1 className="tabular mt-1 text-5xl font-bold tracking-tight">
          {formatMoney(monthTotal, currency)}
        </h1>
      </header>

      <section className="rounded-3xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">By category</h2>
          <span className="text-xs text-muted-foreground">{monthTx.length} expenses</span>
        </div>
        {donut.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {isLoading ? "Loading..." : "No expenses yet this month. Tap + to add one."}
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <div className="h-36 w-36 shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={donut} dataKey="value" innerRadius={42} outerRadius={64} paddingAngle={2} stroke="none">
                    {donut.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2">
              {donut.slice(0, 5).map((d) => {
                const pct = monthTotal > 0 ? Math.round((d.value / monthTotal) * 100) : 0;
                return (
                  <li key={d.name} className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} />
                      <span className="truncate text-foreground">{d.name}</span>
                    </span>
                    <span className="tabular text-xs text-muted-foreground">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <section className="mt-4 rounded-3xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-semibold">6-month trend</h2>
        <div className="h-32">
          <ResponsiveContainer>
            <LineChart data={months} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ stroke: "var(--border)" }}
                contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => formatMoney(v, currency)}
                labelStyle={{ color: "var(--muted-foreground)" }}
              />
              <Line type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={2.5} dot={{ fill: "var(--primary)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-4">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold">Recent</h2>
          <Link to="/transactions" className="flex items-center gap-0.5 text-xs font-medium text-primary">
            See all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <ul className="space-y-2">
          {recent.length === 0 && (
            <li className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">No transactions yet.</li>
          )}
          {recent.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: (t.categories?.color ?? "#64748b") + "26" }}>
                {t.categories?.emoji ?? "💸"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{t.note || t.categories?.name || "Expense"}</p>
                <p className="text-xs text-muted-foreground">{new Date(t.occurred_on).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</p>
              </div>
              <p className="tabular text-sm font-semibold text-foreground">−{formatMoney(Number(t.amount), currency)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
