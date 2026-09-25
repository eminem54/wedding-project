const SUPABASE_URL = "https://avzuscttillaksqwrwqh.supabase.co";
// Publishable key is meant to ship to browsers; what it can do is limited by the
// RLS policies and grants in supabase/*.sql.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_OcyZmLjKgY1f1_Zwf4HeQA_BbaMAl-P";

type RequestOptions = {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
};

export async function supabaseRequest(path: string, { method = "GET", headers, body }: RequestOptions = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Supabase ${method} ${path} failed (${res.status}): ${await res.text()}`);
  }
  return res;
}
