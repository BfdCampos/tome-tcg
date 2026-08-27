# HANDOFF — read me first (2026-08-24 session)

**Purpose.** Entry point for whoever picks up next. Where we are, how we work, what to
nail next. **Update this file as you make progress** so it always reflects the frontier.

> **Convention:** the **latest** `docs/analysis/<date-slug>/` folder holds the live
> `HANDOFF.md`. A **new session/agent starts a new dated folder** and carries a fresh
> HANDOFF into it (this one). Earlier folders are the record of their session; this
> folder **supersedes them on anything it restates** (see `02-decisions-and-deltas.md`).

## The design bible lives in the previous folder

The four-pillar redesign and all its detail are in
[`../2026-08-22-design-evolution/`](../2026-08-22-design-evolution/HANDOFF.md), docs
`01`–`12`, with the decisions ledger + engine deltas in its doc `08`. **Read that first**
for the full game; this folder only carries what's *new or changed* since.

**Refs in this folder:** a bare "doc 09/10/11/12" points to the 2026-08-22 bible;
docs numbered *here* (01, 02…) are this session's.

## The game in one breath

A simultaneous **colour-RPS** duel (Red > Green > Blue > Red; only the clash winner
connects) on four pillars: **the Tome** (persistent face-up spellbooks, top-of-tome
auras), **Quests** (ramp as RPG leveling, separate 7-quest deck), **Colour × Class**
(colour = RPS, class = archetype spanning colours), **counterplay by denial** (Seal →
Bounce → Shield/Heal-on-Lose → rare Burn; no graveyard). Damage on connect =
**Power + Attack** (see terminology below). Format **13 spells + 7 quests = 20**;
deck-out ≠ loss.

## Locked / added this session (2026-08-24)

- **Effect taxonomy = Prepare / [clash pair] / Aura** — auras IN, gated to top-of-tome
  (the **active spell**). (bible doc 11, renamed in doc 03)
- **Top-of-tome = preparing AND casting both re-top**; auras live only on top. (doc 09)
- **Bounce / Bury IN** as the control primitive (bounce-to-hand, bury-to-deck). (doc 11)
- **Proficiency = scaling, gate-at-*use* not access; a per-card feature, not a keyword.**
  **ALL read-axes are IN** (diversity is the goal; one good card justifies an axis).
  → full framework in **`01-proficiency-and-scaling.md`**.
- **Choose-1-of-3 quest opener LOCKED.**
- **Rarity is PURELY COSMETIC** — art/frame/border/animations only, never power; WoW
  terms are just cosmetic-tier labels. (reaffirms bible doc 08; see doc 02)
- **Quest & terminology deltas** → **`02-decisions-and-deltas.md`**.
- **The naming pass (mostly done)** → **`03-vocabulary-and-keywords.md`** (NEW). Actual
  vs in-world word ledger. Most terms locked; **two words still open** (see below).
- **Technical platform/engine recommendation** → **`04-technical-platform-and-engine.md`**
  (NEW). Mobile+PC. Recommendation, not locked: keep the authoritative rules engine in TS
  on the server; ship one web/React client wrapped via PWA + Capacitor (mobile) + Tauri
  (desktop); reach for Godot only if the card-juice bar demands it.
- **Unity vs. the web client — full cost/benefit** → **`05-unity-and-client-engine.md`**
  (NEW, 2026-08-27). Driver: premium juice. Key finding: doc 04 undersold the repo — there's a
  **working server-authoritative TS engine** (async-generator state/VFX/log stream over WS) +
  a **Pixi 8 juice pipeline** already running, but it encodes the *old* design, so the rules
  get rewritten regardless. Recommendation: build the new-design rules once as a clean TS
  `packages/engine`, keep a disciplined serialised client↔server event protocol, keep pushing
  juice in Pixi — which makes **Path A (Unity client + TS brain)** a cheap swap *later* if the
  juice bar proves it. Don't take Path B (all-in C#). Suggested cheap tiebreaker: a one-sequence
  Pixi-vs-Unity juice spike. **Not locked — awaiting the user.**

