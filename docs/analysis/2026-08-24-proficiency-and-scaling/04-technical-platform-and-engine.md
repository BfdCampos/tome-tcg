# Technical — platform & engine (where to build this)

> A **recommendation, not a locked decision.** The purpose is to give the next agent (and
> the user) a defensible starting position for building the real game across **mobile + PC**,
> and to name the trade-offs so the choice can be made deliberately. Nothing here is
> committed; the current repo is a thin web+API seed, not the final architecture.

## The one constraint that drives everything: server-authoritative

The game is **simultaneous, hidden commit** (both players pick blind, reveal together — the
whole bluff pillar, docs 04/09). That means the client **cannot** be trusted to adjudicate a
clash: if either client knew the opponent's pick before locking its own, the game is broken;
if a client computes damage, it can cheat. So:

- **The rules engine (clash resolution, damage = Power + modifier, Seal/Bounce/Bury/Destroy,
  quest objectives, tome/active-spell state) MUST run on an authoritative server.** Clients
  submit *intents* ("prepare card X", "cast colour R with spell Y"); the server validates,
  resolves, and streams back the resulting state.
- This is a **networked multiplayer** game first. The renderer is almost a detail next to
  getting the authoritative state machine right.

**Consequence:** decouple *where the rules live* (server) from *what draws the cards*
(client). Pick each independently. This also means the **rules engine should be a standalone,
well-tested TS module** — reusable by the server, by a local "hot-seat"/PvE mode, and by an AI
opponent — not tangled into HTTP handlers.

## Recommendation in one line

**Keep the authoritative game engine in TypeScript on the server (grow it out of the existing
Bun/Elysia API), and ship a single web/React client wrapped natively for the three targets:
PWA/browser on PC, Capacitor for iOS/Android, Tauri for desktop.** Reach for a real game
engine (Godot) only if the card "juice" bar turns out to demand it.

Rationale: the game is **turn-based and low-twitch** — it does not need a 60fps physics
engine. The repo is **already a TypeScript monorepo** (Remix web + Elysia/Bun API, see
`CLAUDE.md`). One language across client, server, and rules engine is a massive velocity and
correctness win for a solo/small team, and lets the rules module be shared everywhere.

## Client options (all can hit mobile + PC)

| Option | Mobile + PC story | Fit with this repo | Card-game "juice" | Verdict |
|---|---|---|---|---|
| ★ **Web/React client, wrapped** (PWA + **Capacitor** iOS/Android + **Tauri** desktop) | One codebase → browser, native mobile, native desktop | **Perfect** — reuses the TS/Remix stack; rules module shared with server | Good — **PixiJS** (WebGL) for the card table + **Framer Motion**/GSAP for UI juice; DOM/Canvas hybrid | **Recommended.** Fastest, one language, cheapest to maintain. |
| **Godot 4** client (TS server stays authority) | Excellent native exports: iOS, Android, Windows, macOS, Linux, + Web | Adds a **second language** (GDScript/C#) and a second build pipeline | **Excellent** — real 2D engine, best animation/particle story, controller support | **Strong alternative** if the premium Hearthstone-feel bar is high and a second stack is acceptable. Free/open-source, no royalties. |
| **Unity** | Industry default; exports everywhere | Foreign to the stack; C#; heavier builds; licensing/runtime-fee history to watch | **Best-in-class** asset ecosystem for card games | Only if you want maximal polish/asset store and will fully leave the TS world. Overkill for v1. |
| **Flutter + Flame** | One Dart codebase → mobile + desktop + web | Foreign language; would replace the web stack | Decent 2D via Flame | Coherent, but no advantage over the web-wrap given the existing TS investment. |
| **Cocos Creator** | Popular for mobile card games; mobile + web + desktop | Foreign editor/runtime | Good 2D, card-game-proven | Viable but niche here; no reason to prefer over Godot. |

## Suggested architecture (if we take the recommended path)

- **Rules engine** — a pure TS package (`packages/engine` or `apps/tome-api/src/game/engine`),
  **no I/O, fully deterministic and unit-tested**. Input: current match state + a validated
  action. Output: next state + events. This is the single source of truth and the thing worth
  building carefully first (it's also what the whole design so far describes).
- **Server** — grow the existing **Elysia on Bun**. Adds: matchmaking, a match actor/room per
  game holding authoritative state, **WebSocket** for live turns (both clients hold a pick,
  server reveals on both-locked), persistence in SQLite/libsql (already in use), Lucia auth
  (already in use). Turn-based means an **async/notify** model is also viable later (play a
  turn, opponent notified) — the same engine serves both.
- **Client** — **React** (the repo is Remix today; a Vite SPA/Expo-Router split is an open
  choice). Card table rendered with **PixiJS** for the animated felt + cards; menus/store in
  regular React. Wrapped with **Capacitor** (mobile) and **Tauri** (desktop); **PWA** for
  browser. Input designed **touch-first**, pointer/keyboard on PC.
- **Shared types** — the monorepo shares the engine's TS types between server and client, so a
  card definition or state shape is defined once.

## Things to decide (open technical questions for the next agent)

1. **Engine call:** ratify the web-wrap recommendation, or choose **Godot** for a premium
   client. This gates everything below.
2. **Client framework specifics** if web: keep **Remix**, or move to a **Vite SPA** (SSR is
   off already per `CLAUDE.md`) — and how PixiJS embeds.
3. **Realtime transport:** WebSocket rooms for live PvP (recommended) vs async-turn + push
   notifications vs both. Turn-based makes async cheap and mobile-friendly.
4. **Where AI/PvE runs:** the shared TS engine enables a local/server bot for story mode
   (doc 06) — decide server-side vs on-device.
5. **Card content pipeline:** how card definitions are authored/stored (data-driven JSON/DB so
   the ~13+7 starter set and future sets are content, not code) — ties to the eventual
   starter-set build.
6. **Migration from the current seed:** the repo today is a login/lobby-ish web+API skeleton.
   Decide what to keep vs rebuild once the engine package lands.

> None of this blocks the design work. The design (cards, numbers, classes, naming) can and
> should keep progressing independently — the engine choice mainly affects *when* and *how* we
> build the playable client, not *what the game is*.
