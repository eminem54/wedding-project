import { supabaseRequest } from "@/lib/supabase";

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
  await supabaseRequest("rsvp", {
    method: "POST",
    // Guests have no SELECT permission, so asking for the inserted row back would fail.
    headers: { Prefer: "return=minimal" },
    body: input,
  });
}
