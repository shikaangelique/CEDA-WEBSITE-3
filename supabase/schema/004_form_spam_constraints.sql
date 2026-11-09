-- Server-side limits for the public forms. The browser checks the same rules,
-- but anyone holding the public anon key can call the API directly, so the
-- database must enforce them too. Matches app/src/components/contact/ContactForm.jsx
-- and app/src/pages/FeedbackPage.jsx.
--
-- Run once in the Supabase SQL editor. `not valid` skips checking existing
-- rows, so old submissions can never block this migration.

alter table public.contact_submissions
  add constraint contact_name_length check (char_length(btrim(name)) between 1 and 120) not valid,
  add constraint contact_email_format check (
    char_length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ) not valid,
  add constraint contact_phone_length check (phone is null or char_length(phone) <= 30) not valid,
  add constraint contact_org_length check (organisation is null or char_length(organisation) <= 160) not valid,
  add constraint contact_message_length check (char_length(btrim(message)) between 10 and 5000) not valid;

alter table public.site_feedback
  add constraint feedback_name_length check (name is null or char_length(name) <= 120) not valid,
  add constraint feedback_role_length check (role is null or char_length(role) <= 120) not valid,
  add constraint feedback_liked_length check (liked_most is null or char_length(liked_most) <= 3000) not valid,
  add constraint feedback_confusing_length check (confusing_or_broken is null or char_length(confusing_or_broken) <= 3000) not valid,
  add constraint feedback_suggest_length check (suggested_improvements is null or char_length(suggested_improvements) <= 3000) not valid;

-- Pin search_path on the security-definer RPC (Supabase linter warning).
alter function public.increment_assessment_counters(text, text, text) set search_path = public;
