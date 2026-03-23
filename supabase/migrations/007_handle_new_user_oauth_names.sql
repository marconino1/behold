-- Derive first_name for OAuth users (e.g. Google) who don't send first_name in metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_first text;
begin
  v_first := coalesce(
    nullif(trim(new.raw_user_meta_data->>'first_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'given_name'), ''),
    nullif(trim(split_part(coalesce(new.raw_user_meta_data->>'full_name', ''), ' ', 1)), ''),
    nullif(trim(split_part(coalesce(new.raw_user_meta_data->>'name', ''), ' ', 1)), '')
  );

  insert into public.profiles (id, first_name)
  values (new.id, v_first);

  insert into public.streaks (user_id)
  values (new.id);

  return new;
end;
$$;