## Terminology — the naming pass landed (see doc 03)

**Locked:** `Prepare:` (spell enters a tome — retired `Learn:`), `Aura:`, `Seal:`,
`Bounce:` (to hand), `Bury:` (to deck), `Destroy` (permanent; "Forget" killed, "Burn"
freed for fire flavour). **Shield / Heal / Health (HP)**; at 0 HP you're **knocked out**.
**Power** = character stat. **Deck** (in-world *Bundle*) / **Collection** (in-world
*Library*) / **Tome** (per-colour board pile) / **active spell** (top of a tome).
**Quest** with **Objectives** (no trophies); **Quest Deck** (in-world *Quest Journey*).
Turn beats: **Draw · Prepare · Cast · Clash**.

**Update 2026-08-27:**
- ✅ **Spell damage modifier LOCKED = `Potency`.** Damage on connect = **Power + Potency**.
- 🟡 **Clash-outcome pair: pole chosen (`plain-and-clear`), words still open.** `Deal:`/`Take:`,
  `Beat:`/`Yield:`, `Best:`/`Fold:` all **rejected** by the user ("these are bad") — so even the
  old favourite `Deal:`/`Take:` is dead now. The plain action-verb lane is thin; doc 03 §6 has
  the standing note to try **state/condition words** (a card's status, not an action) next, and
  the winner tab must read for *good-on-lose* effects (heal/shield) too, not just damage.

**⛔ One word STILL UNDECIDED — do not placeholder past it:** the clash-outcome pair (above).

## ⭐ NEXT SESSION likely starts here

1. **Close the two ⛔ words** above (clash pair + spell modifier) — the only card-facing
   vocab gaps left. Doc 03 §6 has the full context and reject lists.
2. **Classes** — the plan was "let classes emerge from named material" (doc 12); the
   material now exists. How many, names/identities, synergy weight (lean light-to-medium),
   neutral "glue" cards y/n.
3. **Scaling pattern names** — internal only, never printed (doc 01). Dislike
   Rank/Mastery/Overpower. Low priority.
4. **Wider world naming (doc 06)** — species (Tomelings?), peoples' `-kin` suffix,
   in-world book name. Out of scope for card vocab but unresolved.
5. **Technical: the engine/client call** — now framed by **doc 05** (Unity cost/benefit) on top
   of doc 04. The lead recommendation is: **rewrite the rules as a clean TS `packages/engine`
   for the new four-pillar design** (highest-value technical step, needed on every path), keep a
   **serialised client↔server event protocol**, keep pushing **Pixi** juice — which preserves
   **Path A (Unity client, TS brain)** as a cheap later swap. Open user questions in doc 05:
   two-language tax acceptable? is console/Switch ever a goal? want the Pixi-vs-Unity juice
   spike? Independent of the design work above.

## What to nail next (priority order)

1. **Finish naming** — the ⭐ block above (two open words, then classes).
2. **The concrete starter set** — the real gate to all numbers. **NOT YET** — the user
   wants to handle a few more things first, and we'll build cards then. When we do:
   ~13 singleton spells (all three colours: vanilla hitters, ~2 auras, ~2 Seal,
   ~1 Bounce, ~2 defensive, ~1 Burn, some conditional, some scaling) + ~7 quests
   (ordered tasks, 1–2 loser-completable, varied rewards). Design law: no spell
   strictly-better than another in its colour.
3. **Tune numbers** by playing turns: Power 10?, Attack band, ramp curve, starting HP
   (test 80?), hand size, mulligan, Seal duration (lean 1).
4. **Economy** later — flesh out loot/craft/packs and the **cosmetic** rarity tiers
   (count TBD; purely visual, WoW-style labels). World/naming in doc 06.

## Don't re-litigate (see bible doc 08)

Tome, quests-as-ramp, colour×class, Power+Attack combat, only-winner-connects,
denial-not-graveyard, singleton, 13+7=20, deck-out≠loss, keyword system, fixed turn
order. Reopen only with a reason in chat.
