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

1. [Design goals & summary](./analysis/2026-08-22-design-evolution/01-design-goals-and-summary.md) — the four problems, the design pillars, and the summary of recommendations.
2. [The one-action-per-turn rule](./analysis/2026-08-22-design-evolution/02-the-one-action-rule.md) — why it clogs the hand, and how to fix it without losing the tempo fork.
3. [Removing fields & ambient effects](./analysis/2026-08-22-design-evolution/03-removing-fields-and-ambient-effects.md) — why fields are clunky, and an optional non-clashing "weather/omen" replacement.
4. [The interactive layer](./analysis/2026-08-22-design-evolution/04-the-interactive-layer.md) — making combat more than RPS via a new card type (with a slot for your own idea).
5. [Deck size: 30 vs 20](./analysis/2026-08-22-design-evolution/05-deck-size.md) — the case for a smaller, faster deck as one knob-set.
6. [World, theme & naming](./analysis/2026-08-22-design-evolution/06-world-theme-and-naming.md) — the plot, naming the creatures/peoples, and an in-world lexicon.
7. [Economy & progression](./analysis/2026-08-22-design-evolution/07-economy-and-progression.md) — packs, rarities, crafting, loot, and the anti-pay-to-win guardrails.
8. [Open questions & decisions](./analysis/2026-08-22-design-evolution/08-open-questions-and-decisions.md) — inconsistencies spotted, decisions needed from you, and next steps.

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
