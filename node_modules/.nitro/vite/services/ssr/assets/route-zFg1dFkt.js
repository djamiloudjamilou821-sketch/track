import { t as supabase } from "./client-D32iUAov.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Button } from "./button-PJVP9td7.js";
import { t as Label } from "./label-DBD1bRRP.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Home, ListOrdered, Plus, Settings, Target, X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
//#region src/components/ui/sheet.tsx
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(SheetPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ jsxs(SheetPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
//#endregion
//#region src/components/add-transaction-sheet.tsx
function AddTransactionSheet({ open, onOpenChange }) {
	const qc = useQueryClient();
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [categoryId, setCategoryId] = useState(null);
	const [date, setDate] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const { data: categories = [] } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("id,name,emoji,color").order("sort_order");
			if (error) throw error;
			return data;
		}
	});
	useEffect(() => {
		if (open && categories.length && !categoryId) setCategoryId(categories[0].id);
	}, [
		open,
		categories,
		categoryId
	]);
	const reset = () => {
		setAmount("");
		setNote("");
		setDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
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
				occurred_on: date
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
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ jsx(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(SheetContent, {
			side: "bottom",
			className: "rounded-t-3xl border-border bg-card pb-8",
			children: [/* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, {
				className: "text-foreground",
				children: "Add expense"
			}) }), /* @__PURE__ */ jsxs("form", {
				className: "mt-4 space-y-5",
				onSubmit: (e) => {
					e.preventDefault();
					mutation.mutate();
				},
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ jsx(Label, {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Amount"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-baseline gap-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-3xl text-muted-foreground",
								children: "$"
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								inputMode: "decimal",
								step: "0.01",
								min: "0",
								placeholder: "0.00",
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								autoFocus: true,
								className: "tabular w-44 border-0 bg-transparent text-center text-5xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/40"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						className: "mb-2 block text-xs uppercase tracking-wider text-muted-foreground",
						children: "Category"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-4 gap-2",
						children: categories.map((c) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setCategoryId(c.id),
							className: `flex flex-col items-center gap-1 rounded-2xl border p-2.5 transition ${categoryId === c.id ? "border-primary bg-primary/10" : "border-border bg-surface-elevated"}`,
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-2xl",
								children: c.emoji
							}), /* @__PURE__ */ jsx("span", {
								className: "truncate text-[10px] font-medium text-foreground",
								children: c.name
							})]
						}, c.id))
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "date",
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Date"
						}), /* @__PURE__ */ jsx(Input, {
							id: "date",
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							className: "mt-1"
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "note",
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Note"
						}), /* @__PURE__ */ jsx(Input, {
							id: "note",
							placeholder: "Optional",
							value: note,
							onChange: (e) => setNote(e.target.value),
							className: "mt-1",
							maxLength: 120
						})] })]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: mutation.isPending,
						className: "h-12 w-full rounded-xl text-base font-semibold",
						children: mutation.isPending ? "Saving..." : "Add expense"
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/bottom-nav.tsx
var items = [
	{
		to: "/dashboard",
		label: "Home",
		icon: Home
	},
	{
		to: "/transactions",
		label: "Activity",
		icon: ListOrdered
	},
	{
		to: "/budgets",
		label: "Budgets",
		icon: Target
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("nav", {
		className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/70",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-md items-end justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2",
			children: [
				items.slice(0, 2).map((it) => /* @__PURE__ */ jsx(NavLink, {
					...it,
					active: pathname === it.to
				}, it.to)),
				/* @__PURE__ */ jsx("button", {
					onClick: () => setOpen(true),
					"aria-label": "Add expense",
					className: "-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background transition active:scale-95",
					children: /* @__PURE__ */ jsx(Plus, {
						className: "h-6 w-6",
						strokeWidth: 2.5
					})
				}),
				items.slice(2).map((it) => /* @__PURE__ */ jsx(NavLink, {
					...it,
					active: pathname === it.to
				}, it.to))
			]
		})
	}), /* @__PURE__ */ jsx(AddTransactionSheet, {
		open,
		onOpenChange: setOpen
	})] });
}
function NavLink({ to, label, icon: Icon, active }) {
	return /* @__PURE__ */ jsxs(Link, {
		to,
		className: `flex flex-1 flex-col items-center gap-1 rounded-md py-1.5 text-[10px] font-medium transition ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
		children: [/* @__PURE__ */ jsx(Icon, {
			className: "h-5 w-5",
			strokeWidth: active ? 2.5 : 2
		}), label]
	});
}
//#endregion
//#region src/routes/_authenticated/route.tsx?tsr-split=component
function AuthedLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background pb-24",
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(BottomNav, {})]
	});
}
//#endregion
export { AuthedLayout as component };
