import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ListOrdered, Target, Settings, Plus } from "lucide-react";
import { useState } from "react";
import { AddTransactionSheet } from "./add-transaction-sheet";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/transactions", label: "Activity", icon: ListOrdered },
  { to: "/budgets", label: "Budgets", icon: Target },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="mx-auto flex max-w-md items-end justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
          {items.slice(0, 2).map((it) => (
            <NavLink key={it.to} {...it} active={pathname === it.to} />
          ))}
          <button
            onClick={() => setOpen(true)}
            aria-label="Add expense"
            className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background transition active:scale-95"
          >
            <Plus className="h-6 w-6" strokeWidth={2.5} />
          </button>
          {items.slice(2).map((it) => (
            <NavLink key={it.to} {...it} active={pathname === it.to} />
          ))}
        </div>
      </nav>
      <AddTransactionSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-1 flex-col items-center gap-1 rounded-md py-1.5 text-[10px] font-medium transition ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
      {label}
    </Link>
  );
}
