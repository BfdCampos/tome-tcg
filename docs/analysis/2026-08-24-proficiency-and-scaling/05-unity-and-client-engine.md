# Unity & the client engine — the real cost of each path

> Follows on from **doc 04** (platform recommendation). The user is pulling toward a real
> game engine (**Unity**), driven specifically by the **premium juice/animation** bar —
> Hearthstone-tier card feel. This doc lays out the honest cost/benefit of the paths so the
> call can be made with numbers, not vibes. **A recommendation, not a locked decision.**

## First: correct doc 04's framing of the repo

Doc 04 called the current repo "a thin web+API seed." **That undersells what exists.** A real,
working, server-authoritative engine is already here (`apps/tome-api/src/features/engine/`,
~1.8k LoC + tests):

- **Server-authoritative rules already run** — clash resolution (colour RPS), combat stack,
  turn phases, a **hook system** (`onClashWin`/`onClashLose`/`beforeDraw`/`beforeCast`…),
  player-action prompts with timeouts, win detection. Tests for clash, hooks, win, actions.
- **The engine streams, it doesn't return.** `handleTurn` is an `async function*` that
  `yield`s a union of `GameState | VfxIteration | LogIteration` as the turn unfolds. The
  server pumps that stream over **WebSockets** (`game.pubsub.ts`), sanitising hidden info
  per side. The client replays state + fires VFX + appends log from one ordered event stream.
- **A juice pipeline already exists on the client.** The web app runs **PixiJS 8** (WebGL)
  with a **custom particle system** (`lib/vfx.ts`), plus **framer-motion** and **zustand**.
  The server emits semantic VFX intents (`highlight`, `attack`, with entity targets like
  `card`/`player`/`stack`); the client resolves them to on-screen positions and plays them.

So the architecture doc 04 *recommended* (TS rules on server, Pixi client, shared types over
WS) is **already built and running**. The question isn't "how do we get there" — it's "do we
throw the client half away for Unity."

## Second: the fact that reframes everything

**The engine encodes the OLD design.** It has `field` cards and `spell` cards, `attack`/`heal`
numbers, an `onClashWin`/`onClashLose` taxonomy — the pre-redesign model. It has **no** Tome
piles, **no** Quests-as-ramp, **no** Prepare/active-spell/Aura, **no** Seal/Bounce/Bury/Destroy,
**no** Power+Potency, **no** proficiency scaling. (See the 2026-08-22 bible + this folder.)

⇒ **The rules engine gets substantially rewritten no matter which client we choose.** That's
the single most important cost fact in this whole decision, and it cuts against the instinct
that "Unity means starting over." *We're partly starting over on the rules regardless.* The
real question is only about the **client and the language boundary**, because:

- The **~13+7 card content, numbers, classes** don't exist yet (design still in progress) — so
  there's little card-logic to "port." Whatever engine we pick gets fed the *new* design fresh.
- What genuinely exists and has value: the **turn/phase state machine shape**, the **hook
  pattern**, the **WS streaming protocol**, the **Pixi VFX vocabulary**, and the **React UI**
  (lobby, deckbuilder, card component, hand, timers). Those are the assets a Unity move risks.

## The juice question, answered honestly

The driver is premium animation. Two things must be said plainly:

1. **Hearthstone is Unity.** The gold standard for card juice was built in Unity, and Unity's
   asset store (Spine 2D, shader graph, particle systems, DOTween, card-game kits) is the
   deepest for exactly this. If the ceiling you're chasing is "board reacts to everything,
   golden legendaries, screen-shake, physical-feeling cards," Unity is the shortest path to
   the *top* of that ceiling. This is real and it's the honest case *for* Unity.

2. **But web/Pixi is not the low-juice option people assume.** Marvel Snap-tier and
   Slay-the-Spire-tier presentation ship on Cocos/web/Pixi routinely; Pixi is WebGL, so
   shaders, particles, spritesheets, Spine runtimes, and Lottie all exist for it. The current
   repo already fires particle bursts and attack tweens off engine events. The gap between
   "very good web card juice" and "Hearthstone" is **real but narrow**, and it's mostly *asset
   production + animator-hours*, **not** engine capability. You can spend those hours in Pixi.

**The uncomfortable truth:** at this stage the juice ceiling is gated by **art/animation
assets you don't have yet**, not by the renderer. Unity buys you a better *tooling + asset
marketplace* for producing that juice, not a categorically different result. Whether that
tooling advantage is worth a second language is the whole decision.

## The paths, costed

### Path C — baseline: stay web (grow what exists) · *the current trajectory*
Rewrite the rules engine for the new design **in place** (TS), keep the Pixi/React/WS client,
push the juice via Pixi + Spine/Lottie + more animator time. Wrap with Capacitor/Tauri for
native (doc 04).

### Path A — hybrid: TS rules on server, **Unity as the client renderer**
Keep the authoritative engine in TS (rewritten for the new design, server-side). Replace the
**web client** with a **Unity client** that talks the same WS/state-stream protocol. Unity does
what Unity is best at (rendering + juice); rules stay in the tested, hot-reloadable TS world.

### Path B — all-in: **port everything to C#/Unity**
Rewrite rules **and** client in C#. Authoritative logic runs in C# (Unity headless / a C#
server like Mirror/Fish-Net, or a custom .NET authoritative service). Leave the TS monorepo.

### Cost matrix (H = high cost/risk, M = medium, L = low, ★ = advantage)

