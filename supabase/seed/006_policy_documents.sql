-- Adds CEDA's two policy documents. type = 'CEDA Policy' places them on
-- Resource Centre → Annual Reports instead of Publications
-- (see app/src/lib/publicationTypes.js).
-- The PDFs and covers are served by the website, so run this AFTER the deploy
-- that includes app/public/assets/publications/2026 is live, and after
-- schema/005_publication_type_enum.sql. Safe to re-run.

insert into public.publications
  (slug, title, year, month, type, theme, file_name, file_url, thumbnail_url, featured, published_at)
values
(
  'ceda-human-resource-administrative-policy',
  'Human Resource and Administrative Policy',
  2024, 'February', 'CEDA Policy', 'Governance',
  'CEDA-Human-Resource-Admin-Policy.pdf',
  '/assets/publications/2026/CEDA-Human-Resource-Admin-Policy.pdf',
  '/assets/publication-thumbnails/ceda-human-resource-administrative-policy.webp',
  false, '2024-02-01'
),
(
  'ceda-financial-policies-procedures-procurement-manual',
  'Constitution, Financial Policies, Procedures and Procurement Manual',
  null, null, 'CEDA Policy', 'Governance',
  'CEDA-Accounting-Procurement-Manual.pdf',
  '/assets/publications/2026/CEDA-Accounting-Procurement-Manual.pdf',
  '/assets/publication-thumbnails/ceda-financial-policies-procedures-procurement-manual.webp',
  false, null
)
on conflict (slug) do nothing;
