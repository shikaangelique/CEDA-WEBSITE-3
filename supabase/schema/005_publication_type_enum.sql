-- Restricts publications.type to a fixed list. As an enum, the Supabase table
-- editor shows `type` as a dropdown, so typos are impossible.
--   'Report'                        → Resource Centre → Publications
--   'CEDA Policy', 'Annual Report'  → Resource Centre → Annual Reports
-- Must match app/src/lib/publicationTypes.js.
--
-- Every existing row is 'Report' (checked 9 Nov 2026), so the conversion is safe.
-- If any row had another value, the `alter ... using` below would fail and
-- nothing would change.
--
-- To add a type later:  alter type public.publication_type add value 'New Type';

do $$
begin
  if not exists (select 1 from pg_type where typname = 'publication_type') then
    create type public.publication_type as enum ('Report', 'CEDA Policy', 'Annual Report');
  end if;
end
$$;

alter table public.publications
  alter column type type public.publication_type using type::public.publication_type,
  alter column type set default 'Report',
  alter column type set not null;
