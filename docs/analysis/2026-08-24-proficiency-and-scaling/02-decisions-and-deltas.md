# Decisions & deltas — what this session changes in the bible

> Refs point to the 2026-08-22 design bible. Where this doc and the bible disagree,
> **this doc wins** (it's the later session). Not yet folded back into the bible docs
> themselves — they'll be reconciled when the core is built and the bible is refrozen.

## Confirmed the "leaning" locks (bible docs 09 & 11)

- **Effect taxonomy = Learn / Hit / Lose / Continuous.** Continuous auras are **IN**
  (not the super-simple path), gated to top-of-tome.
- **Top-of-tome rule:** **learning AND attacking both re-top** a colour; auras live
  only on top.
- **Unlearn/Bounce IN** as the control primitive; bounce-to-hand common, bounce-to-deck
  rarer/stronger.

## Terminology split (amends docs 04, 09, 10)

The word "attack" was doing two jobs. Split it:

- **Power** — the **character** stat. Starts **10**, permanent, raised only by quests
  (the bible's "base attack"). Power *is* the level; **there is no separate level
  counter.**
- **Attack** — a **spell's** modifier (`+8`, `+0`, or a scaling clause).
- **Damage on connect = Power + Attack.**

Names are **provisional** — locking in-world vocabulary is a later pass (with the
keyword taxonomy, doc 11).

## Quest deltas (amends doc 10)

- **Rewards are arbitrary and varied — NOT a fixed +2/+3/+5 curve.** A permanent Power
  bump is common, but a quest may give a perk (draw), give **nothing** on tasks 1–2 and
  a **massive** payoff on task 3, grant a non-ramp **capstone haymaker** (e.g. a Burn,
  doc 11), or — in **story mode** — grant **loot** / no in-game reward at all. Story
  quests are the system *forcing* a scripted objective and are **not deckbuildable**.
  The quest system is a general "make the player do X for a reward" engine.
- **"OR" escape hatches are rare, not a design principle.** They read as cringe when
  bolted onto every hard task. Use them **only when thematically earned** (e.g. an
  Aeromancer air/steam quest: *"land a hit with red **or** blue"*). The general
  anti-lock valve is **abandon**, not a universal OR clause.
- **Opener = deal 3 of your 7 quests, choose 1**, rest random. A one-time match-start
  pick (reuses the mulligan-style picker). Real anti-mana-screw / anti-prize-card
  payoff: never screwed by a dead random opener, never blindly locking a key card away.
  *(Value vs. the extra UI still open — decide when we mock the match-start screen.)*
- **Cash in as many tasks as you complete in a turn** — no per-turn cap; quest design
  makes multi-cash-in naturally rare.
- **Capstone tasks may grant non-ramp haymakers** — yes.
- **Tome size:** no cap (deck size bounds it).

## New system this session

- **Proficiency by scaling** — see `01-proficiency-and-scaling.md`.

## Noted, parked

- **Rarity** leans **WoW gear tiers** (not bound to it). Possible tension with the
  bible doc 08 ledger line "rarity = cosmetic only" — flag for reopening if tiers ever
  touch power. Reconcile in the economy pass (doc 07).
- **Keyword taxonomy** and **class list** still to be done.
