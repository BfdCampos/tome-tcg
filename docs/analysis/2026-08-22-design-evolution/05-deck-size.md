# Deck size: 30 vs 20

> "I also don't know if I like the 30 card deck. I think 20 might be more elegant
> since the game is meant to be played quickly. But I'm not sure about this yet."

## What 30 does today

`deck.schemas.ts` enforces **exactly 30 cards, max 2 copies**. With draw-1-per-turn
and ~4–5 opening cards, you'll see maybe 15–20 cards in a normal-length game — so
**you never come close to decking out**, and the back third of your deck is nearly
irrelevant. Combined with the hand-clog (doc 02), a 30-card deck means a *lot* of
cards you'll never play.

## The case for 20

- **Consistency (P1/P5).** You see a larger fraction of your deck, so your archetype
  actually shows up. Your "build" feels real every game instead of diluted by
  filler. With max-2-copies, 20 needs ≥10 distinct cards — still plenty of room to
  express a strategy.
- **Speed (the brief's whole point).** Fewer cards, tighter games, better for the
  mobile "one more match" loop (P2).
- **Deck-out becomes a *real* clock.** At 20, the draw pile is a resource you can
  feel. That opens a **second win condition** (mill / running them out) and a
  natural game-length cap so matches can't stall — genuinely good for a fast mobile
  game.
- **Lower collection wall (P4).** A 20-card deck needs fewer owned cards to be
  competitive → friendlier to free-to-play. (Trade-off noted below.)

## The case against / what to watch

- **Less variance = combos more reliable.** Smaller decks make degenerate two-card
  combos easier to assemble every game. If the meta has a broken pair, 20 finds it
  faster than 30. Balance must account for this.
- **Slightly undercuts the "chase" (P4 tension).** Fewer required cards means a
  competitive deck is *cheaper to complete*, which is great for players and mild
  friction for monetisation. This is a **feature for fairness, a minor cost for
  revenue** — resolve it on the cosmetic/chase axis (doc 07), not by inflating deck
  size.
- **Opening-hand swing.** A smaller deck makes a bad opening hurt more. Wants a
  **mulligan** (already worth having regardless).

## This is really one knob-set, not one number

Deck size can't be decided alone — it's bound to the doc-02 clog levers:

- **draw rate** (draw every turn? only when you didn't prepare? only under a hand
  cap?),
- **`emptySlotAttack`** (does not-committing stay free?),
- **whether deck-out is a loss** (it *is* in `getGameWinner`'s spirit but there's no
  mill pressure at 30).

Pick these as a set. A coherent starting configuration to playtest:

> **20-card deck, mulligan once, draw 1/turn, deck-out is a loss, and a lowered
> `emptySlotAttack`** so that a 20-card game naturally runs ~12–18 turns and both
> the hand and the draw pile feel like resources.

## Recommendation

- **Lean 20**, but treat it as provisional and **playtest it as a bundle** with draw
  rate, empty-slot attack, and a mulligan.
- **Add deck-out as a live clock** (it's mostly free given the engine already checks
  a winner each turn) — it turns "fast game" from a hope into a rule.
- Keep **max-2-copies**. Revisit only if 20 makes specific two-card combos oppressive.
