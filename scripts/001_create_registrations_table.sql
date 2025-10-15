-- Create registrations table for Self Made Devs event
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  student_id text not null unique,
  phone text,
  university text,
  current_year text,
  interests text[] not null,
  skills text[] not null,
  github_url text,
  linkedin_url text,
  why_join text not null,
  project_idea text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.registrations enable row level security;

-- Allow anyone to insert (public registration)
create policy "registrations_insert_public"
  on public.registrations for insert
  with check (true);

-- Allow users to view all registrations (for admin dashboard later)
create policy "registrations_select_all"
  on public.registrations for select
  using (true);

-- Create index for faster lookups
create index if not exists registrations_email_idx on public.registrations(email);
create index if not exists registrations_student_id_idx on public.registrations(student_id);
create index if not exists registrations_created_at_idx on public.registrations(created_at desc);
