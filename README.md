# Tome TCG

A digital collectible card game built around a **double rock-paper-scissors**
core. Two players duel with 30-card decks across three colours — 🔴 Red, 🟢 Green,
🔵 Blue — where every turn hides two simultaneous mind-games: which field to
commit, and which colour to attack from.

## The game in a nutshell

- **2 players, 100 HP each.** Decks are exactly 30 cards, max 2 copies of any card.
- **Three colours**, each with its own stack, plus a shared field. Colours form a
  wheel: 🔴 Red beats 🟢 Green, 🟢 Green beats 🔵 Blue, 🔵 Blue beats 🔴 Red.
- **One card per turn.** Every turn is a fork — develop a field, or grow a single
  spell into a colour stack.
- **Clashes decide damage.** Prepared fields clash on the colour wheel, then each
  player picks a stack to attack from and those clash too. Only the winner deals
  damage; ties cancel. First player to 0 HP loses.

For the full ruleset and design analysis, see the
[documentation](./DOCUMENTATION.md).

## Tech stack

This is a pnpm + [Turborepo](https://turbo.build/) monorepo with two apps:

| App             | Stack                                            | Port   |
| --------------- | ------------------------------------------------ | ------ |
| `apps/tome-web` | [Remix](https://remix.run/) (Vite, SSR off), [PixiJS](https://pixijs.com/), Tailwind | `5173` |
| `apps/tome-api` | [Elysia](https://elysiajs.com/) on [Bun](https://bun.sh/), SQLite (libsql) + Drizzle, [Lucia](https://lucia-auth.com/) auth | `8080` |

Shared config lives in `packages/` (`eslint-config-custom`, `tsconfig`).

## Getting started

The package manager is **pnpm**; the API runtime is **Bun**. Install both if they
aren't already present:

```bash
# pnpm (via corepack, or just use npx as shown below)
corepack enable

# bun
curl -fsSL https://bun.sh/install | bash
```

Install dependencies from the repo root:

```bash
pnpm install
```

Copy the environment templates (both are gitignored):

```bash
cp apps/tome-web/.env.template apps/tome-web/.env
cp apps/tome-api/.env.template apps/tome-api/.env
```

Create the SQLite database:

```bash
cd apps/tome-api
bun run db:migrate:run
```

## Running it

From the repo root you can start everything with Turbo:

```bash
pnpm dev
```

Or run each app on its own:

```bash
# API — from apps/tome-api. NODE_ENV=development is required (see below).
NODE_ENV=development bun run dev

# Web — from apps/tome-web
pnpm dev
```

Then visit **http://localhost:5173**.

> **Heads up — set `NODE_ENV=development` on the API.** CORS origins are chosen by
> `NODE_ENV`, and if it's unset every cross-origin request is blocked, which shows
> up as a blank "Something went wrong" page in the web app. Full details, plus how
> to skip GitHub OAuth for local testing and how to drive a two-player match, are
> in [`CLAUDE.md`](./CLAUDE.md).

## Scripts

Run from the repo root (Turbo fans these out to every workspace):

| Command        | What it does                                  |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Start all apps in watch mode                  |
| `pnpm build`   | Build all apps                                |
| `pnpm test`    | Run the test suites                           |
| `pnpm check`   | Lint / typecheck                              |
| `pnpm format`  | Format with Prettier                          |

The API also has database helpers — `db:migrate`, `db:studio`, `dev:seed` — run
from `apps/tome-api`.

## Documentation

- **[`DOCUMENTATION.md`](./DOCUMENTATION.md)** — how the project's documentation is
  organised, and an index of the game reviews in `docs/`.
- **[`CLAUDE.md`](./CLAUDE.md)** — detailed local dev setup: dev-login bypass,
  seeding users, two-player testing, and headless-browser notes.
