-- New users start at K0 with onboarding_complete = true
-- (Level selection onboarding is disabled for now)
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, onboarding_complete, starting_lesson)
  values (new.id, new.raw_user_meta_data->>'first_name', true, 'K0');
  insert into public.streaks (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
