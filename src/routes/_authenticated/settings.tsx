import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — SpendTrack" }] }),
});

const CURRENCIES = [
  "CFA",
  "GHS",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "INR",
  "CHF",
  "CNY",
  "MXN",
  "BRL",
  "SGD",
];

function SettingsPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("currency")
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        throw error;
      }

      return data;
    },
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  const updateCurrency = useMutation({
    mutationFn: async (currency: string) => {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        throw new Error("Not signed in");
      }

      const { error } = await supabase
        .from("profiles")
        .update({ currency })
        .eq("id", authData.user.id);

      if (error) {
        console.error("Currency update error:", error);
        throw error;
      }
    },

    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Currency updated");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-md px-5 pt-8">
      <h1 className="mb-5 text-2xl font-bold tracking-tight">Settings</h1>

      <section className="rounded-2xl border border-border bg-card p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Signed in as
        </p>
        <p className="mt-1 truncate text-sm font-medium">
          {user?.email}
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-4">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">
          Currency
        </label>

        <Select
          value={profile?.currency ?? "USD"}
          onValueChange={(value) => updateCurrency.mutate(value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <Button
        onClick={signOut}
        variant="outline"
        className="mt-6 h-11 w-full rounded-xl"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}