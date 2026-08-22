# Documentation

How the project's documentation is organised, and an index of what lives in
[`docs/`](./docs). For running the project locally, see the
[README](./README.md); for detailed dev setup (dev-login, seeding, two-player
testing), see [`CLAUDE.md`](./CLAUDE.md).

## Layout

```
docs/
  analysis/         point-in-time reviews of the game (design, comparisons, ratings)
    <YYYY-MM-DD-slug>/   one dated folder per review
      NN-topic.md        numbered files, read in order
```

## `analysis/` — dated game reviews

Each review is a **snapshot**: it reflects the codebase and understanding on the
date in its folder name, and is not edited later to stay current. When the game
changes materially, add a **new** dated folder rather than rewriting an old one —
that way the history of how the design and the assessment evolved is preserved.

Folders are named `YYYY-MM-DD-slug` and the files inside are numbered so they read
top to bottom.

## Reviews

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
