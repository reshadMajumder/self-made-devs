-- Update registrations table: remove university, add current_semester
alter table public.registrations drop column if exists university;
alter table public.registrations add column if not exists current_semester text;
