# Documentation

Project documentation for Tome TCG. (For local dev setup — install, run,
dev-login, seeding — see [`CLAUDE.md`](../CLAUDE.md) at the repo root.)

## How this is organised

```
docs/
  README.md         ← you are here: what lives in docs/ and how it's organised
  analysis/         ← dated folders: reviews (snapshots) and design sessions (living)
    <YYYY-MM-DD-slug>/   one dated folder per review/session
      NN-topic.md        numbered files, read in order
```

### `analysis/` — dated reviews and design sessions

Two kinds of folder live here, both dated `YYYY-MM-DD-slug` with numbered files:

- **Reviews** are **snapshots**: they reflect the codebase and understanding on the
  date in the folder name and are *not* edited later to stay "current". When the
  game changes materially, add a **new** dated folder rather than rewriting an old
  one — preserving the history of how the design and assessment evolved.
- **Design sessions** are **living**: they capture a direction we're actively
  deciding on and *are* edited in place as choices lock. They describe *proposed*
  changes, not necessarily shipped code. Once a session's changes are built, a new
  **review** snapshot records the as-shipped game.

## Reviews & sessions

### [`analysis/2026-08-17-initial-game-review/`](./analysis/2026-08-17-initial-game-review/)

The first full review, from a complete read of the engine and card database:

1. [How the game works](./analysis/2026-08-17-initial-game-review/01-how-the-game-works.md) — the rules as enforced by the engine.
2. [Play-by-play: 6 turns](./analysis/2026-08-17-initial-game-review/02-play-by-play-6-turns.md) — a worked example match.
3. [Summary & comparisons](./analysis/2026-08-17-initial-game-review/03-summary-and-comparisons.md) — identity vs Yu-Gi-Oh, Magic, Pokémon, Pokémon Pocket, Lorcana, Flesh and Blood.
4. [Completion status](./analysis/2026-08-17-initial-game-review/04-completion-status.md) — how far from a launchable mobile game, scored by dimension.
5. [Originality & ratings](./analysis/2026-08-17-initial-game-review/05-originality-and-ratings.md) — originality, complexity, and other ratings.

### [`analysis/2026-08-22-design-evolution/`](./analysis/2026-08-22-design-evolution/) — *living design session*

A working session (not a snapshot) that revisits the core design after simulated
play surfaced four frictions: hand-clog from the one-action rule, clunky field
cards, a possibly-too-big deck, and combat that plays as pure rock-paper-scissors.
Proposes a new **reactive card type** as the centrepiece, and sketches the world,
naming, story mode, and a not-pay-to-win economy. **Actively edited as decisions
land.**

The session **converged on a substantially redesigned game** — a persistent
**Tome** (spellbook) board, **Quests** as an RPG-leveling ramp, a two-axis
**Colour × Class** deckbuilding model, and **denial-based counterplay** (no
graveyard). Docs 04 and 09–12 are the new core spec; 01/05/08 were updated to match;
02/03/06/07 keep their original reasoning trails with resolution notes.

*Front door & cross-cutting*
1. [Design goals & summary](./analysis/2026-08-22-design-evolution/01-design-goals-and-summary.md) — pillars, the **decisions-locked** table, and what's still open.
2. [The one-action-per-turn rule](./analysis/2026-08-22-design-evolution/02-the-one-action-rule.md) — the hand-clog problem (resolved by the tome + quests).
3. [Removing fields & ambient effects](./analysis/2026-08-22-design-evolution/03-removing-fields-and-ambient-effects.md) — why fields are clunky; the parked weather/omen niche.

*The redesigned core*
4. [The core redesign](./analysis/2026-08-22-design-evolution/04-the-core-redesign.md) — the four new pillars and the canonical turn order (overview).
9. [The Tome](./analysis/2026-08-22-design-evolution/09-the-tome.md) — persistent spellbooks, singleton, base attack + spell modifiers.
10. [Quests & the ramp](./analysis/2026-08-22-design-evolution/10-quests-and-the-ramp.md) — Saga-like leveling, the separate quest deck, abandon rules.
11. [Combat, keywords & counterplay](./analysis/2026-08-22-design-evolution/11-combat-keywords-and-counterplay.md) — keyword system, timing, and the Seal/Shield/Burn tiers.
12. [Colour × Class](./analysis/2026-08-22-design-evolution/12-colour-and-class.md) — the two-axis archetype system (RPS colour × class synergy).

*Format, world & meta*
5. [Deck size & format](./analysis/2026-08-22-design-evolution/05-deck-size.md) — **13 spells + 7 quests = 20**, singleton, deck-out is not a loss.
6. [World, theme & naming](./analysis/2026-08-22-design-evolution/06-world-theme-and-naming.md) — the plot, naming the creatures/peoples, and an in-world lexicon.
7. [Economy & progression](./analysis/2026-08-22-design-evolution/07-economy-and-progression.md) — packs, cosmetic rarities, crafting, loot, and the anti-pay-to-win guardrails.
8. [Decisions, evaluation & open questions](./analysis/2026-08-22-design-evolution/08-open-questions-and-decisions.md) — the ledger, the re-evaluation table, and the engine deltas for when we build.

---

## Appendix to the 2026-08-17 review

**Addressed since that review was written** (the snapshot still describes the
pre-fix state):

- **Colour-wheel direction** — the review documents the wheel as it was in the code
  (`red > blue > green > red`), which was a bug. The intended wheel is
  `red > green > blue > red`, corrected in **PR #1**. The play-by-play (doc 02) still
  uses the original direction and is flagged inline.
- **Win condition** — the review notes there was no win/lose check (the turn loop
  recursed forever). A win condition (a player at 0 HP loses) was added in **PR #2**.
