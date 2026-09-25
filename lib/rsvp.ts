const SUPABASE_URL = "https://avzuscttillaksqwrwqh.supabase.co";
// Publishable key is meant to ship to browsers; what it can do is limited by the
// RLS policies in supabase/rsvp.sql (insert-only for guests).
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_OcyZmLjKgY1f1_Zwf4HeQA_BbaMAl-P";

export type RsvpSide = "groom" | "bride";
export type RsvpMeal = "yes" | "no" | "undecided";

export type RsvpInput = {
  side: RsvpSide;
  attending: boolean;
  name: string;
  headcount: number | null;
  meal: RsvpMeal | null;
  phone: string | null;
  message: string | null;
};

export const MESSAGE_MAX_LENGTH = 30;

export async function submitRsvp(input: RsvpInput) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rsvp`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      // Guests have no SELECT permission, so asking for the inserted row back would fail.
      Prefer: "return=minimal",
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`RSVP submit failed (${res.status}): ${await res.text()}`);
  }
}
