# Accra Flood App Live Roadmap

The project is now planned as a live web platform, not only an MVP. Native mobile apps are excluded for now.

## Phase 1 — Live Web Foundation

Goal: create the first working live web version.

- Map of Accra
- Flood status pins
- Supabase reports table
- Report form
- Latest reports feed
- Area search
- Area details page
- Admin verification page
- Clear safety disclaimer

Success metric:

> A report submitted from `/report` appears in Supabase, can be verified in `/admin`, and appears on the public map with correct status.

## Phase 2 — Trust and Verification

Goal: make the data safer and more reliable.

- Admin authentication
- Verified-only public mode
- Report abuse controls
- Fake report flagging
- Report expiry, for example reports older than 6 hours become stale
- Evidence photos
- Confidence level: low, medium, high
- Community trust score
- Duplicate report detection
- Verification queue

## Phase 3 — Area Intelligence

Goal: make each area useful to check before moving.

- Area risk summary
- Area status history
- Known flood-prone area layer
- Water level trend
- Historical flood data
- Emergency contact information
- Area management from admin dashboard

## Phase 4 — Weather Intelligence

Goal: add rain and weather context.

- Rain radar overlay
- Heavy rain warning banner
- Weather alerts
- Rainfall intensity layer
- Area risk scoring
- Time-based report freshness
- Official alert feed module

## Phase 5 — Travel Mode

Goal: help people travelling from Ho or other towns into Accra.

- Start and destination input
- Ho to Accra journey checker
- Route risk summary
- List of risky areas on the route
- Safer route suggestions
- Before-you-travel summary
- WhatsApp share link
- SMS alert subscription

## Phase 6 — Admin and Operations

Goal: manage the platform properly.

- Admin dashboard
- Admin map view
- Report metrics
- Pending, verified, rejected, duplicate, and stale reports
- Area management
- User/reporter management
- Emergency contact management
- Monitoring and analytics
- Public feedback system

## Phase 7 — Advanced Smart Features

Goal: make the platform more predictive and intelligent after real data starts coming in.

- AI flood risk score
- Possible flood-prone area prediction
- Traffic and flood combination
- Voice report support
- Offline-friendly web mode
- Public alert automation

## Excluded For Now — Native Mobile Apps

These are not part of the current build scope:

- Android app
- iOS app
- Native live-location alerts
- Native background notifications
- Native mobile driver mode

The app should remain mobile-friendly as a web app, but we are not building native mobile apps yet.
