-- BUNAVIA extras: "Manage booking" lookup and "Flight deals by email"
-- Run once in Supabase: SQL Editor -> New query -> Run. Safe to run more than once.
-- Needs the booking_requests table (bunavia-bookings-setup.sql) to exist first.

-- 1) Manage booking: a customer can see ONE request by entering its reference
--    and the last name of a passenger. Passenger details are never returned.
create or replace function public.find_booking(p_reference text, p_last_name text)
returns table (reference text, status text, trip jsonb, total_eur numeric, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select b.reference,
         b.status,
         (b.trip - 'extras') || jsonb_build_object('baggage', b.trip->'extras'->'baggage'),
         b.total_eur,
         b.created_at
  from public.booking_requests b
  where b.reference = upper(trim(p_reference))
    and char_length(trim(p_last_name)) >= 2
    and exists (
      select 1 from jsonb_array_elements(b.passengers) x
      where lower(trim(x->>'last')) = lower(trim(p_last_name))
    )
  limit 1;
$$;

revoke all on function public.find_booking(text, text) from public;
grant execute on function public.find_booking(text, text) to anon, authenticated;

-- 2) Flight deals by email (newsletter). Visitors can only add their email.
create table if not exists public.newsletter_signups (
  id          bigint generated always as identity primary key,
  email       text not null unique check (char_length(email) between 5 and 254 and email like '%_@_%._%'),
  language    text check (char_length(language) <= 5),
  created_at  timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;

drop policy if exists "Anyone can subscribe" on public.newsletter_signups;
create policy "Anyone can subscribe"
  on public.newsletter_signups for insert
  to anon, authenticated
  with check (true);

-- Nobody can read the list from the website. You see it in Table Editor -> newsletter_signups.
