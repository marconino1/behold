alter table profiles
  add column if not exists onboarding_complete boolean default false,
  add column if not exists starting_lesson text default 'K0';

-- Add status to lesson_progress for skipped lessons
alter table lesson_progress
  add column if not exists status text default 'completed';

-- Allow update on lesson_progress for own rows (needed for status)
create policy "Users can update own progress"
  on lesson_progress for update using (auth.uid() = user_id);
