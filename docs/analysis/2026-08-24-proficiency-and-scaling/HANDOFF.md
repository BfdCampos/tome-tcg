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
  → full framework in **`01-proficiency-and-scaling.md`** (NEW).
- **Quest & terminology deltas** (varied rewards, rare thematic OR-hatches, choose-1-of-3
  opener, multi cash-in, Power/Attack) → **`02-decisions-and-deltas.md`**.

## Terminology (working — naming still open)

**Power** = character stat (was "base attack"; starts 10, raised only by quests).
**Attack** = a spell's modifier. **Damage on connect = Power + Attack.**

## What to nail next (priority order)

1. **The concrete starter set** — the real gate to all numbers:
   - ~13 singleton spells across all three colours: a few vanilla hitters, ~2 auras,
     ~2 Seal, ~1 Bounce, ~2 defensive (`Lose:` Shield/Heal), ~1 Burn haymaker, a couple
     conditional, and a **few scaling cards** (doc 01) — **pick which read-axes debut**.
   - ~7 quests: ordered tasks, 1–2 loser-completable, varied reward tables, OR-hatches
     only where thematically earned.
   - Design laws: no spell strictly-better than another in its colour; a card states its
     own effect in keywords, never the game's rules.
2. **Tune numbers** by playing turns: Power 10?, Attack band, ramp curve, starting HP
   (test 80?), hand size, mulligan, Seal duration (lean 1).
3. **Finalise vocabulary** — keyword taxonomy (doc 11) + terminology (Power/Attack and
   names for the scaling patterns); let **classes emerge** from the set.
4. **Economy** later — rarity-tier count (brief wants 6; bible doc 07 leaned 4; user
   leans **WoW gear tiers**, not bound to it) + loot/craft. World/naming in doc 06.

## Don't re-litigate (see bible doc 08)

Tome, quests-as-ramp, colour×class, Power+Attack combat, only-winner-connects,
denial-not-graveyard, singleton, 13+7=20, deck-out≠loss, keyword system, fixed turn
order. Reopen only with a reason in chat.
