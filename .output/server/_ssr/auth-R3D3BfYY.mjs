import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-D32iUAov.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-PJVP9td7.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-R3D3BfYY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-col items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
						className: "h-7 w-7",
						strokeWidth: 2.5
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "SpendTrack"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Know where your money goes"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "mt-1.5 h-11",
						placeholder: "you@example.com",
						autoComplete: "email"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "password",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						className: "h-11 w-full rounded-xl font-semibold",
						children: loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-muted-foreground",
						children: [
							mode === "signin" ? "New here?" : "Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
