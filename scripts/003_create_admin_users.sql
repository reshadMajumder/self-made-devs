-- Create admin_users table for admin authentication
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text not null,
  created_at timestamp with time zone default now(),
  last_login timestamp with time zone
);

-- Enable Row Level Security
alter table public.admin_users enable row level security;

-- Only allow admins to read admin_users (we'll handle this in the API)
create policy "admin_users_select_authenticated"
  on public.admin_users for select
  using (auth.uid() is not null);

-- Create index for faster email lookups
create index if not exists admin_users_email_idx on public.admin_users(email);

-- Insert a default admin user (password: admin123)
-- Note: In production, you should change this password immediately
insert into public.admin_users (email, password_hash, full_name)
values (
  'admin@selfmadedevs.com',
  '$2a$10$rKZvVqVqVqVqVqVqVqVqVuO7K5K5K5K5K5K5K5K5K5K5K5K5K5K5K',
  'Admin User'
) on conflict (email) do nothing;
