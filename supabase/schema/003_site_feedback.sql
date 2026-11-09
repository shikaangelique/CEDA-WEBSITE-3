-- Site feedback (hidden /feedback page)
-- Backs app/src/hooks/useSubmitFeedback.js.
-- DRAFT reconstructed from the app code: verify against the live database
-- (see the verification query at the bottom) before relying on it.

create table if not exists public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  load_time_rating smallint check (load_time_rating between 1 and 5),
  visual_design_rating smallint check (visual_design_rating between 1 and 5),
  ease_of_use_rating smallint check (ease_of_use_rating between 1 and 5),
  navigation_rating smallint check (navigation_rating between 1 and 5),
  mobile_experience_rating smallint check (mobile_experience_rating between 1 and 5),
  publication_access_rating smallint check (publication_access_rating between 1 and 5),
  liked_most text,
  confusing_or_broken text,
  suggested_improvements text,
  overall_rating smallint not null check (overall_rating between 1 and 5),
  created_at timestamptz not null default now()
);

-- Access rules: anonymous visitors may submit feedback but never read it.
-- Responses are read from the Supabase dashboard (service role bypasses RLS).
alter table public.site_feedback enable row level security;

drop policy if exists "Public can submit site feedback" on public.site_feedback;
create policy "Public can submit site feedback"
on public.site_feedback
for insert
to anon
with check (true);

-- Verification: run in the Supabase SQL editor and compare with the above.
-- select column_name, data_type, is_nullable, column_default
--   from information_schema.columns
--  where table_schema = 'public' and table_name = 'site_feedback'
--  order by ordinal_position;
-- select policyname, cmd, roles, qual, with_check
--   from pg_policies
--  where schemaname = 'public' and tablename = 'site_feedback';
-- select conname, pg_get_constraintdef(oid)
--   from pg_constraint
--  where conrelid = 'public.site_feedback'::regclass;
