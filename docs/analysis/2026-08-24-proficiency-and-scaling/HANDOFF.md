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

- **Effect taxonomy = Learn / Hit / Lose / Continuous** — Continuous auras IN, gated to
  top-of-tome. (bible doc 11)
- **Top-of-tome = learning AND attacking both re-top**; auras live only on top. (doc 09)
- **Unlearn/Bounce IN** as the control primitive (to-hand common, to-deck rarer). (doc 11)
- **Proficiency = scaling, gate-at-*use* not access; a per-card feature, not a keyword.**
  **ALL read-axes are IN** (diversity is the goal; one good card justifies an axis).
  → full framework in **`01-proficiency-and-scaling.md`** (NEW).
- **Choose-1-of-3 quest opener LOCKED.**
- **Rarity is PURELY COSMETIC** — art/frame/border/animations only, never power; WoW
  terms are just cosmetic-tier labels. (reaffirms bible doc 08; see doc 02)
- **Quest & terminology deltas** (varied rewards, rare thematic OR-hatches, opener,
  multi cash-in, Power/Attack) → **`02-decisions-and-deltas.md`**.

## Terminology (working — naming still open)

**Power** = character stat (was "base attack"; starts 10, raised only by quests).
**Attack** = a spell's modifier. **Damage on connect = Power + Attack.**

## ⭐ NEXT SESSION likely starts here — NAMING / VOCABULARY

The user plans to pick up **naming** next. Nothing below is named to satisfaction:
- **Power / Attack** — provisional; the character-stat vs spell-modifier split is
  agreed, the *words* are not.
- **The scaling patterns** — we actively dislike Rank / Mastery / Overpower. Need
  in-world names (and note these are NOT printed keywords — see doc 01).
- **The keyword taxonomy** (Learn / Hit / Lose / Continuous / Seal / Bounce / Burn /
  Forget …) — bible doc 11 flags this as its own pass; "Seal" is the quality bar
  (descriptive, in-theme). Do this alongside Power/Attack.
- Then let **classes emerge** from named material.

## What to nail next (priority order)

1. **Naming / vocabulary** — the ⭐ block above.
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
