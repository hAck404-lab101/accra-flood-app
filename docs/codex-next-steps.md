# Codex Next Steps

Use this file as the working instruction for Codex.

## Current state

The repo has a working Next.js starter for Accra Flood App with:

- Home map dashboard
- Demo flood pins
- Report form
- Admin verification page
- Area report page
- Supabase schema

## First build task

Make the first milestone fully work:

> A user can submit a flood report and it appears on the Accra map.

## Instructions for Codex

1. Install dependencies.
2. Run the dev server.
3. Fix any build or TypeScript errors.
4. Connect the app to Supabase using `.env.local`.
5. Run the SQL in `supabase/schema.sql`.
6. Confirm that submitted reports are saved in Supabase.
7. Update the home page so new reports appear on the map immediately after refresh.

## Product rules

- Do not present demo reports as real flood data.
- Keep all demo reports clearly labelled.
- Keep the interface mobile-first.
- Keep safety warnings visible.
- Do not add route prediction yet.
- Do not add AI yet.
- Do not add mobile apps yet.

## Phase 2 after MVP works

- Rain radar overlay
- Report photos with Supabase Storage
- Admin login
- Verified-only public mode
- Ho to Accra route risk checker
- SMS/WhatsApp flood alerts
- Official alerts module
