-- À exécuter une seule fois dans Supabase : SQL Editor → New query → coller → Run.

create table if not exists public.items (
  id         text primary key,
  kind       text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists items_kind_idx on public.items (kind);

-- Accès lecture/écriture pour quiconque a le lien du site (pas de comptes).
-- Ne stocker aucune donnée personnelle de répondants ici (RGPD) : codes anonymes uniquement.
alter table public.items enable row level security;

drop policy if exists "equipe lecture" on public.items;
drop policy if exists "equipe ecriture" on public.items;
create policy "equipe lecture" on public.items for select to anon using (true);
create policy "equipe ecriture" on public.items for all to anon using (true) with check (true);

-- Mises à jour en direct entre les 3 navigateurs.
alter publication supabase_realtime add table public.items;
