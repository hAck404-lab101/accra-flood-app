-- Accra Flood App MVP database schema
-- Run this in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.flood_reports (
  id uuid primary key default gen_random_uuid(),
  area_name text not null,
  latitude double precision not null,
  longitude double precision not null,
  status text not null check (status in ('flooded', 'water_rising', 'clear')),
  water_level text,
  description text,
  image_url text,
  reported_by text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists flood_reports_area_name_idx on public.flood_reports (area_name);
create index if not exists flood_reports_status_idx on public.flood_reports (status);
create index if not exists flood_reports_created_at_idx on public.flood_reports (created_at desc);
create index if not exists flood_reports_verified_idx on public.flood_reports (is_verified);

alter table public.flood_reports enable row level security;

-- MVP policy: public can view reports.
-- Before public launch, consider showing only verified reports to normal users.
create policy "Public can view flood reports"
on public.flood_reports
for select
using (true);

-- MVP policy: public can submit reports.
create policy "Public can submit flood reports"
on public.flood_reports
for insert
with check (true);

-- Temporary MVP policy: allows the demo admin page to verify reports.
-- Replace this with authenticated admin-only access before launch.
create policy "Temporary public admin update for MVP"
on public.flood_reports
for update
using (true)
with check (true);
