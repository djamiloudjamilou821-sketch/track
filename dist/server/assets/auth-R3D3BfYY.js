import { t as supabase } from "./client-D32iUAov.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Button } from "./button-PJVP9td7.js";
import { t as Label } from "./label-DBD1bRRP.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = useState("signin");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({
				to: "/dashboard",
				replace: true
			});
		});
	}, [navigate]);
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: window.location.origin }
				});
				if (error) throw error;
				toast.success("Account created");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			}
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-8 flex flex-col items-center gap-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30",
					children: /* @__PURE__ */ jsx(Wallet, {
						className: "h-7 w-7",
						strokeWidth: 2.5
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "SpendTrack"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Know where your money goes"
					})]
				})]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xl",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ jsx(Input, {
						id: "email",
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "mt-1.5 h-11",
						placeholder: "you@example.com",
						autoComplete: "email"
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "password",
						children: "Password"
					}), /* @__PURE__ */ jsx(Input, {
						id: "password",
						type: "password",
						required: true,
						minLength: 6,
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "mt-1.5 h-11",
						placeholder: "••••••••",
						autoComplete: mode === "signup" ? "new-password" : "current-password"
					})] }),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: loading,
						className: "h-11 w-full rounded-xl font-semibold",
						children: loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-center text-sm text-muted-foreground",
						children: [
							mode === "signin" ? "New here?" : "Already have an account?",
							" ",
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
								className: "font-medium text-primary hover:underline",
								children: mode === "signin" ? "Create account" : "Sign in"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
