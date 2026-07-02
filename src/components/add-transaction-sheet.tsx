import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Cat = { id: string; name: string; emoji: string; color: string };

export function AddTransactionSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const qc = useQueryClient();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name,emoji,color")
        .order("sort_order");
      if (error) throw error;
      return data as Cat[];
    },
  });

  useEffect(() => {
    if (open && categories.length && !categoryId) setCategoryId(categories[0].id);
  }, [open, categories, categoryId]);

  const reset = () => {
    setAmount("");
    setNote("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const num = parseFloat(amount);
      if (!num || num <= 0) throw new Error("Enter an amount");
      if (!categoryId) throw new Error("Pick a category");
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase.from("transactions").insert({
        user_id: u.user.id,
        category_id: categoryId,
        amount: num,
        note: note.trim() || null,
        occurred_on: date,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Expense added");
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["budgets"] });
      reset();
      onOpenChange(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl border-border bg-card pb-8">
        <SheetHeader>
          <SheetTitle className="text-foreground">Add expense</SheetTitle>
        </SheetHeader>
        <form
          className="mt-4 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Amount</Label>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl text-muted-foreground">$</span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
                className="tabular w-44 border-0 bg-transparent text-center text-5xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              Category
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl border p-2.5 transition ${
                    categoryId === c.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-surface-elevated"
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="truncate text-[10px] font-medium text-foreground">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date" className="text-xs uppercase tracking-wider text-muted-foreground">
                Date
              </Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="note" className="text-xs uppercase tracking-wider text-muted-foreground">
                Note
              </Label>
              <Input id="note" placeholder="Optional" value={note} onChange={(e) => setNote(e.target.value)} className="mt-1" maxLength={120} />
            </div>
          </div>

          <Button type="submit" disabled={mutation.isPending} className="h-12 w-full rounded-xl text-base font-semibold">
            {mutation.isPending ? "Saving..." : "Add expense"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
