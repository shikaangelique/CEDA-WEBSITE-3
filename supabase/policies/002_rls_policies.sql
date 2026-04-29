alter table public.publications enable row level security;  
alter table public.news_posts enable row level security;  
alter table public.contact_submissions enable row level security;  
alter table public.assessment_responses enable row level security;  
  
create policy "Public can read publications"  
on public.publications  
for select  
to anon  
using (true);  
  
create policy "Public can read news posts"  
on public.news_posts  
for select  
to anon  
using (true);  
  
create policy "Public can submit contact forms"  
on public.contact_submissions  
for insert  
to anon  
with check (true);  
  
create policy "Public can read assessment counters"  
on public.assessment_responses  
for select  
to anon  
using (true);