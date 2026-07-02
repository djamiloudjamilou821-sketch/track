import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-D32iUAov.js
function createSupabaseClient() {
	return createClient("https://oceavsrrbcsgzwiwvjgl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZWF2c3JyYmNzZ3p3aXd2amdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTMwMTYsImV4cCI6MjA5Mzk4OTAxNn0.4UWOnPEdvpnkjwU2hFOJh4dHnVc1jyALf7Y4xCaC36Y", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
