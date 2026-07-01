# Deployment Guide

## Vercel

1. Import `hAck404-lab101/accra-flood-app` into Vercel.
2. Set framework preset to Next.js.
3. Add environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Deploy.

## Supabase

1. Create a new Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Confirm the `flood_reports` table exists.
5. Submit a test report from `/report`.

## Public launch warning

The current schema includes a temporary public update policy so the MVP admin page can verify reports without login. Before public deployment, replace it with real admin authentication.