| Axis | C · Web (baseline) | A · TS rules + Unity client | B · All-in C#/Unity |
|---|---|---|---|
| **Rules rewrite for new design** | Rewrite in TS (unavoidable) — reuse hook/phase shapes ★ | Same TS rewrite, reused ★ | Rewrite **and** re-language to C# — H |
| **Languages / stacks** | One (TS) ★ | **Two** (TS rules + C# client) — M | One (C#), but new to you — M |
| **Throw-away from today** | ~none ★ | Web **client** discarded (Pixi VFX, React game UI) — M | Client **and** engine + WS layer discarded — H |
| **Netcode / protocol** | Reuse WS stream ★ | **Re-implement** the state-stream + VFX protocol consumer in C# — M/H | New C# netcode end-to-end — H |
| **The async-generator problem** (below) | N/A — native ★ | Must design a **wire protocol** that survives the JS→C# boundary — M | Re-express streaming as C# `IEnumerator`/async — M |
| **Juice ceiling** | Very good (Pixi+Spine) — M | **Best** (Unity) ★ | **Best** (Unity) ★ |
| **Asset ecosystem for cards** | Decent (web libs) | **Deep** (Unity store) ★ | **Deep** (Unity store) ★ |
| **Iteration speed on rules** | Instant (Bun watch, unit tests) ★ | Instant (rules still TS) ★ | Slower (Unity compile/play loop) — M |
| **Hiring / your skills** | TS (have it) ★ | TS + **C#/Unity (new)** — M | **C#/Unity (new)** — M/H |
| **Native mobile/PC** | Capacitor/Tauri glue — M | Unity native ★ | Unity native ★ |
| **Licensing** | None ★ | Unity runtime-fee history to watch — M | Unity runtime-fee history to watch — M |
| **Time to a playable new-design build** | **Shortest** ★ | Medium | **Longest** — H |

### The async-generator problem (the concrete Unity gotcha)

The engine's whole control flow is `async function*` + `yield*` — it *pauses mid-turn* to await
a player action, then resumes, emitting a stream of typed iterations. This is idiomatic
TS/JS and does **not** cross into C# cleanly:

- **Path A survives it easily** *because it doesn't cross the boundary* — the generator stays
  on the TS server; Unity only consumes the already-serialised `{state|vfx|log}` events off the
  socket. This is the main structural argument for A over B: the hard, clever part of the engine
  never has to be rewritten in a foreign paradigm.
- **Path B must re-express it** as C# `IEnumerator` coroutines / `IAsyncEnumerable` / a
  state-machine — doable, but you're rewriting the trickiest code in the repo in a language
  you don't yet use, and re-testing all of it.

## Recommendation (given the juice driver)

**Lead with Path C, architected so Path A is a drop-in later. Do not take Path B.**

Reasoning:

1. **The juice ceiling is currently gated by assets you don't have, not the renderer.** Until
   there's a starter set, real card art, and an animation language, Unity's advantage is
   latent — you'd be paying the two-language tax now for polish you can't produce yet.
2. **The rules rewrite is unavoidable and belongs in TS** (fast iteration, existing tests,
   shared types, feeds an AI/PvE bot). *Every* path keeps or wants that. So build it once, in
   TS, cleanly separated from HTTP/WS — a pure `packages/engine`. **This is the highest-value
   next technical step regardless of the client decision**, and it's the doc-04 "rules engine
   as a standalone module" item.
3. **Keep the client boundary a clean, serialised event protocol** (it nearly is already:
   sanitised `state` / `vfx` / `log` over WS). If that boundary is disciplined, **swapping the
   Pixi client for a Unity client (Path A) becomes a contained project later** — you keep the
   authoritative brain and re-skin the body. That preserves the Unity option *at full strength*
   without committing to it before the juice bar is real.
4. **Revisit Unity (Path A) at the moment the juice bar is concrete** — i.e. when you have art
   direction, a card-play animation spec, and evidence Pixi is fighting you. Decide it then,
   from a working game, not now from an empty card list.

Path B (all-in C#) only makes sense if you *also* want to leave TS for team/skills reasons —
and the user's stated driver is juice, not language. It pays the maximum cost to buy the same
juice ceiling as A.

## What this means for next steps (technical track only — design work is independent)

1. **Extract/rewrite the rules engine as `packages/engine`** against the **new four-pillar
   design**: Tomes, active-spell/Aura, Prepare/Cast/Clash beats, Seal/Bounce/Bury/Destroy,
   Quests-as-ramp with Objectives, Power+Potency, proficiency scaling. Pure, deterministic,
   I/O-free, unit-tested. (Blocked *only* by design decisions still landing — the *shape* can
   start now; the card content fills in when the starter set is built.)
2. **Freeze the client↔server event protocol** as an explicit, versioned, serialisable
   contract (state diff / vfx / log). Today it's implicit in the TS types shared across the
   monorepo; making it explicit is what keeps Path A cheap.
3. **Keep pushing juice in Pixi** on the existing client to find the *actual* ceiling — the
   result tells you whether Unity is worth it far better than this doc can.
4. **Defer the Unity call** to that evidence point. If/when taken, it's **Path A** (Unity
   client, TS brain), not a rewrite.

## Open questions for the user

- **Is the two-language tax (Path A) acceptable later**, or is a single-language shop a hard
  requirement? (If the latter, the honest answer flips toward either committing to web/TS **or**
  biting off Path B early — not the A hybrid.)
- **How native is "native"?** If **Switch/console** is ever a goal, that's a genuine thumb on
  the scale for Unity (Path A/B) that web-wrap can't match. If it's iOS/Android/PC/Mac,
  Capacitor/Tauri covers it.
- **Do you want a spike?** A cheap, high-signal experiment: build **one card-play sequence at
  target juice** twice — once in Pixi (extend what's here), once in a throwaway Unity scene
  driven by canned events — and compare effort-to-result. That answers the Unity question
  empirically for ~days of work, not a rewrite.
