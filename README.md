This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase setup

The Archiving Abortion page now persists data via Supabase (Postgres + Storage).

1. Create a Supabase project and a storage bucket called `archive-media` (public access).
2. Create a table `archive_entries` with at least the columns:
   - `id` (uuid, default `uuid_generate_v4()`)
   - `title` (text)
   - `type` (text)
   - `description` (text)
   - `meta` (text)
   - `href` (text, nullable)
   - `media` (jsonb, default `[]`)
   - `created_at` (timestamp with time zone, default `now()`)
3. Copy `.env.local.example` to `.env.local` and fill in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and (for uploads) `SUPABASE_SERVICE_ROLE_KEY`.
4. Restart `npm run dev` so the environment variables load.

Entries are fetched from `/api/archive` and media files are uploaded to the `archive-media` bucket automatically.

### Mapbox style

The map tiles default to the Carto Voyager basemap, but you can override them with any XYZ tile source.

1. For Mapbox, create a token and set `NEXT_PUBLIC_MAPBOX_TOKEN` **or** set `NEXT_PUBLIC_TILE_URL` / `NEXT_PUBLIC_TILE_ATTRIBUTION` to point to any custom provider.
2. Restart `npm run dev` whenever you change `.env.local`.
3. The app will automatically use your custom tile URL; otherwise it falls back to Carto Voyager.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# abortionisnormal
