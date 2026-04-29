-- Publications table
create table if not exists public.publications (  
  id uuid primary key default gen_random_uuid(),  
  slug text unique not null,  
  title text not null,  
  year int,  
  month text,  
  type text,  
  theme text,  
  abstract text,  
  key_insights text[],  
  authors text[],  
  file_name text,  
  file_url text,  
  thumbnail_url text,  
  tags text[],  
  featured boolean default false,  
  related_reports text[],  
  published_at date,  
  created_at timestamptz default now(),  
  updated_at timestamptz default now()  
);

-- News posts
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  cover_image_url text,
  post_type text default 'news',
  published_at date,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  message text not null,
  source_page text,
  created_at timestamptz default now()
);

-- Assessment responses
create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  question_key text not null,
  option_key text not null,
  count int not null default 0,
  unique (question_key, option_key)
);

-- Seed assessment counters

insert into public.assessment_responses (question_key, option_key, count)  
values  
('q1', 'a', 0),  
('q1', 'b', 0),  
('q1', 'c', 0),  
('q1', 'd', 0),  
('q2', 'a', 0),  
('q2', 'b', 0),  
('q2', 'c', 0),  
('q2', 'd', 0),  
('q3', 'a', 0),  
('q3', 'b', 0),  
('q3', 'c', 0),  
('q3', 'd', 0)  
on conflict (question_key, option_key) do nothing;

-- Assessment RPC function

create or replace function public.increment_assessment_counters(  
  q1_choice text,  
  q2_choice text,  
  q3_choice text  
)  
returns table (  
  question_key text,  
  option_key text,  
  count int  
)  
language plpgsql  
security definer  
as $$  
begin  
  update public.assessment_responses  
  set count = count + 1  
  where assessment_responses.question_key = 'q1'  
    and assessment_responses.option_key = q1_choice;  
  
  update public.assessment_responses  
  set count = count + 1  
  where assessment_responses.question_key = 'q2'  
    and assessment_responses.option_key = q2_choice;  
  
  update public.assessment_responses  
  set count = count + 1  
  where assessment_responses.question_key = 'q3'  
    and assessment_responses.option_key = q3_choice;  
  
  return query  
  select  
    assessment_responses.question_key,  
    assessment_responses.option_key,  
    assessment_responses.count  
  from public.assessment_responses;  
end;  
$$;