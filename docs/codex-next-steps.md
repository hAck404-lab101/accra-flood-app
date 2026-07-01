# Codex Next Steps

Use this file as the working instruction for Codex.

## Product Direction

Accra Flood App is now scoped as a live web platform, not only an MVP. Build all web-based features from the roadmap except native mobile app features.

## Current state

The repo has a working Next.js starter for Accra Flood App with:

- Home map dashboard
- Demo flood pins
- Report form
- Admin verification page
- Area report page
- Supabase schema

## First live build task

Make the first live milestone fully work:

> A user can submit a flood report, save it to Supabase, verify it from admin, and see it appear on the Accra map with report freshness and safety status.

## Instructions for Codex

1. Install dependencies.
2. Run the dev server.
3. Fix any build or TypeScript errors.
4. Connect the app to Supabase using `.env.local`.
5. Run the SQL in `supabase/schema.sql`.
6. Confirm that submitted reports are saved in Supabase.
7. Make the home page show Supabase reports on the map.
8. Add report freshness/stale status.
9. Add verified-only display mode toggle in the code.
10. Keep demo data clearly labelled and never present it as real flood data.

## Live web scope to build

Build these features in order:

1. Accra flood map
2. Flood status pins
3. Submit flood report
4. Latest reports feed
5. Area search
6. Area details pages
7. Admin verification
8. Report expiry
9. Report confidence level
10. Photo evidence upload
11. Area risk summary
12. Journey checker for Ho to Accra and other routes
13. Route risk warning
14. Safer route suggestions
15. Before-you-travel summary
16. Rain radar layer
17. Weather alerts
18. Rainfall intensity layer
19. Known flood-prone area layer
20. Water level trend
21. WhatsApp sharing
22. SMS alerts
23. Web push notification-ready structure
24. Community trust score
25. Fake report / abuse flagging
26. Admin dashboard
27. Admin map view
28. Verification queue
29. Area management
30. Emergency contact information
31. AI flood risk score
32. Possible flood-prone area prediction
33. Historical flood data
34. Traffic and flood combination
35. Voice report support
36. Offline-friendly web mode

## Product rules

- Do not present demo reports as real flood data.
- Keep all demo reports clearly labelled.
- Keep the interface mobile-first and usable on phones.
- Keep safety warnings visible.
- Build as a web app first.
- Do not build native Android or iOS apps yet.
- Do not add native background mobile-app notifications yet.

## Excluded from this phase

- Native Android app
- Native iOS app
- Native mobile driver mode
- Native mobile background notifications
