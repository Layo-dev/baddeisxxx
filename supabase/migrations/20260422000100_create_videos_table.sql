create extension if not exists pgcrypto;

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  bunny_video_id text not null unique,
  status text not null default 'processing' check (status in ('processing', 'ready', 'failed')),
  playback_url text,
  thumbnail_url text,
  duration_seconds integer,
  views bigint not null default 0,
  rating numeric(3,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists videos_status_idx on public.videos(status);
create index if not exists videos_created_at_idx on public.videos(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists videos_set_updated_at on public.videos;
create trigger videos_set_updated_at
before update on public.videos
for each row
execute function public.set_updated_at();
