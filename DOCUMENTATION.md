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

## Navigating `analysis/`

This file deliberately does **not** enumerate the folders or their individual docs —
that would force an edit here every session. Instead:

- Each **dated folder** is one review or session; its **numbered files** are read in
  order, and design sessions carry a **`HANDOFF.md`**.
- **Open the newest folder** (they sort by their `YYYY-MM-DD` name) **and start at its
  `HANDOFF.md`** — it captures the current state, how we work, what to nail next, and
  links back to whatever earlier folders it builds on.

### Corrections to frozen snapshots

Reviews are snapshots and aren't edited after their date, so any material correction
is noted here instead (this list grows only when a frozen review needs a fix — not
per session):

- **2026-08-17 review** — describes the colour wheel as `red > blue > green > red`
  (a bug; intended and since corrected to `red > green > blue > red`, **PR #1**), and
  notes a missing win condition (a player at 0 HP now loses, added in **PR #2**).
