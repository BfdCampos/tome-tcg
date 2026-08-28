# HANDOFF — read me first (2026-08-28 session)

**Purpose.** Entry point for whoever picks up next. This session **reviewed the 2026-08-27 build
spec as a cold hand-off sheet, found its open decisions, and closed them with the owner** in a long
back-and-forth. The output is a **decision-closed build spec** ready to hand to a fresh agent in a
fresh repo. **Update this file as you make progress.**

> **Convention:** the **latest** `docs/analysis/<date-slug>/` folder holds the live `HANDOFF.md`.
> A new session starts a new dated folder (this one). Earlier folders are the frozen record; this
> folder **supersedes them on anything it restates**.

## The game in one breath

A simultaneous **colour-RPS** duel (Red > Green > Blue > Red; only the clash winner connects, a
same-colour tie deals mutual chip) on four pillars: **the Tome** (persistent face-up spellbooks,
top-of-tome auras), **Quests** (ramp as RPG leveling, separate 7-quest deck), **Colour × Class**,
**counterplay by denial** (Seal / Lock / Dampen / Bounce / Bury / rare Destroy; no graveyard).
Damage on connect = **Power + Potency**. Format **13 spells + 7 quests = 20**, singleton;
deck-out ≠ loss.

## What this folder contains (read in order)

- **[`01-spec-review.md`](./01-spec-review.md)** — the verdict on the 2026-08-27 build spec: strong
  structure, ~30 open decisions across 7 clusters. The answer to *"are we missing anything."*
- **[`02-decisions.md`](./02-decisions.md)** — the **authoritative ledger** of every decision
  locked this session (~35). Where anything older disagrees, this wins.
- **[`03-classes.md`](./03-classes.md)** — the seven starting classes (Pyro/Cryo/Geo/Airo/Hydro/
  Somo/Astro), ideation only.
- **[`04-build-spec-v2.md`](./04-build-spec-v2.md)** — ⭐ **the deliverable.** A self-contained,
  decision-closed rewrite of the build spec. **Hand this to the fresh agent** as `docs/BUILD-SPEC.md`
  and kick off at Milestone 1. It supersedes the 2026-08-27 `04-build-spec.md` *for the build*.

## Headline decisions locked this session (full list in doc 02)

- **Opening hand → 3** (was 5), draw 1 every turn incl. turn 1; **mulligan-to-N**.
- **One combined hidden commit** per turn (Prepare + Cast together); `Prepare:` resolves at reveal.
- **Ties are not nothing:** mutual chip `floor(Power×0.10)` + a new **`Tie:`** tab on a few cards.
- Denial vocabulary **split**: **`Seal:`** = spell lock, **`Lock:`** = colour lock (rare),
  **`Dampen:`** = Potency-to-+0. Durations card-specified.
- **Quests: no per-turn objective cap** (resolves a spec contradiction).
- **Tome** is an ordered pile; removing the top **re-exposes the previous top**; growth **resets**
  on leaving; removal targets are **card-specified**.
- **Determinism:** no first player; **snapshot reads + fizzle-on-gone + permanence precedence**
  (`Destroy > Bury > Bounce > Seal/Dampen`).
- **Multi-COLOUR is a starter feature** (colour locked at Prepare, per-colour profiles, resets on
  bounce); **multi-CLASS is expansion** (engine supports a list; one throwaway test card).
- Global laws: **draw guardrail** (no pure card advantage), **Power only from quests** (Somo never
  grants Power), HP **caps at max**, Shield **capped ~20**, **no turn cap**.

## ⭐ NEXT SESSION likely starts here

The design is now closed enough to **build M1** from `04-build-spec-v2.md`. Remaining OPEN items are
deliberately deferred and marked in the spec:
1. **The concrete starter set & final numbers** — tune by playing (the §7 content is provisional).
2. **Backend hosting / netcode** — decide at M2.
3. **Full class archetypes** — designed with the starter set; `03-classes.md` is the north star.
4. **Economy & cosmetic rarity tiers** — later.

## Don't re-litigate (see bible doc 08 + this folder's doc 02)

Tome, quests-as-ramp, colour×class, Power+Potency combat, only-winner-connects, tie-chip,
denial-not-graveyard, singleton, 13+7=20, deck-out≠loss, one-combined-commit, no-first-player
determinism, fixed turn order. Reopen only with a reason in chat.
