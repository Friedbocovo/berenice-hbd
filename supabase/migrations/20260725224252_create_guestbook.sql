/*
# Create guestbook table (single-tenant, no auth)

1. New Tables
- `guestbook_entries`
- `id` (uuid, primary key)
- `name` (text, not null) — author display name
- `message` (text, not null) — the birthday message
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `guestbook_entries`.
- Allow anon + authenticated to SELECT (public guestbook, everyone reads).
- Allow anon + authenticated to INSERT (anyone can leave a message).
- No UPDATE or DELETE (messages are immutable once posted).
3. Notes
- This is a single-tenant public guestbook with no sign-in, so `TO anon, authenticated`
  with `USING (true)` is the correct intentional policy — the data is meant to be shared.
*/

CREATE TABLE IF NOT EXISTS guestbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_guestbook" ON guestbook_entries;
CREATE POLICY "anon_read_guestbook" ON guestbook_entries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_guestbook" ON guestbook_entries;
CREATE POLICY "anon_insert_guestbook" ON guestbook_entries FOR INSERT
  TO anon, authenticated WITH CHECK (true);
