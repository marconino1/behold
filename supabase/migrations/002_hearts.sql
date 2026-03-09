create table hearts_status (
  user_id uuid references profiles(id) on delete cascade,
  hearts integer not null default 5,
  last_lost_at timestamptz,
  updated_at timestamptz default now(),
  primary key (user_id)
);

alter table hearts_status enable row level security;

create policy "Users can manage own hearts"
  on hearts_status for all using (auth.uid() = user_id);
