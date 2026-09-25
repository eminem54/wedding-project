-- Run once in Supabase Dashboard > SQL Editor.
-- Guests (anon role) can only INSERT; nobody but the project owner can read responses.

create table public.rsvp (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  side text not null check (side in ('groom', 'bride')),
  attending boolean not null,
  name text not null check (char_length(btrim(name)) between 1 and 20),
  headcount smallint check (headcount between 1 and 10),
  meal text check (meal in ('yes', 'no', 'undecided')),
  phone text check (phone is null or char_length(phone) <= 20),
  message text check (message is null or char_length(message) <= 30),
  check (
    (attending and headcount is not null and meal is not null)
    or (not attending and headcount is null and meal is null)
  )
);

comment on column public.rsvp.side is 'groom: 신랑측, bride: 신부측';
comment on column public.rsvp.meal is 'yes: 식사 예정, no: 식사 안 함, undecided: 미정';

alter table public.rsvp enable row level security;

create policy "Guests can submit an RSVP"
  on public.rsvp for insert
  to anon
  with check (true);

revoke all on public.rsvp from anon, authenticated;
grant insert (side, attending, name, headcount, meal, phone, message) on public.rsvp to anon;
