-- Allow users to delete their own lesson_progress rows (needed when changing starting_lesson)
create policy "Users can delete own progress"
  on lesson_progress for delete using (auth.uid() = user_id);
