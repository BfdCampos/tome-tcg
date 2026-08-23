# Deck size & format

> **Decided:** **13 spells + 7 quests = a 20-card loadout.** Spells are **singleton
> (1 copy)**. **Deck-out is not a loss.** Two decks: a spell deck and a separate
> quest line (doc 10).
>
> *(This doc previously argued "20-card, 2-copy, two-colour, deck-out = loss." All
> four of those were superseded by the tome/quest redesign — corrected below. Kept
> the reasoning trail rather than deleting it.)*

## Why 13 spells (singleton), not 20 (2-copy)

Singleton changes the whole calculation: **deck size = number of unique tools = the
size of the tome you could build.** So 13 singleton cards here carry the variety of a
~26-card 2-copy deck elsewhere. Singleton pushes the number **down**, not up — 20
distinct spells really would be too much to track on a phone and the game would end
first anyway.

- **13 is the middle of the sensible band.** 6 would be too few (no deckbuilding, you
  see everything instantly); ~20 is the ceiling (a no-interaction game is ~20 turns
  max, so you'd never learn them all). 13 keeps **6–7 spells per colour in a skewed
  build**, so the "which spell do I cast" decision (doc 09) has real teeth.
- **Singleton is forced by the tome** (doc 09): once a spell is learned, a duplicate
  is a dead draw. Bonus: it boosts variety and the "collect them all" RPG feel.
- **You learn ~1/turn**, so a 13-card deck is nearly fully learned by a ~13–15 turn
  game — the satisfying "started weak, ended with a grimoire" arc.

## Deck-out is a soft cap, not a loss

With a tome, emptying your spell deck just means **you've learned all your pages** —
you keep attacking with your whole book, you just stop gaining new spells. So a small
deck does **not** create a mill race, and mill is **not** a win condition. This is
what makes 13 safe: no death-by-running-out, just a natural cap on growth. (Contrast
the old note here, which made deck-out a loss and worried about mill — void under the
tome.)

## The quest line (the other 7)

Quests are a **separate deck of 7** (doc 10), not mixed into the spell deck — ramp
must never be left to random draw. 13 + 7 = a clean **20-card** total loadout. Both
13 and 7 are prime, and the round total reads nicely.

## What replaces "two-colour" (the correction)

An earlier version of this doc recommended MTG-style two-colour decks. **That was
wrong for an RPS game** and is fully superseded by **doc 12 (Colour × Class)**:

- **Colour is not deck identity.** Most decks run **all three colours** — you can't
  refuse to be able to throw "rock."
- **Class is deck identity.** You build around a **class** (Pyromancer, Warlock, …)
  that spans all three colours, reflavoured to its theme.

So the "strat" is **a class + a colour spread + a role mix + a matched 7-quest
line** — see doc 12 for the worked example.

## Still open / to playtest

- **13 vs ~11.** Start at 13; if the tome feels bloated or games run short, test down
  to 11. (Gut-check band: 11–15.)
- **Mulligan.** Almost certainly yes (one free mulligan) — a small deck makes a bad
  opener hurt.
- **Draw rate & base tuning.** Draw 1/turn is the default; base attack 10 and the
  ramp curve (doc 10) are the numbers to tune to hit a ~12–18 turn game.
- **Copies rule in code.** `deck.schemas.ts` currently enforces `30 / max-2`; the new
  format is `13 spells singleton + 7 quests`. Schema change tracked in doc 08.
