import { supabaseRequest } from "@/lib/supabase";

export const GUESTBOOK_PAGE_SIZE = 3;
export const GUESTBOOK_NAME_MAX = 20;
export const GUESTBOOK_MESSAGE_MAX = 200;
export const GUESTBOOK_PASSWORD_MIN = 4;
export const GUESTBOOK_PASSWORD_MAX = 20;

export type GuestbookEntry = {
  id: number;
  created_at: string;
  name: string;
  message: string;
};

export async function fetchGuestbookPage(page: number) {
  const offset = (page - 1) * GUESTBOOK_PAGE_SIZE;
  // Columns must be listed explicitly: guests aren't granted SELECT on password_hash.
  const res = await supabaseRequest(
    `guestbook?select=id,created_at,name,message&order=created_at.desc,id.desc&offset=${offset}&limit=${GUESTBOOK_PAGE_SIZE}`,
    { headers: { Prefer: "count=exact" } }
  );
  const entries: GuestbookEntry[] = await res.json();
  const total = Number(res.headers.get("content-range")?.split("/")[1] ?? entries.length);
  return { entries, total };
}

export async function addGuestbookEntry(name: string, message: string, password: string) {
  await supabaseRequest("rpc/add_guestbook_entry", {
    method: "POST",
    body: { p_name: name, p_message: message, p_password: password },
  });
}

export async function deleteGuestbookEntry(id: number, password: string): Promise<boolean> {
  const res = await supabaseRequest("rpc/delete_guestbook_entry", {
    method: "POST",
    body: { p_id: id, p_password: password },
  });
  return (await res.json()) === true;
}
