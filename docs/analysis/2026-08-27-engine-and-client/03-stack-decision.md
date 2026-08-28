# Stack decision — Unity + C# end-to-end (mobile-first, premium feel)

> **2026-08-27 session, doc 03.** This is the **stack call**, made against three
> non-negotiable user requirements stated this session. It **supersedes** the leanings in
> `01-engine-and-unity.md` (which recommended a TS brain + Unity client, "Path A") and in
> `../2026-08-24-proficiency-and-scaling/04-technical-platform-and-engine.md` (which
> recommended the web-wrap). Those docs stay as the record of *how* we got here; **this doc
> wins** on the decision. Still not code — nothing has been built.

## The three requirements (locked by the user, "100%, not budging")

1. **The game is the user's vision.** Design authority sits with the user, always.
2. **Mobile-first, vertical-first.** Designed for phones held upright; **PC playable is a
   bonus**; **no console**.
3. **Premium feel everywhere — no cheap-app compromise.** Animations, art, code, and
   app-feel must clear the bar of *Pokémon Pocket on iPhone*. Explicitly **ruled out**:
   - a **website wrapped in an app** ("feels awful") — so **no Capacitor/PWA wrap**;
   - anything that **feels like an Android app on an iPhone** — lowest-common-denominator
     cross-platform that renders non-native and feels clunky.
   The target is: **feels like a native iPhone app anywhere**, iOS as the gold standard.

The user is **here to ship, not to learn**, and is indifferent to the underlying tech —
they'd happily have the whole thing built engine-native in a fresh repo. So the decision is
optimised for *shipping the feel*, not for reusing the current stack or for learnability.

## What requirement 3 actually selects

**For a game, "premium native iPhone feel" does NOT mean UIKit / native OS widgets.**
Pokémon Pocket, Hearthstone, and Marvel Snap use **zero** native iOS controls — each is a
**full-screen game-engine canvas** drawing every pixel at 60fps. The premium *feel* the user
wants is delivered by a **real game engine rendering a bespoke surface**, not by a toolkit
imitating iOS chrome, and not by a web view. Requirement 3 therefore:

- **kills the web-wrap** (doc 04's plan and the earlier "web-first" lean), and
- **points straight at a real game engine** as the client.

The whole premium-mobile-card-game genre being Unity is not a coincidence — it's the genre's
default for exactly this reason.

## The decision

**Unity, end-to-end, C#.** One engine → native iOS + Android from one codebase, PC as a free
export. It is the stack the reference games are built on, has the strongest 2D
animation/VFX/asset ecosystem for cards, and is the lowest-risk route to the feel bar.

### Architecture (supersedes doc 01's "keep the brain in TS")

Because the user is happy to leave TypeScript behind, the two-language hybrid loses its only
justification. The cleaner shape:

- **Rules engine = one deterministic C# library.** Pure, I/O-free, unit-tested. The single
  source of truth for clash resolution, Power + Potency, Seal/Bounce/Bury/Destroy, tomes,
  quests, proficiency scaling — the **new four-pillar design**, not the old one.
- **Authoritative server = a lightweight C# service** that references that same library. It
  holds both players' **hidden picks** and only reveals + resolves when **both are locked**
  (the un-cheatable simultaneous-commit requirement — engine-agnostic, unavoidable in any
  language).
- **Client = Unity**, running the **same** rules library locally for instant no-lag
  prediction, solo/PvE-vs-AI, and tutorials — with the server as truth for PvP.

**The win the TS-hybrid could never give:** the *exact same rules code* runs on client and
server, one language, no cross-language protocol drift. Given the user's indifference to TS,
this is strictly better for them than Path A.

### Why not the alternatives (named, so we don't re-litigate)

- **Web-wrap (Capacitor/PWA)** — rejected by requirement 3 directly. Dead.
- **TS brain + Unity client (doc 01, Path A)** — fine, but pays a permanent two-language tax
  to preserve a TS investment the user doesn't care about. Superseded.
- **Godot** — the *only* serious alternative: open-source, no license fees, strong 2D. Not
  chosen because at the "matches Pokémon Pocket on iPhone" bar, Unity's iOS-polish track
  record and asset ecosystem de-risk more, and cost/tech are explicitly not constraints here.
  Revisit only if Unity licensing terms become a real problem.
- **Native Swift/Metal + separate Android** — best-possible iOS feel, but **two clients** to
  build and maintain; violates the one-codebase pragmatics for a solo shipper. Out.

## Two honest truths (not fantasy)

1. **Unity can also feel like a clunky Android port if built lazily.** The premium feel is a
   **discipline, not a default**: full-screen 60fps, respect the notch/safe-area insets, real
   gesture handling (drag/flick cards, not tap-only), haptics on meaningful beats, no janky
   scrolling, instant input response with server reconciliation behind it. These are guardrails
   we commit to from day one, not polish bolted on later.
2. **The authoritative PvP server is the one ongoing cost/complexity** for a solo shipper
   (hosting + ops). The pragmatic default for a turn-based card game is an **async-turn model**
   ("take your turn, opponent is notified") — cheaper and more mobile-natural than always-on
   realtime, and a perfect fit for this game. Realtime live matches can come later. Netcode is
   not hand-rolled either way; managed/backend options exist (evaluate at build time).

## Feel guardrails (bank these for the build)

- Vertical-first layout; every screen designed for one-handed phone use.
- 60fps target; never block the main thread on network — predict locally, reconcile with server.
- Honour safe areas / Dynamic Island / home indicator; no content under the notch.
- Gestural card handling (pick up, drag, flick to cast), not just taps.
- Haptics + sound on clash/reveal/damage; motion with easing, never linear/robotic.
- Test on a real iPhone early and often — the bar is *felt*, not spec'd.

## What the build looks like (shape only — NOT actioned)

This lands as a **fresh Unity-native repo**, not a bolt-on to the current TS monorepo. The
existing TS engine encodes the *old* design and becomes **reference material, not a
foundation**. The new repo would contain, roughly:

- `rules/` — the deterministic C# rules library + unit tests (the four-pillar engine).
- `server/` — the thin C# authoritative match service (async-turn first) referencing `rules/`.
- `unity/` — the Unity project: vertical-first mobile scenes, card/tome/quest views, the juice
  layer, referencing `rules/` for local prediction.
- `content/` — data-driven card + quest definitions (JSON/asset), so the starter set and future
  sets are **content, not code**.

**Nothing has been created.** Per the user's instruction, no repo, no scaffold, no code — this
doc records the decision only. The build starts when the user says go.

## Open items (for when we build — not now)

- **Backend hosting/netcode choice** (managed match service vs. custom .NET) — decide at build.
- **Realtime vs async-turn** for launch — leaning async-turn; confirm with the design.
- **Card-content pipeline format** — ties to the eventual starter-set build.
- **The rules engine itself still needs the new design finalised** (classes, starter set,
  numbers) before it can be filled in — the *shape* can start ahead of that; content follows.
