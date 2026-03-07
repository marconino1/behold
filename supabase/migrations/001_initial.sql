-- profiles table
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  tier_unlocked integer default 1
);

-- lesson_progress table
create table lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz default now(),
  xp_earned integer default 100,
  hearts_remaining integer default 3,
  perfect boolean default false,
  unique(user_id, lesson_id)
);

-- prayer_log table
create table prayer_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  lesson_id text not null,
  prayed_at timestamptz default now()
);

-- streaks table
create table streaks (
  user_id uuid primary key references profiles(id) on delete cascade,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date,
  updated_at timestamptz default now()
);

-- waitlist table
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now(),
  source text default 'landing'
);

-- auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name)
  values (new.id, new.raw_user_meta_data->>'first_name');
  insert into public.streaks (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Row Level Security
alter table profiles enable row level security;
alter table lesson_progress enable row level security;
alter table prayer_log enable row level security;
alter table streaks enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can view own progress" on lesson_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on lesson_progress for insert with check (auth.uid() = user_id);
create policy "Users can view own prayers" on prayer_log for select using (auth.uid() = user_id);
create policy "Users can insert own prayers" on prayer_log for insert with check (auth.uid() = user_id);
create policy "Users can view own streak" on streaks for select using (auth.uid() = user_id);
create policy "Users can update own streak" on streaks for update using (auth.uid() = user_id);
create policy "Anyone can insert waitlist" on waitlist for insert with check (true);
