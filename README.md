# Accra Flood App

Accra Flood App is a live flood-status web platform for Accra, Ghana. It helps travellers, residents, drivers, students, and workers check whether an area is flooded, water is rising, clear, or unknown before moving through the city during heavy rains.

## Live Product Goal

> A user opens the website, checks live flood reports across Accra, views area risk, submits a report, receives safety guidance, and can make better travel decisions before entering or moving around Accra.

## Included Scope

This project is now scoped as a live web platform, not only a small MVP. The mobile app phase is excluded for now.

Included:

- Interactive Accra flood map using Leaflet + OpenStreetMap
- Flood status pins
- Community flood report submission
- Latest reports feed
- Area search
- Area details pages
- Admin verification
- Report expiry and stale-report handling
- Report confidence level
- Photo evidence upload
- Area risk summaries
- Journey checker for travellers, including Ho to Accra
- Route risk warning
- Safer route suggestions
- Before-you-travel summary
- Rain radar layer
- Weather alerts
- Rainfall intensity layer
- Known flood-prone area layer
- Water level trend
- WhatsApp sharing
- SMS alerts
- Push notification-ready structure for the web
- Community trust score
- Fake report / abuse flagging
- Admin dashboard
- Admin map view
- Verification queue
- Area management
- Emergency contact information
- AI flood risk score
- Possible flood-prone area prediction
- Historical flood data
- Traffic and flood combination
- Voice report support
- Offline-friendly web mode

Excluded for now:

- Native Android app
- Native iOS app
- Background mobile-app notifications
- Mobile driver mode as a native app

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Leaflet / React Leaflet
- OpenStreetMap tiles
- Supabase database and storage
- Vercel deployment

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

Flood data can be incomplete or outdated. Verified reports should be prioritized, stale reports should expire automatically, and the public app must clearly state that users should still follow official alerts and local emergency instructions.

## First Live Milestone

The first live milestone is:

> Submit a flood report, save it to Supabase, verify it from admin, and show it on the Accra map with report freshness and safety status.
