-- Citizen Guardian — Supabase schema (demo)
-- Paste this into Supabase → SQL Editor → Run.

-- 1) incidents: powers the live "inject an incident" demo (Realtime)
create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  lat double precision not null,
  lng double precision not null,
  type text not null default 'Police activity',
  severity text not null default 'high',        -- low | med | high
  credibility text not null default 'confirmed',-- reported | confirmed
  street text,
  confirmations int not null default 1,
  created_at timestamptz not null default now(),
  status text not null default 'active'         -- active | resolved
);

-- 2) walk_sessions: powers live location sharing between two devices
create table if not exists walk_sessions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,                    -- short join code, e.g. 'MOM123'
  lat double precision,
  lng double precision,
  eta text,
  status text not null default 'active',        -- active | arrived | sos
  updated_at timestamptz not null default now()
);

-- 3) enable Realtime on both tables
alter publication supabase_realtime add table incidents;
alter publication supabase_realtime add table walk_sessions;

-- 4) DEMO-ONLY row-level security: open read/write for anon.
--    Fine for a time-boxed prototype. In production you'd scope these
--    to authenticated users and session ownership (say this in the panel).
alter table incidents enable row level security;
alter table walk_sessions enable row level security;

create policy "demo read incidents"  on incidents      for select using (true);
create policy "demo write incidents" on incidents      for insert with check (true);
create policy "demo read walks"      on walk_sessions   for select using (true);
create policy "demo insert walks"    on walk_sessions   for insert with check (true);
create policy "demo update walks"    on walk_sessions   for update using (true);

-- 5) watchers: people who opened the share link and joined a walk
create table if not exists watchers (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text default 'Guest',
  joined_at timestamptz not null default now()
);
alter publication supabase_realtime add table watchers;
alter table watchers enable row level security;
create policy "demo read watchers"   on watchers for select using (true);
create policy "demo insert watchers" on watchers for insert with check (true);

-- 6) live route + note on the session, and a walk_events feed for the watcher's history
alter table walk_sessions add column if not exists route jsonb;
alter table walk_sessions add column if not exists note text;
create table if not exists walk_events (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  kind text,
  text text,
  at timestamptz not null default now()
);
alter publication supabase_realtime add table walk_events;
alter table walk_events enable row level security;
create policy "demo read events"   on walk_events for select using (true);
create policy "demo insert events" on walk_events for insert with check (true);
