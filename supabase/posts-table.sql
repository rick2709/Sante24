-- Run this in your Supabase project: SQL Editor → New query → paste → Run
-- Creates the `posts` table for the Santé 24 health blog.

create table if not exists public.posts (
  id text primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  image text default '/placeholder.jpg',
  date text not null,
  read_time text not null default '5 min read',
  featured boolean not null default false,
  published boolean not null default true,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.posts enable row level security;

-- Service role has full access (used by Next.js API routes)
create policy "Service role full access"
  on public.posts
  for all
  to service_role
  using (true)
  with check (true);

-- Public can read published posts
create policy "Public read published"
  on public.posts
  for select
  to anon, authenticated
  using (published = true);

-- RPC function for atomic view count increments
create or replace function increment_post_views(post_id text)
returns void
language sql
security definer
as $$
  update public.posts set views = views + 1 where id = post_id;
$$;

-- Seed one example post
insert into public.posts (
  id, title, excerpt, content, category, image, date, read_time, featured, published
) values (
  'malaria-prevention-harare',
  'Understanding Malaria Prevention in Urban Harare',
  'Essential tips for protecting your family from malaria during the rainy season. Learn about mosquito control and the preventive measures recommended by our medical team.',
  '<p>Malaria remains one of the leading causes of illness in Harare, particularly during the rainy season from November to March. At Santé 24hr Medical Centre, we see a significant increase in malaria cases during these months.</p><h2>Know the Symptoms</h2><p>Early symptoms include fever, chills, headache, and muscle aches. If you or a family member experiences these symptoms, seek medical attention immediately. Our 24-hour facility is always open to help.</p><h2>Preventive Measures</h2><p>Prevention is always better than cure. Use insecticide-treated mosquito nets, apply mosquito repellent, and eliminate standing water around your home where mosquitoes breed.</p>',
  'Emergency Care',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  'Jun 23, 2026',
  '5 min read',
  true,
  true
)
on conflict (id) do nothing;
