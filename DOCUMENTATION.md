# Documentation

How the project's documentation is organised, and an index of what lives in
[`docs/`](./docs). For running the project locally, see the
[README](./README.md); for detailed dev setup (dev-login, seeding, two-player
testing), see [`CLAUDE.md`](./CLAUDE.md).

## Layout

```
docs/
  analysis/         dated folders: reviews (snapshots) and design sessions (living)
    <YYYY-MM-DD-slug>/   one dated folder per review/session
      NN-topic.md        numbered files, read in order
```

## `analysis/` — dated reviews and design sessions

Two kinds of folder live here, both dated `YYYY-MM-DD-slug` with numbered files:

- **Reviews** are **snapshots**: they reflect the codebase and understanding on the
  date in the folder name and are *not* edited later to stay "current". When the
  game changes materially, add a **new** dated folder rather than rewriting an old
  one — preserving the history of how the design and assessment evolved.
- **Design sessions** are **living**: they capture a direction we're actively
  deciding on and *are* edited in place as choices lock. They describe *proposed*
  changes, not necessarily shipped code. Once a session's changes are built, a new
  **review** snapshot records the as-shipped game.

> **Handoff convention.** Whenever we're **documenting and discussing** a design, the
> **latest** analysis folder contains a **`HANDOFF.md`** — the read-me-first entry
> point capturing current state, how we work, and exactly what to nail next, so a new
> agent or session can pick up cleanly. Keep it current; carry a fresh one into any
> new dated folder. The debate happens in chat — **the docs are the log**, kept terse
> and split by topic.

## Reviews & sessions

### [`analysis/2026-08-17-initial-game-review/`](./docs/analysis/2026-08-17-initial-game-review/)

The first full review, from a complete read of the engine and card database:

1. [How the game works](./docs/analysis/2026-08-17-initial-game-review/01-how-the-game-works.md) — the rules as enforced by the engine.
2. [Play-by-play: 6 turns](./docs/analysis/2026-08-17-initial-game-review/02-play-by-play-6-turns.md) — a worked example match.
3. [Summary & comparisons](./docs/analysis/2026-08-17-initial-game-review/03-summary-and-comparisons.md) — identity vs Yu-Gi-Oh, Magic, Pokémon, Pokémon Pocket, Lorcana, Flesh and Blood.
4. [Completion status](./docs/analysis/2026-08-17-initial-game-review/04-completion-status.md) — how far from a launchable mobile game, scored by dimension.
5. [Originality & ratings](./docs/analysis/2026-08-17-initial-game-review/05-originality-and-ratings.md) — originality, complexity, and other ratings.

**Addressed since that review was written** (the snapshot still describes the
pre-fix state):

- **Colour-wheel direction** — the review documents the wheel as it was in the code
  (`red > blue > green > red`), which was a bug. The intended wheel is
  `red > green > blue > red`, corrected in **PR #1**. The play-by-play (doc 02) still
  uses the original direction and is flagged inline.
- **Win condition** — the review notes there was no win/lose check (the turn loop
  recursed forever). A win condition (a player at 0 HP loses) was added in **PR #2**.

### [`analysis/2026-08-22-design-evolution/`](./docs/analysis/2026-08-22-design-evolution/) — *living design session*

A working session (not a snapshot) that revisits the core design after simulated
play surfaced four frictions: hand-clog from the one-action rule, clunky field
cards, a possibly-too-big deck, and combat that plays as pure rock-paper-scissors.
The session **converged on a substantially redesigned game** — a persistent
**Tome** (spellbook) board, **Quests** as an RPG-leveling ramp, a two-axis
**Colour × Class** deckbuilding model, and **denial-based counterplay** (no
graveyard). Docs 04 and 09–12 are the new core spec; 01/05/08 were updated to match;
02/03/06/07 keep their original reasoning trails with resolution notes. **The
four-pillar design bible** — continued by the 2026-08-24 session below.

**▶ [HANDOFF.md](./docs/analysis/2026-08-22-design-evolution/HANDOFF.md)**: that session's state, how we work, and its frontier.

*Front door & cross-cutting*
1. [Design goals & summary](./docs/analysis/2026-08-22-design-evolution/01-design-goals-and-summary.md) — pillars, the **decisions-locked** table, and what's still open.
2. [The one-action-per-turn rule](./docs/analysis/2026-08-22-design-evolution/02-the-one-action-rule.md) — the hand-clog problem (resolved by the tome + quests).
3. [Removing fields & ambient effects](./docs/analysis/2026-08-22-design-evolution/03-removing-fields-and-ambient-effects.md) — why fields are clunky; the parked weather/omen niche.

*The redesigned core*
4. [The core redesign](./docs/analysis/2026-08-22-design-evolution/04-the-core-redesign.md) — the four new pillars and the canonical turn order (overview).
9. [The Tome](./docs/analysis/2026-08-22-design-evolution/09-the-tome.md) — persistent spellbooks, singleton, base attack + spell modifiers.
10. [Quests & the ramp](./docs/analysis/2026-08-22-design-evolution/10-quests-and-the-ramp.md) — Saga-like leveling, the separate quest deck, abandon rules.
11. [Combat, keywords & counterplay](./docs/analysis/2026-08-22-design-evolution/11-combat-keywords-and-counterplay.md) — keyword system, timing, and the Seal/Shield/Burn tiers.
12. [Colour × Class](./docs/analysis/2026-08-22-design-evolution/12-colour-and-class.md) — the two-axis archetype system (RPS colour × class synergy).

*Format, world & meta*
5. [Deck size & format](./docs/analysis/2026-08-22-design-evolution/05-deck-size.md) — **13 spells + 7 quests = 20**, singleton, deck-out is not a loss.
6. [World, theme & naming](./docs/analysis/2026-08-22-design-evolution/06-world-theme-and-naming.md) — the plot, naming the creatures/peoples, and an in-world lexicon.
7. [Economy & progression](./docs/analysis/2026-08-22-design-evolution/07-economy-and-progression.md) — packs, cosmetic rarities, crafting, loot, and the anti-pay-to-win guardrails.
8. [Decisions, evaluation & open questions](./docs/analysis/2026-08-22-design-evolution/08-open-questions-and-decisions.md) — the ledger, the re-evaluation table, and the engine deltas for when we build.

### [`analysis/2026-08-24-proficiency-and-scaling/`](./docs/analysis/2026-08-24-proficiency-and-scaling/) — *live frontier*

The current session. Continues the 2026-08-22 bible: confirms the taxonomy /
top-of-tome / bounce locks, adds **proficiency-by-scaling** (a per-card "read the
board" system, not a keyword), and records quest + terminology (**Power / Attack**)
deltas. Supersedes the bible on anything it restates; the bible stays the full spec.

**▶ [HANDOFF.md](./docs/analysis/2026-08-24-proficiency-and-scaling/HANDOFF.md) — read this first**: current state and what to nail next (the starter set).

1. [Proficiency & scaling](./docs/analysis/2026-08-24-proficiency-and-scaling/01-proficiency-and-scaling.md) — gate-at-use, cards that read live game-state, the menu of read-axes.
2. [Decisions & deltas](./docs/analysis/2026-08-24-proficiency-and-scaling/02-decisions-and-deltas.md) — the session's locks and what they change in the bible.
