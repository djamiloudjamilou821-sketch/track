globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/auth-Dc8m1HS8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bcb-CMe9lNO82mssnc/Avaqfwvz83Nc\"",
		"mtime": "2026-07-02T03:52:56.374Z",
		"size": 3019,
		"path": "../public/assets/auth-Dc8m1HS8.js"
	},
	"/assets/button-0BoXcmCh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e0-DlOZ4fPOqgepTLNqYGZem0QvcnI\"",
		"mtime": "2026-07-02T03:52:56.374Z",
		"size": 4576,
		"path": "../public/assets/button-0BoXcmCh.js"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-07-02T03:52:56.384Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/createLucideIcon-BZbKAH3F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6-fi7Le3D18euZH1DjoDn+cQ06+KA\"",
		"mtime": "2026-07-02T03:52:56.384Z",
		"size": 1190,
		"path": "../public/assets/createLucideIcon-BZbKAH3F.js"
	},
	"/assets/budgets-cDvKwDnq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d29-+6pK1LDe2gx1cEnQcLkFLhP4+vU\"",
		"mtime": "2026-07-02T03:52:56.374Z",
		"size": 3369,
		"path": "../public/assets/budgets-cDvKwDnq.js"
	},
	"/assets/input-Cte_COnD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"268-JbaSUOybf0WL6YXRxNqNY0QWJo4\"",
		"mtime": "2026-07-02T03:52:56.384Z",
		"size": 616,
		"path": "../public/assets/input-Cte_COnD.js"
	},
	"/assets/dashboard-BdB9LV_p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62bab-PuwCLjOBqDK85S9xVLC+rSqmD8o\"",
		"mtime": "2026-07-02T03:52:56.384Z",
		"size": 404395,
		"path": "../public/assets/dashboard-BdB9LV_p.js"
	},
	"/assets/route-DpMsdGE2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32ee-feOs271E6T0Eou+0YTZlMSObcPI\"",
		"mtime": "2026-07-02T03:52:56.391Z",
		"size": 13038,
		"path": "../public/assets/route-DpMsdGE2.js"
	},
	"/assets/index-C5tpMX21.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59b31-n/uYtH4Kwk5cmQ7a215pgjCefiQ\"",
		"mtime": "2026-07-02T03:52:56.374Z",
		"size": 367409,
		"path": "../public/assets/index-C5tpMX21.js"
	},
	"/assets/settings-C_234-0f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc99-/Vde8uXl32CdCW6hI9qBbiBSwM8\"",
		"mtime": "2026-07-02T03:52:56.393Z",
		"size": 52377,
		"path": "../public/assets/settings-C_234-0f.js"
	},
	"/assets/transactions-CR-IMPyB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cea-e5jHlIQK2VkpmBo6f/L3spQXzHw\"",
		"mtime": "2026-07-02T03:52:56.395Z",
		"size": 3306,
		"path": "../public/assets/transactions-CR-IMPyB.js"
	},
	"/assets/styles-BLHZ-Lwk.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1263a-gBM+ERoy2+yCOx5hb0wRGGGmeng\"",
		"mtime": "2026-07-02T03:52:56.402Z",
		"size": 75322,
		"path": "../public/assets/styles-BLHZ-Lwk.css"
	},
	"/assets/useMutation-B_3GzZLV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c5-Zyis2sJn7fFVUpTH3PEIfxViGN0\"",
		"mtime": "2026-07-02T03:52:56.397Z",
		"size": 2245,
		"path": "../public/assets/useMutation-B_3GzZLV.js"
	},
	"/assets/label-D618zwMG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-xzt1RgYdgKyyfOHVFpbcDYMhMG8\"",
		"mtime": "2026-07-02T03:52:56.389Z",
		"size": 622,
		"path": "../public/assets/label-D618zwMG.js"
	},
	"/assets/money-BiWbYi5Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-sijsE1vn4b+cM8Vgb85aSIqrYZo\"",
		"mtime": "2026-07-02T03:52:56.389Z",
		"size": 415,
		"path": "../public/assets/money-BiWbYi5Q.js"
	},
	"/assets/utils-B9URw_CD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6936-IDn15ekKTsa+z3GJnrtfek/Td4M\"",
		"mtime": "2026-07-02T03:52:56.402Z",
		"size": 26934,
		"path": "../public/assets/utils-B9URw_CD.js"
	},
	"/assets/useQuery-mLZ-IYHR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2256-NYZUS/zc0fid10EoAVgveIMWOlk\"",
		"mtime": "2026-07-02T03:52:56.399Z",
		"size": 8790,
		"path": "../public/assets/useQuery-mLZ-IYHR.js"
	},
	"/assets/client-DLqkecsJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34e40-vsCepN9rX+jHp4u3TRVMRZdKUdk\"",
		"mtime": "2026-07-02T03:52:56.374Z",
		"size": 216640,
		"path": "../public/assets/client-DLqkecsJ.js"
	},
	"/assets/es2015-UDJ5apKm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6385-996HwgGl/VdT1FCtScetiihnSC4\"",
		"mtime": "2026-07-02T03:52:56.384Z",
		"size": 25477,
		"path": "../public/assets/es2015-UDJ5apKm.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_HZO0iJ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_HZO0iJ
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
