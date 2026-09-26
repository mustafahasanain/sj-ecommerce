# sj-ecommerce

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
pnpm dev
```

## Project layout

- `src/app/api/auth/[...all]/route.ts` — Better Auth route handler
- `src/lib/auth.ts` / `src/lib/auth-client.ts` — Better Auth server and client instances
- `src/db/index.ts` — Drizzle client (Neon HTTP driver)
- `src/db/schema.ts` — Drizzle schema (empty for now)
- `drizzle.config.ts` — drizzle-kit config

## Database scripts

```bash
pnpm dlx @better-auth/cli generate --output src/db/schema.ts  # generate auth tables
pnpm db:generate   # create SQL migrations
pnpm db:migrate    # apply migrations
pnpm db:push       # push schema directly (dev)
pnpm db:studio     # open Drizzle Studio
```

`DATABASE_URL` must be set for `next build`, because the auth route imports the DB client.
