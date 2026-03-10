-- Indexes for user_id lookups to avoid full table scans
create index if not exists idx_lesson_progress_user_id on lesson_progress(user_id);
create index if not exists idx_hearts_status_user_id on hearts_status(user_id);
