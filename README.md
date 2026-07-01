# Accra Flood App

Accra Flood App is a live flood-status map for Accra, Ghana. The MVP helps travellers and residents quickly check whether an area is flooded, water is rising, or clear before moving through the city during heavy rains.

## MVP Goal

> A user opens the website, sees a map of Accra, checks flood reports, and can submit a flood status for an area.

## Core Features

- Interactive Accra map using Leaflet + OpenStreetMap
- Flood report pins with status colors
- Community flood report form
- Admin verification page
- Area report pages
- Supabase database schema
- Ready for Vercel deployment

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Leaflet / React Leaflet
- OpenStreetMap tiles
- Supabase database and storage

## First Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Add your keys to `.env.local`.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Safety Notice

Flood data in this MVP can be incomplete. Verified reports should be prioritized, and the public app should clearly state that users must still follow official alerts from trusted authorities.

## Next Milestone

The first real milestone is:

> Submit a flood report and see it appear on the Accra map.
