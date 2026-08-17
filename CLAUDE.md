# Tome TCG — local dev setup

Monorepo: pnpm workspace + turbo, two apps:

- `apps/tome-web` — Remix (Vite, SSR off) frontend, client-only. Runs on **:5173**.
- `apps/tome-api` — Elysia API on **Bun**, SQLite (libsql) DB, Lucia auth via GitHub OAuth. Runs on **:8080**.

## First-time setup

Package manager is pnpm (`packageManager: pnpm@8.5.1` in root `package.json`), runtime for the API is Bun. Neither may be preinstalled in a fresh container — no sudo is available in this environment, so install both without root:

```bash
# pnpm via corepack (needs a working /usr/bin/pnpm symlink — if `corepack enable` fails with
# EACCES, skip it and just run pnpm through npx instead)
npx --yes pnpm@8.5.1 install   # run from repo root; installs all workspaces

# bun (installs to ~/.bun/bin, no root needed)
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
```

Env files (both gitignored, copy from templates):

```bash
cp apps/tome-web/.env.template apps/tome-web/.env
cp apps/tome-api/.env.template apps/tome-api/.env
```

`apps/tome-api/.env` needs `ALLOWED_ORIGIN` set for CORS to work in dev — but see the
**NODE_ENV footgun** below, since in `development` mode this value is actually ignored.

Create the SQLite DB:

```bash
cd apps/tome-api
bun run db:migrate:run   # creates dev.db from DATABASE_URL='file:dev.db'
```

## Running it

```bash
# API (from apps/tome-api)
NODE_ENV=development bun run --watch src/index.ts

# Web (from apps/tome-web)
pnpm run dev   # or: npx --yes pnpm@8.5.1 run dev
```

Visit **http://localhost:5173**.

### NODE_ENV footgun (CORS)

`apps/tome-api/src/index.ts` picks its CORS `origin` list based on `process.env.NODE_ENV`:

- `'development'` → hardcoded `['localhost:5173', 'localhost:4173', '192.168.0.38:5173']`
- `'production'` → `[process.env.ALLOWED_ORIGIN]`
- anything else (including **unset**, which is the default if you just run `bun run src/index.ts`) → `[]`, i.e. every cross-origin request gets blocked

If the web app renders a blank "Something went wrong / Unknown error" page, this is almost
certainly it — check the browser console for CORS errors, and make sure the API was started
with `NODE_ENV=development` explicitly.

## Auth: skip GitHub OAuth entirely for local testing

`apps/tome-api/src/features/auth/auth.routes.ts` has a dev-only bypass route, gated on
`NODE_ENV === 'development'`:

```
GET /auth/dev?userId=<existing user id>
```

It creates a session for that user id directly (no GitHub round-trip) and redirects to
`AUTH_REDIRECT_URL`. You still need a real row in the `user` table to point it at — seed one
with a one-off script:

```bash
cd apps/tome-api
bun -e "
import { db } from './src/db';
import { users } from './src/db/schema';
await db.insert(users).values({ id: 'dev-user-local', username: 'dev-tester', githubId: 999999, avatarUrl: null }).onConflictDoNothing();
"
```

Then open `http://localhost:8080/auth/dev?userId=dev-user-local` in the browser — you land on
the home page already logged in.

(Setting up a real GitHub OAuth App works too — Homepage URL `http://localhost:5173`, callback
`http://localhost:8080/auth/github/callback`, credentials go in `GITHUB_CLIENT_ID` /
`GITHUB_CLIENT_SECRET` in `apps/tome-api/.env` — but it's unnecessary overhead for local
testing and it's one more thing that can flake on GitHub's end. Prefer the `/auth/dev` bypass.)

## Simulating a two-player game

The API refuses to let a user play themselves — `game.routes.ts`: `if (user.id ===
body.opponentId) return error('Bad Request', 'You cannot play against yourself')`. To actually
drive both sides of a match you need two distinct user rows and two separate browser sessions
(cookies are per-profile, so use two browser contexts):

```bash
# seed a second user the same way as above, e.g. id 'dev-user-local-2', username 'dev-tester-2'
```

1. Normal window: `http://localhost:8080/auth/dev?userId=dev-user-local` → logged in as player 1.
2. Private/incognito window (separate cookie jar): `http://localhost:8080/auth/dev?userId=dev-user-local-2` → logged in as player 2.
3. In window 1, go to **Games → Create game**, pick player 2 as opponent, create the game.
4. Switch between the two windows to play moves as each side.

## Headless browser testing (Playwright) in this sandbox

No sudo is available, so `npx playwright install --with-deps` fails. Chromium itself can still
be downloaded (`npx playwright install chromium`, no `--with-deps`), but it needs system `.so`
libraries (`libnss3`, `libnspr4`, `libgbm1`, `libwayland-server0`, `libxcb-randr0` on Ubuntu
22.04) that aren't preinstalled and can't be `apt-get install`ed without root.

Workaround — download the `.deb`s and extract them into a user-writable dir, then point
`LD_LIBRARY_PATH` at it:

```bash
mkdir -p /tmp/apt-work/lists /tmp/apt-work/cache/archives/partial /tmp/debs /tmp/extracted
apt-get -o Dir::State::lists=/tmp/apt-work/lists -o Dir::Cache=/tmp/apt-work/cache update
cd /tmp/debs
apt-get -o Dir::State::lists=/tmp/apt-work/lists -o Dir::Cache=/tmp/apt-work/cache \
  download libnss3 libnspr4 libgbm1 libwayland-server0 libxcb-randr0
for f in *.deb; do dpkg-deb -x "$f" /tmp/extracted; done
export LD_LIBRARY_PATH=/tmp/extracted/usr/lib/x86_64-linux-gnu
```

(The system `apt` cache is often stale in a fresh container, which makes `apt-get download`
404 on the exact `.deb` filenames it has indexed — the `Dir::State::lists`/`Dir::Cache`
override above points `apt-get update` at a scratch dir instead of the root-owned
`/var/lib/apt/lists`, working around the lack of sudo.)

`ldd <path-to-chrome-binary> | grep "not found"` shows exactly which libraries are still
missing if Chromium still won't launch after this.
