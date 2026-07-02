import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatMoney } from "@/lib/money";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/transactions")({
  component: TxPage,
  head: () => ({ meta: [{ title: "Transactions — SpendTrack" }] }),
});

type Tx = {
  id: string;
  amount: number;
  note: string | null;
  occurred_on: string;
  categories: { name: string; emoji: string; color: string } | null;
};

function TxPage() {
  const qc = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await supabase.from("profiles").select("currency").maybeSingle()).data ?? { currency: "USD" },
  });
  const currency = profile?.currency ?? "USD";

  const { data: txs = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("id,amount,note,occurred_on,categories(name,emoji,color)")
        .order("occurred_on", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data as unknown as Tx[]) ?? [];
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("transactions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  // Group by date
  const groups = new Map<string, Tx[]>();
  for (const t of txs) {
    const k = t.occurred_on;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(t);
  }

  return (
    <div className="mx-auto max-w-md px-5 pt-8">
      <h1 className="mb-5 text-2xl font-bold tracking-tight">Transactions</h1>
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {!isLoading && txs.length === 0 && (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">No transactions yet.</p>
      )}
      <div className="space-y-5">
        {Array.from(groups.entries()).map(([day, items]) => {
          const total = items.reduce((s, t) => s + Number(t.amount), 0);
          return (
            <div key={day}>
              <div className="mb-2 flex items-center justify-between px-1 text-xs">
                <span className="font-medium uppercase tracking-wider text-muted-foreground">
                  {new Date(day).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                </span>
                <span className="tabular text-muted-foreground">{formatMoney(total, currency)}</span>
              </div>
              <ul className="space-y-2">
                {items.map((t) => (
                  <li key={t.id} className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: (t.categories?.color ?? "#64748b") + "26" }}>
                      {t.categories?.emoji ?? "💸"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t.note || t.categories?.name || "Expense"}</p>
                      <p className="text-xs text-muted-foreground">{t.categories?.name ?? "Uncategorized"}</p>
                    </div>
                    <p className="tabular text-sm font-semibold">−{formatMoney(Number(t.amount), currency)}</p>
                    <button onClick={() => del.mutate(t.id)} aria-label="Delete" className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
