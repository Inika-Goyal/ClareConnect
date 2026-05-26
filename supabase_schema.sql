-- Run this in your Supabase SQL editor to set up the database

create table events (
  id          bigint generated always as identity primary key,
  title       text not null,
  date        date not null,
  time        text not null,
  location    text not null,
  capacity    int not null default 10,
  subtitle    text,
  description text,
  note        text,
  waitlist_enabled boolean not null default true,
  visible     boolean not null default true,
  created_at  timestamptz default now()
);

create table signups (
  id         bigint generated always as identity primary key,
  event_id   bigint references events(id) on delete cascade,
  name       text not null,
  phone      text,
  apartment  text not null,
  waitlisted boolean not null default false,
  created_at timestamptz default now()
);

-- Computed view for event stats
create view event_stats as
select
  e.*,
  count(s.id) filter (where not s.waitlisted) as signed_up,
  count(s.id) filter (where s.waitlisted)     as waitlisted
from events e
left join signups s on s.event_id = e.id
group by e.id;

-- Row-level security: residents can insert signups, staff can do everything
alter table events  enable row level security;
alter table signups enable row level security;

create policy "Public read events"  on events  for select using (visible = true);
create policy "Public insert signup" on signups for insert with check (true);
create policy "Public read signups"  on signups for select using (true);
create policy "Public delete signup" on signups for delete using (true);
