# Testing Checklist

Use this checklist after cloning the repo.

## Local app

- [ ] `npm install` completes
- [ ] `npm run dev` starts the app
- [ ] Home page opens at `http://localhost:3000`
- [ ] Map loads without console errors
- [ ] Demo flood reports are visible
- [ ] `/report` page opens
- [ ] `/admin` page opens
- [ ] `/area/kaneshie` page opens

## Supabase

- [ ] Supabase project created
- [ ] `supabase/schema.sql` has been executed
- [ ] `.env.local` has valid Supabase URL and anon key
- [ ] A report submitted from `/report` appears in Supabase
- [ ] Home page shows reports from Supabase instead of demo data
- [ ] Admin page can verify a report

## Before public launch

- [ ] Replace temporary public update policy with admin-only auth
- [ ] Add report expiry/staleness
- [ ] Add photo evidence storage
- [ ] Add safety disclaimer in footer
- [ ] Add official weather/rain alert module
