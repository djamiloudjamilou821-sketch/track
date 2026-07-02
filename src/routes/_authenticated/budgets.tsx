import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatMoney, monthKey, monthLabel } from "@/lib/money";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/budgets")({
  component: BudgetsPage,
  head: () => ({ meta: [{ title: "Budgets — SpendTrack" }] }),
});

type Cat = { id: string; name: string; emoji: string; color: string };
type Budget = { id: string; category_id: string; amount_limit: number };

function BudgetsPage() {
  const qc = useQueryClient();
  const month = monthKey();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await supabase.from("profiles").select("currency").maybeSingle()).data ?? { currency: "USD" },
  });
  const currency = profile?.currency ?? "USD";

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("id,name,emoji,color").order("sort_order");
      if (error) throw error;
      return data as Cat[];
    },
  });

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets", month],
    queryFn: async () => {
      const { data, error } = await supabase.from("budgets").select("id,category_id,amount_limit").eq("month", month);
      if (error) throw error;
      return (data ?? []) as Budget[];
    },
  });

  const { data: spent = {} } = useQuery({
    queryKey: ["budgets-spent", month],
    queryFn: async () => {
      const { data, error } = await supabase.from("transactions").select("category_id,amount").gte("occurred_on", month);
      if (error) throw error;
      const map: Record<string, number> = {};
      for (const r of data ?? []) {
        const k = (r as { category_id: string | null }).category_id ?? "none";
        map[k] = (map[k] ?? 0) + Number((r as { amount: number }).amount);
      }
      return map;
    },
  });

  const upsert = useMutation({
    mutationFn: async ({ category_id, amount }: { category_id: string; amount: number }) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      if (amount <= 0) {
        await supabase.from("budgets").delete().eq("category_id", category_id).eq("month", month);
        return;
      }
      const { error } = await supabase
        .from("budgets")
        .upsert(
          { user_id: u.user.id, category_id, month, amount_limit: amount },
          { onConflict: "user_id,category_id,month" },
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["budgets", month] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-md px-5 pt-8">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{monthLabel()}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Budgets</h1>
        <p className="mt-1 text-sm text-muted-foreground">Set a monthly limit per category.</p>
      </header>
      <ul className="space-y-3">
        {categories.map((c) => {
          const b = budgets.find((x) => x.category_id === c.id);
          const limit = b ? Number(b.amount_limit) : 0;
          const used = spent[c.id] ?? 0;
          const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
          const over = limit > 0 && used > limit;
          return (
            <li key={c.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: c.color + "26" }}>
                  {c.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="tabular text-xs text-muted-foreground">
                    {formatMoney(used, currency)} {limit > 0 ? `of ${formatMoney(limit, currency)}` : "no limit"}
                  </p>
                </div>
                <BudgetInput initial={limit} onSave={(v) => upsert.mutate({ category_id: c.id, amount: v })} />
              </div>
              {limit > 0 && (
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: over ? "var(--destructive)" : c.color }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BudgetInput({ initial, onSave }: { initial: number; onSave: (v: number) => void }) {
  const [val, setVal] = useState(initial > 0 ? String(initial) : "");
  return (
    <Input
      type="number"
      inputMode="decimal"
      step="0.01"
      min="0"
      placeholder="0"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => {
        const n = parseFloat(val) || 0;
        if (n !== initial) onSave(n);
      }}
      className="tabular h-9 w-24 text-right"
    />
  );
}
