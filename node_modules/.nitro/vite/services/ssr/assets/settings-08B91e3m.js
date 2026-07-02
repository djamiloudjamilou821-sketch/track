import { t as supabase } from "./client-D32iUAov.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-PJVP9td7.js";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/routes/_authenticated/settings.tsx?tsr-split=component
var CURRENCIES = [
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
	"SGD"
];
function SettingsPage() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("currency").single();
			if (error) {
				console.error("Profile fetch error:", error);
				throw error;
			}
			return data;
		}
	});
	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { data } = await supabase.auth.getUser();
			return data.user;
		}
	});
	const updateCurrency = useMutation({
		mutationFn: async (currency) => {
			const { data: authData } = await supabase.auth.getUser();
			if (!authData.user) throw new Error("Not signed in");
			const { error } = await supabase.from("profiles").update({ currency }).eq("id", authData.user.id);
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
		}
	});
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-md px-5 pt-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "mb-5 text-2xl font-bold tracking-tight",
				children: "Settings"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "rounded-2xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Signed in as"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 truncate text-sm font-medium",
					children: user?.email
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-4 rounded-2xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Currency"
				}), /* @__PURE__ */ jsxs(Select, {
					value: profile?.currency ?? "USD",
					onValueChange: (value) => updateCurrency.mutate(value),
					children: [/* @__PURE__ */ jsx(SelectTrigger, {
						className: "mt-2",
						children: /* @__PURE__ */ jsx(SelectValue, {})
					}), /* @__PURE__ */ jsx(SelectContent, { children: CURRENCIES.map((currency) => /* @__PURE__ */ jsx(SelectItem, {
						value: currency,
						children: currency
					}, currency)) })]
				})]
			}),
			/* @__PURE__ */ jsxs(Button, {
				onClick: signOut,
				variant: "outline",
				className: "mt-6 h-11 w-full rounded-xl",
				children: [/* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }), "Sign out"]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
