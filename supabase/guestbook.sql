-- Run once in Supabase Dashboard > SQL Editor.
-- Guests (anon role) can read entries but never the password hash. Writing and
-- deleting only happen through the two functions below, which hash/verify the
-- password inside the database.

create extension if not exists pgcrypto with schema extensions;

create table public.guestbook (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 20),
  message text not null check (char_length(btrim(message)) between 1 and 200),
  password_hash text not null
);

alter table public.guestbook enable row level security;

create policy "Guests can read the guestbook"
  on public.guestbook for select
  to anon
  using (true);

revoke all on public.guestbook from anon, authenticated;
grant select (id, created_at, name, message) on public.guestbook to anon;

create function public.add_guestbook_entry(p_name text, p_message text, p_password text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_password is null or char_length(p_password) not between 4 and 20 then
    raise exception 'password must be 4-20 characters' using errcode = '22023';
  end if;

  insert into public.guestbook (name, message, password_hash)
  values (
    btrim(p_name),
    btrim(p_message),
    extensions.crypt(p_password, extensions.gen_salt('bf'))
  );
end;
$$;

create function public.delete_guestbook_entry(p_id bigint, p_password text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  deleted_count int;
begin
  delete from public.guestbook
  where id = p_id
    and password_hash = extensions.crypt(p_password, password_hash);
  get diagnostics deleted_count = row_count;
  return deleted_count > 0;
end;
$$;

revoke execute on function public.add_guestbook_entry(text, text, text) from public, authenticated;
revoke execute on function public.delete_guestbook_entry(bigint, text) from public, authenticated;
grant execute on function public.add_guestbook_entry(text, text, text) to anon;
grant execute on function public.delete_guestbook_entry(bigint, text) to anon;
