# The Tome (persistent spellbook)

The single biggest change to the board. Replaces the old "stack, only the top card
is live, everything under it is dead weight" model.

## The rule

- Each colour (🔴🟢🔵) has a **tome** on your side — a **persistent, face-up
  spellbook**, not a stack.
- **Learning** a spell (the Prepare step) adds it to that colour's tome **without
  burying anything**. Every spell you ever learn stays available for the rest of the
  game.
- On the **Choose attack** step you pick a **colour** *and* **which learned spell in
  that colour's tome** to cast. (No spell / empty tome → base attack only.)
- The tome is **face-up to both players.** The opponent sees your whole **range**;
  what they can't see is your **pick** this turn (chosen simultaneously, revealed
  together). *Range is public, choice is hidden* — that's the poker.

## Why it's the fix for "just RPS"

The old read was shallow: *"they won't throw away that strong red they just played."*
With a tome there's nothing to throw away — so the read becomes *"they have Fireball,
Ember Jab **and** Riptide in red; which one, and into which colour, this turn?"* Same
simultaneous commit, far richer information space. It also kills the "wasted card"
feeling: nothing you prepare is ever lost.

And a free bonus: because you learn only **one spell per turn**, your tome is **thin
early** (few options, plays close to pure RPS) and **rich late** (a real grimoire).
That's a natural **low-level → high-level arc** with no extra rules — it *is* the
leveling fantasy on the card side, mirroring the quest ramp on the number side.

## Base attack + spell modifiers (the number model)

- You have a **base attack**, starting at **10**. It is permanent and only ever
  raised by **quests** (doc 10). Think of it as your **character level**.
- **Spells are modifiers, not flat values.** A spell reads e.g. `+10` or `+0` or
  even `−`; the damage a connecting attack deals is **base + the chosen spell's
  modifier**.
- So the same Fireball (`+10`) hits for 20 at base 10, and 30 after you've levelled
  base to 20. Your whole book scales with your level — late hits close games.
- Attacking with **no spell** (or an empty tome) deals **base only**. This is the
  "win by pure reading" line: you never have to learn a card.

## Consequences we've accepted (design laws)

1. **Singleton (1 copy per card).** Once a spell is in your tome, a second copy is a
   near-dead draw — so decks are **singleton**. (Also boosts variety and the
   "collect them all" RPG feel; see doc 05.)
2. **No spell may be strictly better than another in its colour.** If one red spell
   is just "bigger number, same else", the "which spell do I cast" choice collapses
   to "pick the biggest". Every spell must earn its slot with a **situational**
   angle — a Seal rider, a Lose clause, a conditional bonus, a utility effect. This
   is the #1 card-design rule of the game.
3. **Removal/discard is nerfed on purpose.** Milling "the top of their stack" is
   meaningless when they keep the whole book. Counterplay moves to **denial**
   (doc 11), not attrition.
4. **The tome is visible.** Hidden tomes would make the game an unreadable guess and
   kill the bluff pillar. Range public, pick hidden.

## Open sub-questions

- Is there a **cap** on tome size per colour, or is it just bounded by deck size /
  game length? (Leaning: no explicit cap; deck size bounds it naturally.)
- Do we ever let a spell **leave** a tome? Only via **Forget** (self-removal) or
  **Burn** (rare destruction) — see doc 11. Never as a routine effect.
