# HANDOFF — read me first

**Purpose.** This file is the entry point for whoever picks up the design next
(a new agent or a later session). It says where we are, how we work, and exactly what
to nail next. When you make progress, **update this file** so it always reflects the
current frontier.

> **Convention:** the **latest** `docs/analysis/<date-slug>/` folder always contains a
> `HANDOFF.md`. If you start a new dated design/analysis folder, carry a fresh
> `HANDOFF.md` into it. (Documented in `docs/README.md` and root `CLAUDE.md`.)

## How we work

- **Debate happens in chat; the docs are the log.** The user does *not* read the docs
  as prose — you discuss ideas live, then record conclusions here. Keep docs terse and
  skimmable; separate topics into their own numbered files.
- This folder is a **living design bible** (edited in place as decisions land), unlike
  the `2026-08-17` folder, which is a frozen snapshot. When the core is actually
  **built**, write a *new* dated snapshot review and freeze this folder.
- Branch/PR: this session's work lives on `claude/card-game-design-rh90l1` and is being
  **merged**. Start follow-up work fresh from the merged default branch.

## Where we are (the game in one breath)

A simultaneous **colour-RPS** duel (Red > Green > Blue > Red; only the clash winner
connects) rebuilt around four pillars:

1. **The Tome** (doc 09) — each colour is a persistent, face-up **spellbook**; on
   attack you pick the colour **and which learned spell**. Ordered pile with a **top**;
   the top spell's **Continuous** aura is active. Opponent sees your *range*, not your
   *pick*.
2. **Quests** (doc 10) — the ramp as **RPG leveling**: Saga-like ordered tasks that
   permanently raise **base attack**. Separate **7-quest deck**; abandon costs your
   prepare.
3. **Colour × Class** (doc 12) — colour = RPS (most decks run all three); **class** =
   archetype/synergy, spans colours, printed type. Classes **grow as we make cards** —
   no upfront list.
4. **Counterplay by denial** (doc 11) — **Seal** → **Unlearn/Bounce** → **Shield/Heal
   on Lose** → **Burn** (rare). No graveyard.

Combat number model: **base attack (starts 10) + chosen spell's modifier**; effects
resolve **after damage**, then quests. Format: **13 singleton spells + 7 quests = 20**;
deck-out is **not** a loss.

**Full detail:** read docs `04` (overview + turn order) and `09`–`12`. The decisions
ledger + re-evaluation + engine deltas are in doc `08`. Front door is doc `01`.

## What to nail next (in priority order)

1. **Confirm the spell-effect taxonomy** — Learn / Hit / Lose / **Continuous** —
   and that we're **including Continuous** (auras), not going super-simple. (doc 11)
2. **Lock the top-of-tome rule** — recommended: *learning and attacking both re-top*;
   auras live only on top. (doc 09)
3. **Confirm Unlearn/Bounce** as the control primitive (hand vs deck strength). (doc 11)
4. **Design a concrete starter set for playtesting** — the real gate to all numbers:
   - ~13 spells across **all three colours**: a few vanilla hitters, ~2 **Continuous**
     auras (e.g. *Kindling*), ~2 **Seal**, ~1 **Bounce/Unlearn**, ~2 defensive
     (`Lose:` Shield/Heal), ~1 **Burn/Forget** haymaker, a couple conditional.
   - **~7 quests** with ordered tasks, incl. 1–2 **loser-completable** tasks and "OR"
     escape hatches.
   - Obey the **design laws**: no spell strictly-better than another in its colour;
     keep card text to **keywords**, not essays.
5. **Then tune numbers** by playing turns: base 10?, modifier band, ramp curve
   (+2/+3/+5?), starting HP (test 80?), hand size, mulligan, Seal duration (lean 1).
6. **Finalise keyword vocabulary** (in-world names) and let **classes emerge** from the
   starter set.
7. **Economy** later — reconcile the **rarity-tier count** (brief wants 6, all
   cosmetic; doc 07 leaned 4) and flesh out loot/craft (doc 07). World/naming in doc 06.

## Don't re-litigate (already decided — see doc 08)

Tome, quests-as-ramp, colour×class, base+modifier combat, only-winner-connects,
denial-not-graveyard, singleton, 13+7=20, deck-out≠loss, fields removed, rarity =
cosmetic only, keyword system (no Yu-Gi-Oh essays), the fixed turn order. If you want
to reopen one, say why in chat first — these were hard-won.

## When you build (engine blast radius)

Summarised in doc 08 ("Engine deltas"): `card.db.ts` (spells → base-modifier + class +
keyworded effects; new **quest** card type; retire fields), `deck.schemas.ts`
(13 singleton + 7 quests), `engine.board.ts` (stacks → tomes with a **top**; add base
attack, shield, active-quest, quest deck), `engine.turn.ts` (new order; attack selects
colour + specific spell; post-damage effects; quest step; remove field clash),
`engine.game.ts` (keep wheel; damage = base + modifier; deck-out ≠ loss); new
**Seal/Shield/Bounce/Burn/Forget/Continuous** primitives + keyword framework.
